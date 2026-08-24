import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { plainTitle } from '@/components/underlag/EmphasisTitle'
import { CATEGORY_LABEL, formatDate, getArticles, isRevised } from '@/lib/underlag'

export const revalidate = 1800

/**
 * Metadata is generated, not static, for one reason: an index with nothing
 * on it is a thin page. While the list is empty the hub self-excludes from
 * the index (and from sitemap.ts, separately). It starts being indexable
 * the moment the first article is published — no deploy, no checklist item
 * to forget.
 */
export async function generateMetadata(): Promise<Metadata> {
  const articles = await getArticles('underlag')
  const empty = articles.length === 0

  return {
    alternates: { canonical: '/underlag' },
    title: 'Underlag',
    description:
      'Regelverk, ersättningsnivåer och rutiner inom personlig assistans — skrivet för dig som driver verksamheten. Varje sida är daterad och skrivs om när reglerna ändras.',
    robots: empty
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
    openGraph: {
      type: 'website',
      url: 'https://elivro.se/underlag',
      title: 'Underlag — Elivro',
      description:
        'Regelverk, ersättningsnivåer och rutiner inom personlig assistans, skrivet för dig som driver verksamheten.',
    },
  }
}

export default async function UnderlagIndex() {
  const articles = await getArticles('underlag')

  return (
    <main id="main-content" className="min-h-screen bg-paper text-ink">
      <Navbar />

      <div data-surface="light">
        {/* ---- header ---- */}
        <header className="mx-auto max-w-7xl px-6 lg:px-12 pt-20 pb-14 md:pt-28 md:pb-20">
          <div className="max-w-3xl">
            <p className="underlag-kicker mb-6">Underlag</p>
            <h1 className="mb-7">
              Underlag för dig som inte har tid att <em>gissa</em>.
            </h1>
            <p className="text-[17px] leading-[1.55] text-n-700 max-w-[62ch]">
              Regelverk, ersättningsnivåer och rutiner inom personlig assistans, skrivet
              för dig som driver verksamheten. Varje sida är daterad. När reglerna ändras
              skriver vi om sidan — vi publicerar inte en ny.
            </p>
          </div>
        </header>

        {/* ---- list ---- */}
        <section className="mx-auto max-w-7xl px-6 lg:px-12 pb-24 md:pb-32">
          {articles.length === 0 ? (
            <div className="border-t border-[var(--line-strong)] pt-10">
              <p className="text-[17px] leading-[1.55] text-n-600 max-w-[58ch]">
                De första underlagen publiceras inom kort. Vill du veta när de är uppe,{' '}
                <a
                  href="mailto:daniel@elivro.se"
                  className="text-ink underline underline-offset-[3px] decoration-[var(--line-strong)] hover:decoration-[var(--red)] transition-colors"
                >
                  skriv en rad
                </a>
                .
              </p>
            </div>
          ) : (
            <ul className="border-t border-[var(--line-strong)] max-w-4xl">
              {articles.map((article) => {
                const revised = isRevised(article.publishedAt, article.updatedAt)
                return (
                  <li key={article.id} className="border-b border-[var(--line)]">
                    <Link
                      href={`/underlag/${article.slug}`}
                      className="underlag-row group block py-8 md:py-10"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-3">
                        <span className="underlag-kicker">
                          {CATEGORY_LABEL[article.category] ?? article.category}
                        </span>
                        <span className="underlag-meta">
                          {revised ? 'Uppdaterad ' : ''}
                          {formatDate(revised ? article.updatedAt : article.publishedAt)}
                        </span>
                      </div>

                      {/* Semantically an h2 under the page h1; scaled down in
                          underlag-prose.css because the bare h2 rule is a
                          64px section-opener. */}
                      <h2 className="underlag-row-title mb-3">{plainTitle(article.title)}</h2>

                      <p className="text-[16px] leading-[1.55] text-n-600 max-w-[64ch]">
                        {article.dek}
                      </p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>

      <div data-surface="dark">
        <Footer />
      </div>
    </main>
  )
}
