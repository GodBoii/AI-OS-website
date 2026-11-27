import Link from "next/link";
import { Package } from "lucide-react";
import { FaGithub, FaXTwitter, FaYoutube } from "react-icons/fa6";
import StarMark from "../experience/StarMark";
import { COOKIE_SETTINGS_EVENT } from "../CookiePreferences";
import styles from "../../styles/surface.module.css";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/GodBoii/AI-OS-website", Icon: FaGithub },
  { name: "YouTube", href: "https://youtube.com/@aetheriaai.007", Icon: FaYoutube },
  { name: "X", href: "https://x.com/Aetheria__ai", Icon: FaXTwitter },
];

export default function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={`exp-footer${compact ? " " + styles.footer : ""}`}>
      {!compact && <div className="exp-footer-call exp-container">
        <span className="exp-kicker">Got something in mind?</span>
        <Link href="/download" className="footer-main-link">
          <span>
            Over to <em>you.</em>
          </span>
          <span className="footer-go">
            <Package aria-hidden="true" />
          </span>
        </Link>
        <p>Give it a workspace.</p>
      </div>}
      <div className="exp-footer-nav exp-container">
        <Link href="/" className="footer-new-brand">
          <StarMark />
          aetheria
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/contact">Say hello</Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="/investor">The vision</Link>
          <Link href="/playbook">Playbook</Link>
          <Link href="/careers">Careers</Link>
        </nav>
        <nav className="exp-footer-social" aria-label="Social media">
          {socialLinks.map(({ name, href, Icon }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
              <Icon size={19} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
      <div className="exp-footer-legal exp-container">
        <span>© {new Date().getFullYear()} Aetheria AI</span>
        {!compact && <span>Human direction. A little mechanical help.</span>}
        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <button type="button" onClick={(event) => {
            event.currentTarget.focus();
            window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
          }}>Cookie settings</button>
        </div>
      </div>
    </footer>
  );
}
