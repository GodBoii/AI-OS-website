import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Aetheria AI</title>
        <meta name="description" content="Privacy Policy for Aetheria AI" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-2">Your privacy is important. Aetheria AI does not share your personal data with third parties.</p>
        <p className="mb-2">For any privacy concerns, contact Prajwal Ghadge:</p>
        <div className="mb-2">Email: <a href="mailto:prajwalghadge2005@gmail.com" className="text-blue-400 underline">prajwalghadge2005@gmail.com</a></div>
        <div className="mb-2">Phone: <a href="tel:9619039912" className="text-blue-400 underline">9619039912</a></div>
        <div className="mt-8 text-gray-400">developed by Prajwal Ghadge</div>
      </div>
    </>
  );
}
