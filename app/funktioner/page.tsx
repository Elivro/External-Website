import { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Funktioner - AI-driven Rekrytering, Schema & Rapportering',
  description: 'Tre pelare för bättre assistans: intelligent matchning, smart schemaläggning med real-time budget, och automatisk FK-rapportering. Spara 40% jämfört med AIAI.',
  keywords: ['assistans funktioner', 'ai rekrytering assistans', 'schema assistans', 'fk rapportering', 'assistansplanering funktioner'],
  alternates: {
    canonical: 'https://elivro.se/funktioner'
  },
  openGraph: {
    title: 'Funktioner - AI-driven Rekrytering, Schema & Rapportering | Elivro',
    description: 'Tre pelare för bättre assistans: intelligent matchning, smart schemaläggning med real-time budget, och automatisk FK-rapportering.',
    url: 'https://elivro.se/funktioner',
    type: 'website'
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://elivro.se' },
    { '@type': 'ListItem', position: 2, name: 'Funktioner', item: 'https://elivro.se/funktioner' }
  ]
}

export default function FunktionerPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navbar />

      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Tre Pelare för Bättre Assistans
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
              Elivro kombinerar AI-driven rekrytering, intelligent schemaläggning och automatisk rapportering
              i ett system. Spara 40% jämfört med AIAI och Tidvis.
            </p>
          </div>
        </section>

        {/* Feature 1: Lättare Rekrytering */}
        <section className="py-16 px-4">
          <article className="max-w-4xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">🎯</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Lättare Rekrytering
                </h2>
              </div>

              <p className="text-xl text-zinc-300 mb-8">
                Matchning som bygger relationer, inte bara fyller scheman.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Problemet med Traditionell Rekrytering</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Traditionell rekrytering fokuserar på CV och formell kompetens. Resultatet?
                    Kortare anställningstider, missnöjda kunder och en evig cykel av rekrytering.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Hur Elivros AI Löser Det</h3>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Personkemi-analys:</strong> Vår AI analyserar inte bara CV utan också personlighet, värderingar och livserfarenhet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Behovsbaserad matchning:</strong> Matchar baserat på kundens unika behov, inte bara formella krav</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Geografisk optimering:</strong> Tar hänsyn till tillgänglighet och reslängd</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Arbetsförmedlingen API:</strong> Automatisk import av kandidater och annonsering</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Resultat</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Längre anställningstider när person och roll passar → djupare förståelse för kundens behov →
                    mindre stress för både assistent och kund → högre kvalitet i assistansen.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Feature 2: Snabbare Schemaläggning */}
          <article className="max-w-4xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">⚡</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Snabbare Schemaläggning
                </h2>
              </div>

              <p className="text-xl text-zinc-300 mb-8">
                Scheman som håller budgeten - i realtid.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Problemet med Manuell Schemaläggning</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Schema läggs i blindo. Först i efterhand upptäcker du att budgeten sprack för 3 veckor sedan.
                    FK-underlaget stämmer inte. Stress, konflikt och ekonomisk förlust.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Hur Elivro Löser Det</h3>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Real-time budgetkontroll:</strong> Se direkt om schemat håller sig inom budget innan du sparar</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Automatiska varningar:</strong> Får notis om budgeten närmar sig gränsen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Tillgänglighetsbaserad schemaläggning:</strong> Systemet föreslår bara assistenter som är tillgängliga</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Konfliktdetektering:</strong> Ingen dubbelbokning, inga överlappande pass</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Resultat</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Budgeten håller. FK-underlaget stämmer. Mindre stress, färre konflikter, bättre ekonomi.
                    Schemaläggningen går från timmar till minuter.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Feature 3: Enklare Rapportering */}
          <article className="max-w-4xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">📊</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Enklare Rapportering
                </h2>
              </div>

              <p className="text-xl text-zinc-300 mb-8">
                FK-underlag som stämmer - automatiskt.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Problemet med Manuell Rapportering</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Timmar spenderas på att samla ihop underlag. FK-rapporten stämmer inte med schemat.
                    Kompletteringskrav från FK. Försenade utbetalningar. Frustration.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Hur Elivro Löser Det</h3>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Automatisk FK-rapportering:</strong> Generera korrekta FK-underlag direkt från schemat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Tidrapportering i realtid:</strong> Assistenter rapporterar tid direkt i appen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Avvikelsehantering:</strong> Flagga och hantera avvikelser innan FK-rapport skickas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span><strong className="text-white">Export i FK-format:</strong> Rätt format första gången, inga kompletteringar</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Resultat</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    FK-rapportering går från dagar till minuter. Färre kompletteringar. Snabbare utbetalningar.
                    Mer tid till det som faktiskt skapar värde - kvaliteten i assistansen.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-violet-900/20 to-purple-900/20 rounded-2xl border border-violet-500/30 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Redo att Testa Alla Funktioner?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Boka en gratis demo och se hur Elivro kan förbättra din assistansplanering.
            </p>
            <Link
              href="/#cta-section"
              className="inline-block px-8 py-4 bg-white text-violet-600 rounded-full font-semibold text-lg hover:bg-zinc-100 transition-colors"
            >
              Boka Gratis Demo
            </Link>
            <p className="text-sm text-zinc-400 mt-4">
              Inget kreditkort krävs • 30 dagars pengarna-tillbaka-garanti
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
