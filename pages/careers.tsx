import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Link from "next/link";
import { ArrowUpRight, Film } from "lucide-react";

export default function Careers() {
  return (
    <Layout>
      <SEO
        title="Careers | Aetheria AI"
        description="Help build Aetheria AI. Explore our video editor opening and contact the team."
      />
      <div className="company-page careers-page section-pad">
        <span className="eyebrow">SMALL TEAM. PLENTY TO MAKE.</span>
        <h1>
          Bring your
          <br />
          <span className="serif-word">particular weird.</span>
        </h1>
        <p className="company-description">
          We're building a different way to work with computers.
          <br />
          Help us tell that story.
        </p>
        <article className="job-opening">
          <div className="job-number">
            <Film size={28} />
            <span>OPEN ROLE / 01</span>
          </div>
          <div className="job-details">
            <h2>Video editor</h2>
            <div className="job-tags">
              <span>Remote</span>
              <span>Full-time / Contract</span>
            </div>
            <p>
              Make product films, feature walkthroughs, and social videos that
              show what Aetheria can do. Bring a strong eye for editing, motion,
              and the small details that make a film work.
            </p>
            <div className="job-tools">
              Premiere Pro / DaVinci Resolve · Motion graphics
            </div>
            <Link href="/contact" className="primary-cta">
              Show us your work <ArrowUpRight size={20} />
            </Link>
          </div>
        </article>
        <p className="careers-note">
          Something else you do exceptionally well?{" "}
          <Link href="/contact">Tell us about it ↗</Link>
        </p>
      </div>
    </Layout>
  );
}
