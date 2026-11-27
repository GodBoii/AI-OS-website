import { FaGithub } from "react-icons/fa6";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import SurfaceIntro from "../components/SurfaceIntro";
import styles from "../styles/surface.module.css";

const releasesUrl = "https://github.com/GodBoii/AI-OS-website/releases";

type Release = {
  id: number;
  name: string | null;
  tag_name: string;
  body: string | null;
  html_url: string;
  published_at: string | null;
};
type ReleaseState =
  | { kind: "loading" }
  | { kind: "ready"; releases: Release[] }
  | { kind: "error"; message: string };
function isRelease(value: unknown): value is Release {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    (typeof value.name === "string" || value.name === null) &&
    "tag_name" in value &&
    typeof value.tag_name === "string" &&
    "body" in value &&
    (typeof value.body === "string" || value.body === null) &&
    "html_url" in value &&
    typeof value.html_url === "string" &&
    value.html_url.startsWith(releasesUrl + "/") &&
    "published_at" in value &&
    (typeof value.published_at === "string" || value.published_at === null)
  );
}
function releaseDate(value: string | null) {
  if (!value || !Number.isFinite(Date.parse(value)))
    return "Release date unavailable";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
export default function Changelog() {
  const [state, setState] = useState<ReleaseState>({ kind: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeout = setTimeout(() => controller.abort(), 12000);
    setState({ kind: "loading" });
    async function load() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/GodBoii/AI-OS-website/releases",
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          },
        );
        if (!response.ok)
          throw new Error(
            response.status === 403
              ? "GitHub is limiting requests right now. Try again shortly."
              : "Could not load the releases from GitHub. Try again.",
          );
        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isRelease))
          throw new Error(
            "GitHub returned release data we could not read. View the releases directly or try again.",
          );
        if (!disposed) setState({ kind: "ready", releases: data });
      } catch (error: unknown) {
        if (!disposed)
          setState({
            kind: "error",
            message: controller.signal.aborted
              ? "GitHub took too long to respond. Try again or view the releases directly."
              : error instanceof Error
                ? error.message
                : "Could not load releases. Try again.",
          });
      } finally {
        clearTimeout(timeout);
      }
    }
    void load();
    return () => {
      disposed = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);
  return (
    <Layout surface>
      <SEO
        title="What's new | Aetheria AI"
        description="Release notes, improvements, and updates from Aetheria AI."
      />
      <div className={styles.page}>
        <SurfaceIntro>
          <h1>Change<em>log.</em></h1>
          <p>Release notes, improvements, and fixes from Aetheria.</p>
          <a href={releasesUrl} className={styles.textLink} data-glass-control>
            All releases on GitHub <FaGithub size={16} aria-hidden="true" />
          </a>
        </SurfaceIntro>
        {state.kind === "loading" && (
          <div className={styles.releaseState} role="status">
            <span>Loading releases…</span>
            <div className={styles.releaseSkeleton} aria-hidden="true" />
          </div>
        )}
        {state.kind === "error" && (
          <div className={styles.releaseState}>
            <h2 className={styles.sectionTitle}>Releases unavailable</h2>
            <p role="alert">{state.message}</p>
            <button
              type="button"
              onClick={() => setAttempt((previous) => previous + 1)}
              className={styles.action}
            >
              Try again
            </button>
          </div>
        )}
        {state.kind === "ready" &&
          (state.releases.length === 0 ? (
            <div className={styles.releaseState}>
              <h2 className={styles.sectionTitle}>No releases published yet</h2>
              <p>
                The next release will appear here when it's available on GitHub.
              </p>
            </div>
          ) : (
            <div className={styles.releaseList}>
              {state.releases.map((release) => (
                <article className={styles.releaseRow} key={release.id}>
                  <div className={styles.releaseMeta}>
                    <span>{release.tag_name}</span>
                    <p>
                      {releaseDate(release.published_at)}
                    </p>
                  </div>
                  <div>
                    <h2 className={styles.sectionTitle}>{release.name || release.tag_name}</h2>
                    <p className={styles.releaseNotes}>
                      {release.body ||
                        "Full release details are available on GitHub."}
                    </p>
                    <a href={release.html_url} className={styles.textLink} data-glass-control>
                      View release on GitHub <FaGithub size={17} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ))}
      </div>
    </Layout>
  );
}
