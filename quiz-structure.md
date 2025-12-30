# Elivro Quiz Structure

## Overview
**Goal:** Determine if Elivro and the prospect are a good fit for each other
**Format:** 6 thoughtful questions → Email capture → Personalized assessment
**Design:** Split-screen layout (hands illustration left, content right)
**Philosophy:** Trust-building through depth, not conversion through velocity

---

## Quiz Flow Tree

```
┌─────────────────────────────────────┐
│         INTRO SCREEN                │
│  "Är Elivro rätt för er?"          │
│  [Split-screen with hands]          │
└─────────────────┬───────────────────┘
                  │
                  ▼
         [Börja button]
                  │
                  ▼
┌─────────────────────────────────────┐
│      QUESTION 1: SCALE              │
│  "Hur många assistenter             │
│   koordinerar ni?"                  │
│  ├─ Färre än 10                     │
│  ├─ 10-30                           │
│  ├─ 30-100                          │
│  └─ Fler än 100                     │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│   QUESTION 2: CURRENT TOOLS         │
│  "Hur hanterar ni schemaläggning    │
│   idag?"                            │
│  ├─ Excel eller Google Sheets       │
│  ├─ Annan programvara               │
│  ├─ Papper och penna                │
│  └─ Vi har inget system än          │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│   QUESTION 3: EMOTIONAL BURDEN      │
│  "Vad tar mest energi i er vardag?" │
│  ├─ Att hitta tid för relationer    │
│  ├─ Administrativa krav             │
│  ├─ Kommunikation mellan parter     │
│  └─ Att veta om vi gör skillnad     │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│   QUESTION 4: QUALITY PHILOSOPHY    │
│  "Hur vill ni att kvalitet ska      │
│   mätas?"                           │
│  ├─ Kontinuitet och trygghet        │
│  ├─ Dokumentation som lärande       │
│  ├─ Kundnöjdhet och reflektion      │
│  └─ Vi kämpar med att mäta rätt     │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│   QUESTION 5: DECISION CONTEXT      │
│  "Vem behöver vara med i ett        │
│   samtal om förändring?"            │
│  ├─ Jag beslutar själv              │
│  ├─ Verksamhetschef + koordinatorer │
│  ├─ Styrelse eller ägare            │
│  └─ Jag vet inte riktigt än         │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│    QUESTION 6: TIMELINE             │
│  "När hoppas ni kunna förbättra     │
│   det här?"                         │
│  ├─ Så snart som möjligt            │
│  ├─ Inom 3-6 månader                │
│  ├─ Vi utforskar, inget brådskande  │
│  └─ Vi vet inte än                  │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│      EMAIL CAPTURE SCREEN           │
│  "Vi skickar er en personlig        │
│   bedömning"                        │
│  ├─ Företagsnamn (input)            │
│  └─ E-post (input)                  │
└─────────────────┬───────────────────┘
                  │
                  ▼
       [Få min bedömning]
                  │
                  ▼
┌─────────────────────────────────────┐
│      SUCCESS SCREEN                 │
│  "Tack! Kolla din inkorg om ett     │
│   ögonblick."                       │
│  [Auto-redirect after 3s]           │
└─────────────────────────────────────┘
```

---

## Detailed Question Breakdown

### Question 1: Organizational Scale
**Purpose:** Understand complexity level
**Hormozi BANTS:** Size

**Question:** "Hur många assistenter koordinerar ni?"
**Description:** "Detta hjälper oss förstå er verksamhets komplexitet"

**Options:**
- Färre än 10 → `under_10`
- 10-30 → `10_30`
- 30-100 → `30_100`
- Fler än 100 → `over_100`

**Why this matters:**
- <10: Small operation, likely single decision-maker
- 10-30: Growing, needs better tools
- 30-100: Complex coordination, high value prospect
- 100+: Enterprise-level complexity, highest value

---

### Question 2: Current Reality
**Purpose:** Pain discovery without asking "pain"
**Hormozi BANTS:** Need

**Question:** "Hur hanterar ni schemaläggning idag?"
**Description:** "Utan att döma – vi vill förstå er nuläge"

**Options:**
- Excel eller Google Sheets → `spreadsheets`
- Annan programvara (vi kan prata om vilken) → `other_software`
- Papper och penna → `paper`
- Vi har inget system än → `no_system`

**Why this matters:**
- Spreadsheets/Paper: High pain, ready for solution
- Other software: Dissatisfied with current tool
- No system: Early-stage or chaos

---

