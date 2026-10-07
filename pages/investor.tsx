import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Investor() {
  return (
    <Layout>
      <SEO
        title="The vision | Aetheria AI"
        description="Aetheria's vision for autonomous desktop and mobile workspaces. Contact the founder for investor information."
      />
      <div className="company-page investor-page section-pad">
        <span className="eyebrow">AETHERIA / THE LONG VIEW</span>
        <h1>
          Computers can
          <br />
          do <span className="serif-word">more.</span>
        </h1>
        <div className="investor-lead">
          <p>
            We are building an operating system for agents that can act across
            your tools. A place where the conversation leads to working code,
            organized files, and finished tasks.
          </p>
          <div>
            <span className="eyebrow">SEED ROUND</span>
            <a
              href="mailto:aetheria.ai28@gmail.com?subject=Aetheria%20investor%20inquiry"
              className="primary-cta"
            >
              Let's talk <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
        <section className="vision-statement">
          <span>THE THESIS / 01</span>
          <h2>
            The next interface
            <br />
            is <span className="serif-word">getting it done.</span>
          </h2>
          <p>
            Today's work lives across browsers, editors, files, and messages.
            Aetheria brings those tools into a shared workspace so specialized
            agents can work with the same context.
          </p>
          <Link href="/playbook" className="text-cta">
            Read the playbook <ArrowUpRight size={18} />
          </Link>
        </section>
        <div className="investor-contact">
          <div>
            <span className="eyebrow">BUILD WITH US.</span>
            <h2>See where we're going.</h2>
            <p>
              For the current pitch deck, company metrics, and fundraising
              details, contact the founder.
            </p>
          </div>
          <a
            href="mailto:aetheria.ai28@gmail.com?subject=Aetheria%20pitch%20deck"
            className="text-cta"
          >
            Request the deck <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </Layout>
  );
}
