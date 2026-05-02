# DESIGN_RULES — Elivro Landing Page

**Version:** 1.0 (migration complete)
**Date:** 2026-04-29
**Authoritative spec:** `../elivro-business/DESIGN.md` (Obsidian system)
**This file:** the operational mapping from Obsidian to *this* repo.
**Sibling:** `./ILLUSTRATIONS.md` — catalog of promoted sketchbook compositions in `components/illustrations/`. Read it before picking a composition.
**If this file conflicts with `DESIGN.md`, `DESIGN.md` wins.**

This document is the bridge between the canonical Obsidian design system
(authored in `elivro-business/`) and the running Next.js code in this repo.
It's modeled on the `FIGMA_RULES.md` pattern: short, imperative,
codebase-anchored. No philosophy here — that lives in `DESIGN.md`,
`positionering.md`, and `design-strategi.md`.

The Tactile Humanist legacy tokens (`terracotta`, `sage`, `cream`,
`charcoal`) have been retired. The codebase is fully on Obsidian as of
2026-04-29.

---

## The three governing rules

Every choice in this codebase must be derivable from these. From `DESIGN.md`:

1. **Restraint over cleverness** — one accent, one easing curve, one italic
   for emphasis. *If a flourish has to be defended, it leaves.*
2. **Specifics over abstractions** — "14 timmar per vecka per koordinator"
   beats "productivity gains."
3. **Warmth without softness** — dark surfaces, never cold. Halos,
   hairlines, a mark that breathes once every 30 seconds.

If you can't derive a choice from these, don't ship it.

---

## Path map

### Where Obsidian sources live (read-only references)

| What | Where |
|---|---|
| Canonical spec | `../elivro-business/DESIGN.md` |
| Voice & positioning | `../elivro-business/positionering.md` |
| Marketing-vs-app dialect | `../elivro-business/design-strategi.md` |
| Routing skill | `../elivro-business/.claude/skills/elivro-design/SKILL.md` |
| Token CSS | `../elivro-business/Elivro Design System/tokens.css` |
| Tailwind theme | `../elivro-business/Elivro Design System/extract/tailwind.config.js` |
| Brand mark SVG | `../elivro-business/Elivro Design System/assets/logo.svg` |
| Reference cards | `../elivro-business/Elivro Design System/cards/*.html` |

These paths assume the two repos are siblings under `C:/Users/Filiph/source/repos/`.
**The sync mechanism is unresolved (see Open decisions § 1).** Until it is, treat
the Obsidian sources as read-only and copy values forward when needed.

### Where this repo's design surface lives

| Concern | File |
|---|---|
| Tailwind config | `tailwind.config.mjs` (ES module — note `.mjs` not `.cjs`) |
| Global CSS — `@theme`, `:root`, base type, utility classes, keyframes | `app/globals.css` |
| Components | `components/*.tsx`, `components/quiz/*.tsx` |
| Page composition | `app/(app)/page.tsx` |
| Root layout (next/font, switcher) | `app/(app)/layout.tsx` |
| Demo email API | `app/api/demo/route.ts` |
| Quiz API | `app/api/quiz/route.ts` |
| Payload admin (Users-only, no content collections wired to marketing) | `payload.config.ts`, `collections/Users.ts` |

---

## Token strategy

**Recommended interim approach** until the sync mechanism (Open decision § 1) is settled:

1. **Inline Obsidian's tokens** into `app/globals.css` and `tailwind.config.mjs`
   directly — copy the values, don't symlink. Reference `DESIGN.md` in a comment
   block at the top of each file so future agents know where the values came from.
2. **Use semantic Tailwind keys, not raw hex.** Define `accent` (ember), `liv`
   (sage), `ink` / `ink-lift` / `ink-card`, `bone`, `fg` / `fg-soft` / `fg-muted`
   in `tailwind.config.mjs`. All component code must reference these — never
   `#ff7a45` in JSX.
3. **Delete the `terracotta` / `sage` / `cream` / `charcoal` numeric scales.**
   The full 50–900 ladder is overkill for Obsidian; the spec uses three surface
   tokens, not nine. Keep the scale only if a real component still needs a
   specific shade after the swap. (Default: delete.)

When the sync mechanism is decided, this section will say "import from
`@elivro/tokens`" or equivalent, and these inlined values become the
single import.

---

## Crosswalk: Tactile Humanist → Obsidian

