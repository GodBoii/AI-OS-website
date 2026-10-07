import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Monitor,
  MessageSquare,
  Play,
  CornerDownLeft,
} from "lucide-react";

const views = [
  {
    id: "conversation",
    label: "Conversation",
    icon: MessageSquare,
    image: "/home-page.png",
    title: "Start with what you have in mind.",
    description:
      "Think out loud. Keep your projects and conversations together.",
  },
  {
    id: "code",
    label: "Code workspace",
    icon: Code2,
    image: "/coding-worspace.png",
    title: "Go from conversation to code.",
    description:
      "Bring the repository, terminal, and deployment into your workspace.",
  },
  {
    id: "computer",
    label: "Computer workspace",
    icon: Monitor,
    image: "/computer-workspace.png",
    title: "Put your computer in the loop.",
    description:
      "Choose the scope and permissions for work across your desktop.",
  },
];

export default function HeroScene() {
  const [view, setView] = useState(views[0]);
  const reduced = useReducedMotion();
  return (
    <section className="cinema-hero" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="horizon-light" />
        <span className="star-point star-a" />
        <span className="star-point star-b" />
        <span className="star-point star-c" />
      </div>
      <div className="cinema-hero-content">
        <span className="product-kicker">
          <span /> THE AI OPERATING SYSTEM
        </span>
        <motion.h1
          id="hero-title"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        >
          A little less artificial.
          <br />A lot more <span>capable.</span>
        </motion.h1>
        <p>
          Aetheria connects your ideas to your computer.
          <br />
          One workspace to think, build, and get things done.
        </p>
        <div className="cinema-hero-actions">
          <Link href="/download" className="stellar-button">
            Get Aetheria <ArrowUpRight size={18} />
          </Link>
          <a href="#playground" className="watch-button">
            <span>
              <Play size={11} fill="currentColor" />
            </span>
            Explore it in action
          </a>
        </div>
        <span className="hero-availability">
          Windows, Linux & Android <span>·</span> Start with the free plan
        </span>
      </div>
      <div className="product-theatre">
        <div className="theatre-topbar">
          <div>
            <img src="/icon.png" width={22} height={22} alt="" />
            <span>Aetheria</span>
            <span className="theatre-context">Your workspace</span>
          </div>
          <span className="theatre-caption">ACTUAL APP / INTERACTIVE TOUR</span>
          <span className="theatre-window-controls" aria-hidden="true">
            − &nbsp; □ &nbsp; ×
          </span>
        </div>
        <div className="theatre-display">
          <img
            key={view.id}
            className="theatre-screenshot"
            src={view.image}
            width={1920}
            height={1080}
            alt={`Aetheria ${view.label.toLowerCase()} screenshot`}
            decoding="async"
          />
          <div className="theatre-caption-panel" aria-live="polite">
            <span className="caption-star">
              <img src="/icon.png" width={35} height={35} alt="" />
            </span>
            <div>
              <h2>{view.title}</h2>
              <p>{view.description}</p>
            </div>
            <a href="#playground" aria-label="Try a workflow example">
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
        <div className="theatre-bottom">
          <div
            className="theatre-switch"
            aria-label="Choose a workspace preview"
          >
            {views.map((item) => (
              <button
                key={item.id}
                aria-pressed={view.id === item.id}
                onClick={() => setView(item)}
              >
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
          </div>
          <span className="theatre-hint">
            <CornerDownLeft size={13} /> YOUR TOOLS. YOUR DIRECTION.
          </span>
        </div>
      </div>
      <div className="hero-closing">
        <span>Built for work that doesn't fit in a chat box.</span>
        <a href="#possibilities">
          See what's possible <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
