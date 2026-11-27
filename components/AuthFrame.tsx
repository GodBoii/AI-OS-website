import type { ReactNode } from "react";
import Link from "next/link";
import { notifyGuide } from "../lib/experience";
import { COOKIE_SETTINGS_EVENT } from "./CookiePreferences";
import StarMark from "./experience/StarMark";
import { OrbitArtwork } from "./SurfaceIntro";
import styles from "../styles/surface.module.css";

const sectionNames = {
  login: "Account access",
  signup: "Account access",
  recovery: "Password recovery",
  session: "Account session",
};

export default function AuthFrame({ children, mode }: {
  children: ReactNode;
  mode: keyof typeof sectionNames;
}) {
  return (
    <main id="main-content" tabIndex={-1} className={styles.authShell}>
      <div className={styles.authBody}>
        <Link href="/" className={styles.authBrand} aria-label="Aetheria AI home">
          <StarMark /> aetheria
        </Link>
        <div className={styles.authContent}>
          <p className={styles.surfaceLabel}>{sectionNames[mode]}</p>
          {children}
        </div>
        <nav className={styles.authLegal} aria-label="Policies">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <button type="button" onClick={(event) => {
            event.currentTarget.focus();
            window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
          }}>Cookie settings</button>
          <button type="button" onClick={(event) => {
            event.currentTarget.focus();
            notifyGuide({ kind: "guide" });
          }}>Guide</button>
        </nav>
      </div>
      <div className={styles.authBackdrop} aria-hidden="true">
        <OrbitArtwork />
      </div>
    </main>
  );
}
