import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "lucide-react";
import AuthFrame from "../../components/AuthFrame";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabaseClient";

type Status = "checking" | "ready" | "saving" | "saved" | "invalid";

export default function ResetPassword() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const exchange = useRef<{
    code: string;
    result: ReturnType<typeof supabase.auth.exchangeCodeForSession>;
  } | null>(null);
  const code =
    typeof router.query.code === "string" ? router.query.code : undefined;

  useEffect(() => {
    if (!router.isReady) return;
    let cancelled = false;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session && !cancelled)
        setStatus("ready");
    });

    async function checkSession() {
      try {
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const linkError = hash.get("error_description");
        if (linkError) throw new Error(linkError);
        if (code) {
          if (exchange.current?.code !== code) {
            exchange.current = {
              code,
              result: supabase.auth.exchangeCodeForSession(code),
            };
          }
          const { error } = await exchange.current.result;
          if (error) throw error;
          window.history.replaceState(
            window.history.state,
            "",
            "/auth/reset-password",
          );
        }
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        if (!session)
          throw new Error(
            "This reset link has expired or is invalid. Request a new link to continue.",
          );
        if (!cancelled) setStatus("ready");
      } catch (error: unknown) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Could not verify the reset link. Request a new one.",
          );
          setStatus("invalid");
        }
      }
    }
    void checkSession();
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [router.isReady, code]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }
    setError("");
    setStatus("saving");
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setPassword("");
      setConfirmation("");
      setStatus("saved");
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not update your password. Try again.",
      );
      setStatus("ready");
    }
  }

  return (
    <>
      <SEO title="Choose a new password | Aetheria AI" noIndex />
      <AuthFrame mode="recovery">
        <h1>
          {status === "saved" ? "Password updated." : "Choose a new password."}
        </h1>
        {error && (
          <p className="form-error" id="reset-error" role="alert">
            {error}
          </p>
        )}
        {status === "checking" ? (
          <p className="auth-switch" role="status">
            Verifying your reset link…
          </p>
        ) : status === "invalid" ? (
          <Link className="primary-cta" href="/auth/forgot-password">
            Request a new reset link <ArrowUpRight size={18} />
          </Link>
        ) : status === "saved" ? (
          <div className="signup-success" role="status">
            <p>Your new password is ready to use.</p>
            <Link className="primary-cta" href="/dashboard">
              Continue to dashboard <ArrowUpRight size={18} />
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(event) => void submit(event)}
            aria-describedby={error ? "reset-error" : undefined}
          >
            <p className="auth-switch">
              Use at least 6 characters for your new password.
            </p>
            <div className="auth-field">
              <label htmlFor="password">New password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={status === "saving"}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="confirmation">Confirm new password</label>
              <input
                id="confirmation"
                name="confirmation"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                disabled={status === "saving"}
              />
            </div>
            <button
              className="auth-submit"
              type="submit"
              disabled={status === "saving"}
            >
              {status === "saving" ? "Updating password…" : "Update password"}
              <ArrowUpRight size={20} />
            </button>
          </form>
        )}
        <p className="auth-switch">
          <Link href="/auth/login">Back to login</Link>
        </p>
      </AuthFrame>
    </>
  );
}
