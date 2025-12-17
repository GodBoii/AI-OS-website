import Head from 'next/head';
import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout>
      <Head>
        <title>PRIVACY // Aetheria</title>
        <meta name="description" content="Privacy Policy for Aetheria AI" />
      </Head>
      <div className="bg-neo-bg min-h-screen py-20 font-sans">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-16 border-b-4 border-black pb-8">
            <h1 className="text-6xl font-black uppercase mb-4">Privacy Protocol</h1>
            <p className="font-mono text-xl bg-black text-white inline-block px-2">Last Updated: DEC 2025</p>
          </header>

          <div className="space-y-12">
            <section className="card-brutal p-8">
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm mr-4">01</span>
                Data Sovereignty
              </h2>
              <p className="font-mono leading-relaxed mb-4">
                <strong>Aetheria AI</strong> is architected with a strict privacy-first doctrine.
                We do NOT monetize your personal data.
              </p>
              <div className="bg-neo-lime p-4 border-2 border-black font-bold text-sm">
                CORE PRINCIPLE: Your code, your files, and your keys stay on your machine.
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm mr-4">02</span>
                Data Collection
              </h2>
              <p className="font-medium mb-4">We only collect telemetry necessary for system health:</p>
              <ul className="list-disc pl-6 space-y-2 font-mono">
                <li><strong>Authentication:</strong> Email/ID via Supabase.</li>
                <li><strong>Usage Telemetry:</strong> Anonymized token counts (Inputs/Outputs).</li>
                <li><strong>Errors:</strong> Stack traces for debugging (only if opted-in).</li>
              </ul>
            </section>

            <section className="bg-gray-100 border-2 border-dashed border-gray-400 p-8">
              <h2 className="text-2xl font-black uppercase mb-4 text-gray-500">Contact Officer</h2>
              <div className="font-mono text-sm space-y-2">
                <div>Prajwal Ghadge</div>
                <a href="mailto:prajwalghadge2005@gmail.com" className="block hover:text-blue-600">prajwalghadge2005@gmail.com</a>
                <a href="tel:9619039912" className="block hover:text-blue-600">9619039912</a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
