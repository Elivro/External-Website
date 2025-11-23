import { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Om Oss - Grundat av Assistansexperter och Mjukvaruutvecklare',
  description: 'Elivro grundades av Jimmy (aktiv personlig assistent), Filiph (mjukvaruexpert) och Daniel (säkerhetsexpert). Vi byggde Elivro för att lösa de verkliga problemen i assistansbranschen.',
  keywords: ['om elivro', 'elivro grundare', 'assistans team', 'personlig assistent mjukvara', 'elivro historia'],
  alternates: {
    canonical: 'https://elivro.se/om-oss'
  },
  openGraph: {
    title: 'Om Oss - Byggt av Aktiv Assistent | Elivro',
    description: 'Grundat av Jimmy (aktiv assistent), Filiph och Daniel. Vi vet var skon klämmer.',
    url: 'https://elivro.se/om-oss',
    type: 'website'
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://elivro.se' },
    { '@type': 'ListItem', position: 2, name: 'Om oss', item: 'https://elivro.se/om-oss' }
  ]
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Elivro AB',
  url: 'https://elivro.se',
  description: 'AI-driven assistansplanering för rekrytering, schemaläggning och FK-rapportering',
  founder: [
    {
      '@type': 'Person',
      name: 'Jimmy',
      jobTitle: 'VD & Grundare'
    },
    {
      '@type': 'Person',
      name: 'Filiph',
      jobTitle: 'Grundare'
    },
    {
      '@type': 'Person',
      name: 'Daniel',
      jobTitle: 'Grundare'
    }
  ]
}

