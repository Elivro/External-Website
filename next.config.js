import { withPayload } from '@payloadcms/next/withPayload'

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

  // Mark Payload packages as external to avoid bundling issues with Turbopack
  serverExternalPackages: ['payload', '@payloadcms/db-postgres', 'pino', 'thread-stream'],
}

export default withPayload(nextConfig)
