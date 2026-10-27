'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function IntegritetspolicyPage() {
  const linkClass = 'text-fg hover:text-accent underline underline-offset-2 transition-colors ease-obsidian duration-obs-sm'
  const sectionTitleClass = 'font-serif text-2xl md:text-3xl font-normal text-fg leading-[1.2] mb-4'
  const bodyClass = 'text-fg-soft leading-[1.55]'
  const strongClass = 'text-fg font-medium'

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink text-fg pt-24">
        {/* Header */}
        <div className="border-b border-edge">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="w-12 h-px bg-accent mb-6" />
            <h1 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-light text-fg tracking-[-0.021em] leading-[1.05] mb-3">
              Integritetspolicy
            </h1>
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted">
              Senast uppdaterad: 27 oktober 2026
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-12">

            <section>
              <h2 className={sectionTitleClass}>1. Personuppgiftsansvarig</h2>
              <p className={`${bodyClass} mb-4`}>
                På Elivro värdesätter vi din integritet och följer dataskyddsförordningen (GDPR).
                Personuppgiftsansvarig för behandlingen av dina personuppgifter är:
              </p>
              <div className="bg-ink-lift border border-edge rounded-obs-lg p-6">
                <p className={bodyClass}>
                  <strong className={strongClass}>Elivro AB</strong><br />
                  Organisationsnummer: 559541-2791<br />
                  E-post:{' '}
                  <a href="mailto:daniel@elivro.se" className={linkClass}>
                    daniel@elivro.se
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className={sectionTitleClass}>2. Vilka personuppgifter vi samlar in</h2>
              <p className={`${bodyClass} mb-4`}>
                Vi samlar in personuppgifter som du frivilligt lämnar genom vårt demoformulär:
              </p>
              <ul className={`${bodyClass} space-y-2 mb-4`}>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Namn</strong> — för att kunna tilltala dig korrekt</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Företag</strong> — för att förstå din verksamhet och anpassa demon</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>E-postadress</strong> — för att kunna kontakta dig angående demon</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Telefonnummer</strong> — för att kunna boka in demon</li>
              </ul>
              <p className={bodyClass}>
                Vi använder även Google Analytics för att samla in anonymiserad besöksstatistik via cookies.
                Du kan välja att acceptera eller avvisa cookies via bannern på vår webbplats.
              </p>
              <p className={`${bodyClass} mt-4`}>
                Har vi kontaktat dig i säljsyfte utan att du hört av dig först, läs{' '}
                <a href="#saljkontakt" className={linkClass}>avsnitt 4</a>.
              </p>
            </section>

            <section>
              <h2 className={sectionTitleClass}>3. Ändamål och användning</h2>
              <p className={`${bodyClass} mb-4`}>
                Vi behandlar dina personuppgifter för att kontakta dig, boka och genomföra produktdemonstrationer,
                samt informera om Elivros assistansplattform. Den rättsliga grunden är berättigat intresse
                (Artikel 6(1)(f) GDPR) för att kunna svara på förfrågningar från potentiella kunder.
              </p>
              <p className={bodyClass}>
                Vi använder inte dina uppgifter för automatiserat beslutsfattande eller profilering.
              </p>
            </section>

            <section id="saljkontakt">
              <h2 className={sectionTitleClass}>4. När vi kontaktar dig i säljsyfte</h2>
              <p className={`${bodyClass} mb-4`}>
                Elivro säljer verksamhetssystem till assistansanordnare. Vi tar själva kontakt med företag som vi
                tror kan ha nytta av Elivro, via mejl och telefon. Har du fått ett mejl eller samtal från oss utan att
                ha hört av dig först, gäller det här avsnittet dig.
              </p>
              <p className={`${bodyClass} mb-4`}>
                <strong className={strongClass}>Vilka uppgifter vi har och var de kommer ifrån.</strong> Ditt namn, din
                roll, din jobbadress och ditt jobbtelefonnummer, så som ditt företag har publicerat dem på sin egen
                webbplats, i sina platsannonser eller i sin profil på Assistanskoll, eller som du själv har lämnat till
                oss. Dessutom det vi skriver till varandra och korta anteckningar från våra samtal. Vi samlar inte in
                något om dig som privatperson.
              </p>
              <p className={`${bodyClass} mb-4`}>
                <strong className={strongClass}>Varför vi gör det.</strong> För att berätta om Elivro för ert företag
                och, om ni vill, boka en demo. Den rättsliga grunden är berättigat intresse (artikel 6.1 f GDPR): vårt
                intresse av att nå de assistansanordnare som kan ha nytta av Elivro, genom enskilda kontakter som rör
                din yrkesroll. Vi har gjort en intresseavvägning som du kan få ta del av.
              </p>
              <p className={`${bodyClass} mb-4`}>
                <strong className={strongClass}>AI.</strong> Inför en kontakt använder vi AI för att sammanställa
                offentlig information om ert företag, till exempel platsannonser och nyheter, aldrig om dig som person.
                Ingen profilering och inga automatiserade beslut: varje mejl läses och godkänns av en människa innan det
                skickas.
              </p>
              <p className={`${bodyClass} mb-4`}>
                <strong className={strongClass}>Vilka som får del av uppgifterna.</strong> Google Workspace (e-post),
                DigitalOcean (drift av vårt interna kundregister, inom EU), Berget AI (AI-tjänst inom EU som hjälper oss
                sortera svar) och Anthropic (AI-verktyget vi använder i arbetet). Google och Anthropic är amerikanska
                företag, så uppgifterna kan föras över till USA. Vi säljer aldrig dina uppgifter.
              </p>
              <p className={`${bodyClass} mb-2`}>
                <strong className={strongClass}>Hur länge vi sparar dem.</strong>
              </p>
              <ul className={`${bodyClass} space-y-2 mb-4`}>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" />Inget svar: vi raderar dina uppgifter 6 månader efter vår senaste kontakt.</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" />Du svarade men vi gör inga affärer: vi går igenom uppgifterna 12 månader efter senaste kontakt och raderar dem om de inte längre behövs.</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" />Du bad oss att inte höra av oss: vi raderar allt utom din e-postadress och datumet, som vi sparar för att aldrig kontakta dig igen.</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" />Ni blir kund: uppgifterna flyttas till vår kundhantering.</li>
              </ul>
              <p className={bodyClass}>
                <strong className={strongClass}>Du kan när som helst säga nej.</strong> Svara ”nej tack” på
                mejlet eller säg det i telefon, så slutar vi höra av oss, direkt och för gott. Du behöver inte ange något
                skäl. Du har också rätt att få veta vilka uppgifter vi har om dig, få dem rättade eller raderade, och att
                klaga hos Integritetsskyddsmyndigheten (se{' '}
                <a href="#rattigheter" className={linkClass}>avsnitt 6</a>). Svara på mejlet du fick eller skriv till{' '}
                <a href="mailto:daniel@elivro.se" className={linkClass}>daniel@elivro.se</a>.
              </p>
            </section>

            <section>
              <h2 className={sectionTitleClass}>5. Delning, lagring och lagringstid</h2>
              <p className={`${bodyClass} mb-4`}>
                Vi delar dina personuppgifter med följande betrodda tjänsteleverantörer:
              </p>
              <ul className={`${bodyClass} space-y-2 mb-4`}>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Resend</strong> — e-postleverans för demoförfrågningar</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Google Workspace</strong> — säker lagring av e-postkommunikation</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Google Analytics</strong> — anonymiserad besöksstatistik (endast med ditt samtycke)</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Vercel</strong> — webbhosting</li>
              </ul>
              <p className={`${bodyClass} mb-4`}>
                Dessa tjänsteleverantörer är GDPR-kompatibla och behandlar data inom EU eller med lämpliga
                skyddsåtgärder (såsom standardavtalsklausuler). Vi har dataskyddsavtal (DPA) med alla våra tjänsteleverantörer.
                Vi säljer aldrig dina personuppgifter till tredje part.
              </p>
              <p className={bodyClass}>
                <strong className={strongClass}>Lagringstid:</strong> Vi lagrar dina personuppgifter tills du begär att de raderas.
                Kontakta oss på{' '}
                <a href="mailto:daniel@elivro.se" className={linkClass}>daniel@elivro.se</a>{' '}
                för att radera dina uppgifter.
              </p>
            </section>

            <section id="rattigheter">
              <h2 className={sectionTitleClass}>6. Dina rättigheter enligt GDPR</h2>
              <p className={`${bodyClass} mb-4`}>
                Du har följande rättigheter när det gäller dina personuppgifter:
              </p>
              <ul className={`${bodyClass} space-y-2`}>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Rätt till tillgång (Artikel 15):</strong> du har rätt att få information om vilka personuppgifter vi behandlar om dig.</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Rätt till rättelse (Artikel 16):</strong> du har rätt att få felaktiga uppgifter rättade och ofullständiga uppgifter kompletterade.</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Rätt till radering (Artikel 17):</strong> du har rätt att få dina personuppgifter raderade under vissa förutsättningar.</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Rätt till begränsning (Artikel 18):</strong> du har rätt att begära att behandlingen av dina personuppgifter begränsas.</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Rätt till invändning (Artikel 21):</strong> du har rätt att invända mot behandling som grundar sig på berättigat intresse.</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Rätt till dataportabilitet (Artikel 20):</strong> du har rätt att få ut dina personuppgifter i ett strukturerat, allmänt använt och maskinläsbart format.</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" /><strong className={strongClass}>Rätt att klaga till tillsynsmyndighet:</strong> du har rätt att lämna in klagomål till Integritetsskyddsmyndigheten (IMY) om du anser att behandlingen strider mot GDPR.{' '}
                  <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className={linkClass}>www.imy.se</a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={sectionTitleClass}>7. Dataskydd och säkerhet</h2>
              <p className={`${bodyClass} mb-4`}>
                Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda dina personuppgifter:
              </p>
              <ul className={`${bodyClass} space-y-2`}>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" />Krypterad kommunikation via HTTPS</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" />Säker lagring hos GDPR-kompatibla tjänsteleverantörer</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" />Begränsad åtkomst till personuppgifter (endast behörig personal)</li>
                <li className="pl-4 relative"><span aria-hidden="true" className="absolute left-0 top-[0.65em] w-2 h-px bg-fg-muted" />Regelbunden övervakning av säkerhetsrutiner</li>
              </ul>
            </section>

            <section>
              <h2 className={sectionTitleClass}>8. Kontakta oss</h2>
              <p className={`${bodyClass} mb-4`}>
                Om du har frågor om hur vi behandlar dina personuppgifter eller vill utöva någon av dina rättigheter, är du välkommen att kontakta oss:
              </p>
              <div className="bg-ink-lift border border-edge rounded-obs-lg p-6">
                <p className={bodyClass}>
                  <strong className={strongClass}>E-post:</strong>{' '}
                  <a href="mailto:daniel@elivro.se" className={linkClass}>daniel@elivro.se</a>
                </p>
                <p className="text-fg-muted text-sm mt-3 leading-[1.55]">
                  Vi strävar efter att besvara alla förfrågningar inom en månad.
                </p>
              </div>
            </section>

            <section>
              <h2 className={sectionTitleClass}>9. Ändringar av integritetspolicyn</h2>
              <p className={bodyClass}>
                Vi kan komma att uppdatera denna integritetspolicy. Den senaste versionen finns alltid på denna sida.
                Vid väsentliga ändringar informerar vi dig via e-post.
              </p>
            </section>

            <div className="mt-16 pt-8 border-t border-edge">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted">
                Denna integritetspolicy uppdaterades senast den 27 oktober 2026 och gäller för Elivro AB:s
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
