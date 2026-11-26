import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Plus } from "lucide-react";
import SEO from "../components/SEO";
import Header from "../components/homepage/Header";
import ConstellationStory from "../components/homepage/ConstellationStory";
import ExecutionScene from "../components/homepage/ExecutionScene";
import OrchestrationScene from "../components/homepage/OrchestrationScene";
import WorkspaceTheatre from "../components/experience/WorkspaceTheatre";
import ComparisonScene from "../components/experience/ComparisonScene";
import Footer from "../components/homepage/Footer";
import StartScene from "../components/homepage/StartScene";
import styles from "../styles/constellation.module.css";

export default function Home() {
  const { asPath } = useRouter();
  const more = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = more.current;
    if (!details || !asPath.endsWith("#compare")) return;
    details.open = true;
    details.querySelector("#compare")?.scrollIntoView({ block: "start" });
  }, [asPath]);

  return (
    <div className={`aetheria-home experience-home ${styles.home}`}>
      <SEO
        title="Aetheria AI | Less talk. More doing."
        description="Your computer has a new operator. Aetheria connects your tools, runs agent workflows, and turns ideas into finished work."
        schemaType="Organization"
      />
      <Header />
      <main id="main-content">
        <ConstellationStory />
        <ExecutionScene />
        <WorkspaceTheatre />
        <StartScene />
        <details className={styles.more} ref={more}>
          <summary>Compare approaches and explore integrations <Plus size={18} aria-hidden="true" /></summary>
          <ComparisonScene />
          <OrchestrationScene />
        </details>
      </main>
      <Footer />
    </div>
  );
}