Use this table as a literal find-and-replace guide for the swap.

### Color

| Currently in this repo | Becomes |
|---|---|
| `--terracotta` `#B86B4C`, `text-terracotta`, `bg-terracotta` | `--accent` `#ff7a45`, `text-accent`, `bg-accent` |
| `--terracotta-dark` `#9A5A3F`, `hover:bg-terracotta-600` | `--accent-deep` `#e55a22`, `hover:bg-accent-deep` |
| `--terracotta-light` `#C98A70`, `hover:bg-terracotta-400` | `--accent-bright` `#ff9566`, `hover:bg-accent-bright` |
| `--sage` `#9BAF8C`, `text-sage-500` (decorative) | **Delete unless it becomes Liv.** Liv is `#7a8a6b` and is **strictly scoped to three positions** (nav heartbeat, hero status pill, dashboard "Realtid" indicator). Anywhere else: delete. |
| `--cream` `#F5F2ED`, `bg-cream` (page bg) | `--bg` `#0a0806`, `bg-ink` — **the site flips to dark canonical.** |
| `--cream-light` `#FFFDF9`, `bg-cream-light` (cards) | `--bg-lift` `#12100d`, `bg-ink-lift` |
| `--cream-dark` `#E8E3DB` | `--bg-card` `#1a1714` |
| `--charcoal` `#3D3D3D`, `text-charcoal` (body) | `--fg` `#f5efe3`, `text-fg` (light text on dark) |
| `--charcoal-light` `#5A5A5A`, `text-charcoal-500` | `--fg-soft` `#bdb5a6` |
| `text-charcoal-400`, `text-charcoal-300` (de-emphasized) | `--fg-muted` `#8a8275` |
| `--charcoal-dark` `#2A2A2A`, `text-charcoal-700` (headings) | `--fg` `#f5efe3` (headings stay primary on dark) |
| `status.success` / `status.warning` / `status.risk` / `status.urgent` | **Delete all four.** Obsidian has no status tokens. Errors and warnings are written as Swedish copy. |
| `accent.DEFAULT` / `accent.hover` / `accent.light` | Already covered by `--accent*` above — delete the duplicate `accent.*` keys. |
| `surface.base` / `surface.elevated` / `surface.card` | **Delete.** Use `ink` / `ink-lift` / `ink-card` directly. |
| `border.subtle` / `border.DEFAULT` (charcoal-on-light) | Hairlines on dark: `rgba(245, 239, 227, 0.08)` for subtle, `rgba(255, 122, 69, 0.18)` for accent edges. |

> **Mode flip:** the entire site moves from cream-canonical (light) to ink-canonical
> (dark). This is the marketing dialect per `design-strategi.md` § 4.1. Keep the
> single light-dialect inversion (`card-inverted`) available as a Tailwind class for
> editorial hero panels — but the page default is dark.

### Typography

| Currently | Becomes |
|---|---|
| `Instrument Serif` (Google Fonts CDN import in `globals.css`) | `Fraunces` via `next/font` (see Font swap scaffolding below) |
| `Instrument Sans` | `Inter` via `next/font` |
| `IBM Plex Mono` | `JetBrains Mono` via `next/font` |
| `Nunito` (`--font-logo`, never imported, dead) | **Delete.** The logo is an SVG mark, not a wordmark. |
| `font-serif`, `font-sans`, `font-mono` Tailwind keys | Same keys, new font stacks. |
| `font-display`, `font-body` legacy aliases | **Delete.** No aliases. |
| H1 weight `400` | Weight `300` (display sizes). H3 and below stay `400`. |
| H1 letter-spacing `-0.02em` | `-0.021em` for h1 / `-0.028em` for display. |
| Headings color `--charcoal-dark` | `--fg`. |
| Body line-height `1.7`, letter-spacing `0.01em` | Body line-height `1.55`, letter-spacing `-0.005em`. |
| `<span className="text-terracotta">Inte systemet.</span>` (color-emphasis) | `<em>Inte systemet.</em>` italic in Fraunces. **Italic emphasizes — color does not.** Reserve `--accent` for the system's voice. |

**The italic signature** is the brand's most important typographic move.
One italicized word (or short clause) per heading. Hero already has the right
*shape* — "Inte systemet." — but it's expressed as color, not italic. Convert.

### Shadow & elevation

