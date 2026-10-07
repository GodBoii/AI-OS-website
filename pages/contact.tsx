import SEO from "../components/SEO";
import Layout from "../components/Layout";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Say hello | Aetheria AI"
        description="Contact Aetheria AI for product support, partnerships, or a conversation with the founder."
      />
      <div className="company-page contact-page section-pad">
        <span className="eyebrow">THE OTHER SIDE OF THE SCREEN.</span>
        <div className="contact-intro">
          <h1>
            Talk to
            <br />a <span className="serif-word">human.</span>
          </h1>
          <span className="contact-symbol" aria-hidden="true">
            ↗
          </span>
        </div>
        <p className="company-description">
          A question, a stubborn bug, a wild idea.
          <br />
          We're listening.
        </p>
        <div className="contact-rows">
          <a href="mailto:aetheria.ai28@gmail.com">
            <span>01 / EMAIL</span>
            <strong>aetheria.ai28@gmail.com</strong>
            <ArrowUpRight />
          </a>
          <a href="tel:9619039912">
            <span>02 / DIRECT LINE</span>
            <strong>96190 39912</strong>
            <ArrowUpRight />
          </a>
        </div>
        <div className="contact-signoff">
          <span className="eyebrow">THE PERSON BEHIND AETHERIA</span>
          <p>Prajwal Ghadge</p>
          <span>Founder & developer</span>
        </div>
      </div>
    </Layout>
  );
}
