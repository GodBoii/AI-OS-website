import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export function BrandMark() {
  return (
    <img className="brand-icon" src="/icon.png" width={40} height={40} alt="" aria-hidden="true" />
  );
}
const links = [
  { href: "/for-you", label: "What it does" },
  { href: "/download", label: "Downloads" },
  { href: "/pricing", label: "Pricing" },
  { href: "/investor", label: "The vision" },
];

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) =>
      setUser(session?.user ?? null),
    );
    void supabase.auth
      .getSession()
      .then(({ data }) => setUser(data.session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError("Could not sign out. Try again.");
      return;
    }
    setOpen(false);
    void router.push("/");
  }
  return (
    <header className="site-header" ref={headerRef}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Link href="/" className="brand" aria-label="Aetheria AI home">
        <BrandMark />
        <span>
          aetheria
          <span className="brand-dot" aria-hidden="true">
            ✳
          </span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={router.pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link href={user ? "/dashboard" : "/auth/login"} className="login-link">
          {user ? "Dashboard" : "Log in"}
        </Link>
        {user ? (
          <button className="small-cta" onClick={() => void signOut()}>
            Sign out <ArrowUpRight size={16} />
          </button>
        ) : (
          <Link className="small-cta" href="/download">
            Get Aetheria <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
      <button
        className="menu-toggle"
        ref={menuRef}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              aria-current={router.pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ArrowUpRight size={20} />
            </Link>
          ))}
          <Link href={user ? "/dashboard" : "/auth/login"}>
            {user ? "Dashboard" : "Log in"}
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/download" className="mobile-download">
            Get Aetheria <ArrowUpRight size={20} />
          </Link>
          {user && <button onClick={() => void signOut()}>Sign out</button>}
        </nav>
      )}
      {authError && (
        <p className="auth-error" role="alert">
          {authError}
        </p>
      )}
    </header>
  );
}
