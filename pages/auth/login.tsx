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
    console.log('Login attempt started for:', email);
    setLoading(true);
    setError(null);
    try {
      console.log('Calling supabase.auth.signInWithPassword...');
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase auth error:', error);
        throw error;
      }

      if (data?.session) {
        console.log('Login successful, redirecting to dashboard...');
        router.push('/dashboard');
      } else {
        console.warn('Login succeeded but no session returned (possibly email confirmation pending?)');
        // Check if we should alert the user
        if (data.user && !data.session) {
          setError('Please check your email to confirm your account before logging in.');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      console.error('Login exception caught:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
      console.log('Login attempt finished');
    }
  };

  return (
    <>
      <Head>
        <title>LOGIN // AI-OS</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col justify-center py-12 px-4 bg-neo-bg">
        <div className="absolute top-0 left-0 p-6">
          <Link href="/" className="font-black uppercase text-xl border-b-2 border-black hover:bg-black hover:text-white transition-colors">← Return</Link>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-neo-lime border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-brutal">
              <span className="text-4xl">⚡</span>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Identify</h2>
            <p className="mt-4 font-mono text-gray-600">
              New user? <Link href="/auth/signup" className="underline font-bold hover:bg-black hover:text-white">Initialize Account</Link>
            </p>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white border-4 border-black p-8 shadow-brutal-lg">
            {error && <div className="bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 mb-6 font-bold">{error}</div>}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-black uppercase mb-1">Email Protocol</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-brutal"
                  placeholder="user@domain.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-black uppercase mb-1">Passkey</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-brutal"
                  placeholder="••••••••"
                />
              </div>
              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-sm font-mono underline hover:text-neo-blue">Lost key?</Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-brutal bg-black text-white hover:bg-neo-blue shadow-brutal"
              >
                {loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}