import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Initialize Supabase client with server-side keys
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vpluyoknbywuhahcnlfx.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbHV5b2tuYnl3dWhhaGNubGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjMwMDEsImV4cCI6MjA2MjYzOTAwMX0.7o8ICrbVdndxi_gLafKf9aqyDgkqNrisZvrJT3XEUfA';
  
  if (!supabaseServiceKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }
  
  // Create a Supabase client with the user's token for auth
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: req.headers.authorization || '',
      },
    },
  });
  
  // Get the user's session
  const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
  
  if (sessionError || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Extract usage data from request body
  const { input_tokens, output_tokens } = req.body;
  
  // Validate input
  if (typeof input_tokens !== 'number' || typeof output_tokens !== 'number') {
    return res.status(400).json({ error: 'Invalid input: input_tokens and output_tokens must be numbers' });
  }
  
  // Create a service role client to access the database
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    // Insert the usage log
    const { data, error } = await serviceClient
      .from('request_logs')
      .insert({
        user_id: session.user.id,
        input_tokens,
        output_tokens
        // total_tokens is automatically calculated by the database
      });
    
    if (error) {
      console.error('Error logging usage:', error);
      return res.status(500).json({ error: error.message });
    }
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Exception logging usage:', error);
    return res.status(500).json({ error: 'Failed to log usage' });
  }
} 