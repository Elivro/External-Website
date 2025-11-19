import { MetadataRoute } from 'next'
import { getAllGuides, getAllComparisons, getAllBlogPosts } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://elivro.se'

  // Get all content
  const guides = await getAllGuides()
  const comparisons = await getAllComparisons()
  const blogPosts = await getAllBlogPosts()

  // Guide URLs
  const guideUrls = guides.map((guide) => ({
    url: `${baseUrl}/resurser/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Comparison URLs
  const comparisonUrls = comparisons.map((comparison) => ({
    url: `${baseUrl}/jamfor/${comparison.slug}`,
    lastModified: new Date(comparison.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // High priority for high-intent keywords
  }))

  // Blog URLs
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blogg/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/resurser`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jamfor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogg`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...guideUrls,
    ...comparisonUrls,
    ...blogUrls,
  ]
}
