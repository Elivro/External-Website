# GDPR-checklista för Assistansbolag 2026
## Komplett guide till dataskydd och integritetsskydd i personlig assistans

**Senast uppdaterad:** November 2025
**Läslängd:** ~15 minuter
**Målgrupp:** Assistansanordnare, VD, IT-ansvariga, dataskyddsombud

---

## Sammanfattning (TL;DR)

Personlig assistans innebär hantering av **särskilt känsliga personuppgifter** – en av GDPR:s högst reglerade kategorier. Fel kan leda till **böter på upp till 20 miljoner kronor eller 4% av global omsättning**.

**Vad du får i denna checklista:**
- ✓ GDPR-krav specifika för assistansbranschen
- ✓ Steg-för-steg implementation av dataskydd
- ✓ Mallar för samtycken, personuppgiftsbiträdesavtal (PUB)
- ✓ Tekniska säkerhetsåtgärder (kryptering, åtkomstkontroll)
- ✓ Rutiner för dataintrång och personuppgiftsskydd

**Varför detta är kritiskt:**
Integritetsskyddsmyndigheten (IMY) granskade **187 assistansanordnare** 2024 och utfärdade **42 böter** för GDPR-brister. Vanligaste felen: bristfällig säkerhet, saknade PUB-avtal och otillräcklig rättighetshantering.

---

## 1. GDPR-Grunderna för Assistansbolag

### Varför är assistansbranschen högrisk?

Personlig assistans involverar behandling av:

- **Hälsodata** (funktionsnedsättning, diagnoser, medicinska behov)
- **Personnummer** (kunder, assistenter, anhöriga)
- **Känsliga preferenser** (religion, sexuell läggning, politiska åsikter)
- **Lokaliseringsdata** (var assistans utförs, GPS-tracking av assistenter)
- **Arbetsrelaterade uppgifter** (tidrapporter, schema, löner)

Enligt GDPR artikel 9 klassas **hälsodata** som **särskilt skyddsvärda personuppgifter** och kräver förhöjd säkerhet.

### Roller och Ansvar

**Personuppgiftsansvarig (PUA):**
Det är **assistansanordnaren** som är PUA för kunddata och assistentdata. Anordnaren beslutar **varför och hur** personuppgifter behandlas.

**Personuppgiftsbiträde (PUB):**
Leverantörer som behandlar data på anordnarens vägnar (ex. assistanssystem som Elivro, lönesystem, molntjänster) är PUB.

**Dataskyddsombud (DSO):**
Assistansanordnare som behandlar känsliga hälsodata i stor skala **måste utse ett dataskyddsombud** enligt GDPR artikel 37.

**Registrerade:**
Kunder och assistenter vars personuppgifter behandlas.

---

## 2. GDPR-Checklista: 10 Kritiska Krav

### ☐ 1. Rättslig Grund för Behandling

**Krav:**
Varje behandling av personuppgifter måste ha en **rättslig grund** enligt GDPR artikel 6.

**Tillåtna grunder för assistansbranschen:**

| **Typ av data** | **Rättslig grund** |
|----------------|-------------------|
| Kunddata (hälsa, behov) | **Samtycke** (artikel 6.1a + 9.2a) eller **Vitalt intresse** (6.1d) |
| Assistentdata (anställning) | **Fullgörande av avtal** (6.1b) + **Rättslig förpliktelse** (6.1c) |
| Tidrapporter till FK | **Rättslig förpliktelse** (Socialförsäkringsbalken) |
| Lokaliseringsdata (GPS) | **Samtycke** från assistent (6.1a) |

**Åtgärd:**
- Dokumentera rättslig grund för varje typ av personuppgiftsbehandling
- Inhämta **uttryckligt samtycke** för hälsodata (artikel 9.2a)
- Uppdatera integritetspolicy med tydlig information

**Mall: Samtycke för hälsodata (kund)**

> "Jag samtycker till att [Assistansbolag AB] behandlar mina hälsouppgifter (funktionsnedsättning, medicinska behov, assistansbehov) i syfte att tillhandahålla personlig assistans enligt beviljat FK-beslut. Jag förstår att jag kan återkalla mitt samtycke när som helst."
>
> Signatur: _____________ Datum: _______

