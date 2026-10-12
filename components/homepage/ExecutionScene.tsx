import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  Download,
  FileText,
  Pause,
  Play,
  RotateCcw,
  Square,
  Table2,
} from "lucide-react";
import {
  cleanContacts,
  createArtifact,
  sampleContacts,
  sampleUpdates,
  workflows,
} from "../../lib/showcase";
import type { WorkflowId } from "../../lib/showcase";
import { notifyGuide } from "../../lib/experience";
import StarMark from "../experience/StarMark";

type Playback =
  | { kind: "idle" }
  | { kind: "running"; step: number }
  | { kind: "paused"; step: number }
  | { kind: "complete"; artifact: string };
const icons = { build: Code2, brief: FileText, sheet: Table2 };

export default function ExecutionScene() {
  const [workflowId, setWorkflowId] = useState<WorkflowId>("build");
  const [playback, setPlayback] = useState<Playback>({ kind: "idle" });
  const [source, setSource] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const workflow =
    workflows.find((item) => item.id === workflowId) ?? workflows[0];
  const artifact = playback.kind === "complete" ? playback.artifact : null;
  const step =
    playback.kind === "running" || playback.kind === "paused"
      ? playback.step
      : playback.kind === "complete"
        ? 3
        : -1;

  useEffect(() => {
    if (playback.kind !== "running") return;
    const timer = setTimeout(() => {
      if (playback.step === workflow.steps.length - 1) {
        setPlayback({
          kind: "complete",
          artifact: createArtifact(workflow.id),
        });
        notifyGuide({ kind: "completed", name: workflow.label });
      } else setPlayback({ kind: "running", step: playback.step + 1 });
    }, 950);
    return () => clearTimeout(timer);
  }, [playback, workflow]);

  useEffect(() => {
    if (artifact === null) {
      setDownloadUrl(null);
      return;
    }
    const url = URL.createObjectURL(
      new Blob([artifact], {
        type:
          workflow.id === "build" ? "text/html" : "text/plain;charset=utf-8",
      }),
    );
    setDownloadUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [artifact, workflow.id]);

  function start() {
    setSource(false);
    setPlayback({ kind: "running", step: 0 });
    notifyGuide({ kind: "started", name: workflow.label });
  }
  const playing = playback.kind === "running";
  const paused = playback.kind === "paused";
  const complete = playback.kind === "complete";

  return (
    <section
      className="exp-playground exp-section"
      id="playground"
      aria-labelledby="playground-title"
    >
      <div className="exp-section-heading">
        <div>
          <span className="exp-kicker">A little direction goes a long way</span>
          <h2 id="playground-title">
            From “what if”
            <br />
            to <em>there it is.</em>
          </h2>
        </div>
        <p>
          Pick a task. Watch the pieces come together.
          <br />
          Then take the result with you.
        </p>
      </div>
      <div className="demo-shell">
        <div className="demo-topbar">
          <div className="demo-brand">
            <StarMark /> aetheria <span>/ playground</span>
          </div>
          <span className="demo-disclosure">
            <i /> Interactive example
          </span>
        </div>
        <div className="demo-tabs" aria-label="Choose an example">
          {workflows.map((item) => {
            const Icon = icons[item.id];
            return (
              <button
                type="button"
                aria-pressed={workflowId === item.id}
                key={item.id}
                onClick={() => {
                  setWorkflowId(item.id);
                  setPlayback({ kind: "idle" });
                  setSource(false);
                  notifyGuide({ kind: "selected", name: item.label });
                }}
              >
                <Icon size={16} />
                {item.label}
                <ArrowUpRight size={14} />
              </button>
            );
          })}
        </div>
        <div className="demo-body">
          <div className="demo-instruction">
            <span className="exp-mono">YOUR DIRECTION</span>
            <p className="demo-prompt">{workflow.prompt}</p>
            <div className="demo-agent">
              <span className={playing ? "mini-star working" : "mini-star"}>
                <StarMark />
              </span>
              <div>
                Aetheria{" "}
                <small>
                  {complete
                    ? "Your file is ready."
                    : paused
                      ? "Paused. Take your time."
                      : playing
                        ? "Putting the pieces together."
                        : "Ready when you are."}
                </small>
              </div>
              <span className="agent-small-status">
                {complete
                  ? "DONE"
                  : playing
                    ? "RUNNING"
                    : paused
                      ? "PAUSED"
                      : "READY"}
              </span>
            </div>
            <ol className="demo-timeline">
              {workflow.steps.map((item, i) => (
                <li
                  key={item.action}
                  className={step > i ? "done" : step === i ? "active" : ""}
                >
                  <span className="timeline-indicator">
                    {step > i ? <Check size={12} /> : <span />}
                  </span>
                  <div>
                    {item.action}
                    <small>{item.detail}</small>
                  </div>
                </li>
              ))}
            </ol>
            <div className="demo-controls">
              {playing ? (
                <button
                  className="exp-button"
                  type="button"
                  onClick={() =>
                    setPlayback({ kind: "paused", step: playback.step })
                  }
                >
                  <Pause size={15} /> Pause example
                </button>
              ) : paused ? (
                <button
                  className="exp-button"
                  type="button"
                  onClick={() =>
                    setPlayback({ kind: "running", step: playback.step })
                  }
                >
                  <Play size={15} /> Keep going
                </button>
              ) : (
                <button className="exp-button" type="button" onClick={start}>
                  {complete ? (
                    <RotateCcw size={15} />
                  ) : (
                    <Play size={15} fill="currentColor" />
                  )}
                  {complete ? "Run it again" : "Run this example"}
                </button>
              )}
              {(playing || paused) && (
                <button
                  className="demo-cancel"
                  type="button"
                  onClick={() => {
                    setPlayback({ kind: "idle" });
                    notifyGuide({ kind: "cancelled" });
                  }}
                  aria-label="Cancel example"
                >
                  <Square size={13} />
                </button>
              )}
            </div>
          </div>
          <div className="demo-output" aria-busy={playing}>
            <div className="artifact-toolbar">
              <span>
                <span className="file-dot" />
                {workflow.filename}
              </span>
              <span>
                {complete ? "READY TO TAKE WITH YOU" : "OUTPUT PREVIEW"}
              </span>
            </div>
            {complete && artifact !== null ? (
              <div className="artifact-stage">
                {source ? (
                  <pre className="artifact-source">
                    <code>{artifact}</code>
                  </pre>
                ) : workflow.id === "build" ? (
                  <iframe
                    className="artifact-iframe"
                    title="Generated creative studio sample page"
                    srcDoc={artifact}
                    sandbox=""
                  />
                ) : workflow.id === "brief" ? (
                  <div className="artifact-document">
                    <span className="doc-label">
                      PROJECT NOTES / SAMPLE DATA
                    </span>
                    <h3>
                      A week,
                      <br />
                      <em>in focus.</em>
                    </h3>
                    {[
                      { status: "done", title: "Completed" },
                      { status: "blocked", title: "Needs a decision" },
                      { status: "next", title: "Next up" },
                    ].map((group) => (
                      <div className="brief-group" key={group.status}>
                        <h4>{group.title}</h4>
                        {sampleUpdates
                          .filter((item) => item.status === group.status)
                          .map((item) => (
                            <p key={item.note}>
                              {item.note}
                              <span>{item.team}</span>
                            </p>
                          ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="artifact-sheet">
                    <div className="sheet-heading">
                      <Table2 size={22} />
                      <h3>
                        Less mess.
                        <br />
                        <em>Better data.</em>
                      </h3>
                    </div>
                    <div className="sheet-summary">
                      <span>{sampleContacts.length} rows in</span>
                      <ArrowUpRight size={18} />
                      <span>{cleanContacts().length} unique contacts out</span>
                    </div>
                    <div className="sheet-table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cleanContacts().map((row) => (
                            <tr key={row.email}>
                              <td>{row.name}</td>
                              <td>{row.email}</td>
                              <td>{row.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={
                  playing ? "artifact-await is-playing" : "artifact-await"
                }
              >
                <div className="paper-stack">
                  <span />
                  <span />
                  <div>
                    <StarMark />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <p>
                  {playing
                    ? workflow.steps[playback.step]?.action
                    : paused
                      ? "Right where you left it."
                      : "A thought goes in."}
                  <em>
                    {playing
                      ? "Watch it take shape."
                      : paused
                        ? "Resume when you’re ready."
                        : "Something useful comes out."}
                  </em>
                </p>
                <span className="artifact-await-format">
                  {workflow.format} / YOUR NEXT DELIVERABLE
                </span>
              </div>
            )}
            <div className="artifact-bottom">
              <span role="status">
                {complete
                  ? "Example complete. This file is yours."
                  : paused
                    ? "Example paused."
                    : playing
                      ? workflow.steps[playback.step]?.detail
                      : "Choose an example and press play."}
              </span>
              {complete && (
                <div>
                  <button
                    type="button"
                    onClick={() => setSource(!source)}
                    aria-pressed={source}
                    aria-label={
                      source ? "View artifact preview" : "View artifact source"
                    }
                  >
                    <Code2 size={16} />
                  </button>
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      download={workflow.filename}
                      aria-label={"Download " + workflow.filename}
                    >
                      <Download size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="exp-footnote">
        <span>
          Illustrative workflow. Sample data. Files created in your browser.
        </span>
        <a href="#workspaces">
          Meet the actual workspace <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
