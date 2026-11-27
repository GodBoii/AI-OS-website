import React, { useEffect, useRef } from "react";
import { AppProps } from "next/app";
import { Outfit, DM_Sans, Instrument_Serif } from "next/font/google";
import "../styles/globals.css";
import "../styles/studio.css";
import "../styles/experience.css";
import "../pets/aetheria/animations.css";
import "../styles/pet-companion.css";
import "../styles/liquid-glass.css";
import { MotionConfig } from "framer-motion";
import Companion from "../components/experience/Companion";
import CookiePreferences from "../components/CookiePreferences";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  adjustFontFallback: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedColors = window.matchMedia("(forced-colors: active)");
    let controller: AbortController | null = null;

    function syncGlass() {
      controller?.abort();
      const surface = root.current;
      if (!surface || reducedMotion.matches || forcedColors.matches || !navigator.gpu) return;
      controller = new AbortController();
      const { signal } = controller;
      void import("../lib/liquidGlass")
        .then(({ mountLiquidGlass }) => {
          if (!signal.aborted) return mountLiquidGlass(surface, signal);
        })
        .catch(() => {});
    }

    syncGlass();
    reducedMotion.addEventListener("change", syncGlass);
    forcedColors.addEventListener("change", syncGlass);
    return () => {
      controller?.abort();
      reducedMotion.removeEventListener("change", syncGlass);
      forcedColors.removeEventListener("change", syncGlass);
    };
  }, []);

  return (
    <div
      ref={root}
      className={`${display.variable} ${body.variable} ${serif.variable} site-root`}
    >
      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
        <Companion />
        <CookiePreferences />
      </MotionConfig>
    </div>
  );
}

export default MyApp;
