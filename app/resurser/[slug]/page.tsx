import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getGuideBySlug, getAllGuides, getRelatedContent, formatDate } from '@/lib/content'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/lib/mdx-components'

export async function generateStaticParams() {
  const guides = await getAllGuides()
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) {
    return {
      title: 'Guide inte hittad | Elivro',
    }
  }

  return {
    title: `${guide.title} | Elivro`,
    description: guide.description,
    keywords: guide.keywords,
    authors: [{ name: guide.author }],
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: [guide.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  const allGuides = await getAllGuides()
  const relatedGuides = getRelatedContent(guide.slug, allGuides, 3)

  // Create JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: {
      '@type': 'Organization',
      name: 'Elivro AB',
      url: 'https://elivro.se',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elivro AB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://elivro.se/logo.png',
      },
    },
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    keywords: guide.keywords.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-zinc-950">
        {/* Breadcrumb */}
        <div className="pt-24 pb-4 px-4 border-b border-zinc-900">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-zinc-500">
              <Link href="/" className="hover:text-violet-400 transition-colors">
                Hem
              </Link>
              <span>→</span>
              <Link href="/resurser" className="hover:text-violet-400 transition-colors">
                Resurser
              </Link>
              <span>→</span>
              <span className="text-white">{guide.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="pt-12 pb-12 px-4 border-b border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm rounded-full">
                {guide.category}
              </span>
              <span className="flex items-center gap-1 text-zinc-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {guide.readingTime}
              </span>
              {guide.downloadable && (
                <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">
                  📥 Nedladdningsbar
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {guide.title}
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed">
              {guide.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-zinc-500">
              <span>Publicerad: {formatDate(guide.publishedAt)}</span>
              <span>·</span>
              <span>Uppdaterad: {formatDate(guide.updatedAt)}</span>
              <span>·</span>
              <span>Av {guide.author}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-zinc prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4
              prose-h2:border-b-2 prose-h2:border-gradient-to-r prose-h2:from-violet-500/50 prose-h2:via-purple-500/30 prose-h2:to-transparent
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5 prose-h3:text-violet-200
              prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4 prose-h4:text-zinc-200
              prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-violet-400 prose-a:no-underline prose-a:font-medium hover:prose-a:underline hover:prose-a:text-violet-300
              prose-strong:text-white prose-strong:font-semibold prose-strong:bg-gradient-to-r prose-strong:from-violet-400/10 prose-strong:to-transparent prose-strong:px-1
              prose-ul:text-zinc-300 prose-ul:my-6 prose-ul:space-y-2
              prose-ol:text-zinc-300 prose-ol:my-6 prose-ol:space-y-2
              prose-li:marker:text-violet-400 prose-li:marker:font-bold prose-li:pl-2
              prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-violet-500/10 prose-blockquote:to-transparent
              prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8
              prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-zinc-200
              prose-code:text-violet-300 prose-code:bg-zinc-900 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-pre:bg-zinc-900 prose-pre:border-2 prose-pre:border-zinc-800 prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-8
              prose-table:border-2 prose-table:border-zinc-800 prose-table:rounded-xl prose-table:overflow-hidden prose-table:my-8
              prose-th:bg-zinc-900 prose-th:text-white prose-th:font-bold prose-th:py-4 prose-th:px-6
              prose-td:border prose-td:border-zinc-800 prose-td:py-4 prose-td:px-6
              prose-tr:hover:bg-zinc-800/30 prose-tr:transition-colors
              prose-img:rounded-xl prose-img:border-2 prose-img:border-zinc-800 prose-img:my-8 prose-img:shadow-2xl
              prose-hr:border-zinc-800 prose-hr:my-12">
              <MDXRemote source={guide.content} components={mdxComponents} />
            </div>
          </div>
        </article>

        {/* Related Content */}
        {relatedGuides.length > 0 && (
          <section className="py-12 px-4 bg-zinc-900/50 border-y border-zinc-800">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Fler resurser</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedGuides.map((relatedGuide) => (
                  <Link
                    key={relatedGuide.slug}
                    href={`/resurser/${relatedGuide.slug}`}
                    className="p-6 bg-zinc-800/50 border border-zinc-700 hover:border-violet-500/50 rounded-xl transition-all group"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors line-clamp-2">
                      {relatedGuide.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
                      {relatedGuide.description}
                    </p>
                    <span className="text-xs text-zinc-500">{relatedGuide.readingTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Redo att automatisera compliance?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Elivro hanterar FK, GDPR, Lex Sarah och IVO automatiskt –
              så du kan fokusera på det som betyder något: kvalitetsassistans.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#cta-section"
                className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
              >
                Boka gratis demo
              </Link>
              <Link
                href="/resurser"
                className="px-8 py-4 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition border border-zinc-700"
              >
                Fler guider
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
