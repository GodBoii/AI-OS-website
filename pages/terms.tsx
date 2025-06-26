import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Aetheria AI</title>
        <meta name="description" content="Terms of Service for Aetheria AI" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-2">By using Aetheria AI, you agree to use the service responsibly and abide by all applicable laws.</p>
        <p className="mb-2">For questions, contact Prajwal Ghadge:</p>
        <div className="mb-2">Email: <a href="mailto:prajwalghadge2005@gmail.com" className="text-blue-400 underline">prajwalghadge2005@gmail.com</a></div>
        <div className="mb-2">Phone: <a href="tel:9619039912" className="text-blue-400 underline">9619039912</a></div>
        <div className="mt-8 text-gray-400">developed by Prajwal Ghadge</div>
      </div>
    </>
  );
}
