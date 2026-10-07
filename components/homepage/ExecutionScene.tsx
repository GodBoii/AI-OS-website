import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Code2,
  Mail,
  Search,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

const workflows = [
  {
    id: "build",
    name: "Build something",
    icon: Code2,
    prompt: "Build a personal portfolio. Make it feel like me.",
    agent: "Builder agent",
    steps: [
      "Map out the pages and visual direction",
      "Write the components and responsive styles",
      "Prepare a preview for your review",
    ],
    result: "Your next idea, ready for its first preview.",
    file: "portfolio / preview.tsx",
    lines: [
      "export default function Portfolio() {",
      "  return (",
      '    <main className="your-next-big-thing">',
      '      <Intro name="You" />',
      "      <SelectedWork />",
      "      <LetsTalk />",
      "    </main>",
      "  );",
      "}",
    ],
  },
  {
    id: "research",
    name: "Connect the dots",
    icon: Search,
    prompt: "Research my competitors. Find the gaps worth building for.",
    agent: "Research agent",
    steps: [
      "Find the relevant products and sources",
      "Compare capabilities and positioning",
      "Organize the findings into a brief",
    ],
    result: "The useful bits, with sources attached.",
    file: "research / opportunity-brief.md",
    lines: [
      "# Find your opening",
      "",
      "01  Map the alternatives",
      "02  Compare what they actually do",
      "03  Trace every claim to its source",
      "",
      "## The deliverable",
      "A research brief you can act on.",
      "Your next move is yours.",
    ],
  },
  {
    id: "organize",
    name: "Clear the busywork",
    icon: Mail,
    prompt: "Sort my project updates and draft a weekly summary.",
    agent: "Workspace agent",
    steps: [
      "Collect updates from connected tools",
      "Group decisions, blockers, and next steps",
      "Draft the summary for your approval",
    ],
    result: "A weekly update, ready for your final say.",
    file: "workspace / weekly-update.md",
    lines: [
      "# This week, in one place",
      "",
      "## Decisions made",
      "The context behind the next steps.",
      "",
      "## Needs your attention",
      "Blockers, owners, and open questions.",
      "",
      "Draft only. You decide when to send.",
    ],
  },
];
export default function ExecutionScene() {
  const [selected, setSelected] = useState(workflows[0]);
  const [playback, setPlayback] = useState<
    { kind: "idle" } | { kind: "playing"; step: number } | { kind: "complete" }
  >({ kind: "idle" });
  const reduced = useReducedMotion();
  const ran = playback.kind === "complete";
  useEffect(() => {
    if (playback.kind !== "playing") return;
    const timer = setTimeout(
      () =>
        setPlayback(
          playback.step >= 3
            ? { kind: "complete" }
            : { kind: "playing", step: playback.step + 1 },
        ),
      450,
    );
    return () => clearTimeout(timer);
  }, [playback]);
  return (
    <section id="playground" className="playground section-pad">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A THOUGHT. A PLAN. A FIRST STEP.</span>
          <h2>
            Less explaining.
            <br />
            More <span className="serif-word">making it happen.</span>
          </h2>
        </div>
        <p>
          Code, research, daily work.
          <br />
          One place to set things in motion.
          <br />
          <span className="demo-note">
            Try an interactive workflow preview below.
          </span>
        </p>
      </div>
      <div className="workflow-switch" aria-label="Choose a workflow">
        {workflows.map((flow) => (
          <button
            key={flow.id}
            aria-pressed={selected.id === flow.id}
            onClick={() => {
              setSelected(flow);
              setPlayback({ kind: "idle" });
            }}
          >
            <flow.icon size={18} />
            {flow.name}
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
      <div className="workbench">
        <div className="workbench-command">
          <div className="bench-label">
            <span className="status-dot" /> AETHERIA / WORKFLOW PREVIEW{" "}
            <span>↗</span>
          </div>
          <div className="prompt-bubble">
            <span className="eyebrow">YOUR IDEA</span>
            <p>{selected.prompt}</p>
          </div>
          <div className="agent-heading">
            <span className="agent-avatar">a</span>
            <div>
              {selected.agent}
              <small>
                {ran
                  ? "Preview complete"
                  : playback.kind === "playing"
                    ? "Playing the workflow example"
                    : "Ready when you are"}
              </small>
            </div>
            <span className="agent-status">
              {ran
                ? "COMPLETE"
                : playback.kind === "playing"
                  ? "PREVIEW"
                  : "READY"}
            </span>
          </div>
          <ol className="workflow-steps">
            {selected.steps.map((step, i) => (
              <li key={step}>
                <span
                  className={
                    ran || (playback.kind === "playing" && playback.step > i)
                      ? "step-check checked"
                      : "step-check"
                  }
                >
                  {ran || (playback.kind === "playing" && playback.step > i) ? (
                    <Check size={13} />
                  ) : (
                    `0${i + 1}`
                  )}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <button
            className="run-button"
            disabled={playback.kind === "playing"}
            onClick={() =>
              setPlayback(
                ran
                  ? { kind: "idle" }
                  : reduced
                    ? { kind: "complete" }
                    : { kind: "playing", step: 0 },
              )
            }
          >
            {ran
              ? "Reset preview"
              : playback.kind === "playing"
                ? "Playing preview…"
                : "Run this preview"}
            {ran ? <RotateCcw size={17} /> : <ArrowRight size={19} />}
          </button>
        </div>
        <div className="workbench-output">
          <div className="output-toolbar">
            <span>
              <Code2 size={15} /> {selected.file}
            </span>
            <span className="preview-badge">
              {ran ? "OUTPUT READY" : "EXAMPLE OUTPUT"}
            </span>
          </div>
          <div className="code-preview">
            {selected.lines.map((line, i) => (
              <div key={`${selected.id}-${i}`}>
                <span>{i + 1}</span>
                <code>{line || " "}</code>
              </div>
            ))}
          </div>
          <div
            className={ran ? "output-result complete" : "output-result"}
            aria-live="polite"
          >
            <span className="result-icon">
              {ran ? <Check size={23} /> : <Code2 size={23} />}
            </span>
            <div>
              <small>{ran ? "THAT’S THE IDEA." : "YOUR IDEA GOES HERE."}</small>
              <p>
                {ran
                  ? selected.result
                  : "A little direction. A lot of possibility."}
              </p>
            </div>
            <ArrowUpRight size={22} />
          </div>
        </div>
      </div>
      <div className="section-footnote">
        <span>ILLUSTRATIVE PREVIEW. REAL WORK HAPPENS IN THE APP.</span>
        <Link href="/for-you">
          Explore the possibilities <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
