import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Read layer for the /underlag editorial surface.
 *
 * Every call is fail-soft. A build with no DATABASE_URL reachable (CI, a
 * fresh clone, a Vercel preview without the env wired) renders an empty
 * index instead of failing the build — the surface degrades, the deploy
 * does not.
 */

export type ArticleCategory =
  | 'regelverk'
  | 'ersattning'
  | 'schemalaggning'
  | 'dokumentation'
  | 'systembyte'

export const CATEGORY_LABEL: Record<ArticleCategory, string> = {
  regelverk: 'Regelverk',
  ersattning: 'Ersättning',
  schemalaggning: 'Schemaläggning',
  dokumentation: 'Dokumentation',
  systembyte: 'Systembyte',
}

export type Article = {
  id: string | number
  title: string
  slug: string
  dek: string
  category: ArticleCategory
  content: unknown
  publishedAt: string
  updatedAt: string
  author?: { displayName?: string | null; email?: string | null } | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    noindex?: boolean | null
  } | null
}

async function client() {
  return getPayload({ config })
}

/**
 * Published articles of one kind, newest first. Never throws.
 *
 * Wrapped in React.cache: each route reads this twice per render — once in
 * generateMetadata, once in the component — and without deduping that is two
 * round-trips for identical data.
 */
export const getArticles = cache(async function getArticles(
  kind: 'underlag' | 'omvarld' = 'underlag',
): Promise<Article[]> {
  try {
    const payload = await client()
    const res = await payload.find({
      collection: 'articles',
      where: {
        and: [{ kind: { equals: kind } }, { _status: { equals: 'published' } }],
      },
      sort: '-publishedAt',
      limit: 200,
      depth: 1,
      draft: false,
    })
    return res.docs as unknown as Article[]
  } catch (err) {
    console.warn('[underlag] getArticles failed, rendering empty:', (err as Error).message)
    return []
  }
})

/** One published article by slug, or null. Never throws. Deduped per request. */
export const getArticleBySlug = cache(async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  try {
    const payload = await client()
    const res = await payload.find({
      collection: 'articles',
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      depth: 1,
      draft: false,
    })
    return (res.docs[0] as unknown as Article) ?? null
  } catch (err) {
    console.warn('[underlag] getArticleBySlug failed:', (err as Error).message)
    return null
  }
})

/** Swedish long date: "24 augusti 2026". */
export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return ''
  }
}

/** True when the two timestamps fall on different calendar days. */
export function isRevised(publishedAt: string, updatedAt: string): boolean {
  try {
    return new Date(publishedAt).toDateString() !== new Date(updatedAt).toDateString()
  } catch {
    return false
  }
}

export function authorName(article: Article): string {
  const name = article.author?.displayName
  return name && name.trim() ? name : 'Elivro'
}

export function metaTitle(article: Article): string {
  return article.seo?.metaTitle?.trim() || article.title
}

export function metaDescription(article: Article): string {
  return article.seo?.metaDescription?.trim() || article.dek
}
