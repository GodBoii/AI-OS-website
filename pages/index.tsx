import SEO from "../components/SEO";
import Header from "../components/homepage/Header";
import HeroScene from "../components/homepage/HeroScene";
import ExecutionScene from "../components/homepage/ExecutionScene";
import OrchestrationScene from "../components/homepage/OrchestrationScene";
import WorkspaceScene from "../components/homepage/WorkspaceScene";
import Footer from "../components/homepage/Footer";
import StartScene from "../components/homepage/StartScene";

export default function Home() {
  return (
    <div className="aetheria-home stellar-home">
      <SEO
        title="Aetheria AI | Big ideas. Real moves."
        description="Your computer has a new operator. Aetheria connects your tools, runs agent workflows, and turns ideas into finished work."
        schemaType="Organization"
      />
      <Header />
      <main id="main-content">
        <HeroScene />
        <WorkspaceScene />
        <ExecutionScene />
        <OrchestrationScene />
        <StartScene />
      </main>
      <Footer />
    </div>
  );
}
