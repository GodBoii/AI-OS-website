import { GetServerSideProps } from 'next';

const Sitemap = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = 'https://aetheria.ai';
  const pages = [
    '',
    '/careers',
    '/changelog',
    '/contact',
    '/download',
    '/for-you',
    '/investor',
    '/playbook',
    '/pricing',
    '/privacy-policy',
    '/terms',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      return `
  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('')}
</urlset>
`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap.trim());
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
