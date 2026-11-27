import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import StarMark from "./experience/StarMark";
import styles from "../styles/surface.module.css";

const cookieName = "aetheria_consent_v1";
const publicPages = new Set(["/", "/download", "/pricing"]);
const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((module) => module.SpeedInsights), { ssr: false });
type Choice = "essential" | "performance";
export const COOKIE_SETTINGS_EVENT = "aetheria:cookie-settings";

function readChoice(): Choice | null {
  const value = document.cookie.split(/;\s*/).find((part) => part.startsWith(cookieName + "="))?.split("=")[1];
  return value === "essential" || value === "performance" ? value : null;
}

export default function CookiePreferences() {
  const { pathname } = useRouter();
  const [choice, setChoice] = useState<Choice | null | undefined>();
  const [performance, setPerformance] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    if (!dialog.current || dialog.current.open) return;
    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPerformance(readChoice() === "performance");
    dialog.current.showModal();
    heading.current?.focus();
  }, []);

  useEffect(() => {
    setChoice(readChoice());
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, [open]);

  function restoreFocus() {
    const opener = trigger.current;
    trigger.current = null;
    if (opener?.isConnected) opener.focus();
    else if (opener) document.getElementById("main-content")?.focus();
  }

  function save(value: Choice) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${cookieName}=${value}; Max-Age=15552000; Path=/; SameSite=Lax${secure}`;
    setChoice(value);
    dialog.current?.close();
  }

  const collect = choice === "performance" && publicPages.has(pathname) &&
    window.location.hostname === "aetheriaai.online";

  return (
    <>
      {collect && <SpeedInsights
        sampleRate={0.25}
        scriptSrc="/_vercel/speed-insights/script.js"
        beforeSend={(event) => {
          if (readChoice() !== "performance" || !publicPages.has(window.location.pathname)) return null;
          const url = new URL(event.url, window.location.origin);
          if (url.origin !== window.location.origin || !publicPages.has(url.pathname)) return null;
          return { ...event, route: url.pathname, url: url.origin + url.pathname };
        }}
      />}
      {choice === null && (
        <section className={styles.cookies} aria-labelledby="cookie-notice-heading">
          <div className={styles.cookieHeading}><StarMark /><h2 id="cookie-notice-heading">Cookies on Aetheria</h2></div>
          <p>Essential storage keeps sign-in working. With your permission, we measure how quickly public pages load.</p>
          <div className={styles.cookieActions}>
            <button type="button" className={styles.action} onClick={() => save("performance")}>Accept performance</button>
            <button type="button" className={styles.textLink} onClick={() => save("essential")}>Essential only</button>
            <button type="button" className={styles.textLink} onClick={(event) => {
              event.currentTarget.focus();
              open();
            }}>Settings</button>
          </div>
        </section>
      )}
      <dialog ref={dialog} className={styles.cookieDialog} aria-labelledby="cookie-settings-heading" onClose={restoreFocus}>
        <div className={styles.cookieHeading}>
          <StarMark />
          <h2 ref={heading} tabIndex={-1} id="cookie-settings-heading">Cookie settings</h2>
          <button type="button" className={styles.iconButton} onClick={() => dialog.current?.close()} aria-label="Close cookie settings"><X size={20} aria-hidden="true" /></button>
        </div>
        <p>Choose whether Aetheria can measure website performance.</p>
        <div className={styles.cookieOptions}>
          <div>
            <p><strong>Essential storage</strong><span>Supports sign-in and remembers your choice.</span></p>
            <span>Always active</span>
          </div>
          <label>
            <span><strong>Performance measurement</strong><span>Measures how quickly public pages load and respond.</span></span>
            <input type="checkbox" checked={performance} onChange={(event) => setPerformance(event.target.checked)} aria-label="Performance measurement" />
          </label>
        </div>
        <div className={styles.cookieActions}>
          <button type="button" className={styles.action} onClick={() => save(performance ? "performance" : "essential")}>Save preferences</button>
          <Link href="/privacy-policy" className={styles.textLink} onClick={() => dialog.current?.close()}>Privacy policy</Link>
        </div>
      </dialog>
    </>
  );
}
