'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function IntegritetspolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-24">
        {/* Header */}
        <div className="border-b border-charcoal/10">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="w-16 h-0.5 bg-terracotta mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal-700 tracking-tight mb-3">
              Integritetspolicy
            </h1>
            <p className="text-charcoal-400 font-mono text-sm">Senast uppdaterad: 13 november 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-10">

            {/* Section 1 - Personuppgiftsansvarig */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal-700 mb-4">
                1. Personuppgiftsansvarig
              </h2>
              <p className="text-charcoal-500 mb-4 leading-relaxed">
                På Elivro värdesätter vi din integritet och följer dataskyddsförordningen (GDPR).
                Personuppgiftsansvarig för behandlingen av dina personuppgifter är:
              </p>
              <div className="bg-cream-50 border border-charcoal/10 rounded-sm p-6 shadow-sm">
                <p className="text-charcoal-500">
                  <strong className="text-charcoal-700">Elivro AB</strong><br />
                  Organisationsnummer: 559541-2791<br />
                  E-post:{' '}
                  <a
                    href="mailto:daniel@elivro.se"
                    className="text-terracotta hover:text-terracotta-600 transition-colors duration-200"
                  >
                    daniel@elivro.se
                  </a>
                </p>
              </div>
            </section>

            {/* Section 2 - Vilka personuppgifter vi samlar in */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal-700 mb-4">
                2. Vilka personuppgifter vi samlar in
              </h2>
              <p className="text-charcoal-500 mb-4 leading-relaxed">
                Vi samlar in personuppgifter som du frivilligt lämnar genom vårt demoformulär:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-500 mb-4">
                <li><strong className="text-charcoal-700">Namn</strong> – För att kunna tilltala dig korrekt</li>
                <li><strong className="text-charcoal-700">Företag</strong> – För att förstå din verksamhet och anpassa demon</li>
                <li><strong className="text-charcoal-700">E-postadress</strong> – För att kunna kontakta dig angående demon</li>
                <li><strong className="text-charcoal-700">Telefonnummer</strong> – För att kunna boka in demon</li>
              </ul>
              <p className="text-charcoal-500 leading-relaxed">
                Vi använder även Google Analytics för att samla in anonymiserad besöksstatistik via cookies.
                Du kan välja att acceptera eller avvisa cookies via bannern på vår webbplats.
              </p>
            </section>

            {/* Section 3 - Ändamål och användning */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal-700 mb-4">
                3. Ändamål och användning
              </h2>
              <p className="text-charcoal-500 mb-4 leading-relaxed">
                Vi behandlar dina personuppgifter för att kontakta dig, boka och genomföra produktdemonstrationer,
                samt informera om Elivros assistansplattform. Den rättsliga grunden är berättigat intresse
                (Artikel 6(1)(f) GDPR) för att kunna svara på förfrågningar från potentiella kunder.
              </p>
              <p className="text-charcoal-500 leading-relaxed">
                Vi använder inte dina uppgifter för automatiserat beslutsfattande eller profilering.
              </p>
            </section>

            {/* Section 4 - Delning, lagring och lagringstid */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal-700 mb-4">
                4. Delning, lagring och lagringstid
              </h2>
              <p className="text-charcoal-500 mb-4 leading-relaxed">
                Vi delar dina personuppgifter med följande betrodda tjänsteleverantörer:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-500 mb-4">
                <li><strong className="text-charcoal-700">Resend</strong> – E-postleverans för demoförfrågningar</li>
                <li><strong className="text-charcoal-700">Google Workspace</strong> – Säker lagring av e-postkommunikation</li>
                <li><strong className="text-charcoal-700">Google Analytics</strong> – Anonymiserad besöksstatistik (endast med ditt samtycke)</li>
                <li><strong className="text-charcoal-700">Vercel</strong> – Webbhosting</li>
              </ul>
              <p className="text-charcoal-500 mb-4 leading-relaxed">
                Dessa tjänsteleverantörer är GDPR-kompatibla och behandlar data inom EU eller med lämpliga
                skyddsåtgärder (såsom standardavtalsklausuler). Vi har dataskyddsavtal (DPA) med alla våra tjänsteleverantörer.
                Vi säljer aldrig dina personuppgifter till tredje part.
              </p>
              <p className="text-charcoal-500 leading-relaxed">
                <strong className="text-charcoal-700">Lagringstid:</strong> Vi lagrar dina personuppgifter tills du begär att de raderas.
                Kontakta oss på{' '}
                <a
                  href="mailto:daniel@elivro.se"
                  className="text-terracotta hover:text-terracotta-600 transition-colors duration-200"
                >
                  daniel@elivro.se
                </a>{' '}
                för att radera dina uppgifter.
              </p>
            </section>

            {/* Section 5 - Dina rättigheter enligt GDPR */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal-700 mb-4">
                5. Dina rättigheter enligt GDPR
              </h2>
              <p className="text-charcoal-500 mb-4 leading-relaxed">
                Du har följande rättigheter när det gäller dina personuppgifter:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-500">
                <li>
                  <strong className="text-charcoal-700">Rätt till tillgång (Artikel 15):</strong> Du har rätt att få information
                  om vilka personuppgifter vi behandlar om dig.
                </li>
                <li>
                  <strong className="text-charcoal-700">Rätt till rättelse (Artikel 16):</strong> Du har rätt att få felaktiga
                  uppgifter rättade och ofullständiga uppgifter kompletterade.
                </li>
                <li>
                  <strong className="text-charcoal-700">Rätt till radering (Artikel 17):</strong> Du har rätt att få dina
                  personuppgifter raderade under vissa förutsättningar.
                </li>
                <li>
                  <strong className="text-charcoal-700">Rätt till begränsning (Artikel 18):</strong> Du har rätt att begära
                  att behandlingen av dina personuppgifter begränsas.
                </li>
                <li>
                  <strong className="text-charcoal-700">Rätt till invändning (Artikel 21):</strong> Du har rätt att invända
                  mot behandling som grundar sig på berättigat intresse.
                </li>
                <li>
                  <strong className="text-charcoal-700">Rätt till dataportabilitet (Artikel 20):</strong> Du har rätt att få
                  ut dina personuppgifter i ett strukturerat, allmänt använt och maskinläsbart format.
                </li>
                <li>
                  <strong className="text-charcoal-700">Rätt att klaga till tillsynsmyndighet:</strong> Du har rätt att lämna
                  in klagomål till Integritetsskyddsmyndigheten (IMY) om du anser att behandlingen strider mot GDPR.{' '}
                  <a
                    href="https://www.imy.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta hover:text-terracotta-600 transition-colors duration-200"
                  >
                    www.imy.se
                  </a>
                </li>
              </ul>
            </section>

            {/* Section 6 - Dataskydd och säkerhet */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal-700 mb-4">
                6. Dataskydd och säkerhet
              </h2>
              <p className="text-charcoal-500 mb-4 leading-relaxed">
                Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda dina
                personuppgifter:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-500">
                <li>Krypterad kommunikation via HTTPS</li>
                <li>Säker lagring hos GDPR-kompatibla tjänsteleverantörer</li>
                <li>Begränsad åtkomst till personuppgifter (endast behörig personal)</li>
                <li>Regelbunden övervakning av säkerhetsrutiner</li>
              </ul>
            </section>

            {/* Section 7 - Kontakta oss */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal-700 mb-4">
                7. Kontakta oss
              </h2>
              <p className="text-charcoal-500 mb-4 leading-relaxed">
                Om du har frågor om hur vi behandlar dina personuppgifter eller vill utöva någon av dina
                rättigheter, är du välkommen att kontakta oss:
              </p>
              <div className="bg-cream-50 border border-charcoal/10 rounded-sm p-6 shadow-sm">
                <p className="text-charcoal-500">
                  <strong className="text-charcoal-700">E-post:</strong>{' '}
                  <a
                    href="mailto:daniel@elivro.se"
                    className="text-terracotta hover:text-terracotta-600 transition-colors duration-200"
                  >
                    daniel@elivro.se
                  </a>
                </p>
                <p className="text-charcoal-400 text-sm mt-3">
                  Vi strävar efter att besvara alla förfrågningar inom en månad.
                </p>
              </div>
            </section>

            {/* Section 8 - Ändringar av integritetspolicyn */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal-700 mb-4">
                8. Ändringar av integritetspolicyn
              </h2>
              <p className="text-charcoal-500 leading-relaxed">
                Vi kan komma att uppdatera denna integritetspolicy. Den senaste versionen finns alltid på denna sida.
                Vid väsentliga ändringar informerar vi dig via e-post.
              </p>
            </section>

            {/* Footer note */}
            <div className="mt-16 pt-8 border-t border-charcoal/10">
              <p className="text-charcoal-400 font-mono text-sm">
                Denna integritetspolicy uppdaterades senast den 13 november 2025 och gäller för Elivro AB:s
                behandling av personuppgifter.
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
