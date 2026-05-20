import Head from 'next/head';
import SmoothScroll from '../components/homepage/SmoothScroll';
import Header from '../components/homepage/Header';
import HeroScene from '../components/homepage/HeroScene';
import ExecutionScene from '../components/homepage/ExecutionScene';
import OrchestrationScene from '../components/homepage/OrchestrationScene';
import WorkspaceScene from '../components/homepage/WorkspaceScene';
import Footer from '../components/homepage/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Head>
        <title>Aetheria AI | The AI Operating System</title>
        <meta name="description" content="Execution at Machine Speed. Aetheria doesn't just answer—it builds, deploys, and orchestrates autonomously." />
      </Head>
      
      <main className="bg-black text-white min-h-screen relative selection:bg-white/20 selection:text-white">
        
        {/* Global ambient particle system for scene continuity */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
           <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
           <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        <Header />

        <div className="relative z-10">
          <HeroScene />
          <ExecutionScene />
          <OrchestrationScene />
          <WorkspaceScene />
        </div>
        
        <Footer />
      </main>
    </SmoothScroll>
  );
}