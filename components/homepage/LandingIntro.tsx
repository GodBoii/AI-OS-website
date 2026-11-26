import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import styles from "../../styles/constellation.module.css";

const wordmark = ["Aetheria", "AI"];
const countDuration = 1050;
const readinessDeadline = 2300;
const exitDeadline = 1200;
let introPlayed = false;

export default function LandingIntro({
  content,
  artReady,
}: {
  content: RefObject<HTMLDivElement>;
  artReady: boolean;
}) {
  const [stage, setStage] = useState<"counting" | "falling" | "done">(() =>
    introPlayed ? "done" : "counting",
  );
  const ready = useRef(artReady);
  const number = useRef<HTMLSpanElement>(null);
  const indicator = useRef<HTMLDivElement>(null);

  useEffect(() => { ready.current = artReady; }, [artReady]);

  const finish = useCallback(() => {
    introPlayed = true;
    setStage("done");
  }, []);

  useEffect(() => {
    if (stage !== "falling") return;
    const timeout = window.setTimeout(finish, exitDeadline);
    return () => window.clearTimeout(timeout);
  }, [finish, stage]);

  useEffect(() => {
    const page = content.current;
    if (!page || stage !== "counting") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (window.location.hash || reduced.matches) {
      setStage("done");
      return;
    }

    let frame = 0;
    let fontsReady = document.fonts.status === "loaded";
    const startedAt = performance.now();
    void document.fonts.ready.then(() => { fontsReady = true; });

    function tick(now: number) {
      const elapsed = now - startedAt;
      const timedOut = elapsed >= readinessDeadline;
      const canReveal = timedOut || (fontsReady && ready.current);
      const ceiling = canReveal ? 100 : 94;
      const progress = Math.min(ceiling, Math.floor(elapsed / countDuration * 100));
      if (number.current) number.current.textContent = String(progress);
      if (indicator.current) indicator.current.style.setProperty("--intro-progress", String(progress / 100));
      if (progress === 100) {
        setStage("falling");
        return;
      }
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [content, stage]);

  const blocking = stage !== "done";

  useEffect(() => {
    const page = content.current;
    if (!page || !blocking) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (window.location.hash || reduced.matches) return;

    const scrollRoot = document.documentElement;
    const previousOverflow = scrollRoot.style.overflow;
    page.inert = true;
    scrollRoot.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") finish();
    }
    function onPreferenceChange() {
      if (reduced.matches) finish();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", finish);
    reduced.addEventListener("change", onPreferenceChange);
    return () => {
      page.inert = false;
      scrollRoot.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", finish);
      reduced.removeEventListener("change", onPreferenceChange);
    };
  }, [blocking, content, finish]);

  if (!blocking) return null;

  return (
    <div className={styles.intro} data-intro={stage} role="status" onAnimationEnd={(event) => {
      if (stage !== "falling" || event.target !== event.currentTarget) return;
      finish();
    }}>
      <span className="sr-only">Loading Aetheria AI</span>
      <div className={styles.introLockup} aria-hidden="true">
        <div className={styles.introWordmark}>
          {wordmark.map((word, wordIndex) => (
            <span className={styles.introWord} key={word}>
              {word.split("").map((letter, index) => (
                <span key={index} style={{ animationDelay: `${(index + (wordIndex ? wordmark[0].length : 0)) * 45}ms` }}>
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className={styles.introProgress} ref={indicator}>
          <span className={styles.introRail} />
          <span><span ref={number}>0</span>%</span>
        </div>
      </div>
    </div>
  );
}
