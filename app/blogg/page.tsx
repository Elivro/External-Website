import Link from 'next/link'
import { getAllBlogPosts, formatDate } from '@/lib/content'

export const metadata = {
  title: 'Blogg | Elivro - Insikter om Personlig Assistans',
  description: 'Läs om FK-rapportering, GDPR, Lex Sarah, IVO-krav och bästa praxis för assistansbolag. Praktiska tips och guider från Elivro.',
  keywords: ['assistans blogg', 'FK rapportering tips', 'GDPR assistans', 'Lex Sarah', 'IVO inspektion', 'assistansbolag tips'],
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full">
            <span className="text-violet-300 text-sm font-medium">Kunskap & Insikter</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Elivro <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">Blogg</span>
          </h1>

          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Praktiska tips, guider och nyheter om FK-rapportering, compliance och
            kvalitet i personlig assistans.
          </p>

          <div className="flex flex-wrap gap-4 justify-center text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Expertkunskap</span>
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Praktiska exempel</span>
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Snabba läsningar</span>
            </span>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="p-12 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-xl text-zinc-400 mb-2">Bloggposter kommer snart...</p>
              <p className="text-sm text-zinc-500">
                Vi arbetar på att skapa värdefullt innehåll för dig. Under tiden, kolla in våra{' '}
                <Link href="/resurser" className="text-violet-400 hover:underline">
                  guider
                </Link>
                {' '}och{' '}
                <Link href="/jamfor" className="text-violet-400 hover:underline">
                  systemjämförelser
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogg/${post.slug}`}
                  className="group p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-violet-500/50 rounded-2xl transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-4 text-sm text-zinc-500">
                    <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-zinc-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <span className="text-sm text-zinc-500">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="text-violet-400 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section (for future use) */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Populära Ämnen
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center hover:border-violet-500/50 transition-all">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-white mb-2">FK-Rapportering</h3>
              <p className="text-sm text-zinc-400">Tips och guider för E-RÄK</p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center hover:border-violet-500/50 transition-all">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">GDPR & Säkerhet</h3>
              <p className="text-sm text-zinc-400">Dataskydd och compliance</p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center hover:border-violet-500/50 transition-all">
              <div className="text-4xl mb-3">⚖️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Lex Sarah & IVO</h3>
              <p className="text-sm text-zinc-400">Tillsyn och kvalitetssäkring</p>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center hover:border-violet-500/50 transition-all">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Bästa Praxis</h3>
              <p className="text-sm text-zinc-400">Tips från branschen</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vill du lära dig mer?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Ladda ner våra omfattande guider eller boka en demo för att se Elivro i aktion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resurser"
              className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Utforska guider
            </Link>
            <Link
              href="/#cta-section"
              className="px-8 py-4 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition border border-zinc-700"
            >
              Boka demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