| Currently | Becomes |
|---|---|
| `shadow-sm/DEFAULT/md/lg` (charcoal-based) | `shadow-card` (`sh-card` token from DESIGN.md). Most cards become hairline + halo, no shadow stack. |
| `shadow-terracotta`, `shadow-terracotta-lg` | `shadow-rim` (active states), `shadow-card` (default lift), `shadow-hero` (modal-class only). |
| `shadow-sage` | **Delete.** Liv never carries shadow. |
| Stacked shadows on cards (multiple layers) | **One layer only.** Pair every shadow with a 1px hairline border in the same color. |
| `backdrop-blur-sm` (mentioned in stale CLAUDE.md, may exist in components) | **Forbidden.** Remove on sight. Lift surfaces with `ink-lift` / `ink-card`, never blur. |

### Radius

| Currently | Becomes |
|---|---|
| `rounded-sm` (`2px`), `rounded-DEFAULT` (`3px`), `rounded-md` (`4px`), `rounded-lg` (`6px`) | `rounded-sm` (`8px`), `rounded-md` (`10px`), `rounded-lg` (`14px`), `rounded-xl` (`20px`), `rounded-pill` (`50px`). |
| `.organic-shape` (asymmetric blob radii in `globals.css`) | **Delete.** Five working radii — no organic blobs, ever. |

The default UI radius is `md` (10px). Cards use `lg` (14px). Pills use `pill` (50px).

### Motion

