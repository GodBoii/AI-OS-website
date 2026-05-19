import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Multi-Agent Swarm',
      desc: 'Specialized AI agents for coding, research, and data analysis working in tandem.',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'Full System Control',
      desc: 'Native filesystem access, Ubuntu sandbox terminal, and complete computer workspace control.',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Deep Integrations',
      desc: 'Seamlessly works with Gmail, Drive, Sheets, Vercel, Supabase, WhatsApp, GitHub, and more.',
      icon: (
        <svg className="w-6 h-6 text-yellow-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      title: 'End-to-End Deployment',
      desc: 'Writes code, provisions subdomains, and hosts your websites directly from the app.',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    },
    {
      title: 'Infinite Context',
      desc: 'Stateful sandbox execution that remembers your project context indefinitely.',
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      title: 'Local Privacy',
      desc: 'Powerful on-device processing capabilities ensuring your sensitive data never leaves.',
      icon: (
        <svg className="w-6 h-6 text-yellow-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  const downloads = [
    { platform: 'Windows', icon: '🪟', specs: 'v1.2.21 (64-bit)', path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.21/Aetheria.AI.Setup.1.2.21.exe' },
    { platform: 'macOS', icon: '🍎', specs: 'Coming Soon', path: '#' },
    { platform: 'Linux', icon: '🐧', specs: 'AppImage (v1.2.0)', path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.0/Aetheria.AI-1.2.0.AppImage' },
    { platform: 'Web', icon: '🌐', specs: 'PWA Mobile / Desktop', path: 'https://aetheria-ai-mobile.vercel.app/' }
  ];

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

      {/* MINIMAL FEATURES SECTION */}
      <section id="features" className="py-24 relative z-10 border-t border-white/5 bg-surface/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <div className="group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Full System Control</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Native filesystem access, Ubuntu sandbox terminal, and complete computer workspace control natively.
              </p>
            </div>
            
            <div className="group">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 border border-accent/20 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">End-to-End Execution</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Writes code, provisions subdomains, and hosts your websites directly from the app autonomously.
              </p>
            </div>

            <div className="group">
              <div className="w-12 h-12 rounded-2xl bg-yellow-accent/10 flex items-center justify-center text-yellow-accent mb-6 border border-yellow-accent/20 group-hover:scale-110 group-hover:bg-yellow-accent/20 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Local Privacy</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Powerful on-device processing capabilities ensuring your sensitive data never leaves your environment.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* DOWNLOAD SECTION */}
      <section id="download" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Aetheria AI</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-400">
              Select your target environment and download the application.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
            {/* Windows Download */}
            <div className="flex-1 bg-surface/50 border border-white/10 rounded-2xl p-10 flex flex-col items-center text-center hover:border-primary/50 transition-all group">
              <svg className="w-20 h-20 text-[#00a4ef] mb-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
              <h3 className="text-2xl font-bold text-white mb-2">Windows</h3>
              <p className="text-gray-400 mb-8">Windows 10 and 11 (64-bit)</p>
              <a href="https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.21/Aetheria.AI.Setup.1.2.21.exe" className="mt-auto w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download .exe
              </a>
            </div>

            {/* Linux Download */}
            <div className="flex-1 bg-surface/50 border border-white/10 rounded-2xl p-10 flex flex-col items-center text-center hover:border-accent/50 transition-all group">
              <svg className="w-20 h-20 text-white mb-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 448 512"><path d="M220.8 123.3c1-.5 1.8-1.7 3-1.7 1.1 0 2.8 1.5 3.5 1.9 1.4 1.1 2.8 2.1 4.3 3.2 2.1 1.6 4.3 3.4 6.2 5.3 4.6 4.3 7.8 9.8 10.7 15.6 2.3 4.6 4.6 9.3 6.3 14.3 1.9 5.3 2.9 10.9 4 16.4 1 5.3 1.4 10.9 2.1 16.2.7 5.7 1.4 11.5 1.4 17.3 0 7.3-.6 14.7-1.4 22-.7 5.7-1.4 11.5-2.6 17.1-.9 4.6-2.1 9.2-3.4 13.7-1.4 4.3-3.1 8.4-5 12.5-2.3 5-4.8 9.9-7.9 14.4-2.8 4.3-5.9 8.4-9.6 12-3.2 3.2-6.9 6-10.7 8.5-3.8 2.5-8.1 4.5-12.5 6-4.5 1.4-9.2 2.1-14.1 2.1-4.8 0-9.6-.7-14.1-2.1-4.4-1.5-8.7-3.5-12.5-6-3.8-2.5-7.5-5.3-10.7-8.5-3.7-3.6-6.8-7.7-9.6-12-3.1-4.5-5.6-9.4-7.9-14.4-1.9-4.1-3.6-8.2-5-12.5-1.3-4.5-2.5-9.1-3.4-13.7-1.2-5.6-1.9-11.4-2.6-17.1-.8-7.3-1.4-14.7-1.4-22 0-5.8.7-11.6 1.4-17.3.7-5.3 1.1-10.9 2.1-16.2 1.1-5.5 2.1-11.1 4-16.4 1.7-5 4-9.7 6.3-14.3 2.9-5.8 6.1-11.3 10.7-15.6 1.9-1.9 4.1-3.7 6.2-5.3 1.5-1.1 2.9-2.1 4.3-3.2.7-.4 2.4-1.9 3.5-1.9 1.2 0 2 .9 3 1.4zM416 304.6c0 23.3-13.3 44.5-34.1 54.3-21.7 10.1-47.5 9-68.2-2.9-20.7-11.9-33.7-33.8-33.7-57.8 0-23.3 13.3-44.5 34.1-54.3 21.7-10.1 47.5-9 68.2 2.9 20.7 11.9 33.7 33.8 33.7 57.8zM167.2 304.6c0 23.9-13 45.9-33.7 57.8-20.7 11.9-46.5 13-68.2 2.9-20.8-9.8-34.1-31-34.1-54.3 0-23.9 13-45.9 33.7-57.8 20.7-11.9 46.5-13 68.2-2.9 20.8 9.8 34.1 31 34.1 54.3zM349.3 478.4c-22.3 19.3-52.6 28.5-82.6 25-29.4-3.4-55.8-20.3-71.7-45.7-15.5-24.9-19-55.8-9.4-83.6 9.3-27 30.6-48.8 57.1-58.4 27.2-9.8 58.1-6.1 82.6 10 24.3 15.9 40.5 42.1 43.6 71.3 3.2 30.1-6.7 59.5-27.1 81.4z" /></svg>
              <h3 className="text-2xl font-bold text-white mb-2">Linux</h3>
              <p className="text-gray-400 mb-8">Debian, Ubuntu (.deb)</p>
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