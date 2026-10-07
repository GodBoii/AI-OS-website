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
  Download,
  Play,
} from "lucide-react";
import Link from "next/link";

type WorkflowId = "build" | "research" | "organize";
type Workflow = {
  id: WorkflowId;
  name: string;
  icon: typeof Code2;
  prompt: string;
  agent: string;
  steps: string[];
  result: string;
  file: string;
  lines: string[];
};

const workflows: Workflow[] = [
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
  const [showSource, setShowSource] = useState(false);
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
    <section
      id="playground"
      className="playground studio-section"
      aria-labelledby="playground-title"
    >
      <div className="studio-section-top">
        <span className="studio-label">02 / The test drive</span>
        <span>An example you can actually try</span>
      </div>
      <div className="section-heading studio-heading">
        <div>
          <h2 id="playground-title">
            A LITTLE DIRECTION.
            <br />
            <span>A LOT OF POSSIBILITY.</span>
          </h2>
        </div>
        <p>
          Pick a task. Run the example.
          <br />
          See how a thought becomes a draft.
          <br />
          <span className="demo-note">
            This is a local demo of the workflow.
          </span>
        </p>
      </div>
      <div className="workflow-switch" aria-label="Choose a workflow">
        {workflows.map((flow) => (
          <button
            key={flow.id}
            type="button"
            aria-pressed={selected.id === flow.id}
            onClick={() => {
              setSelected(flow);
              setPlayback({ kind: "idle" });
              setShowSource(false);
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
            <span className="agent-avatar">
              <img src="/icon.png" alt="" width={28} height={28} />
            </span>
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
            type="button"
            className="run-button"
            disabled={playback.kind === "playing"}
            onClick={() => {
              setShowSource(false);
              setPlayback(
                ran
                  ? { kind: "idle" }
                  : reduced
                    ? { kind: "complete" }
                    : { kind: "playing", step: 0 },
              );
            }}
          >
            {ran
              ? "Reset preview"
              : playback.kind === "playing"
                ? "Playing preview…"
                : "Run the example"}
            {ran ? <RotateCcw size={17} /> : <Play size={17} />}
          </button>
        </div>
        <div
          className="workbench-output"
          aria-busy={playback.kind === "playing"}
        >
          <div className="output-toolbar">
            <span>
              <Code2 size={15} /> {selected.file}
            </span>
            <span className="preview-badge">
              {ran ? "DRAFT READY" : "EXAMPLE OUTPUT"}
            </span>
          </div>
          {ran ? (
            <>
              <div className="draft-toolbar">
                <span>Illustrative draft</span>
                <button
                  type="button"
                  aria-pressed={showSource}
                  onClick={() => setShowSource(!showSource)}
                >
                  {showSource ? "View preview" : "View source"}
                  <Code2 size={14} />
                </button>
              </div>
              {showSource ? (
                <div className="code-preview">
                  {selected.lines.map((line, i) => (
                    <div key={`${selected.id}-${i}`}>
                      <span>{i + 1}</span>
                      <code>{line || " "}</code>
                    </div>
                  ))}
                </div>
              ) : (
                <SampleDraft kind={selected.id} />
              )}
            </>
          ) : (
            <div className="draft-empty">
              <span className="draft-cross" aria-hidden="true">
                ↗
              </span>
              <h3>
                {playback.kind === "playing"
                  ? "Putting the pieces together."
                  : "The next move is yours."}
              </h3>
              <p>
                {playback.kind === "playing"
                  ? "Follow the steps as the example prepares a draft."
                  : "Choose a workflow and run the example to see its draft here."}
              </p>
              <span className="draft-rule" aria-hidden="true" />
            </div>
          )}
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
            {ran && (
              <a
                className="save-example"
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(selected.lines.join("\n"))}`}
                download={selected.file.split(" / ").pop()}
                aria-label="Save the example source"
              >
                <Download size={20} />
              </a>
            )}
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

function SampleDraft({ kind }: { kind: WorkflowId }) {
  if (kind === "build")
    return (
      <div className="sample-portfolio">
        <div className="sample-nav">
          Alex Morgan <span>Independent designer ↗</span>
        </div>
        <span className="sample-caption">Selected work / 2026</span>
        <h3>
          Good ideas.
          <br />
          <em>Made tangible.</em>
        </h3>
        <div className="sample-projects">
          <span>
            01 / Identity systems
            <i>
              FORM
              <br />& FEEL
            </i>
          </span>
          <span>
            02 / Digital experiences
            <i>
              OPEN
              <br />
              STUDIO ↗
            </i>
          </span>
        </div>
        <p>Portfolio example. Your actual project starts in the app.</p>
      </div>
    );
  if (kind === "research")
    return (
      <div className="sample-document">
        <span className="sample-caption">
          Research brief / Example structure
        </span>
        <h3>
          Find your
          <br />
          <em>opening.</em>
        </h3>
        <p>
          A useful comparison starts with the same questions for every product.
        </p>
        <div className="sample-doc-row">
          <span>01</span>
          <div>
            Map the alternatives
            <small>Audience, product, and core workflow</small>
          </div>
        </div>
        <div className="sample-doc-row">
          <span>02</span>
          <div>
            Compare the real capabilities
            <small>What works, what's missing, and the evidence</small>
          </div>
        </div>
        <div className="sample-doc-row">
          <span>03</span>
          <div>
            Trace every claim<small>Source links beside each finding</small>
          </div>
        </div>
        <span className="sample-caption">
          An outline, ready for your research.
        </span>
      </div>
    );
  return (
    <div className="sample-document">
      <span className="sample-caption">Weekly update / Example structure</span>
      <h3>
        Everyone on
        <br />
        <em>the same page.</em>
      </h3>
      <p>A place for the decisions and loose ends that matter.</p>
      <div className="sample-doc-row">
        <Check size={17} />
        <div>
          Decisions made<small>What changed and the context behind it</small>
        </div>
      </div>
      <div className="sample-doc-row">
        <ArrowRight size={17} />
        <div>
          Needs your attention
          <small>Blockers, owners, and open questions</small>
        </div>
      </div>
      <div className="sample-doc-row">
        <Mail size={17} />
        <div>
          Ready for your review<small>You decide what to send and when</small>
        </div>
      </div>
      <span className="sample-caption">Draft only. Nothing is sent.</span>
    </div>
  );
}
