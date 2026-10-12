import React from "react";
import { AppProps } from "next/app";
import { Outfit, DM_Sans, Instrument_Serif } from "next/font/google";
import "../styles/globals.css";
import "../styles/studio.css";
import "../styles/experience.css";
import { MotionConfig } from "framer-motion";

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
  return (
    <div
      className={`${display.variable} ${body.variable} ${serif.variable} site-root`}
    >
      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
      </MotionConfig>
    </div>
  );
}

export default MyApp;
