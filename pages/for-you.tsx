import Head from 'next/head';
import Layout from '../components/Layout';
import ForYouSection from '../components/ForYouSection';

export default function ForYouPage() {
  return (
    <Layout>
      <Head>
        <title>For You | Aetheria AI Integrations</title>
        <meta name="description" content="Explore Aetheria AI integrations with GitHub, Gmail, Drive, Sheets, Vercel, Supabase, and WhatsApp." />
      </Head>
      <div className="min-h-screen">
        {/* We reuse the ForYouSection component here */}
        <ForYouSection />
      </div>
    </Layout>
  );
}
