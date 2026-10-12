import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StarMark from "../experience/StarMark";
export default function Footer() {
  return (
    <footer className="exp-footer">
      <div className="exp-footer-call exp-container">
        <span className="exp-kicker">Got something in mind?</span>
        <Link href="/download" className="footer-main-link">
          <span>
            Over to <em>you.</em>
          </span>
          <span className="footer-go">
            <ArrowUpRight />
          </span>
        </Link>
        <p>Give it a workspace.</p>
      </div>
      <div className="exp-footer-nav exp-container">
        <Link href="/" className="footer-new-brand">
          <StarMark />
          aetheria
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/contact">
            Say hello <ArrowUpRight size={12} />
          </Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="/investor">The vision</Link>
          <Link href="/playbook">Playbook</Link>
          <Link href="/careers">Careers</Link>
          <a
            href="https://github.com/GodBoii/AI-OS-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={12} />
          </a>
          <a
            href="https://youtube.com/@aetheriaai.007"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube <ArrowUpRight size={12} />
          </a>
          <a
            href="https://x.com/Aetheria__ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            X <ArrowUpRight size={12} />
          </a>
        </nav>
      </div>
      <div className="exp-footer-legal exp-container">
        <span>© {new Date().getFullYear()} Aetheria AI</span>
        <span>Human direction. A little mechanical help.</span>
        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
