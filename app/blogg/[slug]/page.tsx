import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogPosts, getRelatedContent, formatDate } from '@/lib/content'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Bloggpost inte hittad | Elivro',
    }
  }

  return {
    title: `${post.title} | Elivro Blogg`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllBlogPosts()
  const relatedPosts = getRelatedContent(post.slug, allPosts, 3)

  // Create JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
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
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: post.keywords.join(', '),
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
              <Link href="/blogg" className="hover:text-violet-400 transition-colors">
                Blogg
              </Link>
              <span>→</span>
              <span className="text-white truncate">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="pt-12 pb-12 px-4 border-b border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-zinc-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
              <span>Publicerad: {formatDate(post.publishedAt)}</span>
              {post.updatedAt !== post.publishedAt && (
                <>
                  <span>·</span>
                  <span>Uppdaterad: {formatDate(post.updatedAt)}</span>
                </>
              )}
              <span>·</span>
              <span>Av {post.author}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-zinc prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-zinc-800
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-zinc-300 prose-p:leading-relaxed
              prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-zinc-300 prose-ol:text-zinc-300
              prose-li:marker:text-violet-400
              prose-blockquote:border-l-violet-500 prose-blockquote:bg-violet-500/5 prose-blockquote:py-1
              prose-code:text-violet-300 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded
              prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
              prose-table:border prose-table:border-zinc-800
              prose-th:bg-zinc-900 prose-th:text-white
              prose-td:border prose-td:border-zinc-800
              prose-img:rounded-xl prose-img:border prose-img:border-zinc-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Author Bio */}
        <section className="py-8 px-4 bg-zinc-900/30 border-y border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                E
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{post.author}</h3>
                <p className="text-zinc-400 mb-4">
                  Vi på Elivro är experter på personlig assistans, FK-rapportering och compliance.
                  Vår mission är att hjälpa assistansbolag fokusera på kvalitet genom smart automation.
                </p>
                <Link
                  href="/#cta-section"
                  className="text-violet-400 hover:underline text-sm font-medium"
                >
                  Boka en demo →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Relaterade artiklar</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blogg/${relatedPost.slug}`}
                    className="p-6 bg-zinc-800/50 border border-zinc-700 hover:border-violet-500/50 rounded-xl transition-all group"
                  >
                    <span className="text-xs text-violet-400 mb-2 block">{relatedPost.category}</span>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <span className="text-xs text-zinc-500">{relatedPost.readingTime}</span>
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
              Redo att förenkla er assistansverksamhet?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Boka en gratis demo och se hur Elivro kan hjälpa er fokusera på kvalitet
              istället för administration.
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
                Läs guider
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 justify-center mt-6 text-sm text-zinc-400">
              <span>✓ 30 dagars pengarna-tillbaka</span>
              <span>✓ Ingen bindningstid</span>
              <span>✓ Inget kreditkort krävs</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