export default function OmOssPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={organizationSchema} />
      <Navbar />

      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Byggt av Aktiv Assistent
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
              Vi vet var skon klämmer. Därför byggde vi Elivro - ett system som löser de verkliga problemen.
            </p>
          </div>
        </section>

        {/* Founders */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Grundarna
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Jimmy */}
              <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8 text-center">
                <div className="relative mx-auto mb-6 w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500/40">
                  <Image
                    src="/founders/jimmy.jpg"
                    alt="Jimmy - VD & Grundare"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Jimmy</h3>
                <p className="text-emerald-400 font-medium mb-4">VD & Grundare</p>
                <p className="text-zinc-300 mb-6">Kundupplevelse- & Assistansexpert</p>
                <div className="text-left space-y-3 text-sm text-zinc-400">
                  <p>
                    Jimmy arbetar aktivt som personlig assistent och vet exakt vilka problem som behöver lösas.
                  </p>
                  <p>
                    Med bakgrund i kundupplevelse och UX driver han produktvision och säkerställer att Elivro löser verkliga behov.
                  </p>
                </div>
              </div>

              {/* Filiph */}
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8 text-center">
                <div className="relative mx-auto mb-6 w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-500/40">
                  <Image
                    src="/founders/filiph.png"
                    alt="Filiph - Grundare"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Filiph</h3>
                <p className="text-zinc-400 font-medium mb-4">Grundare</p>
                <p className="text-zinc-300 mb-6">System- & Mjukvaruexpert</p>
                <div className="text-left space-y-3 text-sm text-zinc-400">
                  <p>
                    Filiph bygger användarupplevelsen och frontend-arkitekturen som gör Elivro intuitivt och snabbt.
                  </p>
                  <p>
                    Med fokus på design och prestanda skapar han gränssnitt som assistansföretag faktiskt vill använda.
                  </p>
                </div>
              </div>

              {/* Daniel */}
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8 text-center">
                <div className="relative mx-auto mb-6 w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-500/40">
                  <Image
                    src="/founders/daniel.png"
                    alt="Daniel - Grundare"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Daniel</h3>
                <p className="text-zinc-400 font-medium mb-4">Grundare</p>
                <p className="text-zinc-300 mb-6">Server- & Säkerhetsexpert</p>
                <div className="text-left space-y-3 text-sm text-zinc-400">
                  <p>
                    Daniel ansvarar för backend-arkitektur, databassäkerhet och skalbarhet.
                  </p>
                  <p>
                    Han säkerställer att Elivro är snabbt, säkert och kan växa med era behov utan kompromisser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Assistant Credibility */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                Jimmy Arbetar Aktivt som Personlig Assistent
              </h2>
              <p className="text-xl text-emerald-400 font-medium mb-8 text-center">
                Därför vet vi exakt var skon klämmer:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">→</span>
                    <span className="text-zinc-300">Budget som inte räcker till</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">→</span>
                    <span className="text-zinc-300">FK-underlag som inte stämmer</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">→</span>
                    <span className="text-zinc-300">Assistenter som inte rapporterar</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">→</span>
                    <span className="text-zinc-300">Svårigheter med rekrytering</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">→</span>
                    <span className="text-zinc-300">Scheman som läggs i blindo (budget? vem vet!)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">→</span>
                    <span className="text-zinc-300">Daganteckningar som tar tid från kunden</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">→</span>
                    <span className="text-zinc-300">IVO-krav som växer snabbare än mjukvaran kan hänga med</span>
                  </div>
                </div>
              </div>
              <p className="text-lg text-zinc-300 mt-8 text-center leading-relaxed">
                Vi byggde inte Elivro för att vi såg en marknadsmöjlighet. Vi byggde det för att vi var trötta på att använda dåliga system.
              </p>
            </div>
          </div>
        </section>

        {/* Band Story */}
        <section className="py-16 px-4 bg-zinc-950">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Kreativitet och Samarbete – Sedan 2012
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Band Image */}
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 shadow-2xl">
                <Image
                  src="/elivro-band.jpg"
                  alt="Elivro-grundarna i sitt rockband"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Story Text */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  Innan Elivro skapade vi musik tillsammans. Vi lärde oss att{' '}
                  <span className="text-emerald-400 font-semibold">lyssna, improvisera och leverera under press</span>.
                </p>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  Den kreativitet och lyhördheten vi utvecklade på scen har format hur vi bygger
                  produkter idag – med fokus på användarupplevelse och genuint samarbete.
                </p>
                <blockquote className="border-l-4 border-emerald-400 pl-6 italic bg-zinc-900/50 p-6 rounded-r-xl">
                  <p className="text-lg text-zinc-300">
                    "Ett fantastiskt team låter bra tillsammans, oavsett om det är på scen eller i koden."
                  </p>
                  <footer className="text-sm text-emerald-400 mt-3 not-italic font-semibold">– Jimmy, VD & Grundare</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                Varför Vi Startade Elivro
              </h2>
              <div className="space-y-6 text-center">
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  Som assistent tröttnade jag på att använda omoderna system. Program där det enkla blev något svårt.
                </p>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  Därför skapade vi Elivro – ett system som ger oss alla superkraften att kunna{' '}
                  <span className="text-emerald-400 font-semibold">fokusera på kvalitet och relationer</span>
                  {' '}– inte administration.
                </p>
                <p className="text-lg md:text-xl text-emerald-400 font-semibold mt-8">
                  Vi bygger mjukvaran vi önskar att vi hade haft.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values / Principles */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Våra Principer
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-4">Kvalitet Först</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Vi bygger inte system för att effektivisera bort relationer. Vi bygger system som ger dig mer tid till det som faktiskt betyder något - kvaliteten i assistansen.
                </p>
              </div>

              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-2xl font-bold text-white mb-4">Transparens</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Våra priser är offentliga. Vår roadmap är tydlig. Våra garantier är enkla. Vi gömmer inte bakom försäljningssamtal eller dold prissättning.
                </p>
              </div>

              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold text-white mb-4">Lyssna & Anpassa</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Jimmy arbetar aktivt i fältet. Vi hör vad ni faktiskt behöver, inte vad vi tror att ni behöver. Er feedback formar produkten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MacBook Showcase */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Matchning Som Bygger Relationer
            </h2>
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 backdrop-blur-sm shadow-2xl">
              <Image
                src="/elivro-macbook-color.webp"
                alt="Elivro kandidatöversikt - AI-driven matchning"
                width={1920}
                height={1200}
                className="w-full h-auto"
                sizes="100vw"
              />
            </div>
            <p className="text-center text-zinc-400 mt-8 max-w-3xl mx-auto">
              Vår AI-drivna matchning analyserar inte bara CV - den analyserar personkemi, värderingar och livserfarenhet.
              Längre anställningstider. Nöjdare kunder. Högre kvalitet i assistansen.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-2xl border border-emerald-500/30 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Vill du Träffa Teamet?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Boka en demo så får du prata med grundarna direkt. Inga mellanhänder, inga säljare.
            </p>
            <Link
              href="/#cta-section"
              className="inline-block px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg hover:bg-zinc-100 transition-colors"
            >
              Boka Gratis Demo
            </Link>
            <p className="text-sm text-zinc-400 mt-4">
              Träffa grundarna • Se hur Elivro fungerar • Inga försäljningstrick
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
