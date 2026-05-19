import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { FaWindows, FaLinux } from 'react-icons/fa';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <Layout>
      <Head>
        <title>Aetheria AI | Your Autonomous AI Assistant</title>
        <meta name="description" content="The AI assistant that actually gets work done. Writes code, manages integrations, and executes tasks like a human." />
      </Head>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
            The AI Assistant That <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-yellow-accent">Replaces Human Execution</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed px-2" style={{ animationDelay: '0.2s' }}>
            Aetheria doesn't just answer questions. It writes end-to-end code, deploys websites, controls your computer workspace, and natively integrates with your favorite tools to execute complex workflows autonomously.
          </p>

          {/* Main Visual Image with Parallax Scroll */}
          <div className="relative mx-auto max-w-6xl flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
             <div className="relative w-[100%] md:w-[95%] z-20 mt-8 md:mt-12 transition-transform duration-75 ease-out"
                  style={{ transform: `translateY(${scrollY * -0.05}px)` }}>
               <img src="/landing_page.png" alt="Aetheria Workspace" className="w-full rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-surface" />
             </div>
          </div>
        </div>
      </section>



      {/* DOWNLOAD SECTION */}
      <section id="download" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
              Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Aetheria AI</span>
            </h2>
            <p className="text-base md:text-xl max-w-2xl mx-auto text-gray-400">
              Select your target environment and download the application.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Windows Download */}
            <div className="flex-1 bg-surface/50 border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col items-center text-center hover:border-primary/50 transition-all group">
              <FaWindows className="w-14 h-14 md:w-20 md:h-20 text-[#00a4ef] mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Windows</h3>
              <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">Windows 10 and 11 (64-bit)</p>
              <a href="https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.21/Aetheria.AI.Setup.1.2.21.exe" className="mt-auto w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download .exe
              </a>
            </div>

            {/* Linux Download */}
            <div className="flex-1 bg-surface/50 border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col items-center text-center hover:border-accent/50 transition-all group">
              <FaLinux className="w-14 h-14 md:w-20 md:h-20 text-white mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Linux</h3>
              <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">Debian, Ubuntu (.deb)</p>
              <a href="https://github.com/GodBoii/AI-OS-website/releases" className="mt-auto w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download .deb
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}