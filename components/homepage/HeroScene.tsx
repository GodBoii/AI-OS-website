import dynamic from "next/dynamic";
import Link from "next/link";
import { CircleHelp, PanelsTopLeft } from "lucide-react";
import StarMark from "../experience/StarMark";
import { notifyGuide } from "../../lib/experience";

const StarSculpture = dynamic(() => import("../experience/StarSculpture"), {
  ssr: false,
  loading: () => (
    <div className="star-sculpture">
      <StarMark className="star-fallback" />
    </div>
  ),
});

export default function HeroScene() {
  return (
    <section className="exp-hero" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span>
          <i /> Your ideas have places to go.
        </span>
        <button type="button" onClick={() => notifyGuide({ kind: "guide" })}>
          A little help? <CircleHelp size={13} aria-hidden="true" />
        </button>
      </div>
      <div className="hero-stage">
        <div className="hero-message">
          <h1 id="hero-title">
            Less talk.
            <br />
            <em>More doing.</em>
          </h1>
          <p>
            Your next idea deserves more than a chat box.
            <br className="desktop-break" /> Meet the workspace that puts it in
            motion.
          </p>
          <div className="exp-actions">
            <Link className="exp-button" href="/download">
              Get Aetheria
            </Link>
            <a className="exp-text-link" href="#workspaces">Explore the workspace</a>
          </div>
          <div className="hero-platforms">
            Windows <span aria-hidden="true">·</span> Linux{" "}
            <span aria-hidden="true">·</span> Android
          </div>
        </div>
        <div className="hero-object">
          <StarSculpture />
          <div className="object-caption">
            <span>Aetheria, in another dimension.</span>
            <span>Human direction. Agent execution.</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#workspaces">
          <PanelsTopLeft size={15} aria-hidden="true" /> See the workspace
        </a>
        <span>
          Conversation. Code. Computer.
          <span className="hero-bottom-dot" />
        </span>
      </div>
    </section>
  );
}
