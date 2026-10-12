import SEO from "../components/SEO";
import Header from "../components/homepage/Header";
import HeroScene from "../components/homepage/HeroScene";
import ExecutionScene from "../components/homepage/ExecutionScene";
import OrchestrationScene from "../components/homepage/OrchestrationScene";
import WorkspaceTheatre from "../components/experience/WorkspaceTheatre";
import ComparisonScene from "../components/experience/ComparisonScene";
import MotionDirector from "../components/experience/MotionDirector";
import Footer from "../components/homepage/Footer";
import StartScene from "../components/homepage/StartScene";

export default function Home() {
  return (
    <div className="aetheria-home experience-home">
      <SEO
        title="Aetheria AI | Less talk. More doing."
        description="Your computer has a new operator. Aetheria connects your tools, runs agent workflows, and turns ideas into finished work."
        schemaType="Organization"
      />
      <Header />
      <main id="main-content">
        <HeroScene />
        <ExecutionScene />
        <MotionDirector />
        <WorkspaceTheatre />
        <ComparisonScene />
        <OrchestrationScene />
        <StartScene />
      </main>
      <Footer />
    </div>
  );
}
