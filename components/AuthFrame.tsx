import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BrandMark } from "./homepage/Header";

export default function AuthFrame({
  children,
  mode,
}: {
  children: ReactNode;
  mode: "login" | "signup" | "recovery";
}) {
  return (
    <main className="auth-frame">
      <aside className="auth-art">
        <Link href="/" className="brand">
          <BrandMark />
          <span>aetheria</span>
        </Link>
        <div>
          <span className="eyebrow">YOUR IDEAS HAVE PLACES TO GO.</span>
          <h2>
            Less someday.
            <br />
            More <span className="serif-word">today.</span>
          </h2>
          <p>
            A workspace for the things
            <br />
            you've been meaning to do.
          </p>
        </div>
        <div className="auth-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
          <ArrowUpRight />
        </div>
        <span className="auth-art-note">AETHERIA / INTELLIGENCE IN MOTION</span>
      </aside>
      <section className="auth-form-area">
        <Link href="/" className="auth-back">
          <ArrowLeft size={16} /> Back to Aetheria
        </Link>
        <div className="auth-form-content">
          <span className="eyebrow">
            {mode === "login"
              ? "PICK UP WHERE YOU LEFT OFF."
              : mode === "signup"
                ? "MAKE ROOM FOR YOUR NEXT IDEA."
                : "GET BACK TO YOUR WORKSPACE."}
          </span>
          {children}
        </div>
        <div className="auth-legal">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </section>
    </main>
  );
}
