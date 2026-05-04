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
        <Head><title>AUTH ERROR // Aetheria AI</title></Head>
        <div className="min-h-screen flex flex-col items-center justify-center bg-neo-bg px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-400 border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-brutal">
              <span className="text-4xl">✕</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Auth Failed</h2>
            <div className="bg-white border-2 border-black p-4 font-mono text-sm text-red-600 mb-6 text-left">
              {errorMsg}
            </div>
            <button
              onClick={() => router.push('/auth/login')}
              className="btn-brutal bg-black text-white hover:bg-neo-lime hover:text-black shadow-brutal"
            >
              Back to Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>AUTH // Aetheria AI</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-neo-bg">
        <div className="text-center">
          <div className="w-20 h-20 bg-neo-lime border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-brutal animate-bounce">
            <span className="text-4xl">⚡</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Authenticating...</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="font-mono text-gray-500 text-sm">Establishing secure channel...</p>
        </div>
      </div>
    </>
  );
}
