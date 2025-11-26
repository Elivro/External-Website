import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integritetspolicy | Elivro',
  description: 'Elivros integritetspolicy - Läs om hur vi hanterar dina personuppgifter enligt GDPR',
}

export default function IntegritetspolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <a href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
            ← Tillbaka till startsidan
          </a>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-2">Integritetspolicy</h1>
          <p className="text-zinc-400">Senast uppdaterad: 13 november 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-invert prose-zinc max-w-none">

          {/* Section 1 - Merged Intro + Controller */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Personuppgiftsansvarig</h2>
            <p className="text-zinc-300 mb-4">
              På Elivro värdesätter vi din integritet och följer dataskyddsförordningen (GDPR).
              Personuppgiftsansvarig för behandlingen av dina personuppgifter är:
            </p>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <p className="text-zinc-300">
                <strong className="text-white">Elivro AB</strong><br />
                Organisationsnummer: 559541-2791<br />
                E-post: <a href="mailto:daniel@elivro.se" className="text-violet-400 hover:text-violet-300 transition-colors">daniel@elivro.se</a>
              </p>
            </div>
          </section>

          {/* Section 2 - Updated with phone + cookies/GA */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Vilka personuppgifter vi samlar in</h2>
            <p className="text-zinc-300 mb-4">
              Vi samlar in personuppgifter som du frivilligt lämnar genom vårt demoformulär:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 mb-4">
              <li><strong className="text-white">Namn</strong> - För att kunna tilltala dig korrekt</li>
              <li><strong className="text-white">Företag</strong> - För att förstå din verksamhet och anpassa demon</li>
              <li><strong className="text-white">E-postadress</strong> - För att kunna kontakta dig angående demon</li>
              <li><strong className="text-white">Telefonnummer</strong> - För att kunna boka in demon</li>
            </ul>
            <p className="text-zinc-300">
              Vi använder även Google Analytics för att samla in anonymiserad besöksstatistik via cookies.
              Du kan välja att acceptera eller avvisa cookies via bannern på vår webbplats.
            </p>
          </section>

          {/* Section 3 - Merged Purpose + Usage */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Ändamål och användning</h2>
            <p className="text-zinc-300 mb-4">
              Vi behandlar dina personuppgifter för att kontakta dig, boka och genomföra produktdemonstrationer,
              samt informera om Elivros assistansplattform. Den rättsliga grunden är berättigat intresse
              (Artikel 6(1)(f) GDPR) för att kunna svara på förfrågningar från potentiella kunder.
            </p>
            <p className="text-zinc-300">
              Vi använder inte dina uppgifter för automatiserat beslutsfattande eller profilering.
            </p>
          </section>

          {/* Section 4 - Merged Sharing + Retention + Updated with GA */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Delning, lagring och lagringstid</h2>
            <p className="text-zinc-300 mb-4">
              Vi delar dina personuppgifter med följande betrodda tjänsteleverantörer:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 mb-4">
              <li><strong className="text-white">Resend</strong> - E-postleverans för demoförfrågningar</li>
              <li><strong className="text-white">Google Workspace</strong> - Säker lagring av e-postkommunikation</li>
              <li><strong className="text-white">Google Analytics</strong> - Anonymiserad besöksstatistik (endast med ditt samtycke)</li>
              <li><strong className="text-white">Vercel</strong> - Webbhosting</li>
            </ul>
            <p className="text-zinc-300 mb-4">
              Dessa tjänsteleverantörer är GDPR-kompatibla och behandlar data inom EU eller med lämpliga
              skyddsåtgärder (såsom standardavtalsklausuler). Vi har dataskyddsavtal (DPA) med alla våra tjänsteleverantörer.
              Vi säljer aldrig dina personuppgifter till tredje part.
            </p>
            <p className="text-zinc-300">
              <strong className="text-white">Lagringstid:</strong> Vi lagrar dina personuppgifter tills du begär att de raderas.
              Kontakta oss på{' '}
              <a href="mailto:daniel@elivro.se" className="text-violet-400 hover:text-violet-300 transition-colors">
                daniel@elivro.se
              </a>{' '}
              för att radera dina uppgifter.
            </p>
          </section>

          {/* Section 5 - Condensed GDPR Rights (bullets instead of cards) */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Dina rättigheter enligt GDPR</h2>
            <p className="text-zinc-300 mb-4">
              Du har följande rättigheter när det gäller dina personuppgifter:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li>
                <strong className="text-white">Rätt till tillgång (Artikel 15):</strong> Du har rätt att få information
                om vilka personuppgifter vi behandlar om dig.
              </li>
              <li>
                <strong className="text-white">Rätt till rättelse (Artikel 16):</strong> Du har rätt att få felaktiga
                uppgifter rättade och ofullständiga uppgifter kompletterade.
              </li>
              <li>
                <strong className="text-white">Rätt till radering (Artikel 17):</strong> Du har rätt att få dina
                personuppgifter raderade under vissa förutsättningar.
              </li>
              <li>
                <strong className="text-white">Rätt till begränsning (Artikel 18):</strong> Du har rätt att begära
                att behandlingen av dina personuppgifter begränsas.
              </li>
              <li>
                <strong className="text-white">Rätt till invändning (Artikel 21):</strong> Du har rätt att invända
                mot behandling som grundar sig på berättigat intresse.
              </li>
              <li>
                <strong className="text-white">Rätt till dataportabilitet (Artikel 20):</strong> Du har rätt att få
                ut dina personuppgifter i ett strukturerat, allmänt använt och maskinläsbart format.
              </li>
              <li>
                <strong className="text-white">Rätt att klaga till tillsynsmyndighet:</strong> Du har rätt att lämna
                in klagomål till Integritetsskyddsmyndigheten (IMY) om du anser att behandlingen strider mot GDPR.{' '}
                <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer"
                   className="text-violet-400 hover:text-violet-300 transition-colors">
                  www.imy.se
                </a>
              </li>
            </ul>
          </section>

          {/* Section 6 - Security (keep as is) */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Dataskydd och säkerhet</h2>
            <p className="text-zinc-300 mb-4">
              Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda dina
              personuppgifter:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li>Krypterad kommunikation via HTTPS</li>
              <li>Säker lagring hos GDPR-kompatibla tjänsteleverantörer</li>
              <li>Begränsad åtkomst till personuppgifter (endast behörig personal)</li>
              <li>Regelbunden övervakning av säkerhetsrutiner</li>
            </ul>
          </section>

          {/* Section 7 - Contact (keep as is) */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Kontakta oss</h2>
            <p className="text-zinc-300 mb-4">
              Om du har frågor om hur vi behandlar dina personuppgifter eller vill utöva någon av dina
              rättigheter, är du välkommen att kontakta oss:
            </p>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <p className="text-zinc-300">
                <strong className="text-white">E-post:</strong>{' '}
                <a href="mailto:daniel@elivro.se" className="text-violet-400 hover:text-violet-300 transition-colors">
                  daniel@elivro.se
                </a>
              </p>
              <p className="text-zinc-400 text-sm mt-3">
                Vi strävar efter att besvara alla förfrågningar inom en månad.
              </p>
            </div>
          </section>

          {/* Section 8 - Changes (shortened) */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Ändringar av integritetspolicyn</h2>
            <p className="text-zinc-300">
              Vi kan komma att uppdatera denna integritetspolicy. Den senaste versionen finns alltid på denna sida.
              Vid väsentliga ändringar informerar vi dig via e-post.
            </p>
          </section>

          {/* Footer note */}
          <div className="mt-16 pt-8 border-t border-zinc-800">
            <p className="text-zinc-400 text-sm">
              Denna integritetspolicy uppdaterades senast den 13 november 2025 och gäller för Elivro AB:s
              behandling av personuppgifter.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
