import { useEffect, useRef } from "react";
import Link from "next/link";
import { CodeXml, FileCheck, PanelsTopLeft, Workflow } from "lucide-react";
import StarMark from "../experience/StarMark";
import styles from "../../styles/constellation.module.css";

export default function ConstellationStory({
  paused,
  onReady,
}: {
  paused: boolean;
  onReady: () => void;
}) {
  const story = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ambientPaused = useRef(paused);
  const refresh = useRef<() => void>();

  useEffect(() => {
    ambientPaused.current = paused;
    refresh.current?.();
  }, [paused]);

  useEffect(() => {
    const root = story.current;
    const surface = canvas.current;
    if (!root || !surface) return;
    const chapters = root.querySelectorAll<HTMLElement>("section");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 600px)");
    let width = 0;
    let height = 0;
    let workspace = 0;
    let delivery = 0;
    let frame = 0;
    let nearby = false;
    let disposed = false;
    let loading = false;
    let lastFrame = 0;
    let lastPaint = -Infinity;
    let lastOffset = -1;
    let time = 0;
    let renderer: ReturnType<typeof import("../../lib/constellation").createConstellationRenderer> = null;

    function render(now: number) {
      frame = 0;
      if (!renderer || !root || !surface || delivery <= workspace || !workspace) return;
      const offset = Math.min(delivery, Math.max(0, -root.getBoundingClientRect().top));
      if (!ambientPaused.current && lastFrame) time += Math.min(now - lastFrame, 80) / 1000;
      lastFrame = now;

      if (offset !== lastOffset || now - lastPaint >= 32) {
        const chapter = offset < workspace ? 0 : 1;
        const progress = chapter === 0 ? offset / workspace : (offset - workspace) / (delivery - workspace);
        const center = renderer.draw({ offset, chapter, progress, elapsed: time });
        if (center === null) return;
        if (offset !== lastOffset) {
          surface.style.transform = `translate3d(0, ${offset}px, 0)`;
          surface.style.setProperty("--star-light", `${center.toFixed(1)}%`);
        }
        lastOffset = offset;
        lastPaint = now;
        if (root.dataset.particles !== "active") {
          root.dataset.particles = "active";
          onReady();
        }
      }
      if (!ambientPaused.current) schedule();
    }

    function schedule() {
      if (renderer && nearby && !reducedMotion.matches && !document.hidden && !frame) {
        frame = window.requestAnimationFrame(render);
      }
    }

    function measure() {
      if (!surface) return;
      workspace = chapters[1].offsetTop;
      delivery = chapters[2].offsetTop;
      if (surface.clientWidth !== width || surface.clientHeight !== height) {
        width = surface.clientWidth;
        height = surface.clientHeight;
        renderer?.resize(width, height, compact.matches);
      }
      lastPaint = -Infinity;
      schedule();
    }

    function syncMotion() {
      if (!root || !surface) return;
      if (!nearby || reducedMotion.matches || document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        lastFrame = 0;
        if (reducedMotion.matches) {
          delete root.dataset.particles;
          onReady();
        }
        return;
      }
      if (renderer) {
        lastPaint = -Infinity;
        schedule();
        return;
      }
      if (loading) return;
      loading = true;
      void import("../../lib/constellation")
        .then(({ createConstellationRenderer }) => {
          if (disposed || reducedMotion.matches) return;
          renderer = createConstellationRenderer(surface);
          if (!renderer) onReady();
          renderer?.resize(width, height, compact.matches);
          schedule();
        })
        .catch(() => {
          if (disposed) return;
          delete root.dataset.particles;
          onReady();
        })
        .finally(() => {
          loading = false;
        });
    }

    const visibility = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      syncMotion();
    });
    const layout = new ResizeObserver(measure);
    visibility.observe(root);
    layout.observe(root);
    layout.observe(surface);
    refresh.current = () => {
      lastFrame = 0;
      schedule();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    reducedMotion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    measure();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      visibility.disconnect();
      layout.disconnect();
      window.removeEventListener("scroll", schedule);
      reducedMotion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
      refresh.current = undefined;
      delete root.dataset.particles;
    };
  }, [onReady]);

  return (
    <div className={styles.story} ref={story}>
      <canvas className={styles.canvas} ref={canvas} aria-hidden="true" />

      <section className={`${styles.chapter} ${styles.hero}`} aria-labelledby="hero-title">
        <div className={styles.fallback} aria-hidden="true"><StarMark /></div>
        <div className={styles.copy}>
          <h1 id="hero-title">Less talk.<br /><em>More doing.</em></h1>
          <p>A native AI workspace for writing code, working with files, and running desktop tasks you approve.</p>
          <div className={styles.actions}>
            <a className={styles.follow} href="#workspace-story">
              <span className={styles.followIcon}><PanelsTopLeft size={15} aria-hidden="true" /></span>
              Explore the workspace
            </a>
            <Link className={styles.secondary} href="/download">Get Aetheria</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.reverse}`} id="workspaces" aria-labelledby="workspace-story-title">
        <span id="workspace-story" className={styles.anchorAlias} aria-hidden="true" />
        <div className={styles.fallback} aria-hidden="true"><CodeXml /></div>
        <div className={styles.copy}>
          <h2 id="workspace-story-title">All your work.<br /><em>In view.</em></h2>
          <p>Keep the conversation, files, and tools together as the work moves from an idea to a result.</p>
          <Link className={styles.follow} href="/for-you">
            <span className={styles.followIcon}><Workflow size={15} aria-hidden="true" /></span>
            Explore connected tools
          </Link>
        </div>
      </section>

      <section className={styles.chapter} aria-labelledby="result-story-title">
        <div className={styles.fallback} aria-hidden="true"><FileCheck /></div>
        <div className={styles.copy}>
          <h2 id="result-story-title">Take the result<br /><em>with you.</em></h2>
          <p>Review what Aetheria made and carry it into the rest of your work.</p>
        </div>
      </section>
    </div>
  );
}
