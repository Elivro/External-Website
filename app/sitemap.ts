import type { MetadataRoute } from 'next'
import { getArticles } from '@/lib/underlag'

const BASE = 'https://elivro.se'

// Regenerated hourly so a newly published article appears without a deploy.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/quiz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/integritetspolicy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Articles flagged noindex stay out — a URL that is in the sitemap and
  // noindex at the same time is a contradictory signal to a crawler.
  const articles = (await getArticles('underlag')).filter((a) => !a.seo?.noindex && !a.draft)

  // The index only enters the sitemap once it has something on it. An empty
  // hub submitted for crawling is a thin page, not a landing surface.
  if (articles.length === 0) return staticRoutes

  return [
    ...staticRoutes,
    {
      url: `${BASE}/underlag`,
      lastModified: articles[0]?.updatedAt ? new Date(articles[0].updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...articles.map((article) => ({
      url: `${BASE}/underlag/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
