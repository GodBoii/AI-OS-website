/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep a production review build separate from a running development server.
  distDir: process.env.AETHERIA_REVIEW === "1" ? ".next-review" : ".next",
  async redirects() {
    return [
      {
        source: "/privacy%20policy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/privacy policy",
        destination: "/privacy-policy",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
