import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * Convex Usage API Proxy
 *
 * Security flow:
 * 1. Client sends Supabase JWT in Authorization header
 * 2. We verify the JWT with Supabase to get the user_id
 * 3. We call Convex HTTP API server-side with CONVEX_ADMIN_KEY (never exposed to client)
 * 4. Return combined daily + lifetime usage data
 *
 * Convex HTTP API format:
 * POST https://<deployment>.convex.cloud/api/query
 * { "path": "usage:functionName", "args": { ... }, "format": "json" }
 */

const CONVEX_URL = process.env.CONVEX_URL || 'https://descriptive-bee-184.convex.cloud';
const CONVEX_ADMIN_KEY = process.env.CONVEX_ADMIN_KEY || '';

interface ConvexDailyRow {
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

interface ConvexLifetime {
  user_id: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  updated_at_ms: number | null;
  window_count: number;
  usage_source: string;
}

async function queryConvex<T>(functionPath: string, args: Record<string, unknown>): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Only attach admin key if it's configured
  if (CONVEX_ADMIN_KEY) {
    headers['Authorization'] = `Convex ${CONVEX_ADMIN_KEY}`;
  }

  const response = await fetch(`${CONVEX_URL}/api/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      path: functionPath,
      args,
      format: 'json',
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Convex query failed (${response.status}): ${text}`);
  }

  const json = await response.json();

  // Convex wraps result in { status: "success", value: ... } or { status: "error", errorMessage: ... }
  if (json.status === 'error') {
    throw new Error(`Convex error: ${json.errorMessage}`);
  }

  return json.value as T;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // --- Step 1: Verify Supabase JWT ---
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing Bearer token' });
  }

  const token = authHeader.split(' ')[1];
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  const userId = user.id;
  const limit = Math.min(Number(req.query.limit) || 30, 365);

  // --- Step 2: Query Convex in parallel ---
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

    // Sort daily rows by day_key descending (newest first for table)
    const sortedDaily = [...(dailyRows || [])].sort((a, b) =>
      b.day_key.localeCompare(a.day_key)
    );

    return res.status(200).json({
      daily: sortedDaily,
      lifetime: lifetime || {
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
    console.error('[convex-usage] Error:', err.message);

    // Return empty data gracefully — don't crash dashboard
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
