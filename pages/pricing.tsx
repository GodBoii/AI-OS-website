import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

const plans = [
  {
    name: "Core",
    price: "0",
    budget: "50,000",
    interval: "tokens every day",
    description: "For a first idea and a little daily help.",
    cta: "Start with Core",
    href: "/auth/signup",
    tag: "A GOOD PLACE TO START",
  },
  {
    name: "Pro",
    price: "428",
    budget: "5 million",
    interval: "tokens every month",
    description: "For the projects you keep coming back to.",
    cta: "Ask about Pro",
    href: "mailto:aetheria.ai28@gmail.com?subject=Aetheria%20Pro%20plan",
    tag: "ROOM TO BUILD",
  },
  {
    name: "Elite",
    price: "4,428",
    budget: "50 million",
    interval: "tokens every month",
    description: "For work that needs a bigger runway.",
    cta: "Ask about Elite",
    href: "mailto:aetheria.ai28@gmail.com?subject=Aetheria%20Elite%20plan",
    tag: "KEEP GOING",
  },
];
export default function Pricing() {
  return (
    <Layout>
      <SEO
        title="Pricing | Aetheria AI"
        description="Compare Core, Pro, and Elite token allowances and monthly pricing for Aetheria AI."
      />
      <div className="pricing-page section-pad">
        <div className="pricing-intro">
          <span className="eyebrow">SMALL STARTS. BIG POSSIBILITIES.</span>
          <h1>
            Find your
            <br />
            <span className="serif-word">working rhythm.</span>
          </h1>
          <p>
            Start with Core. Give bigger projects more room when you need it.
          </p>
        </div>
        <div className="plan-grid">
          {plans.map((plan) => (
            <article
              className={`plan-panel ${plan.name === "Pro" ? "plan-featured" : ""}`}
              key={plan.name}
            >
              <span className="eyebrow">{plan.tag}</span>
              <h2>{plan.name}</h2>
              <p className="plan-description">{plan.description}</p>
              <div className="plan-price">
                <span>₹</span>
                {plan.price}
                <small>/ month</small>
              </div>
              <div className="plan-allowance">
                <Check size={18} />
                <div>
                  <strong>{plan.budget}</strong>
                  <span>{plan.interval}</span>
                </div>
              </div>
              {plan.href.startsWith("/") ? (
                <Link className="plan-cta" href={plan.href}>
                  {plan.cta}
                  <ArrowUpRight size={19} />
                </Link>
              ) : (
                <a className="plan-cta" href={plan.href}>
                  {plan.cta}
                  <ArrowUpRight size={19} />
                </a>
              )}
            </article>
          ))}
        </div>
        <div className="pricing-note">
          <span>THE DETAILS</span>
          <p>
            Contact the Aetheria team about paid plan availability and billing.
            Your account shows your active plan and token usage.
          </p>
          <Link href="/contact" className="text-cta">
            Talk to a human <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
