import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../../lib/supabaseClient';

/**
 * OAuth Callback Page
 *
 * Supabase Auth redirects here after Google OAuth.
 * Two flows handled:
 *   1. PKCE flow (code in ?code= query param) - supabase-js v2 default
 *   2. Implicit flow (tokens in #hash fragment) - fallback
 *
 * The key fix: we call supabase.auth.exchangeCodeForSession() explicitly
 * when a `code` query param is present (PKCE), which creates the session
 * and fires the SIGNED_IN auth state event.
 */
export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Wait for router to be ready so query params are available
    if (!router.isReady) return;

    handleCallback();

    async function handleCallback() {
      try {
        // ── PKCE flow: Supabase passes ?code=... in the URL ──────────────────
        const code = router.query.code as string | undefined;
        const error = router.query.error as string | undefined;
        const errorDescription = router.query.error_description as string | undefined;

        // Handle explicit error from OAuth provider
        if (error) {
          setErrorMsg(errorDescription || error);
          setStatus('error');
          return;
        }

        if (code) {
          // Exchange the PKCE code for a session
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setErrorMsg(exchangeError.message);
            setStatus('error');
            return;
          }
          if (data.session) {
            router.replace('/dashboard');
            return;
          }
        }

        // ── Implicit flow / Hash fragment: tokens already in browser storage ─
        // supabase-js auto-processes hash fragments on init, so just check session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.replace('/dashboard');
          return;
        }

        // ── Fallback: Listen for SIGNED_IN event (handles race conditions) ───
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            router.replace('/dashboard');
          }
        });

        // If nothing resolved after 5 seconds, redirect to login
        const timeout = setTimeout(() => {
          subscription.unsubscribe();
          router.replace('/auth/login?error=timeout');
        }, 5000);

        return () => {
          clearTimeout(timeout);
          subscription.unsubscribe();
        };

      } catch (err: any) {
        console.error('[callback] Unexpected error:', err);
        setErrorMsg(err.message || 'Unknown error');
        setStatus('error');
      }
    }
  }, [router.isReady, router.query]);

  if (status === 'error') {
    return (
      <>
        <Head><title>Authentication Error | Aetheria AI</title></Head>
        <div className="min-h-screen flex flex-col items-center justify-center bg-neo-bg px-4 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          <div className="text-center max-w-md bg-surface border border-red-500/30 p-8 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="w-16 h-16 bg-red-500/20 border border-red-500/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-white">Authentication Failed</h2>
            <div className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-sm text-red-400 mb-8 text-left overflow-auto">
              {errorMsg}
            </div>
            <button
              onClick={() => router.push('/auth/login')}
              className="w-full btn-brutal px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all"
            >
              Return to Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Authenticating... | Aetheria AI</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-neo-bg relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className="text-center">
          <div className="w-20 h-20 bg-surface border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-white">Authenticating</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="font-mono text-primary/70 text-sm tracking-widest uppercase">Establishing secure channel</p>
        </div>
      </div>
    </>
  );
}
