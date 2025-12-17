import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('No valid authorization header found');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('No token found in authorization header');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Create a regular Supabase client
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Get user information from the token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.error('User retrieval error:', userError);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Log user ID for debugging
    console.log('User ID from token:', user.id);

    // Get all request logs for the user
    const { data: logs, error: logsError, count } = await supabase
      .from('request_logs')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (logsError) {
      console.error('Error fetching request logs:', logsError);
      return res.status(500).json({ error: logsError.message });
    }

    console.log('Logs found for user:', logs?.length || 0);

    // If no logs found, return empty results
    if (!logs || logs.length === 0) {
      return res.status(200).json({
        logs: [],
        totalMetrics: {
          request_count: 0,
          input_tokens: 0,
          output_tokens: 0,
          total_tokens: 0
        }
      });
    }

    // Calculate sums
    const totalInputTokens = logs.reduce((sum, item) => sum + (item.input_tokens || 0), 0);
    const totalOutputTokens = logs.reduce((sum, item) => sum + (item.output_tokens || 0), 0);
    const totalTokens = logs.reduce((sum, item) => sum + (item.total_tokens || 0), 0);

    // Format the response
    const response = {
      logs: logs,
      totalMetrics: {
        request_count: logs.length,
        input_tokens: totalInputTokens,
        output_tokens: totalOutputTokens,
        total_tokens: totalTokens,
      }
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Exception fetching usage metrics:', error);
    return res.status(500).json({ error: 'Failed to fetch usage metrics' });
  }
} 