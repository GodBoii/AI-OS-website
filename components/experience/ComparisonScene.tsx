import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { SiAnthropic, SiGooglegemini, SiOpenai } from "react-icons/si";
import StarMark from "./StarMark";

const competitors = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: SiOpenai,
    strength: "Explore an idea. Research it. Use connected tools.",
    detail:
      "ChatGPT supports browser actions and connected tools. The available workflow depends on your product, plan, and setup.",
    source: "https://learn.chatgpt.com/docs/chrome-extension",
    label: "ChatGPT browser capabilities",
  },
  {
    id: "claude",
    name: "Claude",
    icon: SiAnthropic,
    strength: "Write, reason, and work with connected context.",
    detail:
      "Claude can retrieve information and take actions through connectors, including desktop extensions. Availability depends on the setup.",
    source:
      "https://academy.claude.com/tutorials/connect-your-tools-to-unlock-a-smarter-more-capable-ai-companion",
    label: "Claude connected tools",
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: SiGooglegemini,
    strength: "Find answers and act through connected apps.",
    detail:
      "Gemini can use connected apps for information and actions. Supported apps vary by account, location, language, and device.",
    source: "https://support.google.com/gemini/answer/13695044?hl=en",
    label: "Gemini connected apps",
  },
];

export default function ComparisonScene() {
  const [selected, setSelected] = useState("chatgpt");
  const competitor =
    competitors.find((item) => item.id === selected) ?? competitors[0];
  const Icon = competitor.icon;
  return (
    <section
      className="comparison-scene exp-section"
      id="compare"
      aria-labelledby="compare-title"
    >
      <div className="exp-section-heading">
        <div>
          <span className="exp-kicker">
            You know the names. Meet the workspace.
          </span>
          <h2 id="compare-title">
            Different tools.
            <br />
            <em>Different ways in.</em>
          </h2>
        </div>
        <p>
          Good assistants can do a lot.
          <br />
          Here’s how Aetheria brings the work together.
        </p>
      </div>
      <div
        className="comparison-tabs"
        aria-label="Choose an assistant to explore"
      >
        {competitors.map((item) => {
          const Brand = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === item.id}
              onClick={() => setSelected(item.id)}
            >
              <Brand size={17} />
              {item.name}
            </button>
          );
        })}
      </div>
      <div className="comparison-layout">
        <article className="competitor-panel">
          <div className="compare-brand">
            <Icon size={28} />
            <h3>{competitor.name}</h3>
            <a
              href={competitor.source}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={"Read " + competitor.label}
            >
              <ArrowUpRight size={18} />
            </a>
          </div>
          <p className="competitor-strength">{competitor.strength}</p>
          <div className="assistant-chat-art" aria-hidden="true">
            <div>Help me move this project forward.</div>
            <span>
              <Icon size={18} />
              <i />
              <i />
              <i />
            </span>
          </div>
          <p className="competitor-detail">{competitor.detail}</p>
          <a
            className="compare-source"
            href={competitor.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            See the documented capabilities <ArrowUpRight size={13} />
          </a>
        </article>
        <article className="aetheria-panel">
          <div className="compare-brand">
            <StarMark />
            <h3>Aetheria</h3>
            <span>Your work, in one place.</span>
          </div>
          <p className="aetheria-strength">
            A conversation with
            <br />
            <em>somewhere to go.</em>
          </p>
          <div className="compare-flow">
            <div>
              <span>Conversation</span>
              <span>Bring the idea</span>
            </div>
            <ChevronRight size={16} />
            <div>
              <span>Code & tools</span>
              <span>Work through it</span>
            </div>
            <ChevronRight size={16} />
            <div>
              <span>Computer</span>
              <span>Direct the next step</span>
            </div>
          </div>
          <div className="compare-artifact">
            <span>
              <Check size={14} /> Keep the result with the work.
            </span>
            <ArrowDown size={16} />
          </div>
          <Link className="exp-text-link" href="/for-you">
            Explore Aetheria’s workflows <ArrowUpRight size={16} />
          </Link>
        </article>
      </div>
      <p className="comparison-note">
        A comparison of product approaches, not a benchmark. Illustrative
        interfaces. Competitor capabilities checked October 12, 2026. Features
        vary by product and setup.
      </p>
    </section>
  );
}
