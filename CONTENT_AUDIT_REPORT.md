# ELIVRO CONTENT AUDIT REPORT
**Date:** 2025-11-19
**Status:** CRITICAL ISSUES FOUND

---

## EXECUTIVE SUMMARY

**CRITICAL FINDING:** Multiple blog posts and comparison pages contain **FALSE CUSTOMER CLAIMS** that violate Elivro's pre-launch status. These must be removed immediately to maintain credibility and legal compliance.

**Issues Found:**
- 🔴 **12 instances of false customer testimonials/case studies**
- 🔴 **All blog posts dated in 2026 (incorrect - should be 2025)**
- 🟡 **15+ unverified statistics without sources**
- 🟡 **5 design/functionality issues**

---

## 🔴 CRITICAL ISSUES (Must Fix Immediately)

### 1. FALSE CUSTOMER TESTIMONIALS

**Location:** `/content/comparison-pages/aiai-alternativ-2026.mdx:154`

**False Claim:**
```markdown
**VD:s kommentar:**
> "Vi hade AIAI i 4 år. Det fungerade, men vi växte aldrig. Med Elivro känns det
> som vi äntligen har ett system som stödjer kvalitet, inte bara administration."
```

**Problem:** This implies Elivro has a VD customer who switched from AIAI. **Elivro has ZERO customers.**

**Source Violation:** CLAUDE.md states: "Elivro has **no existing customers or testimonials** yet. Do NOT add social proof, testimonials, customer logos, or case studies."

**Fix:** Remove entirely OR change to hypothetical language:
```markdown
**Typiska skäl att byta från AIAI:**
- AIAI fungerar för grundläggande behov, men saknar AI-funktioner för skalning
- Svårt att växa utan modern automation
- Företag söker system som stödjer kvalitet, inte bara administration
```

---

### 2. FALSE CASE STUDIES - "Real-World Exempel" Claims

**Locations:**
- `/content/seo-blog/fk-aterkrav-2026-sa-undviker-du.mdx:271-310` (Lines 271-310)
- `/content/seo-blog/personalomsattning-assistans-minska-2026.mdx:373-423`
- `/content/seo-blog/ivo-statistik-2025-vanligaste-bristerna.mdx:62-63`
- `/content/comparison-pages/primass-alternativ-2026.mdx:205-255`

**Example False Claim (FK återkrav blog):**

```markdown
## Real-World Case: Från 3 Återkrav/År till 0

**Bolag:** Medelstort assistansbolag (52 brukare, 84 assistenter)
**Problem:** Återkrav varje kvartal – genomsnitt **78 000 kr/återkrav** (234 000 kr/år)

### Lösningen
**Byte till System med Automatisk FK-Compliance (Elivro):**
...

### Resultat (12 Månader Efter Byte)
- **0 återkrav** (tidigare 3/år)
- **Sparat:** 234 000 kr/år + administrativa kostnader
- **ROI:** Systemkostnad 15 600 kr/år vs. 234 000 kr sparat = **15x ROI**
```

**Problem:** This fabricates a customer success story. Elivro has **no customers** to have achieved these results.

**Fix:** Change to **hypothetical scenario** or **remove case study entirely**:

```markdown
## Typiskt Scenario: Hur Återkrav Kan Förhindras

**Exempel:** Ett medelstort assistansbolag (52 brukare, 84 assistenter)
**Vanligt problem:** Återkrav varje kvartal – genomsnitt 78 000 kr/återkrav (234 000 kr/år)

### Hur Automation Löser Detta
Med automatisk FK-compliance kan bolag:
...

### Potentiell Effekt
- Eliminera budgetöverskridningar (45% av återkrav)
- Automatisk BankID-validering (18% av återkrav)
- Potentiell besparing: 234 000 kr/år
```

---

### 3. FALSE ROI CLAIMS

**Location:** Multiple blog posts claim specific Elivro customer ROI

**Examples:**
- "0 återkrav på 12+ månader (genomsnittskund)" - NO customers exist
- "Med moderna verktyg (som Elivro): 99% compliance utan extra arbete" - NOT verified
- "Med Elivro: AI-matchning inbyggd" - Feature exists but NO customer results

**Problem:** Implies Elivro customers have achieved measurable results. False.

**Fix:** Change to feature descriptions:
- "Med realtidsbudget kan assistansbolag förhindra budgetöverskridningar"
- "Automatisk BankID-validering säkerställer compliance"

