import Link from "next/link";
import {
  ArrowUpRight,
  FolderOpen,
  Code2,
  Monitor,
  Check,
  Terminal,
  ShieldCheck,
} from "lucide-react";

export default function WorkspaceScene() {
  return (
    <section
      id="possibilities"
      className="possibilities-section stellar-section"
    >
      <div className="stellar-section-heading">
        <span className="section-kicker">SPACE TO THINK. TOOLS TO ACT.</span>
        <h2>
          For the things
          <br />
          you <span>actually want to do.</span>
        </h2>
        <p>
          A conversation is just the beginning.
          <br />
          Give your ideas somewhere to go.
        </p>
      </div>
      <div className="capability-grid">
        <article className="capability-build">
          <div className="capability-copy">
            <span className="capability-icon">
              <Code2 size={21} />
            </span>
            <h3>
              Build past
              <br />
              the blank page.
            </h3>
            <p>
              Work on code, connect a repository, and keep the terminal close.
              Your project gets a workspace of its own.
            </p>
            <Link href="/for-you">
              Explore developer workflows <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="code-art" aria-label="Illustrative project workspace">
            <div className="code-art-toolbar">
              <span>
                <Terminal size={13} /> project / your-next-idea
              </span>
              <span>TSX</span>
            </div>
            <div className="code-art-body">
              <div className="code-art-tree">
                <span>↓ your-next-idea</span>
                <span>↳ src</span>
                <span className="file-active">↳ app.tsx</span>
                <span>↳ styles.css</span>
                <span>↳ package.json</span>
              </div>
              <div className="code-art-lines">
                <p>
                  <i>01</i>
                  <span>import</span> {"{ yourIdea }"}
                </p>
                <p>
                  <i>02</i>
                  <span>from</span> <b>'possibilities'</b>;
                </p>
                <p>
                  <i>03</i>&nbsp;
                </p>
                <p>
                  <i>04</i>
                  <span>export default</span> function App() {"{"}
                </p>
                <p>
                  <i>05</i>&nbsp; return <b>&lt;SomethingNew /&gt;</b>;
                </p>
                <p>
                  <i>06</i>
                  {"}"}
                </p>
              </div>
            </div>
            <div className="code-art-status">
              <Check size={13} /> A place for your next commit.
              <span>WORKFLOW ILLUSTRATION</span>
            </div>
          </div>
        </article>
        <article className="capability-computer">
          <span className="capability-icon">
            <Monitor size={21} />
          </span>
          <h3>
            Beyond
            <br />
            the browser.
          </h3>
          <p>
            Your computer workspace brings desktop actions into the
            conversation.
          </p>
          <div className="permission-art">
            <div>
              <ShieldCheck size={18} />
              <span>You're in control</span>
            </div>
            <span>Permissions</span>
            <div className="permission-row">
              <span>Workspace scope</span>
              <span>
                Selected files <Check size={13} />
              </span>
            </div>
            <div className="permission-row">
              <span>Desktop access</span>
              <span>
                You decide <Check size={13} />
              </span>
            </div>
          </div>
          <Link href="/download">
            Meet the desktop app <ArrowUpRight size={16} />
          </Link>
        </article>
        <article className="capability-context">
          <span className="capability-icon">
            <FolderOpen size={21} />
          </span>
          <div>
            <h3>A place for all the context.</h3>
            <p>
              Keep files, conversations, and project work together. Pick up the
              thread without starting over.
            </p>
          </div>
          <div className="context-art" aria-hidden="true">
            <span className="context-doc doc-back">
              project notes
              <br />
              <i />
              <i />
              <i />
            </span>
            <span className="context-doc doc-front">
              the next idea
              <br />
              <i />
              <i />
              <i />
            </span>
            <span className="context-orb">
              <img src="/icon.png" width={48} height={48} alt="" />
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
