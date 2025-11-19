import Link from 'next/link'
import { getAllGuides } from '@/lib/content'

export const metadata = {
  title: 'Resurser för Assistansbolag | Elivro',
  description: 'Kompletta guider, checklistor och resurser för att driva högkvalitativ personlig assistans med fokus på FK, GDPR, Lex Sarah och IVO.',
  keywords: ['assistans guider', 'FK rapportering', 'GDPR assistans', 'Lex Sarah', 'IVO krav'],
}

export default async function ResourcesPage() {
  const guides = await getAllGuides()

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full">
            <span className="text-violet-300 text-sm font-medium">Gratis resurser</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Resurser för <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">Assistansbolag</span>
          </h1>

          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Kompletta guider, checklistor och verktyg för att navigera FK-krav, GDPR,
            Lex Sarah och IVO-inspektioner.
          </p>

          <div className="flex flex-wrap gap-4 justify-center text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Inga dolda avgifter</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Gratis nedladdning</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Uppdateras regelbundet</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Guides Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Kompletta Guider
            </h2>
            <p className="text-zinc-400">
              Djupdykningar i compliance, rapportering och kvalitetssäkring
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/resurser/${guide.slug}`}
                className="group p-8 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-violet-500/50 rounded-2xl transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">📚</div>
                  {guide.leadMagnet && (
                    <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs font-medium rounded-full">
                      Gratis PDF
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                  {guide.title}
                </h3>

                <p className="text-zinc-400 mb-6 line-clamp-2">
                  {guide.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {guide.readingTime}
                  </span>
                  <span>·</span>
                  <span>{guide.category}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-sm text-zinc-500">
                    {guide.downloadable && '📥 Nedladdningsbar'}
                  </span>
                  <span className="text-violet-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Resources Section */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-zinc-700/50 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Varför dessa resurser?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-white mb-2">Branschexpertis</h3>
                <p className="text-sm text-zinc-400">
                  Skrivna av team med erfarenhet från assistansbranschen sedan 2014
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="text-lg font-semibold text-white mb-2">Praktiskt applicerbara</h3>
                <p className="text-sm text-zinc-400">
                  Inte bara teori – konkreta checklistor och steg-för-steg-guider
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="text-lg font-semibold text-white mb-2">Uppdaterade</h3>
                <p className="text-sm text-zinc-400">
                  Regelbundet granskade och uppdaterade enligt senaste regelverk
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vill du förenkla FK, GDPR och IVO?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Elivro automatiserar compliance så du kan fokusera på kvalitetsassistans istället för administration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#cta-section"
              className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Boka gratis demo
            </Link>
            <Link
              href="/jamfor"
              className="px-8 py-4 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition border border-zinc-700"
            >
              Jämför assistanssystem
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
  )
}