### ☐ 2. Personuppgiftsbiträdesavtal (PUB)

**Krav:**
Alla leverantörer som behandlar personuppgifter på din vägnar (assistanssystem, lönesystem, molntjänster) **måste ha ett skriftligt PUB-avtal** enligt artikel 28.

**Vad PUB-avtalet ska innehålla:**

✓ Beskrivning av behandlingen (syfte, varaktighet, typ av uppgifter)
✓ Biträdets skyldigheter (säkerhet, sekretess, instruktioner)
✓ Underbiträden (får biträdet anlita andra leverantörer?)
✓ Dataskyddsåtgärder (kryptering, åtkomstkontroll, säkerhetskopiering)
✓ Rätt till granskning och revision
✓ Hantering vid avtalsupphörande (radering eller återlämnande av data)
✓ Ansvar och skadestånd

**Vanliga PUB-leverantörer för assistansbolag:**

- Assistanssystem (Elivro, Primass, Tidvis)
- Lönesystem (Hogia, Visma, Fortnox)
- Molntjänster (Microsoft 365, Google Workspace)
- Kommunikation (e-post, SMS-tjänster)
- Bokföring och redovisning

**Åtgärd:**
- Inventera alla leverantörer som behandlar personuppgifter
- Kräv signerat PUB-avtal från varje leverantör
- Granska PUB-avtal årligen (särskilt säkerhetsåtaganden)

### ☐ 3. Dataskyddsombud (DSO)

**Krav:**
Assistansanordnare **måste utse ett dataskyddsombud** om de:

- Behandlar känsliga hälsodata som huvudsaklig verksamhet
- Behandlar personuppgifter i stor skala (>50 assistenter eller kunder)

**DSO:s uppgifter:**

- Övervaka GDPR-efterlevnad
- Rådgivning om dataskydd
- Kontaktpunkt för Integritetsskyddsmyndigheten (IMY)
- Utbildning av personal i GDPR

**Åtgärd:**
- Utse internt DSO eller anlita extern konsult
- Anmäl DSO till Integritetsskyddsmyndigheten
- Ge DSO resurser och mandat att utföra uppdraget

**Mall: DSO-anmälan**

> "Vi utser [Namn] som dataskyddsombud för [Assistansbolag AB]. Kontaktuppgifter: [e-post], [telefon]. DSO kan nås av registrerade och myndigheter."

### ☐ 4. Informationsskyldighet och Integritetspolicy

**Krav:**
Alla registrerade (kunder, assistenter) ska **informeras tydligt** om hur deras personuppgifter behandlas (artikel 13-14).

**Integritetspolicyn ska innehålla:**

✓ Personuppgiftsansvarigs namn och kontaktuppgifter
✓ Dataskyddsombudets kontaktuppgifter
✓ Ändamål med behandlingen
✓ Rättslig grund
✓ Vilka kategorier av personuppgifter som behandlas
✓ Mottagare av personuppgifter (FK, lönesystem, etc.)
✓ Lagringstid
✓ De registrerades rättigheter (tillgång, rättelse, radering, m.m.)
✓ Rätt att klaga till IMY

**Åtgärd:**
- Publicera integritetspolicy på hemsidan
- Dela integritetspolicy vid anställning (assistenter) och avtalsteckning (kunder)
- Uppdatera policyn vid ändringar i behandlingen

### ☐ 5. Registrerades Rättigheter

**Krav:**
GDPR ger registrerade omfattande rättigheter:

| **Rättighet** | **Vad innebär det?** | **Tidsfrist** |
|--------------|---------------------|--------------|
| **Tillgång (artikel 15)** | Rätt att få kopia på sina personuppgifter | 1 månad |
| **Rättelse (artikel 16)** | Rätt att rätta felaktiga uppgifter | Omedelbart |
| **Radering (artikel 17)** | "Rätt att bli glömd" (med undantag för rättsliga skyldigheter) | 1 månad |
| **Begränsning (artikel 18)** | Tillfälligt stoppa behandling under utredning | Omedelbart |
| **Dataportabilitet (artikel 20)** | Få ut data i maskinläsbart format | 1 månad |
| **Invändning (artikel 21)** | Invända mot behandling (t.ex. marknadsföring) | Omedelbart |

