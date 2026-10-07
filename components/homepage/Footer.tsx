import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <span className="studio-label">Less someday. More today.</span>
        <div className="footer-heading">
          <h2>
            OVER TO YOU.
            <br />
            <span>MAKE YOUR MOVE.</span>
          </h2>
          <Link
            href="/download"
            className="footer-arrow"
            aria-label="Download Aetheria"
          >
            <ArrowUpRight />
          </Link>
        </div>
        <div className="footer-cta-bottom">
          <p>Got something in mind? Give it a workspace.</p>
          <Link href="/download">
            Get Aetheria <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="footer-navigation">
        <Link href="/" className="footer-wordmark">
          <img src="/icon.png" width={34} height={34} alt="" /> aetheria
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/contact">Say hello ↗</Link>
          <Link href="/changelog">What's new</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/playbook">The playbook</Link>
          <a href="https://github.com/GodBoii/AI-OS-website">GitHub ↗</a>
          <a href="https://x.com/Aetheria__ai">X ↗</a>
          <a href="https://youtube.com/@aetheriaai.007">YouTube ↗</a>
          <a href="https://www.instagram.com/aetheria._.ai">Instagram ↗</a>
          <a href="https://www.threads.com/@aetheria._.ai">Threads ↗</a>
        </nav>
      </div>
      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Aetheria AI</span>
        <span>MADE FOR IDEAS THAT WON'T SIT STILL.</span>
        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
