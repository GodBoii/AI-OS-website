import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { FaAndroid, FaGithub, FaLinux, FaWindows } from "react-icons/fa6";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import { androidDownload, downloads } from "../lib/downloads";
import styles from "../styles/surface.module.css";

const icons = { Windows: FaWindows, Linux: FaLinux, Android: FaAndroid };

export default function DownloadPage() {
  return (
    <Layout surface>
      <SEO title="Download Aetheria AI" description="Download the native client for Windows, Linux, or Android." />
      <div className={styles.page}>
        <header className={styles.intro}>
          <h1>Aetheria, <em>on your device.</em></h1>
          <p>Choose the installer for your platform, then sign in to bring your workspace with you.</p>
        </header>
        <ul className={styles.platforms} aria-label="Available installers">
          {downloads.map((platform) => {
            const Icon = platform.id === "windows" ? icons.Windows : platform.id === "linux" ? icons.Linux : icons.Android;
            return (
              <li key={platform.id}>
                <span className={styles.platformIcon}><Icon aria-hidden="true" /></span>
                <div><h2>{platform.name}</h2><p>{platform.requirement}</p></div>
                <span className={styles.version}><strong>{platform.version}</strong>{platform.format}</span>
                <a href={platform.href} className={styles.action} data-glass-control>Download<span className="sr-only"> for {platform.name}</span> <Package size={16} aria-hidden="true" /></a>
              </li>
            );
          })}
        </ul>
        <section className={styles.support} aria-label="Installation help">
          <details>
            <summary>Install on Android <Plus size={16} aria-hidden="true" /></summary>
            <div>
              <p>Download and open the APK. If Android asks, enable “Allow from this source” for your browser or file manager, then return to the installer. Turn the permission off afterward and keep Google Play Protect enabled.</p>
              <p>The universal APK supports all listed architectures. Smaller builds, checksums, and signing fingerprints are available in the <a href={androidDownload.releaseHref}>Android release files</a>.</p>
              <p>If an older installation uses a different signing key, export your data before uninstalling it. Future releases can update this version in place.</p>
            </div>
          </details>
          <nav aria-label="Release information">
            <a className={styles.textLink} data-glass-control href="https://github.com/GodBoii/AI-OS-website/releases">Browse releases <FaGithub size={15} aria-hidden="true" /></a>
            <Link className={styles.textLink} data-glass-control href="/changelog">Follow macOS progress</Link>
            <Link className={styles.textLink} data-glass-control href="/auth/login">Sign in</Link>
          </nav>
        </section>
      </div>
    </Layout>
  );
}