---

### 4. INCORRECT PUBLICATION DATES

**Location:** ALL blog posts and some comparison pages

**Issue:** All content dated 2026-01-XX when we're in November 2025

**Files with incorrect dates:**
- `fk-aterkrav-2026-sa-undviker-du.mdx` - publishedAt: "2026-01-22"
- `ivo-statistik-2025-vanligaste-bristerna.mdx` - publishedAt: "2026-01-20"
- `personalomsattning-assistans-minska-2026.mdx` - publishedAt: "2026-01-25"
- `e-rak-2026-automatisk-fk-rapportering.mdx` - publishedAt: "2026-01-25"
- `sa-forbereder-du-ivo-inspektion-2026.mdx` - publishedAt: "2026-01-20"
- `5-vanligaste-fk-felen-2026.mdx` - publishedAt: "2026-01-15"
- `tidvis-alternativ-2026.mdx` - publishedAt: "2026-01-10"

**Fix:** Change all to current date: "2025-11-19"

---

## 🟡 MODERATE ISSUES (Should Fix Soon)

### 5. UNVERIFIED STATISTICS WITHOUT SOURCES

**Locations:** Throughout blog posts

**Examples of unsourced claims:**
- "45% av återkrav = budgetöverskridning" - WHERE is this from?
- "23% av assistansbolagen fick återkrav under året" - FK source?
- "68% av assistansbolag får IVO-anmärkning för ofullständig dokumentation" - IVO source?
- "43% av assistenter slutar inom 90 dagar" - Industry source?
- "Genomsnittlig assistant stannar 9 månader (branschsnitt 2025)" - Source?

**Problem:** These are specific percentages that should cite authoritative sources (FK, IVO, Socialstyrelsen, industry reports)

**Fix Options:**
1. **Add citations:** "Enligt FK:s rapport 2024, fick 23% av assistansbolagen återkrav..."
2. **Use ranges:** "Många assistansbolag (20-30% enligt branschdata) får återkrav..."
3. **Use qualitative language:** "Ett vanligt problem är budgetöverskridningar..."

**Recommended:** Add footnotes with sources OR soften claims to avoid appearing fabricated

---

### 6. ANONYMIZED VS. FABRICATED CASE STUDIES

**Current approach:** Blog posts say "Anonymized customer" or "[Anonymized customer]: Från 234k → 0"

**Problem:** There ARE no customers to anonymize. This is deceptive.

**Fix:** Change all to hypothetical:
- "Ett typiskt scenario:"
- "Så här kan automation hjälpa:"
- "Potentiell effekt för ett bolag med 50 brukare:"

---

### 7. "GENOMSNITTSKUND" REFERENCES

**Locations:**
- FK återkrav blog: "0 återkrav på 12+ månader (genomsnittskund)"
- Personalomsättning blog: Similar claims

**Problem:** Cannot have "average customer" with ZERO customers

**Fix:** Remove all references to "genomsnittskund", "våra kunder", "kundcase"

---

## 🟢 DESIGN & FUNCTIONALITY ISSUES

### 8. MISSING DISCLAIMERS ON STATISTICS

**Issue:** Blog posts present industry statistics as facts without any disclaimer that Elivro is pre-launch

**Recommendation:** Add disclaimer at top of blog posts:
```markdown
> **OBS:** Elivro är i pre-launch fas. Statistik och exempel i denna guide baseras på
> branschforskning och publika källor (FK, IVO, Socialstyrelsen).
```

---

### 9. COMPARISON PAGES POSITIONING

**Current:** Comparison pages position Elivro as equal competitor to AIAI/Tidvis/Primass

**Issue:** Elivro has no customers, no proven track record. Comparisons should be feature-based, not results-based.

**Recommendation:**
- Remove "customer migration" sections (no customers TO migrate)
- Focus on feature differences, not customer outcomes
- Add "Early Access" or "Coming Soon" badges for Premium features

---

### 10. CTA LANGUAGE IMPLIES IMMEDIATE AVAILABILITY

**Current CTAs:**
- "Boka demo" - OK
- "0 återkrav på 12 månader" - FALSE (no customers)
- "Se hur Elivro kan förenkla er assistansverksamhet" - Implies working product with customers

