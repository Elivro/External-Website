---
# This file IS the article. It renders at /kunskap/<slug> at build time.
# `draft: true` keeps it off the production deployment while it still shows on
# preview deployments and locally. Remove the flag to publish.
draft: true            # ligger ute i preview, inte i produktion
publishedAt: "2026-08-26"
kind: kunskap
category: regelverk
slug: chatgpt-brukaruppgifter-assistans
title: "Får du använda ChatGPT i *assistansen*?"
dek: >-
  Nästan allt du vet om en brukare räknas som känslig personuppgift enligt GDPR.
  Även funktionsnedsättningen i sig. Här är vad det betyder för AI-verktyg i
  verksamheten, och vad som måste finnas på plats innan någon klistrar in något.
seo:
  metaTitle: "ChatGPT och brukaruppgifter i personlig assistans"
  noindex: false
---

Någon i din verksamhet använder redan ett AI-verktyg. Kanske för att formulera
om en daganteckning, kanske för att få hjälp med en svår text till en anhörig.
Det är sällan illvilja. Det är någon som försöker hinna med sin dag.

Frågan är inte om det sker. Frågan är vad som klistras in.

## Nästan allt om en brukare är en känslig uppgift

GDPR pekar ut åtta kategorier som känsliga personuppgifter. Hälsa är en av dem.

Integritetsskyddsmyndigheten är tydlig med vad hälsa omfattar: "alla aspekter av
en persons hälsa, till exempel uppgifter som kommer från tester eller
undersökningar, uppgifter som sjukdom, sjukdomsrisk, sjukdomshistoria eller
funktionshinder oavsett vilken källa uppgifterna kommer ifrån."

Funktionshinder står med i uppräkningen. Det är hela poängen för din del.

I en assistansverksamhet är alltså inte bara journalanteckningen känslig. Att en
namngiven person över huvud taget har assistans är en uppgift om
funktionsnedsättning. Genomförandeplanen är det. Avvikelsen är det. Mejlet där
det står varför Anna behöver dubbelbemanning på morgonen är det.

Huvudregeln är att sådana uppgifter inte får behandlas alls. Det finns undantag,
och assistans vilar på dem, men undantaget gäller den behandling du har stöd
för. Det följer inte automatiskt med in i ett verktyg du råkar öppna i webbläsaren.

## Vad som faktiskt händer med texten

Tre saker skiljer ett gratiskonto från ett verktyg din verksamhet kan stå för.

*Träningen.* IMY påpekar att uppgifter du delar kan komma att användas för att
träna och utveckla modellen. När personuppgifter väl har använts till träning
blir det svårt att kontrollera hur de används sedan. Det går inte att ta
tillbaka.

*Lagringen.* Var ligger texten, hur länge, och vem kan läsa den. På ett
konsumentkonto är svaret sällan något du kan visa upp.

*Överföringen.* Går uppgifterna utanför EU och EES krävs skydd som håller
juridiskt. Ett gratiskonto ger dig inget att luta dig mot där.

En chatt känns som ett stängt rum. IMY beskriver det ungefär så, och konstaterar
att det inte stämmer.

## Vad som krävs för att det ska vara tillåtet

Fyra saker, oavsett vilket verktyg det gäller.

1. *Rättslig grund.* Du behöver veta med vilket stöd uppgifterna behandlas, och
   stödet måste täcka just den här behandlingen.
2. *Personuppgiftsbiträdesavtal.* Leverantören behandlar uppgifter för din
   räkning. Då krävs avtal. Utan det saknas en av grunderna.
3. *Konsekvensbedömning.* Känsliga uppgifter i ett nytt AI-verktyg är precis den
   situation en konsekvensbedömning finns till för.
4. *Kontroll över tredjelandsöverföring.* Du behöver veta var uppgifterna tar
   vägen, och kunna visa att det är skyddat.

Ingen av punkterna är omöjlig. Men ingen av dem löser sig av att en medarbetare
öppnar en flik.

## Vad du gör nu

- Skriv en kort AI-policy. En sida räcker. Vilka verktyg som är godkända, och
  vad som aldrig får klistras in.
- Säg det rakt ut i personalgruppen. Inga namn, inga personnummer, inget om
  hälsa eller funktionsnedsättning i verktyg verksamheten inte står bakom.
- Gå igenom vilka verktyg som faktiskt används i dag. Fråga, döm inte. Du får
  ärligare svar då.
- Ge dem ett godkänt alternativ. Ett förbud utan ersättning håller ungefär en
  månad.

Den sista punkten är den som avgör. Personalen använder AI för att dagen inte
går ihop. Tar du bort verktyget utan att ta bort tidspressen kommer det tillbaka,
fast utan att du vet om det.

## Så har vi löst det i Elivro

AI:n i Elivro arbetar på uppgifter som redan ligger i systemet. Ingen behöver
klistra in något någon annanstans, och ingen behöver kunna skriva prompter.

Det som gäller står i avtalet, inte i en broschyr. Bilaga 5, AI-villkoren:

- AI-bearbetningen sker via Berget AI AB i Sverige. Personuppgifter lämnar inte
  Sverige under bearbetningen.
- Kunddata används inte för att träna eller vidareutveckla modellerna. Det
  kräver ditt uttryckliga skriftliga samtycke, och vi har inte bett om det.
- Byter vi AI-leverantör eller underliggande modell så att beteendet ändras
  väsentligt får du besked minst 30 dagar i förväg.
