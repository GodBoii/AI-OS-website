import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import SEO from "../components/SEO";
import Header from "../components/homepage/Header";
import ConstellationStory from "../components/homepage/ConstellationStory";
import LandingIntro from "../components/homepage/LandingIntro";
import StarCursor from "../components/homepage/StarCursor";
import StarMark from "../components/experience/StarMark";
import Footer from "../components/homepage/Footer";
import styles from "../styles/constellation.module.css";
import surface from "../styles/surface.module.css";

export default function Home() {
  const page = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [artReady, setArtReady] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const onArtReady = useCallback(() => setArtReady(true), []);

  return (
    <div className={`aetheria-home experience-home ${styles.home}`} ref={page}>
      <SEO
        title="Aetheria AI | Less talk. More doing."
        description="Your computer has a new operator. Aetheria connects your tools, runs agent workflows, and turns ideas into finished work."
        schemaType="Organization"
      />
      <LandingIntro content={content} artReady={artReady} />
      <div ref={content}>
        <Header streamlined motionControl={{ paused: motionPaused, toggle: () => setMotionPaused((paused) => !paused) }} />
        <main id="main-content">
          <ConstellationStory paused={motionPaused} onReady={onArtReady} />
          <section id="get-started" className={surface.finale} aria-labelledby="download-finale" data-paused={motionPaused}>
            <StarMark />
            <h2 id="download-finale">Make it <em>yours.</em></h2>
            <p>Aetheria is available for Windows, Linux, and Android.</p>
            <div className={surface.finaleActions}>
              <Link href="/download" className={surface.action}>Choose your platform <Package size={16} aria-hidden="true" /></Link>
              <Link href="/pricing" className={surface.textLink}>See plans</Link>
            </div>
          </section>
        </main>
        <Footer compact />
      </div>
      <StarCursor page={page} />
    </div>
  );
}
