import type { MetadataRoute } from 'next'

/**
 * Robots policy. We *want* AI crawlers indexing the public landing page —
 * generative-search citations are a real source of qualified traffic for
 * a Swedish-language B2B niche. Listing the major AI bots explicitly is
 * defensive: even though `User-agent: *` already permits them, some bots
 * only respect rules under their named UA, and a few SaaS/CDN defaults
 * accidentally block them. The explicit allow-list closes that loophole.
 *
 * Admin and API routes stay private regardless of agent.
 */
const PRIVATE_PATHS = ['/admin', '/admin/*', '/api/*']

const AI_BOTS = [
  'GPTBot', // OpenAI's training crawler
  'OAI-SearchBot', // OpenAI live search
  'ChatGPT-User', // ChatGPT browsing
  'ClaudeBot', // Anthropic training/search
  'Claude-User', // Claude browsing
  'Claude-SearchBot', // Claude search
  'anthropic-ai', // legacy Anthropic UA
  'PerplexityBot', // Perplexity index
  'Perplexity-User', // Perplexity live fetch
  'Google-Extended', // controls inclusion in Bard/Gemini training
  'Applebot-Extended', // controls Apple Intelligence
  'CCBot', // Common Crawl (training data for many LLMs)
  'cohere-ai',
  'Bytespider', // ByteDance / Doubao
  'Meta-ExternalAgent',
  'Amazonbot',
  'DuckAssistBot',
  'Diffbot',
  'YouBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: 'https://elivro.se/sitemap.xml',
    host: 'https://elivro.se',
  }
}
