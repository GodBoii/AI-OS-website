import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - AI-OS</title>
        <meta name="description" content="Terms of Service for AI-OS" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-2">By using AI-OS, you agree to use the service responsibly and abide by all applicable laws.</p>
        <p className="mb-2">For questions, contact Prajwal Ghadge:</p>
        <div className="mb-2">Email: <a href="mailto:prajwalghadge2005@gmail.com" className="text-blue-400 underline">prajwalghadge2005@gmail.com</a></div>
        <div className="mb-2">Phone: <a href="tel:9619039912" className="text-blue-400 underline">9619039912</a></div>
        <div className="mt-8 text-gray-400">developed by Prajwal Ghadge</div>
      </div>
    </>
  );
}
