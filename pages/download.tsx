import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FaWindows, FaLinux, FaAndroid } from "react-icons/fa6";
import { androidDownload, downloads } from "../lib/downloads";

const platformIcons = {
  windows: FaWindows,
  linux: FaLinux,
  android: FaAndroid,
};
function PlatformIcon({ id }: { id: string }) {
  if (id === "windows") return <platformIcons.windows />;
  if (id === "linux") return <platformIcons.linux />;
  return <platformIcons.android />;
}
export default function DownloadPage() {
  return (
    <Layout>
      <SEO
        title="Download Aetheria AI | Put your ideas to work"
        description="Download the Aetheria native client for Windows, Linux, and Android."
      />
      <div className="download-page section-pad">
        <div className="download-intro">
          <div>
            <span className="eyebrow">A NEW OPERATOR. YOUR COMPUTER.</span>
            <h1>
              Good things
              <br />
              come to <span className="serif-word">doers.</span>
            </h1>
          </div>
          <div className="download-stamp" aria-hidden="true">
            <ArrowDown />
            <span>
              TAKE IT
              <br />
              FOR A SPIN
            </span>
          </div>
        </div>
        <p className="download-description">
          Pick your platform. Bring your ideas.
          <br />
          Your next workspace is one download away.
        </p>
        <div className="download-list">
          {downloads.map((platform, i) => (
            <article className="download-row" key={platform.id}>
              <span className="download-index">0{i + 1}</span>
              <span className="download-platform-icon">
                <PlatformIcon id={platform.id} />
              </span>
              <div className="download-platform-name">
                <h2>{platform.name}</h2>
                <p>{platform.requirement}</p>
              </div>
              <div className="download-version">
                {platform.version}
                <small>{platform.format}</small>
              </div>
              <a href={platform.href} className="download-action">
                Download <ArrowDown size={19} />
                <span className="sr-only">for {platform.name}</span>
              </a>
            </article>
          ))}
        </div>
        <section className="download-description" aria-labelledby="android-install-heading">
          <h2 id="android-install-heading">Install on Android</h2>
          <p>
            Download the APK and open it. If Android asks, enable &quot;Allow
            from this source&quot; for your browser or file manager, then return
            to the installer and tap Install. You can turn that permission off
            afterward. Keep Google Play Protect enabled.
          </p>
          <p>
            The universal APK includes all supported architectures. For smaller
            downloads, choose ARM64, ARM32, x86-64, or x86 from the{" "}
            <a href={androidDownload.releaseHref}>Android release files</a>.
            Checksums and the public signing certificate fingerprints are included.
          </p>
          <p>
            Future releases can update this version without uninstalling it.
            If an older installation uses a different signing key, export your
            data before uninstalling it to install this release.
          </p>
        </section>
        <div className="download-help">
          <p>
            Looking for another release?
            <br />
            <a href="https://github.com/GodBoii/AI-OS-website/releases">
              Browse all releases <ArrowUpRight size={15} />
            </a>
          </p>
          <p>
            macOS is on the way.
            <br />
            <Link href="/changelog">
              Follow what's being built <ArrowUpRight size={15} />
            </Link>
          </p>
          <p>
            Already have Aetheria?
            <br />
            <Link href="/auth/login">
              Your account is this way <ArrowUpRight size={15} />
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