**Åtgärd:**
- Skapa rutin för att hantera begäranden om registerutdrag
- Verifiera identitet innan utlämnande av personuppgifter (BankID)
- Dokumentera alla begäranden och hur de hanterats

**Mall: Svar på begäran om registerutdrag**

> "Tack för din begäran om registerutdrag. Bifogat finner du all information vi behandlar om dig enligt GDPR artikel 15. Om du har frågor eller vill rätta någon uppgift, kontakta oss på [e-post]."

### ☐ 6. Säkerhet och Kryptering

**Krav:**
Personuppgifter ska skyddas med **lämpliga tekniska och organisatoriska åtgärder** (artikel 32).

**Minimikrav för assistansbolag:**

✓ **Kryptering i vila** (all data lagrad krypterad på servrar)
✓ **Kryptering i transit** (HTTPS/TLS för alla system)
✓ **Tvåfaktorsautentisering (2FA)** för inloggning
✓ **Rollbaserad åtkomstkontroll** (assistenter ser inte varandras data)
✓ **Automatisk utloggning** efter inaktivitet
✓ **Säkerhetskopiering** (daglig backup med kryptering)
✓ **Loggning** av åtkomst och ändringar (vem gjorde vad och när)

**Åtgärd:**
- Granska assistanssystemets säkerhetsfunktioner
- Kräv att leverantörer har ISO 27001 eller motsvarande certifiering
- Genomför årlig säkerhetsrevision (intern eller extern)

**Teknisk checklista:**
- [ ] All data krypterad med AES-256 eller starkare
- [ ] TLS 1.3 för alla webbgränssnitt
- [ ] BankID för inloggning (eller motsvarande stark autentisering)
- [ ] Automatisk session timeout efter 15 min inaktivitet
- [ ] Backup sparas geografiskt separerat (annan datacenter)
- [ ] Loggning av alla åtkomster till känsliga uppgifter

### ☐ 7. Dataintrång och Incidenthantering

**Krav:**
Vid dataintrång (obehörig åtkomst, förlust, stöld) måste anordnaren:

1. **Anmäla till IMY inom 72 timmar** (artikel 33) om intrånget innebär risk för registrerades rättigheter
2. **Informera registrerade** om intrånget innebär hög risk (artikel 34)

**Exempel på dataintrång:**

- Obehörig person får åtkomst till kunddatabasen
- Assistanssystem utsatt för hackerattack
- Laptop med okrypterad kunddata blir stulen
- E-post med känsliga uppgifter skickas till fel mottagare

**Åtgärd:**
- Skapa incidenthanteringsplan
- Utbilda personal att rapportera misstänkta intrång omedelbart
- Dokumentera alla intrång (även om de inte behöver anmälas)

**Mall: Anmälan till IMY vid dataintrång**

> "Vi anmäler ett dataintrång enligt GDPR artikel 33:
> - **Beskrivning:** [Vad hände?]
> - **Tidpunkt:** [När upptäcktes intrånget?]
> - **Kategorier av personuppgifter:** [Vilken typ av data?]
> - **Antal registrerade:** [Hur många påverkades?]
> - **Åtgärder:** [Vad har vi gjort för att begränsa skadan?]
> - **Kontakt:** [Dataskyddsombudets kontaktuppgifter]"

### ☐ 8. Lagring och Radering

**Krav:**
Personuppgifter får endast **lagras så länge det är nödvändigt** för ändamålet (artikel 5.1e).

**Lagringstider för assistansbranschen:**

| **Typ av uppgift** | **Lagringstid** | **Rättslig grund** |
|-------------------|----------------|-------------------|
| Tidrapporter | 10 år | Bokföringslagen |
| Anställningsavtal | 10 år efter avslut | Avtalsrätt |
| Kunddata (hälsa, behov) | Under assistansperiod + 2 år | Socialförsäkringsbalken |
| Löneuppgifter | 10 år | Skattelag |
| Marknadsföringssamtycken | Tills samtycke återkallas | GDPR |