| Currently | Becomes |
|---|---|
| `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (`logo-spin` transition) | `cubic-bezier(0.2, 0.7, 0.2, 1)` |
| `cubic-bezier(0.2, 0.8, 0.2, 1)` (`logo-text-slide` transition) | `cubic-bezier(0.2, 0.7, 0.2, 1)` |
| `ease-out` (default Tailwind) on entrances | `cubic-bezier(0.2, 0.7, 0.2, 1)` everywhere |
| `transitionDuration: 150 / 200 / 400 / 600` | `xs 100ms · sm 200ms · md 300ms · lg 600ms · xl 800ms` |
| `0.4s` / `0.5s` / `0.6s` keyframe durations | Map to `xs / sm / md / lg / xl` tokens |
| `@keyframes fadeIn / slideUp / slideInLeft / scaleIn` | Use Obsidian's named keyframes instead: `obsRise`, `obsFadeUp`, `obsFadeSlide`, `obsSweep`, `obsRotate`, `obsTwinkle`, `obsPulseGlow`, `obsNudge`. Defined in the Obsidian extract. |
| `.logo-spin.rotated` (90° on hover) | The mark rotates **once every 30 seconds** in hero contexts, infinite linear. No hover rotation, no 90° hover twist. |

`prefers-reduced-motion` is already handled in `globals.css:249–262`. Keep it.

### Buttons

The Hero CTA is the litmus test. Currently:

```tsx
className="bg-terracotta hover:bg-terracotta-600 rounded-sm shadow-terracotta hover:shadow-terracotta-lg font-mono font-medium text-base text-cream-50 px-8 py-4"
```

Should become (Obsidian primary button):

```tsx
className="bg-accent hover:bg-accent-bright active:bg-accent-deep text-ink rounded-md font-sans font-normal text-sm px-5 py-2.5"
// 10/20 padding · body-sm Inter · 10px radius · ember on dark text
```

Note the changes: `font-mono` → `font-sans` (button text is body-sm Inter, not mono),
size `text-base` → `text-sm`, padding `8/4` → `5/2.5` (10px/20px per `DESIGN.md`),
radius `sm` (2px → 8px under new scale; we want `md` = 10px), distinct active state
via `--accent-deep`.

The secondary CTA (`border border-charcoal hover:bg-charcoal hover:text-cream`)
becomes `bg-ink-lift text-fg hover:text-fg` — bone text on lifted ink, not bordered.

---

## Component inventory

All components live in `components/`. Quiz subflow in `components/quiz/`.
All consume Obsidian tokens; no legacy color references remain.

| Component | Role |
|---|---|
| `Navbar.tsx` | Sticky dark nav. Mark + wordmark + **Liv heartbeat dot** (Liv position 1). Single ember CTA right-aligned. Mobile menu collapses into ink-lift surface. |
| `Hero.tsx` | Italic emphasis on "Inte systemet." via `<em>` (color-emphasis retired). Body Inter subhead (mono retired from non-system surfaces). Hands illustration treated with brightness/sepia/lighten blend for dark canvas. |
| `LiveTicker.tsx` | "Just nu i Elivro" strip — Liv position 2. 6.5s mono crossfade. Reduced-motion safe. |
| `Philosophy.tsx` | Three principles, italic emphasis on the load-bearing word per heading. Hairline-grid layout (1px gaps via `bg-edge`). |
| `ProblemSection.tsx` | "Tre saker som *stjäl* tid." Three card grid on `ink-lift`. Mono index labels. |
| `Features.tsx` | Three AI pillars from `positionering.md` § 4. Rewritten copy (not reskinned). Each card carries title, italicized tagline, differentiating sentence, capability paragraph, and "Andra system gör" footer. |
| `SystemDoesItself.tsx` | "Det systemet *gör* medan ni gör det viktigaste." Pure typography list of system verbs. No mockups, no icons. |
| `HowItWorks.tsx` | GSAP scroll-pinned three-step. Desktop scrubs through cards; mobile is plain stack. |
| `ProofOfLifeMock.tsx` | The schedule-suggestion mock. Liv position 3 (Realtid · synkat indicator). Coral on "Elivro föreslår" label only. |
| `FounderStory.tsx` | Centered editorial pull-quote. Italic on "saknat." Quiz-CTA exit ramp. |
| `FAQSection.tsx` | Hairline-divided accordion. Active question turns ember; +/- circle reverses contrast on open. |
| `CTA.tsx` | Demo form section. Two-column: copy left, ink-lift card form right. Hairline list of de-risking facts. |
| `DemoModal.tsx` | `sh-hero`-class modal, ink/85 backdrop (no blur). |
| `CookieConsent.tsx` | Bottom-right ink-card pill. Single ember accept, ghost decline. |
| `Footer.tsx` | Dark, hairline top, mono eyebrows, ember-on-hover links. |
| `SectionDivider.tsx` | A 1px hairline rule. Replaces the old organic-pebble graphic. |
| `AnimatedText.tsx` | Word-by-word fade. Purple gradient feature dropped — `emphasisWord` now wraps in italic `<em>` instead. |
| `FadeSection.tsx` | Scroll-driven opacity wrapper. Token-agnostic. |
| `GoogleAnalytics.tsx` | GA script loader, gated on cookie consent. Token-agnostic. |
| `DisplayFontSwitcher.tsx` | Dev-only bottom-right pill that flips `[data-display]` between Fraunces / Instrument Serif / Newsreader / Bodoni Moda via `?font=` URL param or localStorage. Gated on `NODE_ENV !== 'production'`. |
| `quiz/QuizIntro.tsx` · `QuizQuestion.tsx` · `QuizEmailCapture.tsx` · `QuizComplete.tsx` · `QuizProgress.tsx` | Six-question quiz flow. All on dark Obsidian, ember single-CTA pattern, mono progress and counters. |

---

## Voice & copy reminders

From `positionering.md` § 6.

**Use:** levande · lyssnar · föreslår · upptäcker · frigör · märker · varnar ·
matchar · visar · skickligt · värdighet · omsorg · vardag · konkret · faktiskt · på riktigt

**Forbidden vocabulary:** synergier · disrupta · revolutionera · transformera ·
empowerment · journey · solution · best-in-class · world-class · cutting-edge ·
next-gen · 10x · unlock · seamless

**Always:**
- Swedish first. English is a second skin, never the primary surface.
- "du" form, never "Ni."
- No exclamation marks anywhere on the site.
- No emojis in product copy.
- Quantify in time, money, names: "14 timmar per vecka per koordinator,"
  "449 kr per brukare," "30 dagars test," "Anders L. på torsdag."

`CLAUDE.md` § "B2B SaaS Best Practices" rule "**NO percentage claims**" stands —
that's about *unsubstantiated* metrics like "80% mindre tid." Specific numerics
("94% match" inside a mock with stated source) are fine and required.

---

## Anti-patterns (HARD don'ts)

From `positionering.md` § 9 and `DESIGN.md` Don'ts.

- ❌ **Bold for emphasis in body.** Italic always, bold never.
- ❌ **Second accent color** beyond Liv's three permitted positions.
- ❌ **Backdrop-blur / glassmorphism.** Forbidden. The stale CLAUDE.md
  § "Glassmorphism Design System" describes a theme that no longer exists —
  delete that whole section when CLAUDE.md is rewritten (see Open decisions § 5).
- ❌ **Purple gradients, AI sparkles, "✨" emojis, glowing AI orbs,
  AI-typing pulsing dots / streaming-text reveals.**
- ❌ **"Powered by GPT-X" or any model-name attribution.** The model is
  supply chain, not product.
- ❌ **Stacked shadows.** One layer of light per surface.
- ❌ **ALL CAPS in headlines.** Only mono eyebrows are tracked + uppercase.
- ❌ **Mixed easing curves.** `cubic-bezier(0.2, 0.7, 0.2, 1)` is the system.
- ❌ **`dark:` Tailwind prefix.** If we ever need theme switching, use
  `[data-theme]` attribute on `<html>`. Marketing doesn't need a toggle —
  marketing is dark canonical, full stop.
- ❌ **Decorative iconography.** Lucide icons exist in code (`ArrowRight`
  in Hero) — keep only when they carry differentiating information. Most
  arrows can leave.
- ❌ **Comparison tables vs. competitors, customer-logo strips,
  testimonials, Discord/community CTAs, onboarding popovers.**
- ❌ **Generic stockfoton.** The hands illustration is a brand asset and
  acceptable. New imagery must be warm, granulated, real.

---

## Font swap scaffolding

Per the handoff (resolved-during-handoff § Pending decisions #1), the user
wants to A/B fonts in-browser before committing. Implementation:

1. **Replace Google Fonts CDN imports** at the top of `app/globals.css`
   (lines 2–5) with `next/font` declarations in `app/layout.tsx`. Load all
   four serif candidates: **Fraunces**, **Instrument Serif**, **Newsreader**,
   **Bodoni Moda**. Plus Inter (body) and JetBrains Mono (system). Each gets
   a CSS variable: `--font-fraunces`, `--font-instrument-serif`, etc.
2. **In `app/globals.css`, define a single switchable display token:**
   ```css
   :root { --t-display: var(--font-fraunces); }
   [data-display="instrument"] { --t-display: var(--font-instrument-serif); }
   [data-display="newsreader"] { --t-display: var(--font-newsreader); }
   [data-display="bodoni"] { --t-display: var(--font-bodoni-moda); }
   ```
3. **Tailwind `font-serif` resolves to `var(--t-display)`**, so all headings
   pick up the active font.
4. **Dev-only switcher.** Either a bottom-corner button cluster (gated by
   `process.env.NODE_ENV !== 'production'`), or a query-param reader that
   sets `data-display` on `<html>` from `?font=instrument` etc. Pick one;
   I lean toward the query-param reader — less DOM noise, easier to share
   a comparison link.
5. **Locking the choice.** When the user decides, change the default
   `--t-display` line, delete the unused `next/font` declarations, delete
   the switcher, and update `DESIGN.md` if anything other than Fraunces wins.

Do **not** swap fonts in the same PR as the token reskin. Two changes,
two reviewable steps.

---

## Decisions log

Resolved 2026-04-28 by user authorization. Future agents: these are settled,
don't re-litigate.

1. **Token sync — interim: inline.** Copy Obsidian's hex values into
   `tailwind.config.mjs` and `app/globals.css` directly, with a header
   comment block citing `DESIGN.md` and the date copied. **Defer the
   sync script** until the Elivro app repo (second consumer) starts —
   one consumer doesn't justify pipeline plumbing. When the second
   consumer arrives, write a Node sync script
   (`scripts/sync-design-tokens.mjs`) that pulls from
   `../elivro-business/Elivro Design System/`. Symlinks rejected
   (Windows-fragile). Absolute paths rejected (machine-specific).

2. **Liv on the landing page — confirmed.** All three permitted Liv
   positions are usable here:
   - **Nav heartbeat** — 6px dot adjacent to the wordmark in `Navbar.tsx`.
   - **Hero / system-status pill** — leading-edge dot inside `LiveTicker.tsx`.
     The ticker is the canonical "system-status pill" expression.
   - **Dashboard "Realtid · synkat" indicator** — inside `ProofOfLifeMock.tsx`.
   3.2s ease-in-out breath loop. Disabled under `prefers-reduced-motion`.
   Nowhere else on the page. If a fourth Liv usage is proposed, the answer
   is no.

3. **Motion reconciliation — done.** `design-strategi.md` § 2.3 has been
   amended to reference `DESIGN.md` verbatim. Single easing
   `cubic-bezier(0.2, 0.7, 0.2, 1)` everywhere. The two documented exceptions
   (mark rotation 30s linear, Liv breathing 3.2s ease-in-out) are scoped
   and named. No other curves anywhere.

4. **Three-pillar copy — `positionering.md` § 4 wins.** The customer-outcome
   framing ("Lättare rekrytering / Snabbare schemaläggning / Enklare
   rapportering") is retired. The page adopts the AI-pillar framing:
   - **AI-driven rekrytering: människa till människa**
   - **AI-driven schemaläggning: framåtblickande, inte reaktiv**
   - **AI-drivet ledningssystem: insikter för hela verksamheten**
   `Features.tsx` is rewritten to reflect this — see component disposition
   table above. The differentiating sentence beneath each pillar comes
   from `positionering.md` § 4 directly. Don't soften it.

5. **`landing-page/CLAUDE.md` rewrite — scheduled as step 7.** Folded
   into the migration order below as the final step. Will reference
   `DESIGN_RULES.md` as design source and `positionering.md` as messaging
   source. The stale "Glassmorphism Design System" section, the wrong
   `C:\Users\jimmy\...` file path, and the `Elivro_Värdeerbjudande_Kvalitetsfokus.md`
   reference all get deleted in that step.

6. **Legacy `ui-design` skill** in Elivro app repo — out of scope here,
   deferred to when app re-skin starts.

---

## Migration order

Once decisions § 1–5 are addressed, work in this sequence — one commit
per step, in this order, no skipping:

1. **Token swap in `tailwind.config.mjs`.** Delete `terracotta`, `sage`,
   `cream`, `charcoal` numeric ladders; delete `surface`, `border` (current
   form), `status`, `accent` keys. Add `accent` (`#ff7a45`/`bright`/`deep`),
   `liv` (`#7a8a6b`), `ink`/`ink-lift`/`ink-card`, `bone`, `fg`/`fg-soft`/`fg-muted`.
   Update `borderRadius`, `boxShadow`, `transitionDuration`,
   `transitionTimingFunction` per the crosswalk. Keep `darkMode` setting
   but prepare to retire `class` mode in step 6.
