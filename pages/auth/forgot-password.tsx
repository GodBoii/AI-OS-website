import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AuthFrame from "../../components/AuthFrame";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("sending");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        },
      );
      if (error) throw error;
      setStatus("sent");
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not send the reset link. Try again.",
      );
      setStatus("idle");
    }
  }

  return (
    <>
      <SEO title="Reset your password | Aetheria AI" noIndex />
      <AuthFrame mode="recovery">
        <h1>Forgot your password?</h1>
        <p className="auth-switch">
          Enter your account email to request a reset link.
        </p>
        {error && (
          <p className="form-error" id="recovery-error" role="alert">
            {error}
          </p>
        )}
        {status === "sent" ? (
          <div className="signup-success" role="status">
            <h2>Reset link requested.</h2>
            <p>
              If an account exists for {email.trim()}, you will receive an email
              with a password-reset link. Check your spam folder too.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(event) => void submit(event)}
            aria-describedby={error ? "recovery-error" : undefined}
          >
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={status === "sending"}
              />
            </div>
            <button
              className="auth-submit"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending reset link…" : "Send reset link"}
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
