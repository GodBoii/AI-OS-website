import type { ReactNode } from "react";
import StarMark from "./experience/StarMark";
import styles from "../styles/surface.module.css";

export function OrbitArtwork({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.orbitArtwork} ${className}`} aria-hidden="true">
      <StarMark />
    </div>
  );
}

export default function SurfaceIntro({ children }: { children: ReactNode }) {
  return (
    <header className={styles.editorialIntro}>
      <div className={styles.intro}>{children}</div>
      <OrbitArtwork className={styles.editorialArtwork} />
    </header>
  );
}
