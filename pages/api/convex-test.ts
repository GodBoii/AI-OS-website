import { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /api/convex-test
 * Quick connectivity check — verifies the Convex HTTP API is reachable
 * and the admin key + function path are correct.
 *
 * Usage: Open https://aetheriaai.online/api/convex-test in browser
 * to see if Convex is responding correctly.
 *
 * Remove this file after debugging.
 */

const CONVEX_URL = (process.env.CONVEX_URL || '').replace(/\/$/, '');
const CONVEX_ADMIN_KEY = process.env.CONVEX_ADMIN_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!CONVEX_URL) {
    return res.status(500).json({ ok: false, error: 'CONVEX_URL env var not set' });
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (CONVEX_ADMIN_KEY) {
    headers['Authorization'] = `Convex ${CONVEX_ADMIN_KEY}`;
  }

  try {
    // Test with a known user_id from the dashboard screenshot
    const testUserId = 'test-connectivity-check';
    const response = await fetch(`${CONVEX_URL}/api/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        path: 'usage:getLifetimeUsage',
        args: { user_id: testUserId },
      }),
    });

    const text = await response.text();
    let parsed: any = null;
    try { parsed = JSON.parse(text); } catch {}

    return res.status(200).json({
      ok: response.ok,
      convex_url: CONVEX_URL,
      has_admin_key: !!CONVEX_ADMIN_KEY,
      admin_key_prefix: CONVEX_ADMIN_KEY ? CONVEX_ADMIN_KEY.slice(0, 20) + '...' : null,
      http_status: response.status,
      response_preview: text.slice(0, 500),
      parsed_status: parsed?.status,
      error_message: parsed?.errorMessage,
    });
  } catch (err: any) {
    return res.status(200).json({
      ok: false,
      convex_url: CONVEX_URL,
      has_admin_key: !!CONVEX_ADMIN_KEY,
      fetch_error: err.message,
    });
  }
}