**Åtgärd:**
- Skapa rutin för automatisk radering efter lagringstidens utgång
- Granska årligen vilka uppgifter som kan raderas
- Dokumentera varför vissa uppgifter behålls längre (rättslig förpliktelse)

**Mall: Policy för radering**

> "Vi raderar personuppgifter enligt följande:
> - **Kunddata:** 2 år efter assistansperiodens slut (om inte rättslig förpliktelse kräver längre lagring)
> - **Assistentdata:** 10 år efter anställningens slut (bokföringskrav)
> - **Marknadsföringsdata:** Omedelbart vid återkallat samtycke"

### ☐ 9. Konsekvensbedömning (DPIA)

**Krav:**
Om behandlingen innebär **hög risk för registrerades rättigheter** måste en **konsekvensbedömning (Data Protection Impact Assessment, DPIA)** genomföras (artikel 35).

**Exempel på högriskbehandling i assistansbranschen:**

- GPS-tracking av assistenter i realtid
- AI-baserad profilering för matchning av assistenter och kunder
- Automatisk analys av hälsodata för att förutsäga assistansbehov
- Storskalig behandling av känsliga uppgifter (>500 kunder/assistenter)

**Åtgärd:**
- Identifiera högriskbehandlingar
- Genomför DPIA med stöd av DSO
- Dokumentera risker och åtgärder för att minska dem
- Konsultera IMY om DPIA visar kvarstående hög risk

**Mall: DPIA-struktur**

1. Beskrivning av behandlingen
2. Bedömning av nödvändighet och proportionalitet
3. Riskbedömning för registrerades rättigheter
4. Åtgärder för att minska risker
5. Slutsats och godkännande

### ☐ 10. Utbildning och Medvetenhet

**Krav:**
All personal som behandlar personuppgifter ska vara **utbildade i GDPR** och förstå sina skyldigheter.

**Åtgärd:**
- Genomför årlig GDPR-utbildning för all personal
- Särskild utbildning för samordnare och IT-ansvariga
- Testa kunskaper (quiz, praktiska scenarion)
- Dokumentera deltagande i utbildning

**Utbildningsteman:**

- Vad är personuppgifter och känsliga uppgifter?
- Registrerades rättigheter och hur hantera begäranden
- Säker hantering av lösenord och inloggning
- Vad gör jag om jag misstänker dataintrång?
- Hur hanterar jag kunddata säkert (inte dela via osäkra kanaler)

---

## 3. Tekniska GDPR-Krav för Assistanssystem

### Kryptering

**Minimikrav:**
- **AES-256 kryptering** för data i vila
- **TLS 1.3** för data i transit
- **Krypterade backups** med separat nyckelhantering

**Verifiering:**
Be leverantör om säkerhetscertifikat (ISO 27001, SOC 2) eller genomför oberoende säkerhetsgranskning.

### Åtkomstkontroll

**Principer:**

- **Minsta behörighet** (assistenter ser endast sina egna pass och kunder)
- **Rollbaserad åtkomst** (samordnare, chef, ekonomiansvarig har olika behörigheter)
- **Tvåfaktorsautentisering (2FA)** obligatoriskt för administrativa användare
- **Automatisk utloggning** vid inaktivitet

**Test:**
Logga in som assistent och försök få åtkomst till andras data. Om det fungerar = säkerhetsrisk.

### Loggning och Spårbarhet

**Krav:**
Systemet ska logga:

- Vem loggade in och när
- Vilka uppgifter har visats, redigerats eller raderats
- Ändringar av behörigheter och inställningar
- Export av data

**Lagringstid för loggar:**
Minst 12 månader (för att kunna utreda eventuella intrång).

### Dataportabilitet

**Krav:**
Registrerade har rätt att få ut sina uppgifter i **strukturerat, maskinläsbart format** (t.ex. JSON, CSV).

**Åtgärd:**
Verifiera att assistanssystemet kan exportera kunddata och assistentdata på begäran.

---

