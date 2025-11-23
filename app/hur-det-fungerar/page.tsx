import { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Hur det Fungerar - Från Demo till Go-Live på 2-4 Veckor',
  description: 'Kom igång med Elivro på 3 steg: Boka demo, konfigurera och importera, gå live. Från första demo till go-live tar det 2-4 veckor. 30 dagars pengarna-tillbaka-garanti.',
  keywords: ['hur fungerar elivro', 'assistansplanering onboarding', 'komma igång assistans system', 'elivro demo'],
  alternates: {
    canonical: 'https://elivro.se/hur-det-fungerar'
  },
  openGraph: {
    title: 'Hur det Fungerar - Från Demo till Go-Live på 2-4 Veckor | Elivro',
    description: '3 enkla steg: Demo, konfiguration, go-live. Inga långa implementeringar.',
    url: 'https://elivro.se/hur-det-fungerar',
    type: 'website'
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://elivro.se' },
    { '@type': 'ListItem', position: 2, name: 'Hur det fungerar', item: 'https://elivro.se/hur-det-fungerar' }
  ]
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Komma igång med Elivro Assistansplanering',
  description: 'En steg-för-steg guide till att komma igång med Elivro från demo till go-live',
  totalTime: 'P21D',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Boka demo',
      text: 'Vi visar hur Elivro fungerar anpassat efter era behov och processer. Demot tar 30-45 minuter och är helt kostnadsfritt.',
      position: 1
    },
    {
      '@type': 'HowToStep',
      name: 'Konfigurera och importera',
      text: 'Vi hjälper er konfigurera systemet och importera befintlig data från Excel, AIAI eller Tidvis.',
      position: 2
    },
    {
      '@type': 'HowToStep',
      name: 'Gå live',
      text: 'Utbildning av teamet, aktivering av första scheman och tidrapporter. 30 dagars pengarna-tillbaka-garanti.',
      position: 3
    }
  ]
}

