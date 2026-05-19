import Head from 'next/head';
import Layout from '../components/Layout';

export default function Terms() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service | Aetheria AI</title>
        <meta name="description" content="Terms of Service for Aetheria AI" />
      </Head>
      <div className="bg-neo-bg min-h-screen py-20 font-sans relative overflow-hidden pt-24 md:pt-32">
        {/* Background Effects */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <header className="mb-16 border-b border-white/10 pb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">Terms of Service</h1>
            <p className="font-mono text-sm bg-accent/10 text-accent inline-flex px-3 py-1 rounded-full border border-accent/20 font-medium">v1.0.0 EFFECTIVE IMMEDIATELY</p>
          </header>

          <div className="space-y-8 md:space-y-12">
            <section className="bg-surface-light/50 backdrop-blur-md border border-white/10 p-5 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-white">
                <span className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center text-lg font-semibold mr-4 shadow-glow-sm">01</span>
                Acceptance
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                By initializing the <strong className="text-white">Aetheria AI OS</strong>, you agree to these terms.
                This software is provided "as is", without warranty of any kind.
                <br /><br />
                We build powerful tools. You agree to use them responsibly.
              </p>
            </section>

            <section className="p-4 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-white">
                <span className="w-10 h-10 bg-accent/20 text-accent rounded-xl flex items-center justify-center text-lg font-semibold mr-4">02</span>
                License
              </h2>
              <div className="border-l-2 border-primary pl-6 py-2 bg-white/5 rounded-r-xl border-y border-r border-white/5">
                <p className="font-semibold mb-4 text-gray-200">You are granted a limited, non-exclusive, non-transferable license to:</p>
                <ul className="list-disc pl-5 font-mono text-sm space-y-3 text-gray-400">
                  <li>Install and use the software for personal or internal business purposes.</li>
                  <li>Modify the source code if adhering to the accompanied open-source license.</li>
                </ul>
              </div>
            </section>

            <section className="p-4 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-white">
                <span className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-lg font-semibold mr-4">03</span>
                Liability
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                In no event shall the authors or copyright holders be liable for any claim, damages, or other liability.
              </p>
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-5 rounded-xl font-medium flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span><strong>WARNING:</strong> Use of automated agents carries inherent risks. Man-in-the-loop is recommended.</span>
              </div>
            </section>

            <section className="bg-surface border border-white/10 rounded-2xl p-5 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>
              <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Legal Contact
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
