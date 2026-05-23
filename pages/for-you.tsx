import SEO from '../components/SEO';
import Layout from '../components/Layout';
import ForYouSection from '../components/ForYouSection';

export default function ForYouPage() {
  return (
    <Layout>
      <SEO 
        title="For You | Aetheria AI Integrations"
        description="Custom integrations tailored to your workflows. Connect Aetheria AI with GitHub, Google Workspace, Slack, and your local filesystem."
      />
      <div className="min-h-screen">
        {/* We reuse the ForYouSection component here */}
        <ForYouSection />
      </div>
    </Layout>
  );
}
