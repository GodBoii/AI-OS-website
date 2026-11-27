import Link from "next/link";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Code2, FileText, FolderOpen, GitBranch, LockKeyhole, Mail, Monitor, Pause, Play, Plug } from "lucide-react";
import { SiGithub, SiGmail, SiGoogledrive, SiGooglesheets, SiSupabase, SiVercel, SiWhatsapp } from "react-icons/si";
import StarMark from "../experience/StarMark";
import styles from "../../styles/product-showcase.module.css";

const connections = [
  { id: "github", name: "GitHub", icon: SiGithub, color: "#faf7ff", example: "Review a pull request and explain the changes." },
  { id: "gmail", name: "Gmail", icon: SiGmail, color: "#ff695c", example: "Summarize a thread and draft a follow-up." },
  { id: "sheets", name: "Google Sheets", icon: SiGooglesheets, color: "#48d898", example: "Compare sheet data and call out what changed." },
  { id: "drive", name: "Google Drive", icon: SiGoogledrive, color: "#ffc959", example: "Find the launch checklist and the latest project notes." },
  { id: "vercel", name: "Vercel", icon: SiVercel, color: "#faf7ff", example: "Review the build logs for a deployment." },
];

const brands = [
  ...connections,
  { id: "supabase", name: "Supabase", icon: SiSupabase, color: "#69eba4" },
  { id: "whatsapp", name: "WhatsApp Business", icon: SiWhatsapp, color: "#67e88c" },
];
const brandRows = [0, 3, 5].map((start) => ({
  start,
  brands: [...brands.slice(start), ...brands.slice(0, start)],
}));

export default function ProductShowcase({ paused }: { paused: boolean }) {
  const [selectedConnection, setSelectedConnection] = useState(connections[0]);
  const [brandsPaused, setBrandsPaused] = useState(false);
  const marquee = useRef<HTMLDivElement>(null);
  const brandsInView = useInView(marquee, { amount: .2 });

  return (
    <section className={styles.showcase} aria-labelledby="product-showcase-title">
      <h2 id="product-showcase-title">Aetheria <em>at work.</em></h2>

      <div className={styles.tiles}>
        <article className={`${styles.tile} ${styles.brands}`}>
          <div className={styles.brandHeader}>
            <h3>Tools you can connect</h3>
            <button
              className={styles.pauseBrands}
              type="button"
              aria-label={paused || brandsPaused ? "Play integration logos" : "Pause integration logos"}
              disabled={paused}
              onClick={() => setBrandsPaused(!brandsPaused)}
            >
              {paused || brandsPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            </button>
          </div>
          <ul className={styles.brandList}>
            {brands.map((brand) => (
              <li key={brand.id}>
                <brand.icon size={21} color={brand.color} aria-hidden="true" />
                {brand.name}
              </li>
            ))}
          </ul>
          <div className={styles.marquee} ref={marquee} data-running={brandsInView && !paused && !brandsPaused} aria-hidden="true">
            {brandRows.map((row) => (
              <div className={styles.brandTrack} key={row.start}>
                {[0, 1].map((copy) => (
                  <div className={styles.brandGroup} key={copy}>
                    {row.brands.map((brand) => (
                      <span key={brand.id}>
                        <brand.icon size={24} color={brand.color} />
                        {brand.name}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </article>

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
