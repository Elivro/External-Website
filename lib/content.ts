import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ContentMetadata {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: string
  updatedAt: string
  author: string
  category: string
  keywords: string[]
  readingTime: string
  downloadable?: boolean
  leadMagnet?: boolean
  downloads?: number
  excerpt?: string
}

// ==================== GUIDES ====================

export async function getAllGuides(): Promise<ContentMetadata[]> {
  const guidesDir = path.join(contentDirectory, 'pillar-guides')

  if (!fs.existsSync(guidesDir)) {
    console.warn('Guides directory not found:', guidesDir)
    return []
  }

  const files = fs.readdirSync(guidesDir)

  const guides = files
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const fullPath = path.join(guidesDir, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        content,
        publishedAt: data.publishedAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        author: data.author || 'Elivro Team',
        category: data.category || 'Guides',
        keywords: data.keywords || [],
        readingTime: readingTime(content).text,
        downloadable: data.downloadable || false,
        leadMagnet: data.leadMagnet || false,
        downloads: data.downloads || 0,
      }
    })

  return guides.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getGuideBySlug(slug: string): Promise<ContentMetadata | null> {
  try {
    const guidesDir = path.join(contentDirectory, 'pillar-guides')

    // Try .mdx first, then .md
    let fullPath = path.join(guidesDir, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(guidesDir, `${slug}.md`)
    }

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      content,
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
      author: data.author || 'Elivro Team',
      category: data.category || 'Guides',
      keywords: data.keywords || [],
      readingTime: readingTime(content).text,
      downloadable: data.downloadable || false,
      leadMagnet: data.leadMagnet || false,
    }
  } catch (error) {
    console.error('Error loading guide:', slug, error)
    return null
  }
}

// ==================== BLOG POSTS ====================

export async function getAllBlogPosts(): Promise<ContentMetadata[]> {
  const blogDir = path.join(contentDirectory, 'seo-blog')

  if (!fs.existsSync(blogDir)) {
    console.warn('Blog directory not found:', blogDir)
    return []
  }

  const files = fs.readdirSync(blogDir)

  const posts = files
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const fullPath = path.join(blogDir, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Extract first paragraph as excerpt
      const excerpt = data.excerpt || content.split('\n\n')[0].replace(/[#*_]/g, '').slice(0, 160)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        content,
        excerpt,
        publishedAt: data.publishedAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        author: data.author || 'Elivro Team',
        category: data.category || 'Blog',
        keywords: data.keywords || [],
        readingTime: readingTime(content).text,
      }
    })

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getBlogPostBySlug(slug: string): Promise<ContentMetadata | null> {
  try {
    const blogDir = path.join(contentDirectory, 'seo-blog')

    let fullPath = path.join(blogDir, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(blogDir, `${slug}.md`)
    }

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const excerpt = data.excerpt || content.split('\n\n')[0].replace(/[#*_]/g, '').slice(0, 160)

    return {
      slug,
      title: data.title,
      description: data.description,
      content,
      excerpt,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author,
      category: data.category || 'Blog',
      keywords: data.keywords,
      readingTime: readingTime(content).text,
    }
  } catch (error) {
    console.error('Error loading blog post:', slug, error)
    return null
  }
}

// ==================== COMPARISONS ====================

export async function getAllComparisons(): Promise<ContentMetadata[]> {
  const comparisonDir = path.join(contentDirectory, 'comparison-pages')

  if (!fs.existsSync(comparisonDir)) {
    console.warn('Comparison directory not found:', comparisonDir)
    return []
  }

  const files = fs.readdirSync(comparisonDir)

  const comparisons = files
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const fullPath = path.join(comparisonDir, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        content,
        publishedAt: data.publishedAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        author: data.author || 'Elivro Team',
        category: data.category || 'Comparison',
        keywords: data.keywords || [],
        readingTime: readingTime(content).text,
      }
    })

  return comparisons.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getComparisonBySlug(slug: string): Promise<ContentMetadata | null> {
  try {
    const comparisonDir = path.join(contentDirectory, 'comparison-pages')

    let fullPath = path.join(comparisonDir, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(comparisonDir, `${slug}.md`)
    }

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      content,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author,
      category: data.category || 'Comparison',
      keywords: data.keywords,
      readingTime: readingTime(content).text,
    }
  } catch (error) {
    console.error('Error loading comparison:', slug, error)
    return null
  }
}

// ==================== UTILITY FUNCTIONS ====================

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getRelatedContent(
  currentSlug: string,
  allContent: ContentMetadata[],
  limit: number = 3
): ContentMetadata[] {
  return allContent
    .filter((item) => item.slug !== currentSlug)
    .slice(0, limit)
}