2. **`app/globals.css`** — replace `@theme` block tokens, replace `:root`
   custom-property block, change body bg to `--bg` and color to `--fg`,
   replace four legacy keyframes with Obsidian's `obs*` keyframes, delete
   `.organic-shape` and `.sage-panel`, rewrite `.btn-primary`/`.btn-secondary`
   per Obsidian button rules, update scrollbar/focus/input to dark surfaces,
   delete dead `--font-logo`.
3. **Font swap scaffolding.** `next/font` setup with the switcher per § "Font swap scaffolding."
4. **Component reskin, in this order** — each is one PR-sized change:
   `Navbar` → `Hero` → `Features` → `CTA` → `DemoModal` → `CookieConsent`
   → `quiz/*`. Verify in browser after each.
5. **Build the three new components** from `website-feedback.md` priorities:
   `LiveTicker`, `ProofOfLifeMock`, `SystemDoesItself`. Add to `app/page.tsx`.
6. **Drop `darkMode: 'class'`** if no `dark:` prefixes remain. Marketing
   doesn't need theme switching.
7. **Rewrite `CLAUDE.md`** — per Open decisions § 5.

After each step, dev-server check the page in a browser. Type-checking
verifies syntax, not feel.

---

## Quick verifier

Before opening any PR that touches design, ask:

1. Is every color a Tailwind key or a `var(--c-*)` token? (No raw hex.)
2. Is every easing `cubic-bezier(0.2, 0.7, 0.2, 1)`? (No `ease-out`, no
   `ease-in`, no other curves.)
3. Does each heading have exactly one italicized word/clause? (Italic
   emphasizes — bold never.)
4. Is coral being used semantically (CTA, system voice) or decoratively
   (eyebrows, bullets)? Decorative coral on marketing is *allowed* per
   `design-strategi.md` § 4.2 — but if it's everywhere, the discipline
   is lost.
5. Is Liv used in **at most three positions** on this page? Are those
   positions one of: nav heartbeat / hero status pill / dashboard
   "Realtid"? If not, remove.
6. Any `backdrop-blur`? Any second easing? Any stacked shadows? Any
   `dark:` prefix? Any `!important`? Any `font-mono` on body/headings/CTA?
   → Remove.

If any answer is wrong, the change isn't ready.

---

*Restraint over cleverness. Specifics over abstractions. Warmth without softness.*