## 4. GDPR-Implementering Steg för Steg

### Fas 1: Kartläggning (Vecka 1-2)

1. **Inventera all personuppgiftsbehandling**
   - Vilka system används?
   - Vilken typ av data behandlas?
   - Varifrån kommer datan?
   - Vem har åtkomst?

2. **Dokumentera rättslig grund**
   - Varför behandlar vi denna data?
   - Vilken artikel i GDPR är grunden?

3. **Identifiera PUB-leverantörer**
   - Vilka externa leverantörer behandlar data åt oss?

**Verktyg: Behandlingsförteckning**

| System | Typ av data | Rättslig grund | Lagringstid | PUB-avtal? |
|--------|------------|---------------|-----------|----------|
| Elivro | Kunddata, assistentdata, tidrapporter | Avtal + rättslig förpliktelse | 10 år | ✓ |
| Visma Lön | Löneuppgifter | Avtal + rättslig förpliktelse | 10 år | ✓ |

### Fas 2: Dokumentation (Vecka 3-4)

1. **Upprätta integritetspolicy**
2. **Teckna PUB-avtal** med alla leverantörer
3. **Utse dataskyddsombud**
4. **Skapa incidenthanteringsplan**
5. **Dokumentera lagringstider**

### Fas 3: Teknisk Implementation (Vecka 5-8)

1. **Granska säkerhet** i assistanssystem
2. **Implementera 2FA** för alla användare
3. **Aktivera kryptering** om inte redan aktivt
4. **Konfigurera rollbaserad åtkomstkontroll**
5. **Sätt upp automatisk radering** efter lagringstid

### Fas 4: Utbildning och Rulloutsning (Vecka 9-12)

1. **Genomför GDPR-utbildning** för all personal
2. **Informera kunder och assistenter** om ny integritetspolicy
3. **Inhämta samtycken** för känsliga uppgifter (om saknas)
4. **Testa incidenthanteringsrutiner** (simulering)

### Fas 5: Löpande Efterlevnad (Kontinuerligt)

1. **Årlig GDPR-revision** (granska behandlingsförteckning, PUB-avtal, säkerhet)
2. **Kvartalsvis säkerhetsgranskning**
3. **Löpande utbildning** vid nyanställningar
4. **Uppdatera integritetspolicy** vid förändringar

---

## 5. Vanliga GDPR-Misstag i Assistansbranschen

### ❌ Misstag 1: Saknade PUB-avtal

**Scenariot:**
Assistansbolaget använder ett schemaläggningssystem men har aldrig tecknat PUB-avtal med leverantören.

**Konsekvens:**
IMY kan utfärda böter + kräva att behandlingen stoppas omedelbart.

**Lösning:**
Kontakta leverantören och begär signerat PUB-avtal innan fortsatt användning.

### ❌ Misstag 2: Okrypterad e-post med känsliga uppgifter

**Scenariot:**
Samordnare skickar schema med kunders diagnoser via vanlig e-post till assistenter.

**Konsekvens:**
Dataintrång (obehöriga kan läsa känsliga uppgifter). Kräver anmälan till IMY.

**Lösning:**
Använd säker portal/app för delning av känsliga uppgifter (inte e-post).

### ❌ Misstag 3: Ingen begränsning av åtkomst

**Scenariot:**
Alla assistenter kan se alla kunders fullständiga hälsojournaler i systemet.

**Konsekvens:**
Bryter mot "minsta behörighet"-principen. IMY kan kräva omedelbar åtgärd.

**Lösning:**
Konfigurera rollbaserad åtkomst så assistenter endast ser sina egna kunder.

### ❌ Misstag 4: Ingen rutin för radering

**Scenariot:**
Assistansbolaget sparar kunddata i 20 år "för säkerhets skull" trots att kunden slutat för 15 år sedan.

**Konsekvens:**
Bryter mot lagringsbegränsning. Kunden kan begära skadestånd.

**Lösning:**
Implementera automatisk radering efter lagringstidens utgång.

---

## 6. GDPR-Verktyg och Mallar

### Gratis Resurser från Elivro

**📥 Ladda ner:**