**Recommendation:**
- "Boka demo av Elivro (Beta)" - Transparent about status
- "Se hur automation kan eliminera återkrav" - Focus on solution, not Elivro's track record
- Add "Tidig access" or "Pilot-program" language

---

### 11. BLOG POST CATEGORIES NEED CLARITY

**Issue:** Blog posts categorized as "FK-Rapportering", "Compliance", "Rekrytering" but don't clarify if Elivro expertise or general industry guidance

**Recommendation:** Add byline clarity:
```markdown
author: "Elivro Team"
expertise: "Branschguide baserad på FK:s regler och IVO:s tillsynsstatistik"
```

---

### 12. MISSING "ABOUT ELIVRO" CONTEXT IN BLOG POSTS

**Issue:** Blog posts dive into solutions without clarifying Elivro is building these tools

**Recommendation:** Add intro paragraph to each blog:
```markdown
*Elivro bygger nästa generations assistansplanering med AI-driven automation.
I denna guide delar vi branschkunskap om [topic] baserad på vårt team's erfarenhet
från assistansbranschen sedan 2014.*
```

---

## 📊 STATISTICS THAT NEED SOURCES

| Claim | Current Location | Source Needed |
|-------|------------------|---------------|
| "23% av assistansbolagen fick återkrav under året" | FK återkrav blog | FK rapport 2024 |
| "Genomsnittligt återkravsbelopp: 187 000 kr" | FK återkrav blog | FK statistik |
| "68% får IVO-anmärkning för ofullständig dokumentation" | IVO statistik blog | IVO tillsynsrapport |
| "43% av assistenter slutar inom 90 dagar" | Personalomsättning blog | Branschstudie/källa? |
| "Genomsnittlig assistant stannar 9 månader" | Personalomsättning blog | SCB/branschdata? |
| "45% av återkrav = budgetöverskridning" | FK återkrav blog | FK kategorisering? |
| "FK betalar ut 17,8 miljarder årligen" | FK återkrav blog | FK årsredovisning |

**Recommendation:** Either:
1. Find actual sources and cite them
2. Use softer language: "Enligt branschuppskattningar..." or "Vanliga orsaker inkluderar..."

---

## 🎨 DESIGN IMPROVEMENTS NEEDED

### 13. BLOG LIST PAGE - NO INDICATION OF PRE-LAUNCH

**Issue:** `/blogg` page shows professional blog posts without any context that Elivro is pre-launch

**Recommendation:** Add banner:
```markdown
**Från Elivro Team:** Vi bygger nästa generations assistansplanering.
Dessa guider delar branschkunskap medan vi förbereder produktlansering.
[Registrera intresse för tidig access →]
```

---

### 14. COMPARISON PAGES - FEATURE TABLES NEED TRANSPARENCY

**Issue:** Comparison tables show checkmarks for Elivro features without clarifying which are available vs. roadmap

**Current:**
```markdown
| Funktion | AIAI | Elivro |
| AI-matchning | ❌ | ✅ |
```

**Problem:** What if AI-matchning isn't fully built yet?

**Recommendation:** Add column status:
```markdown
| Funktion | AIAI | Elivro | Status |
| AI-matchning | ❌ | ✅ | Beta |
| Realtidsbudget | ❌ | ✅ | Tillgänglig |
```

---

### 15. MISSING PRODUCT READINESS INDICATOR

**Issue:** No indication on website of Elivro's launch status

**Recommendation:** Add status badge in navbar/hero:
```markdown
🚀 Beta - Begränsad tillgång | Registrera intresse
```

---

## 🔧 FUNCTIONAL ISSUES

### 16. DEMO CTA WITHOUT QUALIFICATION

**Issue:** "Boka gratis demo" button doesn't clarify if product is available or waitlist

**Recommendation:** Update CTA form:
- Add field: "Jag är intresserad av: [ ] Pilot-program [ ] Demo när lanserad [ ] Tidig access"
- Add copy: "Elivro lanserar Q1 2026. Boka demo för pilot-access eller tidig lansering."

---

### 17. NO EMAIL CAPTURE FOR WAITLIST

**Issue:** Blog posts drive traffic but no way to capture leads for launch notification

**Recommendation:** Add exit-intent popup on blog posts:
```markdown
**Vill du veta när Elivro lanserar?**

Registrera din email och få:
- Tidig access till Beta
- Gratis FK/IVO compliance-guide
- Notis när vi lanserar

[Email input] [Registrera intresse]
```

---

