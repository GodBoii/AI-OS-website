import SEO from '../components/SEO';
import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout>
      <SEO 
        title="Privacy Policy | Aetheria AI"
        description="Learn how Aetheria AI handles and secures your personal information, local files, and data integrations."
      />
      <div className="bg-neo-bg min-h-screen py-20 font-sans relative overflow-hidden pt-24 md:pt-32">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <header className="mb-16 border-b border-white/10 pb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">Privacy Protocol</h1>
            <p className="font-mono text-sm bg-white/10 text-gray-300 inline-flex px-3 py-1 rounded-full border border-white/10">Last Updated: DEC 2025</p>
          </header>

          <div className="space-y-8 md:space-y-12">
            <section className="bg-surface-light/50 backdrop-blur-md border border-white/10 p-5 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-white">
                <span className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center text-lg font-semibold mr-4 shadow-glow-sm">01</span>
                Data Sovereignty
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                <strong className="text-white">Aetheria AI</strong> is architected with a strict privacy-first doctrine.
                We do NOT monetize your personal data.
              </p>
              <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-emerald-400 font-medium flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span><strong>CORE PRINCIPLE:</strong> Your code, your files, and your keys stay on your machine.</span>
              </div>
            </section>

            <section className="p-4 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-white">
                <span className="w-10 h-10 bg-accent/20 text-accent rounded-xl flex items-center justify-center text-lg font-semibold mr-4">02</span>
                Data Collection
              </h2>
              <p className="text-gray-300 mb-6 text-lg">We only collect telemetry necessary for system health:</p>
              <ul className="space-y-4 font-mono text-sm text-gray-400">
                <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-accent"></div>
                  <div><strong className="text-gray-200">Authentication:</strong> Email/ID via Supabase.</div>
                </li>
                <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-accent"></div>
                  <div><strong className="text-gray-200">Usage Telemetry:</strong> Anonymized token counts (Inputs/Outputs).</div>
                </li>
                <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-accent"></div>
                  <div><strong className="text-gray-200">Errors:</strong> Stack traces for debugging (only if opted-in).</div>
                </li>
              </ul>
            </section>

            <section className="bg-surface border border-white/10 rounded-2xl p-5 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>
              <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Contact Officer
              </h2>
              <div className="font-mono text-sm space-y-3 text-gray-400">
                <div className="text-gray-300">Prajwal Ghadge</div>
                <a href="mailto:prajwalghadge2005@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <span className="w-4 h-4 text-center">✉</span> prajwalghadge2005@gmail.com
                </a>
                <a href="tel:9619039912" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <span className="w-4 h-4 text-center">☏</span> 9619039912
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
