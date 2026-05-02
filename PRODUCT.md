# Product

## Register

brand

## Users

The page is written for the **VD** and **verksamhetschef** at a Swedish *assistansbolag* (a company providing personlig assistans under LSS). They are evaluating whether Elivro is a system worth building their operations on, not browsing for entertainment.

Their context when arriving:

- Reading at a desk between operational fires (a sjukfrånvaro, a brukarärende, a hire that fell through). Time is fragmented, attention is spent.
- Skeptical by experience. They have likely been sold a "transformative" branschsystem before and lived through the rollout. Soft language reads as a warning.
- Carrying weight that a marketing page rarely respects: real people in real homes depending on the schedule landing right.
- Often older than the typical SaaS buyer, often Swedish-first, often reading on a 15-inch laptop, sometimes on a phone between visits.

Their job-to-be-done on this page is one decision: *"Is this serious enough that I should book a demo, or is this another väl-paketerad startup."* The page either earns a demo, or it doesn't.

The page does **not** speak to schedule coordinators (samordnare) or assistenter directly. They are users of the product. The buyer is the operator.

## Product Purpose

Elivro is an AI-driven operativsystem for *assistansbolag*: AI-driven recruitment (människa till människa), framåtblickande AI-driven schemaläggning, and an AI-driven ledningssystem that surfaces insights across the verksamhet.

The landing page is the lead-generator. Pre-launch, with no customers and no social proof, the page must do all of its convincing through:

- Product value demonstration (the `ProofOfLifeMock` is the elevator pitch in dashboard form).
- Process clarity (`HowItWorks`, three steps, no mystique).
- De-risking (30-day test, no bindningstid, named in copy).
- Founder credibility (`FounderStory` — built-from-the-floor narrative, not a generic origin story).

Success is a booked demo from someone who is genuinely the VD or verksamhetschef, not a curiosity click from a coordinator. The funnel after the page is small and operator-led, so volume matters less than fit.

## Brand Personality

Three words: **quiet · craftsman · inevitable.**

- **Voice:** Swedish first, "du" form, never "Ni." Italic carries emphasis, never bold. No exclamation marks. No emoji. No model-name attribution ("Powered by GPT-X"). Quantify in time, money, named days: *"14 timmar per vecka per koordinator," "Anders L. på torsdag," "30 dagars test."*
- **Tone:** like a trusted colleague who has done care work and now builds tools for it. Confident without performance, warm without sentimentality. The reader should feel respected, not sold to.
- **Emotional goals:** the page should leave the reader feeling that someone finally took this work seriously, that the system was built by people who understand vardagen, and that booking a demo is a low-stakes next step rather than a commitment.

The brand visibly embraces AI (it is the product) but the *surface* does not look AI-made. AI is the skill in the basement; the face on the page is the craft.

## Anti-references

What this must **not** look like, in three layers.

**Visual anti-references:**
- AI-aesthetic surfaces: purple gradients, sparkle iconography (✨), glowing orbs, streaming-text reveals, "AI typing" pulses, neon-on-black "futuristic" palettes.
- Glassmorphism, backdrop-blur as decoration, frosted cards.
- Generic SaaS templates: hero-metric blocks (big number + label + supporting stats + gradient), identical icon-and-heading card grids, gradient-text headlines, side-stripe colored borders on callouts.
- Stockfoton of smiling diverse teams in glass offices.
- Branschsystem clichéer: heavy navy-and-white corporate palettes, clip-art icons, dense feature checklists.

**Copy anti-references:**
- Startup-speak: synergier, disrupta, revolutionera, transformera, empowerment, journey, solution, best-in-class, world-class, cutting-edge, next-gen, 10x, unlock, seamless. None of these appear on the page.
- Unsubstantiated percentage claims ("80% mindre tid").
- ALL CAPS in headlines. Em dashes (use commas, colons, periods, parentheses).

**Strategic anti-references:**
- Customer logo strips, testimonials, comparison-vs-competitor tables, case studies, social-proof counters. Pre-launch reality, but also a posture: Elivro will not lean on borrowed credibility.
- "Powered by GPT-X" or any model-name attribution. The model is supply chain.
- Discord / community CTAs, onboarding popovers on a marketing page.

**Positive references** (the lane):
- **Linear** (linear.app) — the B2B precedent for ember-on-obsidian restraint. Single accent, dark canonical, quiet motion, thin display.
- **Anthropic** (anthropic.com) — an AI brand that consciously rejects AI-aesthetic. Editorial typography, warm palette, no sparkles. Direct precedent for *"we ARE AI but we won't look it."*
- **Resend** (resend.com) — closest executional cousin: dark-and-warm B2B, single-accent ember, personality without noise.

If a competitor in the *branschsystem* space is the spiritual reference, the answer is no.

## Design Principles

Strategic posture, not visual rules. Visual rules live in `DESIGN.md` and `DESIGN_RULES.md`.

1. **Quiet confidence over performance.** The page does not work to convince. A reader should feel a system that knows what it does and trusts the reader to recognize it. If a section is straining to impress, cut it.
2. **Specifics over abstractions.** Hours, money, named people, named days. *"14 timmar per vecka per koordinator"* and *"Anders L. på torsdag"* are the unit of persuasion. If a sentence could appear unchanged on any other SaaS site, rewrite it until it couldn't.
3. **Warmth without softness.** Care work is human; the page must respect that without going sentimental. Dark obsidian surfaces, warm ember light. No corporate sterility, no consumer-app cuteness, no "we're just like a friend."
4. **AI in service of human work, never the other way around.** The product is AI; the surface must not be. No sparkle iconography, no orb, no streaming text, no model-name attribution. The AI's job is to free the human to do the human work; the page should communicate that hierarchy at a glance.
5. **Show, don't tell.** Demonstrate the product over describing it. The `ProofOfLifeMock` is the elevator pitch; the `HowItWorks` is the proof of clarity; the de-risking facts (30-day test, no bindningstid) are falsifiable claims, not adjectives. Adjectives are the failure mode of pre-launch B2B copy.

## Accessibility & Inclusion

No formal WCAG standard for now. Reasonable defaults apply:

- **Contrast** as documented in `DESIGN.md`: primary text/background pairings clear AAA on the canonical dark surface (`fg`/`ink-lift` ≈ 16.6:1).
- **Reduced motion:** `prefers-reduced-motion` is honored. The Liv 3.2s breath, the 30-second mark rotation, GSAP scroll-pinned sequences in `HowItWorks` all degrade to static under that query.
- **Buyer demographic:** assume readers can be older and less SaaS-fluent than the typical Linear/Stripe audience. Avoid unlabeled iconography, ambiguous gestures, and font sizes below body-sm. Tap targets meet at least 44×44px on mobile.
- **Language:** Swedish first. English copy, where it appears, is secondary skin and never the primary surface.
- **Field reading:** the buyer may read on a phone between visits. Mobile must not be a downgrade.

Formal WCAG conformance is an open decision for a later pass once Elivro has a customer surface and not just a marketing one.