### Question 3: Emotional Reality
**Purpose:** Philosophy alignment - do they value quality over efficiency?
**Hormozi:** Value Equation (Dream Outcome)

**Question:** "Vad tar mest energi i er vardag?"
**Description:** "Välj det som känns mest tungt just nu"

**Options:**
- Att hitta tid för det som betyder något – relationer och kvalitet → `time_for_quality`
- Att hålla reda på alla administrativa krav → `admin_burden`
- Att kommunikation mellan kund, assistent och myndighet → `communication`
- Att veta om vi faktiskt gör skillnad → `impact_uncertainty`

**Why this matters:**
- Time for quality: **Perfect fit** - values what Elivro values
- Admin burden: Needs efficiency, but may not value quality
- Communication: Systems problem, fixable
- Impact uncertainty: Deep engagement, wants meaning

**Disqualification signal:**
If they ONLY care about efficiency (not represented here), they're a bad fit.

---

### Question 4: Quality Philosophy
**Purpose:** Values alignment - how do they define "good"?
**Hormozi:** Need (but philosophical)

**Question:** "Hur vill ni att kvalitet ska mätas?"
**Description:** "Vad betyder 'bra assistans' för er?"

**Options:**
- Kontinuitet och trygghet i relationer mellan kund och assistent → `continuity`
- Dokumentation som faktiskt hjälper oss lära och förbättra → `documentation_learning`
- Kundnöjdhet och regelbunden reflektion → `satisfaction_reflection`
- Vi kämpar med att mäta det rätta – inte bara det enkla → `struggling_metrics`

**Why this matters:**
- Continuity: **Perfect alignment** with Elivro's "personkemi" pillar
- Documentation as learning: Aligns with "kvalitetsledning" pillar
- Struggling metrics: **Honest, self-aware** - great fit

**Disqualification signal:**
If they only want compliance checkboxes → bad fit (not offered as option)

---

### Question 5: Decision Context
**Purpose:** Sales intelligence - who needs to approve?
**Hormozi BANTS:** Authority

**Question:** "Vem behöver vara med i ett samtal om förändring?"
**Description:** "Så vi vet vem vi ska prata med"

**Options:**
- Jag beslutar själv → `solo_decision`
- Verksamhetschef och koordinatorer → `management_coordinators`
- Styrelse eller ägare → `board_owners`
- Jag vet inte riktigt än → `unsure`

**Why this matters:**
- Solo decision: Fast sales cycle
- Management + coordinators: Multi-stakeholder, needs tailored demo
- Board/owners: Long cycle, high value
- Unsure: Explorer, not buyer yet

**Disqualification signal:**
If "unsure" + other signals of low intent → deprioritize

---

### Question 6: Timeline
**Purpose:** Urgency without pressure
**Hormozi BANTS:** Timing

**Question:** "När hoppas ni kunna förbättra det här?"
**Description:** "Ärligt svar – ingen press"

**Options:**
- Så snart som möjligt – det är brådskande → `urgent`
- Inom 3-6 månader → `three_to_six_months`
- Vi utforskar möjligheter, inget brådskande → `exploring`
- Vi vet inte än → `unknown`

**Why this matters:**
- Urgent: High-priority follow-up
- 3-6 months: Warm nurture sequence
- Exploring: Long-term nurture
- Unknown: Lowest priority

**Language note:** "Ärligt svar – ingen press" reduces pressure, increases honesty

---

## Lead Scoring Logic

### High-Quality Lead (Priority 1):
- Q1: 30+ assistants
- Q3: "Time for quality" (values quality)
- Q4: Continuity or struggling with metrics
- Q5: Has decision authority or knows who does
- Q6: Urgent or 3-6 months

### Medium-Quality Lead (Priority 2):
- Q1: 10-30 assistants
- Q2: Using spreadsheets/paper (pain)
- Q3: Admin burden or communication
- Q5: Multi-stakeholder decision
- Q6: 3-6 months or exploring

### Low-Quality Lead (Nurture):
- Q1: <10 assistants
- Q5: Unsure who decides
- Q6: Unknown timeline
- Missing philosophy alignment

### Disqualified (Do Not Pursue):
*(Not possible with current questions - all options show some fit)*

---

## Email Personalization Logic

### Focus Area Determination:

```python
if Q4 == "continuity" OR Q4 == "struggling_metrics":
    focus = "KVALITETSLEDNING"

elif Q3 == "time_for_quality":
    focus = "REKRYTERING"

elif Q2 == "spreadsheets" OR Q2 == "no_system":
    focus = "SCHEMALÄGGNING"

elif Q3 == "communication":
    focus = "HELHET"

else:
    focus = "HELHET"
```