- AI:n är beslutsstöd. Den fattar aldrig beslut om en kandidats lämplighet
  eller anställning på egen hand.

Personuppgiftsbiträdesavtalet är Bilaga 1. Underbiträdena listas i Bilaga 2,
du har 30 dagar på dig att invända mot ett nytt, och vi svarar för deras
efterlevnad som för vår egen. Vid en personuppgiftsincident hör vi av oss inom
48 timmar.

En precisering, så att du inte läser in mer än det står. Det är
AI-bearbetningen som stannar i Sverige. Resten av plattformen körs inom EU, och
några av våra underbiträden är amerikanskägda bolag med lagring i EU. Serverdrift
och lagring ligger hos DigitalOcean i Amsterdam och Frankfurt. E-post går via
Resend i Irland, felövervakning via Sentry i Frankfurt. Alla tre omfattas av
EU-US Data Privacy Framework, och avtalet har en beredskapsklausul om ramverket
skulle falla: då gäller standardavtalsklausuler i stället.

Hela listan står i Bilaga 2. Vi säger det här för att du ska kunna svara på
frågan om någon ställer den, inte för att det är en detalj.

En sak till, som få leverantörer nämner. AI som används för rekrytering och
urval klassas som högrisk enligt AI-förordningen, bilaga III punkt 4. Det för
med sig krav på riskhantering, loggning, teknisk dokumentation och mänsklig
övervakning. De kraven har vi åtagit oss i avtalet.

Konsekvensbedömningen är däremot din. Du är personuppgiftsansvarig, och det är
du som ska göra DPIA:n. Vårt jobb är att ge dig underlaget: beskrivning av
behandlingen, säkerhetsåtgärder och riskbedömningar. Det står i punkt 9.

Vill du läsa bilagorna innan du bestämmer dig, be om dem. De är skrivna för att
läsas.

Och om du redan har ett verktyg med biträdesavtal, kontroll över lagringen och
en gjord konsekvensbedömning, då har du löst det här. Då behöver du inte oss
för den biten.

---

## Källor

- [IMY, "Känsliga personuppgifter"](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/introduktion-till-gdpr/personuppgifter/kansliga-personuppgifter/) — de åtta kategorierna, definitionen av hälsouppgifter och huvudregeln. Sidan uppdaterad 15 juni 2026 (läst 2026-08-26)
- [IMY, "Att tänka på när du använder AI-tjänster"](https://www.imy.se/privatperson/ai/att-tanka-pa-nar-du-anvander-ai-tjanster/) — träning på delade uppgifter, chatten som inte är ett stängt rum (läst 2026-08-26)
- [IMY, "GDPR och AI"](https://www.imy.se/verksamhet/ai/gdpr-och-ai/) — rättslig grund, biträdesavtal och konsekvensbedömning vid AI-användning (läst 2026-08-26)
- Elivros tjänsteavtal, Bilaga 1 (personuppgiftsbiträdesavtal) och Bilaga 5 (AI-villkor). Be oss om dem, så skickar vi dem.
- [Berget AI](https://berget.ai) — leverantörens egna uppgifter om datalagring och träning (läst 2026-08-26)

<!--
ÖPPNA PUNKTER FÖRE PUBLICERING

1. Elivro-avsnittet är inte längre en [VERIFIERA]. Allt i det är hämtat ur
   docs/agreements/06-bilaga-5-ai-villkor.md och 02-bilaga-1-pub-avtal.md i
   Elivro-repot, samt bekräftat i koden: src/lib/berget-ai/ och
   .env.example ("All AI features use Berget as the single provider").

   Punkterna som citeras: 5.2 Sverige, 5.1 ingen träning utan samtycke,
   5.4 trettio dagars varsel, 1.2/3.1 beslutsstöd, 2.1 högrisk enligt
   bilaga III p.4, 9.1-9.2 DPIA-underlag, samt PUB-avtalets 6.2-6.4 och 7.1.

   Bekräftat: avtalsversionen i repot är den som gäller mot kund, och
   Bilaga 2 listar Berget AI AB (Sverige, datalagring Sverige) för
   "AI-modeller för kandidatmatchning och textanalys".

   Bilaga 2 gav också skälet till stycket om övriga underbiträden.
   DigitalOcean, Resend och Sentry är amerikanskägda med EU-lagring under
   Data Privacy Framework. Utan den preciseringen hade AI-avsnittet kunnat
   läsas som att hela plattformen ligger i Sverige. Det gör den inte.

2. Verifierat direkt hos IMY 2026-08-26 och säkert att publicera: de åtta
   kategorierna, citatet om hälsouppgifter inklusive funktionshinder,
   huvudregeln om förbud med undantag, och att sidan uppdaterades 15 juni 2026.

3. Formuleringarna om träning, lagring och tredjelandsöverföring bygger på
   IMY:s AI-sidor och är medvetet allmänt hållna. Skärp dem inte till exakta
   påståenden om en namngiven tjänst utan att läsa den tjänstens egna villkor.

4. Ton: det här är den artikel där vi har störst kommersiellt intresse.
   Sista stycket, där vi säger att du inte behöver oss om du redan löst det,
   är det som gör resten trovärdig. Stryk det inte.

5. Jimmy ville ursprungligen ha en artikel om hur man skriver bra prompter.
   Den vinkeln är medvetet bortvald: den är generisk, alla SaaS-bolag har den,
   och den svarar inte på det en verksamhetschef faktiskt oroar sig för.
-->
