import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { notifyGuide } from "../../lib/experience";
import StarMark from "../experience/StarMark";
import styles from "../../styles/navigation.module.css";

export function BrandMark() {
  return (
    <img
      className="brand-icon"
      src="/icon.png"
      width={40}
      height={40}
      alt=""
      aria-hidden="true"
    />
  );
}
const links = [
  { href: "/#workspaces", label: "The workspace" },
  { href: "/download", label: "Downloads" },
  { href: "/pricing", label: "Pricing" },
];

type HeaderProps = {
  motionControl?: { paused: boolean; toggle: () => void };
  streamlined?: boolean;
};

export default function Header({ motionControl, streamlined = false }: HeaderProps) {
  const router = useRouter();
  const inlineGuide = streamlined;
  const navigation = links.filter((link) => link.href !== "/download");
  const [user, setUser] = useState<User | null>(null);
  const [menu, setMenu] = useState<"closed" | "hover" | "pinned">("closed");
  const open = menu !== "closed";
  const [authError, setAuthError] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number>();
  const hoverArea = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        setMenu("closed");
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenu("closed");
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
    const close = () => setMenu("closed");
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError("Could not sign out. Try again.");
      return;
    }
    setMenu("closed");
    void router.push("/");
  }
  return (
    <header className={`site-header${streamlined ? " " + styles.clear : ""}`} ref={headerRef}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Link href="/" className="brand" aria-label="Aetheria AI home">
        <span className="liquid-glass-mark" data-glass-logo>
          {streamlined ? <StarMark className="brand-icon" /> : <BrandMark />}
        </span>
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
            Sign out
          </button>
        ) : (
          <Link className="small-cta" href="/download">
            Get Aetheria
          </Link>
        )}
      </div>
      <div className={streamlined ? styles.menuArea : styles.legacyMenu} ref={hoverArea}
        onPointerEnter={() => window.clearTimeout(hoverTimer.current)}
        onPointerLeave={(event) => {
          if (!streamlined || event.pointerType !== "mouse") return;
          window.clearTimeout(hoverTimer.current);
          hoverTimer.current = window.setTimeout(() => {
            if (hoverArea.current?.contains(document.activeElement)) return;
            setMenu((state) => state === "hover" ? "closed" : state);
          }, 150);
        }}
        onBlur={(event) => {
          if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
          setMenu((state) => state === "hover" ? "closed" : state);
        }}
      >
        <button
          className="menu-toggle"
          ref={menuRef}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onPointerEnter={(event) => {
            if (!streamlined || event.pointerType !== "mouse" || !window.matchMedia("(any-hover: hover)").matches) return;
            setMenu((state) => state === "closed" ? "hover" : state);
          }}
          onClick={() => setMenu((state) => state === "pinned" ? "closed" : "pinned")}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="mobile-navigation"
          className={`mobile-nav liquid-glass-menu${open ? " is-open" : ""}`}
          data-glass-menu={streamlined ? "compact" : "standard"}
          aria-label={streamlined ? "Main navigation" : "Mobile navigation"}
          aria-hidden={!open}
          ref={(element) => { if (element) element.inert = !open; }}
        >
          <div className="liquid-glass-items">
            {navigation.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                aria-current={router.pathname === link.href ? "page" : undefined}
                onClick={() => setMenu("closed")}
              >
                {link.label}
              </Link>
            ))}
            <Link href={user ? "/dashboard" : "/auth/login"} onClick={() => setMenu("closed")}>
              {user ? "Dashboard" : "Log in"}
            </Link>
            {inlineGuide && (
              <button type="button" onClick={() => {
                setMenu("closed");
                menuRef.current?.focus();
                notifyGuide({ kind: "guide" });
              }}>Guide</button>
            )}
            {motionControl && (
              <button type="button" className="nav-motion-toggle" onClick={motionControl.toggle}>
                {motionControl.paused ? "Resume ambient motion" : "Pause ambient motion"}
              </button>
            )}
            <Link href="/download" className={streamlined ? undefined : "mobile-download"} aria-current={router.pathname === "/download" ? "page" : undefined} onClick={() => setMenu("closed")}>
              {streamlined ? "Downloads" : "Get Aetheria"}
            </Link>
            {user && <button onClick={() => void signOut()}>Sign out</button>}
          </div>
        </nav>
      </div>
      {authError && (
        <p className="auth-error" role="alert">
          {authError}
        </p>
      )}
    </header>
  );
}
