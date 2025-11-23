import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elivro.se'
  const currentDate = new Date()

  // Static pages
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/integritetspolicy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    // TODO: Add these pages as you create them (Week 2)
    // {
    //   url: `${baseUrl}/funktioner`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.9,
    // },
    // {
    //   url: `${baseUrl}/priser`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.9,
    // },
    // {
    //   url: `${baseUrl}/hur-det-fungerar`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/om-oss`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.7,
    // },
    // {
    //   url: `${baseUrl}/jamforelse`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.9,
    // },
    // {
    //   url: `${baseUrl}/assistans-rekrytering`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/schema-assistans`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/fk-rapportering`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/blogg`,
    //   lastModified: currentDate,
    //   changeFrequency: 'daily' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/kontakt`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // },
  ]

  // TODO: Add blog posts dynamically when blog is created
  // Example:
  // const blogPosts = await getBlogPosts()
  // const blogRoutes = blogPosts.map((post) => ({
  //   url: `${baseUrl}/blogg/${post.slug}`,
  //   lastModified: new Date(post.publishedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return routes
}
