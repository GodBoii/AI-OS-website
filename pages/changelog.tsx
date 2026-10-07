import { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import SEO from "../components/SEO";
import Layout from "../components/Layout";

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
    value.html_url.startsWith(
      "https://github.com/GodBoii/AI-OS-website/releases/",
    ) &&
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
    <Layout>
      <SEO
        title="What's new | Aetheria AI"
        description="Release notes, improvements, and updates from Aetheria AI."
      />
      <div className="company-page releases-page section-pad">
        <span className="eyebrow">ALWAYS A WORK IN PROGRESS.</span>
        <h1>
          Fresh off
          <br />
          the <span className="serif-word">workbench.</span>
        </h1>
        <p className="company-description">
          The latest Aetheria releases, straight from GitHub.
        </p>
        {state.kind === "loading" && (
          <div className="release-loading" role="status">
            <span>Loading releases…</span>
            {[1, 2, 3].map((i) => (
              <div key={i} className="release-skeleton" />
            ))}
          </div>
        )}
        {state.kind === "error" && (
          <div className="release-error" role="alert">
            <h2>The update needs a minute.</h2>
            <p>{state.message}</p>
            <button
              onClick={() => setAttempt(attempt + 1)}
              className="primary-cta"
            >
              Try again <RefreshCw size={17} />
            </button>
            <a
              href="https://github.com/GodBoii/AI-OS-website/releases"
              className="text-cta"
            >
              View on GitHub <ArrowUpRight size={17} />
            </a>
          </div>
        )}
        {state.kind === "ready" &&
          (state.releases.length === 0 ? (
            <div className="release-error">
              <h2>Nothing published yet.</h2>
              <p>
                The next release will appear here when it's available on GitHub.
              </p>
              <a
                href="https://github.com/GodBoii/AI-OS-website/releases"
                className="text-cta"
              >
                View on GitHub <ArrowUpRight size={17} />
              </a>
            </div>
          ) : (
            <div className="release-list">
              {state.releases.map((release) => (
                <article className="release-row" key={release.id}>
                  <div>
                    <span className="release-tag">{release.tag_name}</span>
                    <p className="release-date">
                      {releaseDate(release.published_at)}
                    </p>
                  </div>
                  <div className="release-content">
                    <h2>{release.name || release.tag_name}</h2>
                    <p className="release-notes">
                      {release.body ||
                        "Full release details are available on GitHub."}
                    </p>
                    <a href={release.html_url} className="text-cta">
                      View release on GitHub <ArrowUpRight size={17} />
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
