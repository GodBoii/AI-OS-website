import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * /api/usage — LEGACY ROUTE (kept for backwards compatibility)
 *
 * The old Supabase `request_logs` table has been deleted.
 * This route now proxies to Convex via the same logic as /api/convex-usage.
 *
 * Both /api/usage and /api/convex-usage now return the same Convex data.
 */

const CONVEX_URL = process.env.CONVEX_URL || 'https://descriptive-bee-184.convex.cloud';
const CONVEX_ADMIN_KEY = process.env.CONVEX_ADMIN_KEY || '';

async function queryConvex<T>(functionPath: string, args: Record<string, unknown>): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (CONVEX_ADMIN_KEY) {
    headers['Authorization'] = `Convex ${CONVEX_ADMIN_KEY}`;
  }

  const response = await fetch(`${CONVEX_URL}/api/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ path: functionPath, args }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Convex ${response.status}: ${text}`);
  }

  const json = await response.json();
  if (json.status === 'error') {
    throw new Error(`Convex error: ${json.errorMessage}`);
  }
  return json.value as T;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Auth
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Fetch from Convex — same as /api/convex-usage
    const [daily, lifetime] = await Promise.all([
      queryConvex<any[]>('usage:getDailyUsageForUser', { user_id: user.id, limit: 90 }),
      queryConvex<any>('usage:getLifetimeUsage', { user_id: user.id }),
    ]);

    // Return in the new Convex shape so the updated dashboard works
    return res.status(200).json({
      daily: (daily || []).sort((a: any, b: any) => b.day_key.localeCompare(a.day_key)),
      lifetime: lifetime || {
        user_id: user.id,
        input_tokens: 0, output_tokens: 0, total_tokens: 0,
        updated_at_ms: null, window_count: 0, usage_source: 'convex_lifetime',
      },
    });
  } catch (err: any) {
    console.error('[/api/usage] Convex error:', err.message);
    // Graceful empty response — never 500
    return res.status(200).json({
      daily: [],
      lifetime: {
        user_id: user.id,
        input_tokens: 0, output_tokens: 0, total_tokens: 0,
        updated_at_ms: null, window_count: 0, usage_source: 'convex_lifetime',
      },
      _error: err.message,
    });
  }
}