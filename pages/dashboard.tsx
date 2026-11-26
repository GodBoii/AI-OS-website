import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowDown, ArrowUpRight, RefreshCw } from "lucide-react";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import UsageCard, { type ConvexUsageData, type TimePeriod } from "../components/UsageCard";
import { downloads } from "../lib/downloads";
import { getCurrentSession, type Session } from "../lib/supabaseClient";
import styles from "../styles/surface.module.css";

const periods: { id: TimePeriod; label: string }[] = [
  { id: "7days", label: "7 days" },
  { id: "30days", label: "30 days" },
  { id: "90days", label: "90 days" },
  { id: "all", label: "All loaded" },
];

const allowances = {
  free: { name: "Core", allowance: "50,000 tokens per day" },
  pro: { name: "Pro", allowance: "5 million tokens per month" },
  elite: { name: "Elite", allowance: "50 million tokens per month" },
};
type Plan = keyof typeof allowances;
type Resource<T> = { kind: "loading" } | { kind: "ready"; data: T } | { kind: "error" };

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Resource<Session>>({ kind: "loading" });
  const [plan, setPlan] = useState<Resource<Plan>>({ kind: "loading" });
  const [usage, setUsage] = useState<Resource<ConvexUsageData>>({ kind: "loading" });
  const [period, setPeriod] = useState<TimePeriod>("30days");
  const [request, setRequest] = useState(0);
  const token = session.kind === "ready" ? session.data.access_token : undefined;

  useEffect(() => {
    let active = true;
    void getCurrentSession().then((current) => {
      if (!active) return;
      if (current) setSession({ kind: "ready", data: current });
      else void router.replace("/auth/login");
    }).catch(() => {
      if (active) setSession({ kind: "error" });
    });
    return () => { active = false; };
  }, [router]);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    const options = { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } };
    void fetch("/api/profile", options).then(async (response) => {
      if (!response.ok) throw new Error("Profile unavailable");
      const profile: unknown = await response.json();
      if (typeof profile !== "object" || profile === null || !("plan_type" in profile)) {
        throw new Error("Invalid profile");
      }
      const value = profile.plan_type ?? "free";
      if (value !== "free" && value !== "pro" && value !== "elite") throw new Error("Unknown plan");
      if (!controller.signal.aborted) setPlan({ kind: "ready", data: value });
    }).catch(() => {
      if (!controller.signal.aborted) setPlan({ kind: "error" });
    });
    return () => controller.abort();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    void fetch("/api/convex-usage?limit=90", {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (response) => {
      if (!response.ok) throw new Error("Usage unavailable");
      const data: ConvexUsageData = await response.json();
      if (!controller.signal.aborted) setUsage({ kind: "ready", data });
    }).catch(() => {
      if (!controller.signal.aborted) setUsage({ kind: "error" });
    });
    return () => controller.abort();
  }, [request, token]);

  function refreshUsage() {
    setUsage({ kind: "loading" });
    setRequest((value) => value + 1);
  }

  const user = session.kind === "ready" ? session.data.user : null;
  const name = user?.user_metadata?.name || user?.email?.split("@")[0];

  return (
    <Layout surface>
      <SEO title="Dashboard | Aetheria AI" description="View Aetheria usage, your plan, and client downloads." noIndex />
      <div className={`${styles.page} ${styles.dashboard}`}>
        <header className={styles.intro}>
          <h1>Your dashboard.</h1>
          {name && <p>Welcome back, {name}.</p>}
        </header>
        {session.kind !== "ready" ? (
          <div className={styles.panel}>
            {session.kind === "error" ? (
              <><p role="alert">We couldn’t load your session.</p><Link href="/auth/login" className={styles.textLink}>Open sign-in <ArrowUpRight size={15} aria-hidden="true" /></Link></>
            ) : <p role="status">Checking your session…</p>}
          </div>
        ) : (
          <div className={styles.accountGrid}>
            <section className={styles.panel} aria-labelledby="usage-heading">
              <div className={styles.panelHeader}>
                <h2 id="usage-heading">Token usage</h2>
                <div className={styles.filters} role="group" aria-label="Usage period">
                  {periods.map(({ id, label }) => (
                    <button type="button" key={id} aria-pressed={period === id} onClick={() => setPeriod(id)}>{label}</button>
                  ))}
                  <button type="button" onClick={refreshUsage} disabled={usage.kind === "loading"} aria-label="Refresh token usage">
                    <RefreshCw size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
              {usage.kind === "ready" ? <UsageCard usageData={usage.data} timePeriod={period} /> : (
                usage.kind === "loading" ? <p role="status" className={styles.empty}>Loading token usage…</p> : (
                  <div><p role="alert" className={styles.error}>Token usage is temporarily unavailable.</p><button className={styles.textLink} onClick={refreshUsage}>Try again</button></div>
                )
              )}
            </section>
            <div className={styles.accountRail}>
              <section className={styles.panel} aria-labelledby="plan-heading">
                <h2 id="plan-heading">Current plan</h2>
                {plan.kind === "ready" ? <p><strong>{allowances[plan.data].name}</strong><br />{allowances[plan.data].allowance}</p> :
                  <p role="status">{plan.kind === "loading" ? "Loading plan…" : "Plan information is unavailable."}</p>}
                <Link href="/pricing" className={styles.textLink}>Compare plans <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </section>
              <section className={styles.panel} aria-labelledby="account-heading">
                <h2 id="account-heading">Account</h2>
                <dl>
                  <div><dt>Name</dt><dd>{user?.user_metadata?.name || "Not set"}</dd></div>
                  <div><dt>Email</dt><dd>{user?.email || "Not set"}</dd></div>
                </dl>
              </section>
              <section className={styles.panel} aria-labelledby="client-heading">
                <h2 id="client-heading">Install Aetheria</h2>
                <div className={styles.clientLinks}>
                  {downloads.map((platform) => <a href={platform.href} key={platform.id}>{platform.name} <ArrowDown size={15} aria-hidden="true" /></a>)}
                </div>
                <Link href="/download" className={styles.textLink}>Installation details <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </section>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
