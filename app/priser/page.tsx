import { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Priser - Transparent Prissättning från 449 kr/brukare/mån',
  description: 'Elivro kostar från 449 kr/brukare/mån med volymrabatter. Spara 40% jämfört med AIAI och Tidvis. Ingen bindningstid, 30 dagars garanti. Transparent prissättning - inga dolda kostnader.',
  keywords: ['assistans system pris', 'elivro pris', 'assistansplanering kostnad', 'aiai pris', 'tidvis pris', 'assistans mjukvara pris'],
  alternates: {
    canonical: 'https://elivro.se/priser'
  },
  openGraph: {
    title: 'Priser - Från 449 kr/brukare/mån | Elivro',
    description: 'Transparent prissättning från 449 kr/brukare/mån. Spara 40% jämfört med AIAI och Tidvis. Ingen bindningstid.',
    url: 'https://elivro.se/priser',
    type: 'website'
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://elivro.se' },
    { '@type': 'ListItem', position: 2, name: 'Priser', item: 'https://elivro.se/priser' }
  ]
}

export default function PriserPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navbar />

      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Transparent Prissättning
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
              Ingen dold prissättning. Ingen bindningstid. Ingen risk.
              Bara ärlig prissättning som skapar förtroende.
            </p>
          </div>
        </section>

        {/* Main Pricing */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Primary Pricing Card */}
            <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-sm border-2 border-violet-500/50 rounded-2xl p-8 md:p-12 mb-12">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-violet-500/20 rounded-full mb-4">
                  <span className="text-violet-300 font-semibold">Mest Populärt</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Från 449 kr<span className="text-2xl text-zinc-400">/brukare/mån</span>
                </h2>
                <p className="text-xl text-zinc-300">
                  Ju fler brukare, desto lägre pris per brukare
                </p>
              </div>

              {/* Volume Pricing Table */}
              <div className="bg-black/30 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Volymrabatter</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                    <div className="text-zinc-400 text-sm mb-2">10-24 brukare</div>
                    <div className="text-2xl font-bold text-white">449 kr</div>
                    <div className="text-zinc-500 text-sm">per brukare/mån</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                    <div className="text-zinc-400 text-sm mb-2">25-49 brukare</div>
                    <div className="text-2xl font-bold text-white">399 kr</div>
                    <div className="text-zinc-500 text-sm">per brukare/mån</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                    <div className="text-zinc-400 text-sm mb-2">50-99 brukare</div>
                    <div className="text-2xl font-bold text-white">349 kr</div>
                    <div className="text-zinc-500 text-sm">per brukare/mån</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
                    <div className="text-zinc-400 text-sm mb-2">100+ brukare</div>
                    <div className="text-2xl font-bold text-white">299 kr</div>
                    <div className="text-zinc-500 text-sm">per brukare/mån</div>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Allt Ingår</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">✓</span>
                    <span className="text-zinc-300">AI-driven rekrytering och matchning</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">✓</span>
                    <span className="text-zinc-300">Smart schemaläggning med budgetkontroll</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">✓</span>
                    <span className="text-zinc-300">Automatisk FK-rapportering</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">✓</span>
                    <span className="text-zinc-300">Tidrapportering i realtid</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">✓</span>
                    <span className="text-zinc-300">Mobilapp för assistenter</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">✓</span>
                    <span className="text-zinc-300">Arbetsförmedlingen-integration</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">✓</span>
                    <span className="text-zinc-300">Support och onboarding</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">✓</span>
                    <span className="text-zinc-300">Alla framtida uppdateringar</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/#cta-section"
                  className="inline-block px-8 py-4 bg-white text-violet-600 rounded-full font-semibold text-lg hover:bg-zinc-100 transition-colors"
                >
                  Boka Gratis Demo
                </Link>
                <p className="text-sm text-zinc-400 mt-4">
                  Ingen bindningstid • 30 dagars pengarna-tillbaka-garanti
                </p>
              </div>
            </div>

            {/* Comparison Section */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                Jämför med AIAI och Tidvis
              </h2>
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-4 px-4 text-zinc-400 font-semibold">Feature</th>
                      <th className="text-center py-4 px-4 text-white font-bold">Elivro</th>
                      <th className="text-center py-4 px-4 text-zinc-400">AIAI</th>
                      <th className="text-center py-4 px-4 text-zinc-400">Tidvis</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-700/50">
                      <td className="py-4 px-4">Transparent prissättning</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-400 text-xl">✓</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-red-400 text-xl">✗</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-red-400 text-xl">✗</span>
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-700/50">
                      <td className="py-4 px-4">Pris (ca. 50 brukare)</td>
                      <td className="text-center py-4 px-4 font-bold text-white">349 kr/brukare</td>
                      <td className="text-center py-4 px-4 text-zinc-500">~600 kr/brukare*</td>
                      <td className="text-center py-4 px-4 text-zinc-500">~550 kr/brukare*</td>
                    </tr>
                    <tr className="border-b border-zinc-700/50">
                      <td className="py-4 px-4">AI-driven rekrytering</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-400 text-xl">✓</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-red-400 text-xl">✗</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-red-400 text-xl">✗</span>
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-700/50">
                      <td className="py-4 px-4">Real-time budgetkontroll</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-400 text-xl">✓</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-yellow-400 text-xl">~</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-yellow-400 text-xl">~</span>
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-700/50">
                      <td className="py-4 px-4">Automatisk FK-rapportering</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-400 text-xl">✓</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-400 text-xl">✓</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-400 text-xl">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-700/50">
                      <td className="py-4 px-4">Ingen bindningstid</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-400 text-xl">✓</span>
                      </td>
                      <td className="text-center py-4 px-4 text-zinc-500">12 mån binding</td>
                      <td className="text-center py-4 px-4 text-zinc-500">12 mån binding</td>
                    </tr>
                    <tr className="border-b border-zinc-700/50">
                      <td className="py-4 px-4">30 dagars garanti</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-400 text-xl">✓</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-red-400 text-xl">✗</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-red-400 text-xl">✗</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-zinc-500 mt-6">
                  * Estimerat baserat på kundrapporter. AIAI och Tidvis publicerar inte sina priser.
                </p>
              </div>
            </div>

            {/* Typical Savings Example */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Spara 40% Jämfört med Konkurrenterna
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-zinc-400 mb-2">Elivro (50 brukare)</div>
                    <div className="text-3xl font-bold text-green-400">17 450 kr/mån</div>
                    <div className="text-sm text-zinc-500">349 kr × 50 brukare</div>
                  </div>
                  <div className="text-center">
                    <div className="text-zinc-400 mb-2">AIAI (50 brukare)</div>
                    <div className="text-3xl font-bold text-red-400">30 000 kr/mån</div>
                    <div className="text-sm text-zinc-500">~600 kr × 50 brukare</div>
                  </div>
                  <div className="text-center">
                    <div className="text-zinc-400 mb-2">Din Besparing</div>
                    <div className="text-3xl font-bold text-white">12 550 kr/mån</div>
                    <div className="text-sm text-zinc-500">150 600 kr/år</div>
                  </div>
                </div>
                <p className="text-center text-zinc-300">
                  Samma funktioner. Bättre kvalitet. 40% lägre pris.
                </p>
              </div>
            </div>

            {/* FAQ About Pricing */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Vanliga Frågor om Priser
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Finns det dolda kostnader?</h3>
                  <p className="text-zinc-300">
                    Nej. Priset inkluderar allt: alla funktioner, support, onboarding, och framtida uppdateringar.
                    Inga överraskningar.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Hur fungerar volymrabatten?</h3>
                  <p className="text-zinc-300">
                    Priset per brukare sjunker automatiskt när du har fler aktiva brukare. Du betalar alltid det lägsta priset baserat på ditt antal brukare.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Vad händer om jag inte är nöjd?</h3>
                  <p className="text-zinc-300">
                    Vi har en 30-dagars pengarna-tillbaka-garanti. Om Elivro inte fungerar för dig får du pengarna tillbaka, inga frågor.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Måste jag binda mig på kontrakt?</h3>
                  <p className="text-zinc-300">
                    Nej, ingen bindningstid. Du kan avsluta när som helst. Vi tjänar din lojalitet genom att leverera värde, inte genom att låsa in dig.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Hur jämför ni er med AIAI och Tidvis?</h3>
                  <p className="text-zinc-300">
                    Elivro erbjuder samma kärnfunktioner (schema, FK-rapportering) PLUS AI-driven rekrytering och transparenta priser - allt till 40% lägre kostnad. AIAI och Tidvis publicerar inte sina priser, vilket gör det svårt att planera budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-violet-900/20 to-purple-900/20 rounded-2xl border border-violet-500/30 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Redo att Spara 40%?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Boka en gratis demo och få exakt prissättning för ditt assistansföretag.
            </p>
            <Link
              href="/#cta-section"
              className="inline-block px-8 py-4 bg-white text-violet-600 rounded-full font-semibold text-lg hover:bg-zinc-100 transition-colors"
            >
              Boka Gratis Demo
            </Link>
            <p className="text-sm text-zinc-400 mt-4">
              Inget kreditkort krävs • Ingen bindningstid • 30 dagars garanti
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
