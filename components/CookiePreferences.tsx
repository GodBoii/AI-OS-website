import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
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
  const [editing, setEditing] = useState(false);
  const [performance, setPerformance] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setChoice(readChoice());
    function open() {
      trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setPerformance(readChoice() === "performance");
      setEditing(true);
    }
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    if (editing) heading.current?.focus();
  }, [editing]);

  function close() {
    setEditing(false);
    trigger.current?.focus();
    trigger.current = null;
  }

  function save(value: Choice) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${cookieName}=${value}; Max-Age=15552000; Path=/; SameSite=Lax${secure}`;
    setChoice(value);
    close();
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
      {(choice === null || editing) && (
        <section className={styles.cookies} aria-labelledby="cookie-heading" onKeyDown={(event) => {
          if (event.key === "Escape" && editing) close();
        }}>
          <h2 ref={heading} tabIndex={-1} id="cookie-heading">Cookie preferences</h2>
          <p>Essential storage keeps sign-in working and remembers your choice. Optional performance measurement helps us see how quickly public pages load.</p>
          {editing ? (
            <div className={styles.cookieOptions}>
              <p><strong>Essential</strong><span>Always active</span></p>
              <label><span>Performance measurement</span><input type="checkbox" checked={performance} onChange={(event) => setPerformance(event.target.checked)} /></label>
            </div>
          ) : null}
          <div className={styles.cookieActions}>
            {editing ? (
              <button type="button" className={styles.action} onClick={() => save(performance ? "performance" : "essential")}>Save preferences</button>
            ) : (
              <>
                <button type="button" className={styles.action} onClick={() => save("performance")}>Accept performance</button>
                <button type="button" className={styles.textLink} onClick={() => save("essential")}>Essential only</button>
              </>
            )}
            <button type="button" className={styles.textLink} onClick={editing ? close : () => setEditing(true)}>{editing ? "Close" : "Settings"}</button>
            <Link href="/privacy-policy" className={styles.textLink}>Privacy</Link>
          </div>
        </section>
      )}
    </>
  );
}
