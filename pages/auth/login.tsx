import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - AI-OS</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col justify-center py-12 px-4 hero-pattern">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">AI</span>
            </div>
            <h2 className="text-3xl font-bold">Sign in</h2>
            <p className="mt-2 text-gray-400">
              Or <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300">create account</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="glass-effect py-8 px-4 shadow rounded-lg">
            {error && <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded mb-4">{error}</div>}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="input w-full mt-1" 
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input 
                  id="password" 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="input w-full mt-1" 
                />
              </div>
              <div className="text-sm">
                <Link href="/auth/forgot-password" className="text-blue-400 hover:text-blue-300">Forgot password?</Link>
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition-colors transform hover:scale-105"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}