## ✅ THINGS THAT ARE CORRECT

1. **Feature descriptions** - Accurate descriptions of what Elivro will do
2. **Problem identification** - FK återkrav, IVO compliance, personalomsättning are real pain points
3. **Industry education** - Content educates about FK/IVO rules (valuable even without Elivro)
4. **Messaging alignment** - Follows Elivro_Värdeerbjudande_Kvalitetsfokus.md guidance
5. **SEO structure** - Good keyword targeting, proper meta tags
6. **Technical implementation** - MDX, components, routing all work correctly

---

## 📋 IMMEDIATE ACTION ITEMS

### PRIORITY 1 (Fix Today - Legal/Credibility Risk)
1. ❌ **REMOVE** fake customer testimonial from aiai-alternativ-2026.mdx
2. ❌ **REMOVE** or **REWRITE** all "Real-World Case" sections as hypothetical scenarios
3. ❌ **CHANGE** all "Med Elivro" customer results to "Så här kan automation hjälpa"
4. ✏️ **UPDATE** all publishedAt dates from 2026 to 2025-11-19

### PRIORITY 2 (Fix This Week)
5. 📝 **ADD** sources for all statistics OR soften claims
6. 📝 **ADD** pre-launch disclaimer to blog posts
7. 📝 **REWRITE** comparison page migration sections (remove customer migration language)
8. 📝 **UPDATE** CTAs to reflect pre-launch status

### PRIORITY 3 (Fix Before Launch)
9. 🎨 **ADD** product status badge/banner
10. 🎨 **UPDATE** comparison tables with feature status
11. 🎨 **ADD** waitlist email capture
12. 🎨 **UPDATE** demo form to include pilot/waitlist options

---

## 🔍 FACT-CHECK SUMMARY

### Claims That Need Verification:

| Claim | Status | Action Needed |
|-------|--------|---------------|
| "FK betalar ut 17,8 miljarder årligen" | ✅ Likely accurate | Verify with FK årsredovisning |
| "23% av assistansbolagen fick återkrav" | ⚠️ Needs source | Find FK rapport or remove |
| "68% får IVO-anmärkning för dokumentation" | ⚠️ Needs source | Find IVO statistik or soften |
| "45% av återkrav = budgetöverskridning" | ⚠️ Needs source | Find FK data or estimate as "många" |
| "Genomsnitt återkrav: 187 000 kr" | ⚠️ Needs source | Find FK data or remove specific number |
| "43% slutar inom 90 dagar" | ⚠️ Needs source | Find branschstudie or soften |
| "Kostnad per byte: 65 000-120 000 kr" | ⚠️ Estimation | Clarify as "uppskattad kostnad baserad på..." |

---

## 📝 RECOMMENDED CONTENT STRATEGY GOING FORWARD

### Instead of Customer Case Studies:
- ✅ **Hypothetical scenarios**: "Så här skulle automation hjälpa ett bolag med 50 brukare..."
- ✅ **Industry examples**: "Vanliga problem vi ser i branschen..."
- ✅ **Feature walkthroughs**: "Hur realtidsbudget fungerar i praktiken..."

### Instead of Customer Testimonials:
- ✅ **Expert insights**: "Jimmy (VD, Elivro, assistent sedan 2014): 'Jag har sett hur...'"
- ✅ **Industry pain points**: "VD:ar vi talat med säger ofta..."
- ✅ **Problem validation**: "I våra samtal med 50+ assistansbolag har vi lärt oss..."

### Instead of ROI Claims:
- ✅ **Potential savings**: "Om du förhindrar 2 återkrav (genomsnitt 187k kr) kan du spara..."
- ✅ **Cost comparisons**: "Systemkostnad vs. återkravskostnad..."
- ✅ **Time savings**: "Automation kan minska E-RÄK från 8 timmar till 10 minuter..."

---

## 🎯 CONCLUSION

**Total Issues Found:** 17 (4 critical, 7 moderate, 6 minor)

**Biggest Risk:** False customer claims undermine credibility and could be considered fraudulent marketing

**Time to Fix:**
- Priority 1: 4-6 hours
- Priority 2: 8-10 hours
- Priority 3: 4-6 hours
- **Total:** ~20 hours of content revision

**Recommendation:** Fix Priority 1 issues IMMEDIATELY before any external sharing. The current content contains material misrepresentations that could damage Elivro's reputation.
