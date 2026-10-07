import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import AuthFrame from "./AuthFrame";

export default function AccountForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "email" | "google" | "success">(
    "idle",
  );
  const [error, setError] = useState("");
  const pending = status === "email" || status === "google";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("email");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { name: name.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setStatus("success");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        if (!data.session)
          throw new Error(
            "Check your email to confirm your account before signing in.",
          );
        await router.push("/dashboard");
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not complete the request. Try again.",
      );
      setStatus("idle");
    }
  }
  async function google() {
    setError("");
    setStatus("google");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not connect to Google. Try again.",
      );
      setStatus("idle");
    }
  }
  return (
    <AuthFrame mode={mode}>
      <h1>{mode === "login" ? "Welcome back." : "Make yourself at home."}</h1>
      <p className="auth-switch">
        {mode === "login" ? "New around here? " : "Already have an account? "}
        <Link href={mode === "login" ? "/auth/signup" : "/auth/login"}>
          {mode === "login" ? "Create an account" : "Log in"} ↗
        </Link>
      </p>
      {error && (
        <p className="form-error" id="auth-error" role="alert">
          {error}
        </p>
      )}
      {status === "success" ? (
        <div className="signup-success" role="status">
          <h2>Check your inbox.</h2>
          <p>
            We sent a confirmation link to {email}. Confirm your email, then
            come back to log in.
          </p>
          <Link href="/auth/login" className="primary-cta">
            Go to login <ArrowUpRight size={18} />
          </Link>
        </div>
      ) : (
        <>
          <button
            className="google-button"
            disabled={pending}
            onClick={() => void google()}
          >
            <span className="google-g" aria-hidden="true">
              G
            </span>
            {status === "google"
              ? "Connecting to Google…"
              : "Continue with Google"}
          </button>
          <div className="auth-divider">
            <span>or use your email</span>
          </div>
          <form
            onSubmit={(event) => void submit(event)}
            aria-describedby={error ? "auth-error" : undefined}
          >
            {mode === "signup" && (
              <div className="auth-field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="How should we call you?"
                  disabled={pending}
                />
              </div>
            )}
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                disabled={pending}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password">
                Password{" "}
                {mode === "signup" && <span>At least 6 characters</span>}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                required
                minLength={mode === "signup" ? 6 : undefined}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                disabled={pending}
              />
            </div>
            {mode === "login" && (
              <Link href="/contact" className="auth-help">
                Need help signing in?
              </Link>
            )}
            <button className="auth-submit" type="submit" disabled={pending}>
              {status === "email"
                ? mode === "login"
                  ? "Signing in…"
                  : "Creating your account…"
                : mode === "login"
                  ? "Log in"
                  : "Create account"}
              <ArrowUpRight size={20} />
            </button>
          </form>
        </>
      )}
    </AuthFrame>
  );
}
