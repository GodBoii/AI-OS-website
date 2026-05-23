import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
  schemaType?: 'Organization' | 'SoftwareApplication' | 'WebSite' | 'None';
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  ogImage,
  canonicalUrl,
  ogType = 'website',
  noIndex = false,
  schemaType = 'None',
}) => {
  const router = useRouter();
  const siteUrl = 'https://aetheria.ai';
  
  const defaultTitle = 'Aetheria AI | The AI Operating System';
  const defaultDescription =
    "Execution at Machine Speed. Aetheria doesn't just answer—it builds, deploys, and orchestrates autonomous agent workflows across devices.";
  const defaultOgImage = `${siteUrl}/home-page.png`;

  const metaTitle = title ? title : defaultTitle;
  const metaDescription = description ? description : defaultDescription;
  
  // Construct canonical URL
  const path = router.asPath.split('?')[0];
  const canonical = canonicalUrl ? canonicalUrl : `${siteUrl}${path === '/' ? '' : path}`;
  const finalOgImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`) : defaultOgImage;

  // Structured Data (JSON-LD)
  const getStructuredData = () => {
    switch (schemaType) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          'name': 'Aetheria AI',
          'url': siteUrl,
          'logo': `${siteUrl}/icon.ico`,
          'sameAs': [
            'https://twitter.com/AetheriaAI',
            'https://github.com/AetheriaAI'
          ],
        };
      case 'SoftwareApplication':
        return {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Aetheria AI',
          'downloadUrl': `${siteUrl}/download`,
          'operatingSystem': 'Windows, macOS, Android, iOS',
          'applicationCategory': 'BusinessApplication, DeveloperApplication',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
          },
        };
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          'name': 'Aetheria AI',
          'url': siteUrl,
        };
      default:
        return null;
    }
  };

  const schemaData = getStructuredData();

  return (
    <Head>
      {/* Standard Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />

      {/* Robots Instructions */}
      {noIndex ? (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      ) : (
        <>
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />
        </>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="Aetheria AI" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:site" content="@AetheriaAI" />
      <meta name="twitter:creator" content="@AetheriaAI" />

      {/* Schema.org Structured Data */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
    </Head>
  );
};

export default SEO;
