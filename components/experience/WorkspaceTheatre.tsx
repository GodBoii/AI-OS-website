import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Code2,
  Folder,
  MessageSquare,
  Monitor,
  Terminal,
} from "lucide-react";
import StarMark from "./StarMark";

const spaces = [
  {
    id: "conversation",
    title: "Think out loud.",
    subtitle: "Conversation",
    icon: MessageSquare,
    description: "Keep the thought, the files, and the next step together.",
  },
  {
    id: "code",
    title: "Make the thing.",
    subtitle: "Code",
    icon: Code2,
    description:
      "Your project, your terminal, and your agent in one workspace.",
  },
  {
    id: "computer",
    title: "Move the work.",
    subtitle: "Computer",
    icon: Monitor,
    description: "Direct desktop tasks with scope and permission controls.",
  },
  {
    id: "context",
    title: "Connect the dots.",
    subtitle: "Tools",
    icon: Folder,
    description: "Bring connected files and tools into the conversation.",
  },
];

export default function WorkspaceTheatre() {
  const [selected, setSelected] = useState("code");
  return (
    <section
      className="workspace-theatre exp-section"
      id="workspaces"
      aria-labelledby="workspace-title"
    >
      <div className="exp-section-heading">
        <div>
          <span className="exp-kicker">Room for the whole idea</span>
          <h2 id="workspace-title">
            Many moving parts.
            <br />
            <em>One place.</em>
          </h2>
        </div>
        <p>
          Thinking, building, and doing belong together.
          <br />
          Your workspace should agree.
        </p>
      </div>
      <div className="workspace-fan" aria-label="Explore Aetheria workspaces">
        {spaces.map((space) => {
          const Icon = space.icon;
          const active = selected === space.id;
          return (
            <article
              key={space.id}
              className={
                active ? "workspace-slice is-expanded" : "workspace-slice"
              }
            >
              <button
                className="workspace-slice-trigger"
                type="button"
                aria-expanded={active}
                aria-controls={"scene-" + space.id}
                onClick={() => setSelected(space.id)}
              >
                <span>
                  <Icon size={18} />
                  {space.subtitle}
                </span>
                <ArrowUpRight size={18} />
              </button>
              <div
                className={"workspace-art art-" + space.id}
                id={"scene-" + space.id}
                aria-hidden="true"
              >
                {space.id === "conversation" ? (
                  <div className="conversation-art">
                    <div className="art-user-message">
                      What if we tried something different?
                    </div>
                    <div className="art-agent-message">
                      <StarMark />
                      <div>
                        Let's give it a shape.
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <div className="art-attached-file">
                      <Folder size={16} />
                      <span>
                        the-next-big-idea.pdf
                        <small>Added to your conversation</small>
                      </span>
                      <Check size={13} />
                    </div>
                  </div>
                ) : space.id === "code" ? (
                  <div className="code-art">
                    <div className="code-art-tabs">
                      <Code2 size={13} />
                      page.tsx<span>●</span>
                    </div>
                    <pre>
                      <span className="syntax-violet">export default</span>{" "}
                      function Idea() {"{"}
                      <br /> <span className="syntax-violet">return</span> (
                      <br /> &lt;<span className="syntax-green">main</span>&gt;
                      <br /> &lt;
                      <span className="syntax-green">SomethingNew</span> /&gt;
                      <br /> &lt;/<span className="syntax-green">main</span>&gt;
                      <br /> );
                      <br />
                      {"}"}
                    </pre>
                    <div className="code-art-terminal">
                      <Terminal size={12} />
                      <span>Build complete.</span>
                      <span>Ready to preview ↗</span>
                    </div>
                  </div>
                ) : space.id === "computer" ? (
                  <div className="computer-art">
                    <div className="desktop-window window-back">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="desktop-window window-front">
                      <div>
                        <Monitor size={14} />
                        Computer workspace
                      </div>
                      <p>
                        Your direction.
                        <br />
                        <em>A little mechanical help.</em>
                      </p>
                      <span className="permission-pill">
                        You choose the scope <Check size={12} />
                      </span>
                    </div>
                    <svg className="art-cursor" viewBox="0 0 30 36">
                      <path
                        d="M3 2L25 22L15 24L11 33Z"
                        fill="#d6f3a1"
                        stroke="#000"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="context-art">
                    <div className="context-file file-one">
                      <Folder size={17} />
                      <span>project / brief</span>
                    </div>
                    <div className="context-file file-two">
                      <Code2 size={17} />
                      <span>repo / your-idea</span>
                    </div>
                    <div className="context-file file-three">
                      <MessageSquare size={17} />
                      <span>team / updates</span>
                    </div>
                    <div className="context-center">
                      <StarMark />
                    </div>
                  </div>
                )}
              </div>
              <div className="workspace-slice-copy">
                <h3>{space.title}</h3>
                <p>{space.description}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="exp-footnote">
        <span>Art-directed illustrations of Aetheria workspaces.</span>
        <Link href="/for-you">
          Find your kind of work <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
