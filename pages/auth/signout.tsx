import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LogOut } from "lucide-react";
import AuthFrame from "../../components/AuthFrame";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/surface.module.css";

type State = "confirm" | "pending" | "complete" | "error";

export default function SignOut() {
  const [state, setState] = useState<State>("confirm");

  async function signOut() {
    setState("pending");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setState("complete");
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <SEO title="Sign out | Aetheria AI" noIndex />
      <AuthFrame mode="session">
        {state === "complete" ? (
          <div>
            <h1 ref={(node) => node?.focus()} tabIndex={-1}>You’re signed out.</h1>
            <div className={styles.authActions}>
              <Link href="/auth/login" className={styles.action} data-glass-control>Log in <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/" className={styles.textLink} data-glass-control>Back to Aetheria</Link>
            </div>
          </div>
        ) : (
          <>
            <h1>Sign out?</h1>
            <p className="auth-switch">You’ll need to log in again to open your dashboard.</p>
            {state === "error" && <p className="form-error" role="alert">Could not sign out. Try again.</p>}
            <div className={styles.authActions}>
              <button type="button" className={styles.action} disabled={state === "pending"} onClick={() => void signOut()}>
                {state === "pending" ? "Signing out…" : "Sign out"} <LogOut size={16} aria-hidden="true" />
              </button>
              <Link href="/dashboard" className={styles.textLink} data-glass-control>Back to dashboard</Link>
            </div>
          </>
        )}
      </AuthFrame>
    </>
  );
}
