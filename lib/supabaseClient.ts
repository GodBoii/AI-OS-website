import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase initialization error: Missing environment variables');
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
} else {
  console.log('Supabase client initializing with:', {
    url: supabaseUrl,
    keyPrefix: supabaseAnonKey.substring(0, 5) + '...'
  });
}

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
  access_token: string;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

export const getCurrentSession = async (): Promise<Session | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session as Session | null;
};

export const createClientWithToken = (token: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
}; 