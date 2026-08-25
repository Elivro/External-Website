import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { cache } from 'react'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

/**
 * Read layer for the /kunskap editorial surface.
 *
 * Articles are markdown files in content/kunskap/, rendered at build time.
 * There is no database and no CMS: the content is version-controlled, the
 * pages are fully static, and the only thing that can break a deploy is a
 * malformed file — which shows up in the build, not in production.
 *
 * A page rewritten every January wants a diff history more than it wants an
 * admin UI, and Vercel preview deployments give a truer preview than any CMS
 * preview could.
 */

const CONTENT_DIR = join(process.cwd(), 'content', 'kunskap')

/**
 * Drafts are hidden on the production deployment and visible everywhere else —
 * local dev, a local production build, and Vercel preview deployments.
 *
 * That is the point of the flag: a piece can be read in its real rendered form,
 * and shared as a preview URL for domain review, without being public. Only
 * `VERCEL_ENV === 'production'` is the real site.
 */
const HIDE_DRAFTS = process.env.VERCEL_ENV === 'production'

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
  slug: string
  title: string
  dek: string
  category: ArticleCategory
  kind: 'kunskap' | 'omvarld'
  /** Rendered HTML for the body. */
  html: string
  publishedAt: string
  updatedAt: string
  author?: string | null
  /** True while the piece is still pending review. Never true in production. */
  draft: boolean
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    noindex?: boolean | null
  } | null
}

type Frontmatter = {
  slug?: string
  title?: string
  dek?: string
  category?: ArticleCategory
  kind?: 'kunskap' | 'omvarld'
  publishedAt?: string
  updatedAt?: string
  author?: string
  draft?: boolean
  seo?: { metaTitle?: string; metaDescription?: string; noindex?: boolean }
}

const processor = unified()
  .use(remarkParse)
  // GFM for pipe tables, which these pages lean on for belopp and comparisons.
  .use(remarkGfm)
  .use(remarkRehype)
  // Stable heading ids, so a section can be linked to directly.
  .use(rehypeSlug)
  .use(rehypeStringify)

async function renderMarkdown(body: string): Promise<string> {
  // Editorial notes to the author never reach the page.
  const clean = body.replace(/<!--[\s\S]*?-->/g, '').trim()
  const file = await processor.process(clean)
  return String(file)
}

async function readArticle(filename: string): Promise<Article | null> {
  const raw = await readFile(join(CONTENT_DIR, filename), 'utf8')
  const { data, content } = matter(raw)
  const front = data as Frontmatter

  // A file without a slug is not an article — README.md lives here too.
  if (!front.slug || !front.title) return null
  if (front.draft === true && HIDE_DRAFTS) return null

  return {
    slug: front.slug,
    title: front.title,
    dek: front.dek ?? '',
    category: (front.category ?? 'regelverk') as ArticleCategory,
    kind: front.kind ?? 'kunskap',
    html: await renderMarkdown(content),
    publishedAt: front.publishedAt ?? new Date(0).toISOString(),
    // No updatedAt in frontmatter means the page has not been revised since
    // publication, so the two dates are the same and no "Uppdaterad" shows.
    updatedAt: front.updatedAt ?? front.publishedAt ?? new Date(0).toISOString(),
    author: front.author ?? null,
    draft: front.draft === true,
    seo: front.seo ?? null,
  }
}

/**
 * Published articles of one kind, newest first.
 *
 * Cached per request: each route reads this twice per render, once in
 * generateMetadata and once in the component.
 */
export const getArticles = cache(async function getArticles(
  kind: 'kunskap' | 'omvarld' = 'kunskap',
): Promise<Article[]> {
  let files: string[]
  try {
    files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith('.md'))
  } catch {
    // No content directory yet is a valid state, not an error.
    return []
  }

  const articles = await Promise.all(
    files.map(async (file) => {
      try {
        return await readArticle(file)
      } catch (err) {
        // One malformed file must not take the whole index down. It is loud in
        // the build log and simply absent from the page.
        console.warn(`[kunskap] kunde inte läsa ${file}:`, (err as Error).message)
        return null
      }
    }),
  )

  return articles
    .filter((a): a is Article => a !== null && a.kind === kind)
    // Most recently revised first, not most recently written. On evergreen
    // reference the useful signal is which page was last checked against its
    // source — a 2024 page updated last month is more current than a 2026 one
    // that has sat untouched.
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
})

/** One published article by slug, or null. */
export const getArticleBySlug = cache(async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const articles = await getArticles('kunskap')
  return articles.find((a) => a.slug === slug) ?? null
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
  return article.author?.trim() ? article.author : 'Elivro'
}

export function metaTitle(article: Article): string {
  return article.seo?.metaTitle?.trim() || article.title
}

export function metaDescription(article: Article): string {
  return article.seo?.metaDescription?.trim() || article.dek
}
