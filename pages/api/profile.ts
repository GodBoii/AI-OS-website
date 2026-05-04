import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/profile
 *
 * Verifies the Supabase Bearer JWT, then fetches the authenticated
 * user's row from the `profiles` table and returns:
 *   { plan_type, subscription_status, current_period_end, name, email }
 *
 * This runs server-side so RLS policies are enforced and the service
 * key (if used later) never leaks to the client.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing Bearer token' });
  }
  const token = authHeader.split(' ')[1];

  // Use the user's own JWT so RLS applies correctly
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${token}` } },
    }
  );

  // Verify the token first
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  // Fetch the user's profile row
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('plan_type, subscription_status, current_period_end, name, email')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('[/api/profile] Supabase error:', profileError.message);
    // Return a safe default rather than crashing the dashboard
    return res.status(200).json({
      plan_type: 'free',
      subscription_status: 'none',
      current_period_end: null,
      name: user.user_metadata?.name ?? null,
      email: user.email ?? null,
      _error: profileError.message,
    });
  }

  return res.status(200).json({
    plan_type: profile?.plan_type ?? 'free',
    subscription_status: profile?.subscription_status ?? 'none',
    current_period_end: profile?.current_period_end ?? null,
    name: profile?.name ?? user.user_metadata?.name ?? null,
    email: profile?.email ?? user.email ?? null,
  });
}
