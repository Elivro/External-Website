const createMDX = require('@next/mdx')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable MDX support
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // Optimize for Vercel deployment with SSG + Serverless Functions
  // DO NOT use output: 'export' - it would break the /api/demo route

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Compress output
  compress: true,
}

// Simplified MDX configuration for Next.js 16 compatibility
const withMDX = createMDX({
  // No options - use defaults for now
  // We'll handle rendering on the client side
})

module.exports = withMDX(nextConfig)