- **PUB-avtalsmall** för assistansbranschen
- **Integritetspolicy-mall** anpassad för assistansbolag
- **Samtyckesformulär** för hälsodata
- **Incidenthanteringsplan**
- **DPIA-mall**

➡️ **[www.elivro.se/gdpr-verktyg](http://www.elivro.se/gdpr-verktyg)**

### Externa Resurser

- **Integritetsskyddsmyndigheten (IMY):** www.imy.se
- **GDPR-vägledning för vårdgivare:** www.socialstyrelsen.se
- **EU:s GDPR-portal:** ec.europa.eu/info/law/law-topic/data-protection_en

---

## 7. Hur Elivro Säkerställer GDPR-Efterlevnad

### Native GDPR-Features

✓ **ISO 27001-certifierad infrastruktur**
✓ **AES-256 kryptering** i vila och transit
✓ **BankID-autentisering** för alla användare
✓ **Rollbaserad åtkomstkontroll** per default
✓ **Automatisk radering** efter konfigurerad lagringstid
✓ **Fullständig loggning** av all åtkomst och ändringar
✓ **PUB-avtal inkluderat** (färdigt att signera)
✓ **GDPR-utbildning** för kunder vid onboarding

### Servrar i Sverige

All data lagras på servrar inom **EU (Sverige)**, vilket säkerställer att känsliga uppgifter inte överförs till länder utanför EU/EES utan adekvat skyddsnivå.

### Transparent Dataskydd

Elivro publicerar **Security Whitepaper** med fullständig information om:

- Tekniska säkerhetsåtgärder
- Datalagringsplatser
- Backuprutiner
- Incidenthantering
- Underbiträden (tredjepartsleverantörer)

➡️ **Läs mer: [www.elivro.se/security](http://www.elivro.se/security)**

---

## 8. Slutsats och Nästa Steg

### Sammanfattning

GDPR är inte en engångsåtgärd – det är en **kontinuerlig process**. Assistansbolag hanterar några av de mest känsliga personuppgifterna som finns, och därmed följer stort ansvar.

**Nyckelpunkter:**

1. ✓ **Dokumentera allt** – behandlingsförteckning, PUB-avtal, integritetspolicy
2. ✓ **Säkra tekniken** – kryptering, 2FA, rollbaserad åtkomst
3. ✓ **Utbilda personalen** – GDPR-medvetenhet hos alla
4. ✓ **Planera för kriser** – incidenthantering och anmälningsrutiner
5. ✓ **Granska årligen** – GDPR-efterlevnad är inte statisk

### Rekommendationer

**Om du inte redan gjort det:**

➡️ **Utse ett dataskyddsombud** (internt eller externt)
➡️ **Teckna PUB-avtal** med alla leverantörer
➡️ **Granska säkerheten** i ditt assistanssystem
➡️ **Upprätta incidenthanteringsplan**
➡️ **Genomför GDPR-utbildning** för personalen

### Boka GDPR-Genomgång med Elivro

Är du osäker på om ditt assistansbolag är GDPR-compliant?

➡️ **Boka en kostnadsfri GDPR-genomgång** där vi går igenom:
- Din nuvarande behandling av personuppgifter
- Identifierade risker och brister
- Konkreta åtgärder för efterlevnad
- Hur Elivro kan förenkla GDPR-arbetet

**Kontakt:**
E-post: daniel@elivro.se
Webb: www.elivro.se

---

**Disclaimer:**
Denna guide är informativ och ersätter inte juridisk rådgivning. Konsultera alltid jurist eller dataskyddsexpert vid osäkerhet om GDPR-efterlevnad.

**© 2026 Elivro AB. Alla rättigheter förbehållna.**

---

## Om Elivro

Elivro är det första AI-drivna assistanssystemet byggt med **GDPR-efterlevnad** som grund. Vi förstår att dataskydd inte är en börda – det är ett sätt att bygga förtroende med kunder och assistenter.

**Vårt löfte:**
Lättare rekrytering. Snabbare schemaläggning. Enklare rapportering. För assistans som förändrar liv – på ett säkert och regelefterföljande sätt.
