import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      });
      if (error) throw error;
      alert('Check your email for the confirmation link!');
      router.push('/auth/login');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SIGNUP // AI-OS</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col justify-center py-12 px-4 bg-neo-bg">
        <div className="absolute top-0 left-0 p-6">
          <Link href="/" className="font-black uppercase text-xl border-b-2 border-black hover:bg-black hover:text-white transition-colors">← Return</Link>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-neo-pink border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-brutal">
              <span className="text-4xl text-white">★</span>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Initialize</h2>
            <p className="mt-4 font-mono text-gray-600">
              Already initialized? <Link href="/auth/login" className="underline font-bold hover:bg-black hover:text-white">Identify</Link>
            </p>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white border-4 border-black p-8 shadow-brutal-lg">
            {error && <div className="bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 mb-6 font-bold">{error}</div>}
            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label htmlFor="name" className="block text-sm font-black uppercase mb-1">Designation (Name)</label>
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
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-brutal bg-neo-lime text-black hover:bg-black hover:text-white shadow-brutal"
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