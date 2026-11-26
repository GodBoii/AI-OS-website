import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import styles from "../styles/surface.module.css";

const plans = [
  { name: "Core", price: "0", allowance: "50,000 tokens per day", summary: "Start with Aetheria.", href: "/auth/signup", action: "Start with Core" },
  { name: "Pro", price: "428", allowance: "5 million tokens per month", summary: "More room for ongoing projects.", href: "mailto:aetheria.ai28@gmail.com?subject=Aetheria%20Pro%20plan", action: "Ask about Pro" },
  { name: "Elite", price: "4,428", allowance: "50 million tokens per month", summary: "For higher-volume work.", href: "mailto:aetheria.ai28@gmail.com?subject=Aetheria%20Elite%20plan", action: "Ask about Elite" },
];

export default function Pricing() {
  return (
    <Layout surface>
      <SEO title="Pricing | Aetheria AI" description="Compare Core, Pro, and Elite token allowances and monthly pricing." />
      <div className={styles.page}>
        <header className={styles.intro}>
          <h1>Room for <em>your work.</em></h1>
          <p>Start free with Core, or ask about a larger monthly token allowance.</p>
        </header>
        <section className={styles.plans} aria-label="Aetheria plans">
          {plans.map((plan) => (
            <article className={styles.plan} key={plan.name}>
              <h2>{plan.name}</h2>
              <p>{plan.summary}</p>
              <div className={styles.price}>₹{plan.price}<small>/ month</small></div>
              <div className={styles.allowance}>{plan.allowance}</div>
              {plan.name === "Core" ? (
                <Link className={styles.action} href={plan.href}>{plan.action} <ArrowUpRight size={16} aria-hidden="true" /></Link>
              ) : (
                <a className={styles.textLink} href={plan.href}>{plan.action} <ArrowUpRight size={16} aria-hidden="true" /></a>
              )}
            </article>
          ))}
        </section>
        <section className={styles.support} aria-labelledby="billing-title">
          <h2 id="billing-title">Availability and billing</h2>
          <p>Contact Aetheria about paid-plan availability and billing. See your active plan and usage in your dashboard.</p>
          <Link href="/contact" className={styles.textLink}>Contact Aetheria <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </section>
      </div>
    </Layout>
  );
}
