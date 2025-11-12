/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optimize for Vercel deployment with SSG + Serverless Functions
  // DO NOT use output: 'export' - it would break the /api/demo route

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Compress output
  compress: true,
}

module.exports = nextConfig
