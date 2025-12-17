import Head from 'next/head';
import Layout from '../components/Layout';

export default function Terms() {
  return (
    <Layout>
      <Head>
        <title>TERMS // Aetheria</title>
        <meta name="description" content="Terms of Service for Aetheria AI" />
      </Head>
      <div className="bg-neo-bg min-h-screen py-20 font-sans">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-16 border-b-4 border-black pb-8">
            <h1 className="text-6xl font-black uppercase mb-4">Terms of Service</h1>
            <p className="font-mono text-xl bg-neo-yellow border-2 border-black inline-block px-2 transform -rotate-1">v1.0.0 EFFECTIVE IMMEDIATELY</p>
          </header>

          <div className="space-y-12">
            <section className="card-brutal p-8">
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm mr-4">01</span>
                Acceptance
              </h2>
              <p className="font-mono leading-relaxed">
                By initializing the <strong>Aetheria AI OS</strong>, you agree to these terms.
                This software is provided "as is", without warranty of any kind.
                <br /><br />
                We build powerful tools. You agree to use them responsibly.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm mr-4">02</span>
                License
              </h2>
              <div className="border-l-4 border-neo-blue pl-6 py-2 bg-gray-50">
                <p className="font-bold mb-2">You are granted a limited, non-exclusive, non-transferable license to:</p>
                <ul className="list-square pl-5 font-mono text-sm space-y-2">
                  <li>Install and use the software for personal or internal business purposes.</li>
                  <li>Modify the source code if adhering to the accompanied open-source license.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm mr-4">03</span>
                Liability
              </h2>
              <p className="font-medium mb-4">
                In no event shall the authors or copyright holders be liable for any claim, damages, or other liability.
              </p>
              <div className="bg-red-100 border-2 border-red-500 text-red-600 p-4 font-bold uppercase text-sm">
                Warning: Use of automated agents carries inherent risks. Man-in-the-loop is recommended.
              </div>
            </section>

            <section className="bg-gray-100 border-2 border-dashed border-gray-400 p-8">
              <h2 className="text-2xl font-black uppercase mb-4 text-gray-500">Legal Contact</h2>
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