### Email Subject Lines:
- **REKRYTERING:** "När rätt person möter rätt uppdrag"
- **SCHEMALÄGGNING:** "Schema som faktiskt fungerar i verkligheten"
- **KVALITETSLEDNING:** "Kvalitet som syns – och känns"
- **HELHET:** "När alla delar hänger ihop"

### Email Body Structure:

1. **Personalized Assessment** (2-4 sentences referencing specific answers)
   - Example: "Med över 100 assistenter att koordinera hanterar ni en verkligt komplex verksamhet. Att prioritera kvalitet och relationer – trots tidspress – visar att ni ser assistans som mer än administration."

2. **Focus-Specific Recommendations** (3 bullet points)
   - Tailored to their primary need

3. **CTA:** "Boka ett 30-minuters samtal så skräddarsyr vi en genomgång efter er verksamhet"

4. **P.S.:** "Assistans är komplext. System behöver inte vara det."

---

## Hormozi Principles Applied

### ✅ BANTS Framework:
- **Budget:** Implied by scale (Q1)
- **Authority:** Direct ask (Q5)
- **Need:** Multiple angles (Q2, Q3, Q4)
- **Timing:** Direct ask (Q6)
- **Size:** Direct ask (Q1)

### ✅ Value Equation:
- **Dream Outcome:** Q3 ("Vad tar mest energi?") + Q4 (quality vision)
- **Perceived Likelihood:** Personalized assessment shows we understand them
- **Time Delay:** "2 minuter" framing on intro
- **Effort & Sacrifice:** Only 6 questions, thoughtful not burdensome

### ✅ Disqualification Over Qualification:
- Philosophy questions (Q3, Q4) weed out efficiency-only seekers
- Authority question (Q5) identifies tire-kickers
- Timeline question (Q6) identifies explorers vs. buyers

### ✅ Lead Magnet Principle:
- "Personlig bedömning" = complete solution to narrow problem
- Specific, actionable assessment based on their answers
- Builds trust before sales conversation

---

## Design Principles

### Split-Screen Layout:
- **Left (40%):** Hands illustration, cream background, opacity 40%
- **Right (60%):** Content area, clean typography
- **Mobile:** Stacks to full-width

### Typography:
- **Headlines:** Instrument Serif, 3xl-5xl
- **Body:** IBM Plex Mono, sm-base
- **Color:** Charcoal-700 headlines, Charcoal-500 body

### Transitions:
- **400ms ease-out** for content
- **300ms delay** on answer selection
- **Staggered animations** (0.08s between options)
- **Respects:** `prefers-reduced-motion`

### Progress Bar:
- **0-85%:** Questions (14.2% per question)
- **90%:** Email capture
- **100%:** Complete
- **Color:** Sage-500 fill

---

## Success Metrics

### Completion Rate Targets:
- **Intro → Q1:** 80%
- **Q1 → Q6:** 70% (question attrition)
- **Q6 → Email:** 85%
- **Overall completion:** 45-50%

### Lead Quality Metrics:
- **High-quality leads:** 30-40% of completions
- **Demo booking rate:** 20-25% of completions
- **Close rate:** Higher than direct demo bookings (due to qualification)

### Email Engagement:
- **Open rate:** 60%+ (personalized subject lines)
- **Click-through:** 25%+ (to demo booking)

---

## Future Optimizations

### Potential Additions:
1. **Referral ask** (Hormozi method): "Känner ni någon annan som kämpar med samma sak?"
2. **Budget signal:** "Vad investerar ni i omsorgsystem idag?" (if too direct, skip)
3. **A/B test:** Question order (philosophy questions first vs. context first)
4. **Dynamic branching:** Show different Q4 based on Q3 answer

### Analytics to Track:
- Answer distribution per question
- Correlation between answers and demo bookings
- Drop-off points (which question loses people)
- Time spent per question

---

## End Goal

**Mutual fit assessment:**
- ✅ Customer knows if Elivro aligns with their values
- ✅ Elivro knows if customer is ready/willing to invest in quality
- ✅ Sales conversation starts with shared understanding
- ✅ Bad fits self-select out (low completion rate acceptable)

**Philosophy:** "Better to have 10 perfect-fit conversations than 100 mediocre leads."

---

**Last updated:** December 29, 2025
**Quiz version:** 1.0 (6-question depth model)
