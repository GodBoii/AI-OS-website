import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FaWindows, FaLinux, FaAndroid } from "react-icons/fa6";
import { downloads } from "../lib/downloads";

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
