import Link from "next/link";
import AuthFrame from "../../components/AuthFrame";
import styles from "../../styles/surface.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabaseClient";

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
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Wait for router to be ready so query params are available
    if (!router.isReady) return;

    handleCallback();

    async function handleCallback() {
      try {
        // ── PKCE flow: Supabase passes ?code=... in the URL ──────────────────
        const code = router.query.code as string | undefined;
        const error = router.query.error as string | undefined;
        const errorDescription = router.query.error_description as
          string | undefined;

        // Handle explicit error from OAuth provider
        if (error) {
          setErrorMsg(errorDescription || error);
          setStatus("error");
          return;
        }

        if (code) {
          // Exchange the PKCE code for a session
          const { data, error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setErrorMsg(exchangeError.message);
            setStatus("error");
            return;
          }
          if (data.session) {
            router.replace("/dashboard");
            return;
          }
        }

        // ── Implicit flow / Hash fragment: tokens already in browser storage ─
        // supabase-js auto-processes hash fragments on init, so just check session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          router.replace("/dashboard");
          return;
        }

        // ── Fallback: Listen for SIGNED_IN event (handles race conditions) ───
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === "SIGNED_IN" && session) {
            router.replace("/dashboard");
          }
        });

        // If nothing resolved after 5 seconds, redirect to login
        const timeout = setTimeout(() => {
          subscription.unsubscribe();
          router.replace("/auth/login?error=timeout");
        }, 5000);

        return () => {
          clearTimeout(timeout);
          subscription.unsubscribe();
        };
      } catch (err: any) {
        console.error("[callback] Unexpected error:", err);
        setErrorMsg(err.message || "Unknown error");
        setStatus("error");
      }
    }
  }, [router.isReady, router.query]);

  const failed = status === "error";

  return (
    <>
      <SEO title={failed ? "Authentication error | Aetheria AI" : "Signing in | Aetheria AI"} noIndex />
      <AuthFrame mode="session">
        <h1>{failed ? "Sign-in failed." : "Finishing sign-in…"}</h1>
        {failed ? (
          <>
            <p className="form-error" role="alert">{errorMsg}</p>
            <div className={styles.authActions}>
              <Link className={styles.action} href="/auth/login">Back to login</Link>
            </div>
          </>
        ) : <p className="auth-switch" role="status">Connecting to your account.</p>}
      </AuthFrame>
    </>
  );
}
