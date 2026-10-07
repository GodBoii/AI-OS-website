import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroScene() {
  const reduced = useReducedMotion();
  return (
    <section className="operator-hero" aria-labelledby="hero-title">
      <div className="hero-edition">
        <span>
          <span className="studio-dot" /> A new kind of computer companion
        </span>
        <span>Meet Aetheria AI ↗</span>
      </div>
      <div className="operator-composition">
        <div className="operator-copy">
          <span className="studio-label">Think it. Direct it. Do it.</span>
          <motion.h1
            id="hero-title"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5 }}
          >
            BIG IDEAS.
            <br />
            <span>REAL MOVES.</span>
          </motion.h1>
          <p>
            Give your ideas a way to act. Aetheria brings conversation, code,
            and your computer into one AI workspace.
          </p>
          <div className="operator-actions">
            <Link href="/download" className="studio-button">
              Get Aetheria <ArrowUpRight size={20} />
            </Link>
            <a href="#playground" className="studio-secondary">
              <Play size={14} fill="currentColor" /> Take it for a spin
            </a>
          </div>
          <span className="operator-availability">
            Windows / Linux / Android <span>Free plan available</span>
          </span>
        </div>
        <div className="operator-art">
          <Image
            src="/operator-hand.png"
            alt=""
            width={1122}
            height={1402}
            priority
            sizes="(max-width: 600px) 90vw, (max-width: 1000px) 50vw, 650px"
          />
          <span className="art-note">
            <span>Human direction.</span>
            <br />A little mechanical help.
          </span>
          <span className="art-index" aria-hidden="true">
            A / 01
          </span>
        </div>
      </div>
      <div className="operator-bottom">
        <a href="#possibilities">
          <ArrowDown size={17} /> Look around. Make yourself at home.
        </a>
        <span>Less switching tabs. More getting somewhere.</span>
      </div>
    </section>
  );
}
