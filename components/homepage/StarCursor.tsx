import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import StarMark from "../experience/StarMark";
import styles from "../../styles/constellation.module.css";

const nativePointer = "input, textarea, select, iframe, video[controls], [contenteditable]:not([contenteditable='false']), [data-intro]";
const interactive = "a[href], button:not(:disabled), summary, [role='button']";

export default function StarCursor({ page }: { page: RefObject<HTMLDivElement> }) {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = page.current;
    const star = cursor.current;
    if (!root || !star) return;
    const finePointer = window.matchMedia("(any-pointer: fine) and (any-hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let hovered: HTMLElement | null = null;

    function reset() {
      if (!root || !star) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
      delete root.dataset.starCursor;
      delete star.dataset.hovering;
      delete star.dataset.pressed;
      if (hovered) delete hovered.dataset.starHover;
      hovered = null;
    }

    function draw() {
      frame = 0;
      if (!root || !star) return;
      star.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      root.dataset.starCursor = "active";
    }

    function move(event: PointerEvent) {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType !== "mouse" ||
          !(event.target instanceof Element) || event.target.closest(nativePointer)) {
        reset();
        return;
      }

      const candidate = event.target.closest(interactive);
      const next = candidate instanceof HTMLElement &&
        !candidate.closest('[aria-disabled="true"]') ? candidate : null;
      if (hovered !== next) {
        if (hovered) delete hovered.dataset.starHover;
        hovered = next;
        if (next && star) {
          next.dataset.starHover = "true";
          star.dataset.hovering = "true";
        } else if (star) {
          delete star.dataset.hovering;
        }
      }

      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(draw);
    }

    function press(event: PointerEvent) {
      if (star && hovered && event.pointerType === "mouse") star.dataset.pressed = "true";
    }

    function release() {
      if (star) delete star.dataset.pressed;
    }

    root.addEventListener("pointerover", move, { passive: true });
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", reset);
    root.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", reset);
    window.addEventListener("keydown", reset);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", reset);
    finePointer.addEventListener("change", reset);
    reducedMotion.addEventListener("change", reset);
    return () => {
      reset();
      root.removeEventListener("pointerover", move);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", reset);
      root.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", reset);
      window.removeEventListener("keydown", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", reset);
      finePointer.removeEventListener("change", reset);
      reducedMotion.removeEventListener("change", reset);
    };
  }, [page]);

  return (
    <div className={styles.starCursor} ref={cursor} aria-hidden="true">
      <div className={styles.cursorArt}>
        <StarMark />
        <span className={styles.cursorOrbit} />
      </div>
    </div>
  );
}
