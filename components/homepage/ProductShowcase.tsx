import Link from "next/link";
import { useState } from "react";
import { Code2, FileText, FolderOpen, GitBranch, Globe, LockKeyhole, Mail, Monitor, Plug, Table2 } from "lucide-react";
import StarMark from "../experience/StarMark";
import styles from "../../styles/product-showcase.module.css";

const connections = [
  { id: "github", name: "GitHub", icon: GitBranch, example: "Review a pull request and explain the changes." },
  { id: "gmail", name: "Gmail", icon: Mail, example: "Summarize a thread and draft a follow-up." },
  { id: "sheets", name: "Google Sheets", icon: Table2, example: "Compare sheet data and call out what changed." },
  { id: "drive", name: "Google Drive", icon: FolderOpen, example: "Find the launch checklist and the latest project notes." },
  { id: "vercel", name: "Vercel", icon: Globe, example: "Review the build logs for a deployment." },
];

export default function ProductShowcase() {
  const [selectedConnection, setSelectedConnection] = useState(connections[0]);

  return (
    <section className={styles.showcase} aria-labelledby="product-showcase-title">
      <h2 id="product-showcase-title">Aetheria <em>at work.</em></h2>

      <div className={styles.tiles}>
        <article className={`${styles.tile} ${styles.conversation}`}>
          <div className={styles.copy}>
            <h3>From context to a reply</h3>
            <p>Bring a thread and its supporting files into one conversation, then review the draft.</p>
          </div>

          <figure className={styles.window}>
            <figcaption className={styles.windowBar}>
              <StarMark />
              <span>Example conversation</span>
            </figcaption>
            <div className={styles.windowBody}>
              <div className={styles.sources}>
                <span>Connected context</span>
                <ul>
                  <li><Mail size={15} aria-hidden="true" /> Gmail</li>
                  <li><FolderOpen size={15} aria-hidden="true" /> Google Drive</li>
                </ul>
              </div>
              <div className={styles.messages}>
                <p className={styles.prompt}>Draft a follow-up from the email thread and the launch checklist.</p>
                <div className={styles.reply}>
                  <StarMark />
                  <div>
                    <p>I’ve drafted the update. The release is ready for internal review, with final screenshots still pending.</p>
                    <span className={styles.file}><FileText size={15} aria-hidden="true" /> Launch follow-up draft</span>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </article>

        <article className={`${styles.tile} ${styles.integrations}`}>
          <div className={styles.copy}>
            <h3>Connect your apps</h3>
            <p>Bring in Gmail threads, Google Sheets data, and GitHub repositories from your connected accounts.</p>
            <Link className={styles.integrationLink} href="/for-you" data-glass-control>
              <Plug size={17} aria-hidden="true" /> Explore integrations
            </Link>
          </div>
          <div className={styles.phone}>
            <div className={styles.phoneBar}>
              <StarMark />
              <span>Connections</span>
            </div>
            <div className={styles.connectionList} role="group" aria-label="Explore integration examples">
              {connections.map((connection) => (
                <button
                  key={connection.id}
                  type="button"
                  aria-pressed={selectedConnection.id === connection.id}
                  aria-controls="showcase-integration-example"
                  onClick={() => setSelectedConnection(connection)}
                >
                  <connection.icon size={17} aria-hidden="true" />
                  {connection.name}
                </button>
              ))}
            </div>
            <div className={styles.connectionExample} id="showcase-integration-example" role="status">
              <span>Example with {selectedConnection.name}</span>
              <p>{selectedConnection.example}</p>
            </div>
          </div>
        </article>

        <article className={`${styles.tile} ${styles.code}`}>
          <div className={styles.copy}>
            <Code2 size={22} aria-hidden="true" />
            <h3>Work in your repo</h3>
            <p>Clone a GitHub repository into the coding workspace.</p>
          </div>
          <figure className={styles.miniScreen}>
            <figcaption><GitBranch size={15} aria-hidden="true" /> GitHub repository</figcaption>
            <div className={styles.repository}>
              <span><FolderOpen size={14} aria-hidden="true" /> launch-site</span>
              <span><FileText size={14} aria-hidden="true" /> README.md</span>
            </div>
          </figure>
        </article>

        <article className={`${styles.tile} ${styles.computer}`}>
          <div className={styles.copy}>
            <Monitor size={22} aria-hidden="true" />
            <h3>Direct desktop tasks</h3>
            <p>Choose the scope and grant access from the computer workspace.</p>
          </div>
          <figure className={styles.miniScreen}>
            <figcaption><LockKeyhole size={15} aria-hidden="true" /> Permission required</figcaption>
            <div className={styles.permission}>
              <span>Folder scope</span>
              <span><FolderOpen size={14} aria-hidden="true" /> Launch assets</span>
            </div>
          </figure>
        </article>
      </div>
    </section>
  );
}