export default function HurDetFungerarPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />
      <Navbar />

      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Hur det Fungerar
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
              Från demo till live på 2-4 veckor. Ingen lång implementation, inga dolda kostnader, ingen bindningstid.
            </p>
          </div>
        </section>

        {/* 3 Steps */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Step 1: Boka Demo */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                      01
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Boka Demo</h2>
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    Vi visar hur Elivro fungerar anpassat efter era behov och processer. Ingen standardpresentation - vi fokuserar på era utmaningar.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">30-45 minuter</strong> - Vi går igenom alla tre pelare</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Skärmdela era processer</strong> - Vi ser era nuvarande utmaningar</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Live demo</strong> - Interagera med systemet direkt</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Q&A</strong> - Alla frågor besvaras</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/#cta-section"
                      className="inline-block px-6 py-3 bg-white text-violet-600 rounded-full font-semibold hover:bg-zinc-100 transition-colors"
                    >
                      Boka Demo Här
                    </Link>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Vad händer efter demot?</h3>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span>Du får ett offertförslag med exakt prissättning baserat på antal brukare</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span>Ingen pressad försäljning - ta den tid ni behöver</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span>Följdfrågor besvaras via email eller uppföljande möte</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span>När ni är redo går vi vidare till steg 2</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2: Konfigurera och Importera */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-gradient-to-br from-violet-900/30 to-blue-900/30 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">
                      02
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Konfigurera och Importera</h2>
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    Vi hjälper er konfigurera systemet och importera befintlig data. Ingen teknisk kunskap krävs - vi guidar er genom hela processen.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Importera brukare</strong> - Från Excel, AIAI eller Tidvis</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Importera assistenter</strong> - All befintlig data migreras</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Konfigurera budgetar</strong> - Koppla FK-beslut till brukare</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Testdata</strong> - Prova systemet med er egen data</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Vad tar längst tid?</h3>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span><strong className="text-white">Dataexport:</strong> Exportera data från ert nuvarande system (1-2 dagar)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span><strong className="text-white">Import & validering:</strong> Vi importerar och validerar data (2-3 dagar)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span><strong className="text-white">Testning:</strong> Ni testar systemet med er data (3-5 dagar)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span><strong className="text-white">Feedback:</strong> Vi justerar konfigurationen (1-2 dagar)</span>
                    </li>
                  </ul>
                  <p className="text-sm text-zinc-500 mt-6">
                    Total tid för steg 2: <strong className="text-white">1-2 veckor</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Gå Live */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-blue-900/30 to-teal-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
                      03
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Gå Live</h2>
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    Utbildning av teamet, aktivering av första scheman och tidrapporter. Vi finns med er hela vägen.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Utbildning:</strong> 2-3 timmars genomgång för hela teamet</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Mobilapp:</strong> Assistenter får tillgång och introduktion</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Första schemat:</strong> Vi guidar er genom att lägga första schemat</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span className="text-zinc-300"><strong className="text-white">Support:</strong> Daglig support första veckan</span>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-300 font-semibold">
                      ✓ 30 dagars pengarna-tillbaka-garanti från go-live
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Efter Go-Live</h3>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span><strong className="text-white">Första veckan:</strong> Daglig check-in, snabb support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span><strong className="text-white">Första månaden:</strong> Uppföljning varje vecka</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span><strong className="text-white">Löpande support:</strong> Email, telefon, eller videomöte</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400">→</span>
                      <span><strong className="text-white">30-dagarsgaranti:</strong> Om det inte fungerar får ni pengarna tillbaka</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Tidslinje: Demo till Go-Live
            </h2>
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-zinc-400 font-semibold">Dag 1</div>
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Demo (30-45 min)</div>
                    <div className="text-zinc-400 text-sm">Första genomgången av systemet</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-zinc-400 font-semibold">Dag 1-3</div>
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Beslutstid</div>
                    <div className="text-zinc-400 text-sm">Ni utvärderar om Elivro passar er</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-zinc-400 font-semibold">Vecka 1</div>
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Dataexport</div>
                    <div className="text-zinc-400 text-sm">Ni exporterar data från nuvarande system</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-zinc-400 font-semibold">Vecka 2</div>
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Import & Testning</div>
                    <div className="text-zinc-400 text-sm">Vi importerar data, ni testar systemet</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-zinc-400 font-semibold">Vecka 3-4</div>
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Utbildning & Go-Live</div>
                    <div className="text-zinc-400 text-sm">Team utbildas, första schemat läggs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Vanliga Frågor om Implementering
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Kan vi fortsätta använda vårt gamla system parallellt?</h3>
                <p className="text-zinc-300">
                  Ja, många kunder kör båda systemen parallellt första månaden för att säkerställa en smidig övergång.
                  Vi hjälper er sätta upp en migreringsplan som passar er verksamhet.
                </p>
              </div>
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Vad händer om vi har tekniska problem?</h3>
                <p className="text-zinc-300">
                  Vi erbjuder prioriterad support under onboarding-perioden. Email, telefon eller videomöte - vi svarar snabbt.
                  Första veckan efter go-live gör vi dagliga check-ins för att säkerställa att allt fungerar.
                </p>
              </div>
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Måste hela teamet utbildas samtidigt?</h3>
                <p className="text-zinc-300">
                  Nej, vi kan köra flera utbildningstillfällen om det passar bättre. Eller en längre session för alla.
                  Vi anpassar oss efter er verksamhet.
                </p>
              </div>
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Vad händer efter 30 dagars garantin?</h3>
                <p className="text-zinc-300">
                  Support fortsätter som vanligt. 30-dagars garantin är bara där för att ta bort risken - de flesta kunder
                  känner sig trygga efter första veckan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-violet-900/20 to-purple-900/20 rounded-2xl border border-violet-500/30 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Redo att Börja?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Boka en gratis demo och se hur Elivro kan förändra er assistansplanering.
            </p>
            <Link
              href="/#cta-section"
              className="inline-block px-8 py-4 bg-white text-violet-600 rounded-full font-semibold text-lg hover:bg-zinc-100 transition-colors"
            >
              Boka Gratis Demo
            </Link>
            <p className="text-sm text-zinc-400 mt-4">
              30-45 minuter • Ingen bindningstid • 30 dagars garanti
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
