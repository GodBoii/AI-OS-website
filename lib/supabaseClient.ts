import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vpluyoknbywuhahcnlfx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbHV5b2tuYnl3dWhhaGNubGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjMwMDEsImV4cCI6MjA2MjYzOTAwMX0.7o8ICrbVdndxi_gLafKf9aqyDgkqNrisZvrJT3XEUfA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
  };
  created_at?: string;
};

export type Session = {
  user: User;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}; 