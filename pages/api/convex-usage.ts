import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * Convex Usage API Proxy — /api/convex-usage
 *
 * Flow:
 * 1. Verify Supabase JWT → get user_id
 * 2. Call Convex HTTP API server-side (CONVEX_ADMIN_KEY stays secret)
 * 3. Return { daily: ConvexDailyRow[], lifetime: ConvexLifetime }
 *
 * Convex HTTP API (v1):
 *   POST https://<deployment>.convex.cloud/api/query
 *   Authorization: Convex <admin-key>
 *   Content-Type: application/json
 *   Body: { "path": "usage:functionName", "args": { ...namedArgs } }
 *
 * NOTE: Do NOT include "format" key — newer Convex rejects unknown fields.
 * The response shape: { status: "success", value: <return value> }
 *                  or { status: "error", errorMessage: "..." }
 */

const CONVEX_URL = (process.env.CONVEX_URL || 'https://descriptive-bee-184.convex.cloud').replace(/\/$/, '');
const CONVEX_ADMIN_KEY = process.env.CONVEX_ADMIN_KEY || '';

async function queryConvex<T>(functionPath: string, args: Record<string, unknown>): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (CONVEX_ADMIN_KEY) {
    headers['Authorization'] = `Convex ${CONVEX_ADMIN_KEY}`;
  }

  const body = JSON.stringify({ path: functionPath, args });

  console.log(`[convex-usage] Querying ${functionPath}`, JSON.stringify(args));

  const response = await fetch(`${CONVEX_URL}/api/query`, {
    method: 'POST',
    headers,
    body,
  });

  const text = await response.text();
  console.log(`[convex-usage] ${functionPath} → HTTP ${response.status}:`, text.slice(0, 200));

  if (!response.ok) {
    throw new Error(`Convex HTTP ${response.status}: ${text}`);
  }

  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Convex returned non-JSON: ${text.slice(0, 100)}`);
  }

  if (json.status === 'error') {
    throw new Error(`Convex function error: ${json.errorMessage}`);
  }

  return json.value as T;
}

// ─── Types (must match convex/schema.ts exactly) ──────────────────────────────

export interface ConvexDailyRow {
  _id: string;
  user_id: string;
  day_key: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  first_event_at_ms: number;
  last_event_at_ms: number;
  created_at_ms: number;
  updated_at_ms: number;
}

export interface ConvexLifetime {
  user_id: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  updated_at_ms: number | null;
  window_count: number;
  usage_source: string;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Step 1: Verify Supabase JWT
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing Bearer token' });
  }
  const token = authHeader.split(' ')[1];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) {
    console.error('[convex-usage] Auth error:', userError?.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  const userId = user.id;
  // getDailyUsageForUser: limit is optional, default 30, max 365
  const limit = Math.min(Math.max(Number(req.query.limit) || 90, 1), 365);

  console.log(`[convex-usage] Fetching for user=${userId} limit=${limit}`);

  // Step 2: Query Convex — both calls in parallel
  try {
    const [dailyRows, lifetime] = await Promise.all([
      queryConvex<ConvexDailyRow[]>('usage:getDailyUsageForUser', {
        user_id: userId,
        limit,
      }),
      queryConvex<ConvexLifetime>('usage:getLifetimeUsage', {
        user_id: userId,
      }),
    ]);

    const rows = dailyRows || [];

    // Sort newest-first for the table (chart will re-sort ascending client-side)
    rows.sort((a, b) => b.day_key.localeCompare(a.day_key));

    console.log(`[convex-usage] Got ${rows.length} daily rows, lifetime total=${lifetime?.total_tokens}`);

    return res.status(200).json({
      daily: rows,
      lifetime: lifetime ?? {
        user_id: userId,
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0,
        updated_at_ms: null,
        window_count: 0,
        usage_source: 'convex_lifetime',
      },
    });

  } catch (err: any) {
    console.error('[convex-usage] Convex query failed:', err.message);

    // Return graceful empty response — never crash the dashboard with a 500
    return res.status(200).json({
      daily: [],
      lifetime: {
        user_id: userId,
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0,
        updated_at_ms: null,
        window_count: 0,
        usage_source: 'convex_lifetime',
      },
      _error: err.message,
    });
  }
}
