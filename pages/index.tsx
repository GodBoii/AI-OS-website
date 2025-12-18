import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  const features = [
    {
      title: 'Multi-Agent Core',
      desc: 'Specialized AI agents for coding, research, and finance. They don\'t just chat; they execute.',
      emoji: '🧠',
      color: 'bg-neo-blue'
    },
    {
      title: 'Target: All Devices',
      desc: 'Functionality parity across Android, iOS, Windows, and macOS. No compromises.',
      emoji: '🌐',
      color: 'bg-neo-pink'
    },
    {
      title: 'Deep Roots',
      desc: 'Native filesystem access. GitHub integration. Google Suite. It lives where you work.',
      emoji: '⚡',
      color: 'bg-neo-lime'
    },
    {
      title: 'Chain Reaction',
      desc: 'Automate complex workflows by chaining agents. One command, infinite actions.',
      emoji: '⚙️',
      color: 'bg-neo-yellow'
    },
    {
      title: 'Infinite Memory',
      desc: 'Stateful sandbox execution. It remembers your project context forever.',
      emoji: '💾',
      color: 'bg-neo-mint'
    },
    {
      title: 'Ironclad Privacy',
      desc: 'Local processing capabilities. Your data stays on your machine.',
      emoji: '🔒',
      color: 'bg-red-500'
    }
  ];

  const downloads = [
    { platform: 'WINDOWS', emoji: '🪟', specs: 'v1.1.5 (64-bit)', path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.1.5/Aetheria.AI.Setup.1.1.5.exe' },
    { platform: 'MACOS', emoji: '🍎', specs: 'Coming Soon', path: '#' },
    { platform: 'LINUX', emoji: '🐧', specs: 'AppImage (v1.1.5)', path: 'https://github.com/GodBoii/AI-OS-website/releases/download/v1.1.5/Aetheria.AI-1.1.5.AppImage' },
    { platform: 'ANDROID', emoji: '📱', specs: 'PWA Mobile', path: 'https://aetheria-ai-mobile.vercel.app/' },
    { platform: 'IOS', emoji: '📲', specs: 'PWA Mobile', path: 'https://aetheria-ai-mobile.vercel.app/' }
  ];

  return (
    <Layout>
      <Head>
        <title>AETHERIA // AI OS</title>
        <meta name="description" content="The Neo-Brutalist Operating System for AI Workflows." />
      </Head>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 border-b-4 border-black bg-neo-bg bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-neo-lime border-2 border-black px-4 py-1 font-mono font-bold text-sm mb-8 shadow-brutal-sm transform -rotate-2">
            v1.1.5 // SYSTEM ONLINE
          </div>

          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8 max-w-5xl mx-auto">
            The <span className="bg-black text-white px-2">Operating System</span> <br />
            For AI Workflows
          </h1>

          <p className="text-xl md:text-2xl font-mono mb-12 max-w-3xl mx-auto bg-white border-2 border-black p-4 shadow-brutal mx-auto">
            Replace 60-70 fragmented AI tools with one unified, brutally efficient engine.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link href="/auth/signup" className="btn-brutal bg-neo-blue text-white text-xl px-10 py-5 shadow-brutal-lg hover:-translate-y-1">
              Initialize System
            </Link>
            <Link href="#download" className="btn-brutal bg-white text-black text-xl px-10 py-5 hover:bg-gray-100">
              Download Binaries
            </Link>
          </div>

          {/* Main Visual */}
          <div className="relative mx-auto max-w-5xl">
            <div className="border-4 border-black bg-gray-200 rounded-none shadow-[12px_12px_0px_0px_#000] overflow-hidden">
              <div className="bg-black text-white p-2 flex items-center gap-2 border-b-4 border-black font-mono text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
                <span className="ml-2">~/aetheria-os/workspace</span>
              </div>
              <img src="/app-home-page.png" alt="Aetheria Dashboard" className="w-full h-auto grayscale-[20%] contrast-125" />
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGY SECTION */}
      <section className="border-b-4 border-black">
        <div className="grid md:grid-cols-2">
          {/* Left: Users */}
          <div className="bg-neo-yellow p-12 md:p-20 border-b-4 md:border-b-0 md:border-r-4 border-black relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-black pointer-events-none">01</div>
            <h2 className="text-5xl font-black uppercase mb-8 decoration-4 underline decoration-black underline-offset-4">For Users</h2>
            <ul className="space-y-6 font-bold text-xl">
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-black"></div>
                <span>Unified Intelligence Hub</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-black"></div>
                <span>Seamless Device Sync</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-black"></div>
                <span>Privacy by Default</span>
              </li>
            </ul>
          </div>

          {/* Right: Investors */}
          <div className="bg-neo-pink p-12 md:p-20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-black pointer-events-none">02</div>
            <h2 className="text-5xl font-black uppercase mb-8 text-black decoration-4 underline decoration-white underline-offset-4">For Investors</h2>
            <ul className="space-y-6 font-bold text-xl">
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-white border-2 border-black"></div>
                <span>Marketplace Network Effects</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-white border-2 border-black"></div>
                <span>High Switching Costs</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-white border-2 border-black"></div>
                <span>Defensible OS Strategy</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="py-24 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-black uppercase mb-20 text-center">Unfair Advantages</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="card-brutal hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] relative">
                <div className={`absolute -top-6 left-6 w-12 h-12 ${feature.color} border-2 border-black flex items-center justify-center text-2xl shadow-brutal`}>
                  {feature.emoji}
                </div>
                <h3 className="text-3xl font-black uppercase mt-4 mb-4">{feature.title}</h3>
                <p className="font-mono text-sm leading-relaxed border-t-2 border-black pt-4">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="advantages" className="py-24 bg-neo-bg border-b-4 border-black">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-black uppercase mb-16 text-center">
            Dominate <br /> The Competition
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-4 border-black text-left border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-6 text-2xl font-black uppercase border-r-2 border-white w-1/4">Feature</th>
                  <th className="p-6 text-2xl font-black uppercase bg-neo-lime text-black border-r-2 border-black w-1/3">Aetheria</th>
                  <th className="p-6 text-2xl font-black uppercase text-gray-500">Others</th>
                </tr>
              </thead>
              <tbody className="font-mono font-bold">
                <tr className="border-b-2 border-black hover:bg-gray-50">
                  <td className="p-6 border-r-2 border-black">Agent Architecture</td>
                  <td className="p-6 border-r-2 border-black bg-neo-lime/20">Multi-Agent Swarm</td>
                  <td className="p-6 text-gray-500">Single Chatbot</td>
                </tr>
                <tr className="border-b-2 border-black hover:bg-gray-50">
                  <td className="p-6 border-r-2 border-black">Execution</td>
                  <td className="p-6 border-r-2 border-black bg-neo-lime/20">Full Code & File Access</td>
                  <td className="p-6 text-gray-500">Sandboxed Text Only</td>
                </tr>
                <tr className="border-b-2 border-black hover:bg-gray-50">
                  <td className="p-6 border-r-2 border-black">Platform</td>
                  <td className="p-6 border-r-2 border-black bg-neo-lime/20">Native Desktop + Mobile</td>
                  <td className="p-6 text-gray-500">Web Wrapper</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-6 border-r-2 border-black">Cost</td>
                  <td className="p-6 border-r-2 border-black bg-neo-lime/20">Free Tier Generous</td>
                  <td className="p-6 text-gray-500">$20/mo Per User</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DOWNLOAD SECTION */}
      <section id="download" className="py-24 bg-black text-white border-b-4 border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl font-black uppercase mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-lime to-neo-cyan">Deploy Now</span>
          </h2>
          <p className="font-mono text-xl mb-16 max-w-2xl mx-auto text-gray-400">
            Select your target environment. Installation is instantaneous.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {downloads.map((item, i) => (
              <a
                key={i}
                href={item.path}
                target={item.path !== '#' ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`group bg-neutral-900 border-2 border-neutral-700 w-48 p-6 transition-colors relative overflow-hidden ${item.path !== '#' ? 'hover:bg-neo-lime hover:text-black hover:border-neo-lime cursor-pointer' : 'cursor-default opacity-50'}`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                <div className="font-black text-xl uppercase mb-1">{item.platform}</div>
                <div className="font-mono text-xs opacity-60 text-current">{item.specs}</div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white group-hover:bg-black"></div>
              </a>
            ))}
          </div>

          <div className="mt-16">
            <Link href="/auth/signup" className="btn-brutal bg-white text-black px-12 py-4 text-xl shadow-[6px_6px_0px_0px_#333] hover:shadow-[10px_10px_0px_0px_#fff] hover:bg-neo-cyan">
              START INSTALLATION
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}