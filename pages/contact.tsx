import Head from 'next/head';
import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>CONTACT // Aetheria</title>
        <meta name="description" content="Secure line for Aetheria AI inquiries." />
      </Head>
      <div className="bg-neo-bg min-h-screen">
        <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
          <div className="mb-12">
            <div className="w-24 h-24 bg-black text-white flex items-center justify-center mx-auto mb-6 text-4xl shadow-brutal">
              ✉
            </div>
            <h1 className="text-6xl font-black uppercase mb-4">Contact</h1>
            <p className="font-mono text-xl border-y-2 border-black py-4">Secure communication channels.</p>
          </div>

          <div className="card-brutal p-8 text-left space-y-6">
            <div>
              <span className="text-xs font-bold uppercase bg-neo-lime px-2">Email Protocol</span>
              <a href="mailto:prajwalghadge2005@gmail.com" className="block text-2xl font-black hover:text-neo-blue break-all">prajwalghadge2005@gmail.com</a>
            </div>
            <div>
              <span className="text-xs font-bold uppercase bg-neo-pink px-2 text-white">Direct Line</span>
              <a href="tel:9619039912" className="block text-2xl font-black hover:text-neo-blue">9619039912</a>
            </div>
            <div className="border-t-2 border-black pt-4 font-mono text-xs">
              SYSTEM_DEV: Prajwal Ghadge
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
