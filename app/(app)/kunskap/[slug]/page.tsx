import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleProse from '@/components/kunskap/ArticleProse'
import EmphasisTitle, { plainTitle } from '@/components/kunskap/EmphasisTitle'
import {
  CATEGORY_LABEL,
  authorName,
  formatDate,
  getArticleBySlug,
  getArticles,
  isRevised,
  metaDescription,
  metaTitle,
} from '@/lib/kunskap'

const BASE = 'https://elivro.se'

export const revalidate = 1800
// New articles resolve on first request instead of waiting for a rebuild.
export const dynamicParams = true

export async function generateStaticParams() {
  const articles = await getArticles('kunskap')
  return articles.map((a) => ({ slug: a.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: 'Sidan finns inte', robots: { index: false, follow: false } }
  }

  const title = plainTitle(metaTitle(article))
  const description = metaDescription(article)
  const url = `${BASE}/kunskap/${article.slug}`
  const noindex = Boolean(article.seo?.noindex) || article.draft

  return {
    // Declared per page, never in the layout — see app/(app)/layout.tsx.
    alternates: { canonical: `/kunskap/${article.slug}` },
    title,
    description,
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      locale: 'sv_SE',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function KunskapArticle({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) notFound()

  const url = `${BASE}/kunskap/${article.slug}`
  const title = plainTitle(article.title)
  const revised = isRevised(article.publishedAt, article.updatedAt)
  const category = CATEGORY_LABEL[article.category] ?? article.category

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: article.dek,
    inLanguage: 'sv-SE',
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    articleSection: category,
    isAccessibleForFree: true,
    author: { '@type': 'Organization', name: authorName(article) },
    publisher: {
      '@type': 'Organization',
      name: 'Elivro',
      url: BASE,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Elivro', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Kunskap', item: `${BASE}/kunskap` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  }

  return (
    <main id="main-content" className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Navbar />

      <div data-surface="light">
        <article className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 pb-24 md:pt-20 md:pb-32">
          {/* ---- breadcrumb ---- */}
          <nav aria-label="Brödsmulor" className="mb-10 text-[13px] text-n-400">
            <Link
              href="/kunskap"
              className="hover:text-ink transition-colors duration-200"
            >
              Kunskap
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-n-600">{category}</span>
          </nav>

          {/* ---- header ---- */}
          <header className="max-w-3xl mb-12 md:mb-16">
            <p className="kunskap-kicker mb-6">{category}</p>

            <h1 className="mb-6">
              <EmphasisTitle text={article.title} />
            </h1>

            <p className="text-[19px] leading-[1.5] text-n-700 max-w-[60ch] mb-8">
              {article.dek}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 kunskap-meta border-t border-[var(--line)] pt-5">
              {/* These pages are reference, not news. What a reader needs to
                  know is when the facts were last checked against the source,
                  so the revision date leads and the original publication date
                  becomes the quiet second line. A piece never revised shows
                  only "Publicerad". */}
              <span>{authorName(article)}</span>
              <span aria-hidden="true">·</span>
              {revised ? (
                <>
                  <span className="text-n-600">
                    Uppdaterad {formatDate(article.updatedAt)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Publicerad {formatDate(article.publishedAt)}</span>
                </>
              ) : (
                <span className="text-n-600">
                  Publicerad {formatDate(article.publishedAt)}
                </span>
              )}
            </div>
          </header>

          {/* ---- body ---- */}
          <ArticleProse html={article.html} />

          {/* ---- close ---- */}
          <aside className="max-w-[68ch] mt-20 pt-10 border-t border-[var(--line-strong)]">
            <p className="kunskap-kicker mb-5">Elivro</p>
            <p className="text-[17px] leading-[1.55] text-n-700 mb-7 max-w-[58ch]">
              Elivro är verksamhetssystemet som håller ihop schema, tid, rekrytering och
              kvalitetsledning i samma data. Byggt tillsammans med 2u Assistans i Västerås.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#startup-offer"
                className="inline-flex items-center rounded-full bg-ink px-[26px] py-[15px] text-[15px] font-semibold text-paper shadow-[0_6px_16px_-8px_rgba(17,17,17,0.4)] transition-all duration-200 hover:bg-n-900 hover:shadow-[0_10px_24px_-8px_rgba(17,17,17,0.5)]"
              >
                Boka demo
              </Link>
              <Link
                href="/kunskap"
                className="text-[15px] text-n-700 underline underline-offset-[3px] decoration-[var(--line-strong)] hover:text-ink hover:decoration-[var(--red)] transition-colors duration-200"
              >
                Mer kunskap
              </Link>
            </div>
          </aside>
        </article>
      </div>

      <div data-surface="dark">
        <Footer />
      </div>
    </main>
  )
}
