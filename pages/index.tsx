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
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Get Started?</span>
          </h2>
          <p className="text-xl mb-16 max-w-2xl mx-auto text-gray-400">
            Select your target environment and start delegating tasks in seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {downloads.map((item, i) => (
              <a
                key={i}
                href={item.path}
                target={item.path !== '#' ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 rounded-xl border p-4 transition-all w-full sm:w-[calc(50%-1rem)] md:w-auto md:flex-1 ${item.path !== '#' ? 'border-white/10 bg-surface hover:bg-white/5 hover:border-primary/50 cursor-pointer' : 'border-white/5 bg-surface/50 cursor-default opacity-50'}`}
              >
                <div className="text-3xl bg-white/5 p-3 rounded-lg group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="text-left">
                  <div className="font-bold text-white mb-1">{item.platform}</div>
                  <div className="text-xs text-gray-400">{item.specs}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16">
            <Link href="/auth/signup" className="bg-primary text-black px-10 py-4 font-bold rounded-xl text-lg hover:bg-primary-dark inline-flex items-center gap-2 transition-all shadow-glow">
              Create Free Account
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}