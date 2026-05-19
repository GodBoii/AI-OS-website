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

          {/* Main Visual Collage with Parallax Scroll */}
          <div className="relative mx-auto max-w-6xl flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            
             {/* Left floating image */}
             <div 
               className="hidden md:block absolute top-0 -left-12 w-[35%] z-10 transition-transform duration-75 ease-out"
               style={{ transform: `translateY(${scrollY * -0.15}px)` }}
             >
               <img src="/coding-workspace-croped.png" alt="Coding Workspace" className="w-full rounded-2xl border border-white/10 shadow-2xl bg-surface" />
             </div>
             
             {/* Right floating image */}
             <div 
               className="hidden md:block absolute top-12 -right-12 w-[40%] z-10 transition-transform duration-75 ease-out"
               style={{ transform: `translateY(${scrollY * -0.25}px)` }}
             >
               <img src="/computer-workspace-croped.png" alt="Computer Workspace" className="w-full rounded-2xl border border-white/10 shadow-2xl bg-surface" />
             </div>

             {/* Center Main Image - Original home_page.png */}
             <div className="relative w-[100%] md:w-[95%] z-20 mt-8 md:mt-12 transition-transform duration-75 ease-out"
                  style={{ transform: `translateY(${scrollY * -0.05}px)` }}>
               <img src="/home_page.png" alt="Aetheria Workspace" className="w-full rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-surface" />
             </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent blur-[80px] -z-10 rounded-full"></div>
              <img src="/computer-workspace.png" alt="Computer Workspace Full" className="rounded-2xl border border-white/10 shadow-glow" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Designed for <span className="text-primary">Doers</span></h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Aetheria isn't just a chat interface. It provides an Ubuntu sandbox terminal and a full computer workspace. The AI agents have real agency to execute scripts, deploy subdomains, and iterate on solutions alongside you.
              </p>
              <ul className="space-y-4">
                {[
                  'Full control over a local computer workspace',
                  'Seamless integration with GitHub, Vercel, and Supabase',
                  'Writes and deploys production-ready code autonomously'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="py-24 bg-surface-light/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Unfair Advantages</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Built from the ground up to give you an edge in productivity and autonomous execution.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-surface border border-white/5 p-8 rounded-2xl hover:bg-surface-light hover:border-white/10 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="advantages" className="py-24 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Dominate The Competition</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Why leading teams are switching to Aetheria.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface-light overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-6 text-sm font-semibold text-gray-400 w-1/4">Capability</th>
                    <th className="p-6 text-lg font-bold text-white w-1/3">Aetheria AI</th>
                    <th className="p-6 text-sm font-semibold text-gray-500">Traditional Chatbots</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 text-gray-300 font-medium">Architecture</td>
                    <td className="p-6 text-primary font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Multi-Agent Swarm
                    </td>
                    <td className="p-6 text-gray-500">Single Instance</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 text-gray-300 font-medium">Execution</td>
                    <td className="p-6 text-primary font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Native System Access
                    </td>
                    <td className="p-6 text-gray-500">Sandboxed Text Only</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 text-gray-300 font-medium">Integrations</td>
                    <td className="p-6 text-primary font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Drive, GitHub, Vercel, etc.
                    </td>
                    <td className="p-6 text-gray-500">None / Very Limited</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 text-gray-300 font-medium">Context Window</td>
                    <td className="p-6 text-primary font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Infinite (Stateful)
                    </td>
                    <td className="p-6 text-gray-500">Limited (Stateless)</td>
                  </tr>
                </tbody>
              </table>
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