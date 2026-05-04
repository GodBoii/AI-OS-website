import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

// Google Icon SVG component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setSuccess('Check your email for the confirmation link!');
      setTimeout(() => router.push('/auth/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      // Page will redirect — no need to setLoading(false)
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google');
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SIGNUP // Aetheria AI</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col justify-center py-12 px-4 bg-neo-bg">
        <div className="absolute top-0 left-0 p-6">
          <Link href="/" className="font-black uppercase text-xl border-b-2 border-black hover:bg-black hover:text-white transition-colors px-1">
            ← Return
          </Link>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-neo-pink border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-brutal">
              <span className="text-4xl text-white">★</span>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Initialize</h2>
            <p className="mt-4 font-mono text-gray-600">
              Already initialized?{' '}
              <Link href="/auth/login" className="underline font-bold hover:bg-black hover:text-white px-1">
                Identify
              </Link>
            </p>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white border-4 border-black p-8 shadow-brutal-lg">
            {error && (
              <div className="bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 mb-6 font-bold text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-neo-lime border-2 border-black text-black px-4 py-3 mb-6 font-bold text-sm">
                ✅ {success}
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              id="google-signup-btn"
              onClick={handleGoogleSignup}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-black bg-white hover:bg-gray-50 font-bold uppercase transition-all shadow-brutal-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {googleLoading ? 'CONNECTING...' : 'Continue with Google'}
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-black border-dashed" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 font-mono text-xs text-gray-500 uppercase">or email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label htmlFor="name" className="block text-sm font-black uppercase mb-1">
                  Designation (Name)
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-brutal"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-black uppercase mb-1">
                  Email Protocol
                </label>
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
                <label htmlFor="password" className="block text-sm font-black uppercase mb-1">
                  Passkey
                </label>
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
              <button
                id="email-signup-btn"
                type="submit"
                disabled={loading || googleLoading}
                className="w-full btn-brutal bg-neo-lime text-black hover:bg-black hover:text-white shadow-brutal disabled:opacity-50"
              >
                {loading ? 'CREATING...' : 'ESTABLISH LINK'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}