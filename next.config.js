/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/privacy%20policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/privacy policy',
        destination: '/privacy-policy',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
