import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
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
        <div className="auth-art-copy">
          <span className="eyebrow">YOUR NEXT WORKSPACE</span>
          <h2>
            BIG IDEAS.
            <br />
            <span>REAL MOVES.</span>
          </h2>
          <p>Your ideas, your tools, and a little mechanical help.</p>
        </div>
        <div className="auth-visual" aria-hidden="true">
          <Image
            src="/operator-hand.png"
            width={1122}
            height={1402}
            alt=""
            sizes="(max-width: 800px) 1px, 40vw"
          />
        </div>
        <span className="auth-art-note">HUMAN DIRECTION / AETHERIA AI</span>
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
