import { useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import {
  SiGithub,
  SiGmail,
  SiGoogledrive,
  SiGooglesheets,
  SiSupabase,
  SiVercel,
} from "react-icons/si";
const tools = [
  { name: "GitHub", icon: SiGithub },
  { name: "Gmail", icon: SiGmail },
  { name: "Google Drive", icon: SiGoogledrive },
  { name: "Supabase", icon: SiSupabase },
  { name: "Sheets", icon: SiGooglesheets },
  { name: "Vercel", icon: SiVercel },
];
export default function OrchestrationScene() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="exp-connections"
      ref={ref}
      aria-labelledby="connections-title"
    >
      <div className="connections-intro exp-container">
        <div>
          <span className="exp-kicker">Bring your tools along</span>
          <h2 id="connections-title">
            Less tab-hopping.
            <br />
            <em>More connecting.</em>
          </h2>
        </div>
        <Link href="/for-you">
          Explore the connections <ArrowUpRight size={16} />
        </Link>
      </div>
      <div
        className={
          visible && !paused ? "tool-marquee is-moving" : "tool-marquee"
        }
      >
        <div className="tool-track">
          {[0, 1].map((copy) => (
            <div
              className="tool-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {tools.map((tool) => {
                const Icon = tool.icon;
                return copy === 0 ? (
                  <Link key={tool.name} href="/for-you">
                    <Icon size={32} />
                    <span>{tool.name}</span>
                    <span className="tool-separator" aria-hidden="true">
                      /
                    </span>
                  </Link>
                ) : (
                  <span className="tool-clone" key={tool.name}>
                    <Icon size={32} />
                    <span>{tool.name}</span>
                    <span className="tool-separator">/</span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="connections-bottom exp-container">
        <span>Connected tools, used with the access you grant.</span>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={
            paused
              ? "Resume tool strip animation"
              : "Pause tool strip animation"
          }
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          <span>{paused ? "Resume" : "Pause"}</span>
        </button>
      </div>
    </section>
  );
}
