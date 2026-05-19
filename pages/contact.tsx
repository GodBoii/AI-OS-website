import Head from 'next/head';
import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact | Aetheria AI</title>
        <meta name="description" content="Secure line for Aetheria AI inquiries." />
      </Head>
      <div className="bg-neo-bg min-h-screen pt-12 relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
          <div className="mb-10 md:mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-surface border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl md:text-4xl shadow-glow">
              ✉️
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">Get in Touch</h1>
            <p className="text-gray-400 text-base md:text-lg">Secure communication channels for inquiries and support.</p>
          </div>

          <div className="card-brutal p-5 md:p-8 text-left space-y-6 md:space-y-8 bg-surface-light/50 backdrop-blur-md rounded-2xl border border-white/10">
            <div>
              <span className="text-xs font-semibold uppercase text-primary mb-2 block tracking-wider">Email Protocol</span>
              <a href="mailto:prajwalghadge2005@gmail.com" className="block text-xl sm:text-2xl font-bold text-white hover:text-primary transition-colors break-all">
                prajwalghadge2005@gmail.com
              </a>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-accent mb-2 block tracking-wider">Direct Line</span>
              <a href="tel:9619039912" className="block text-xl sm:text-2xl font-bold text-white hover:text-accent transition-colors">
                9619039912
              </a>
            </div>
            <div className="border-t border-white/10 pt-6 mt-4 flex items-center justify-between">
              <span className="font-mono text-xs text-gray-500">SYSTEM_DEV</span>
              <span className="font-semibold text-sm text-gray-300">Prajwal Ghadge</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
