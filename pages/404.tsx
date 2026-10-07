import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Page not found | Aetheria AI" noIndex />
      <div className="company-page section-pad">
        <span className="eyebrow">404 / A SMALL DETOUR</span>
        <h1>
          Lost
          <br />
          the <span className="serif-word">thread?</span>
        </h1>
        <p className="company-description">
          This page doesn't exist. Your next idea still can.
        </p>
        <Link href="/" className="primary-cta">
          Back to Aetheria <ArrowUpRight size={22} />
        </Link>
      </div>
    </Layout>
  );
}
