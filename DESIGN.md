---
name: Elivro — Vaken pondus
description: >-
  A paper-light, ink-set editorial system for Elivro's verksamhetssystem for
  Swedish assistansanordnare. Institutional weight without coldness. Disciplined
  red as a stamp of consequence, moss as a quiet "system is on" signal.
colors:
  # Surfaces
  paper: "#FAFAF7"
  paper-soft: "#FAFAF8"
  paper-card: "#FFFFFF"
  hero-bg: "#F9F7F6"
  # Ink + brand accents
  ink: "#111111"
  red: "#DC2626"
  red-dark: "#991B1B"
  moss: "#1E7D59"
  warm: "#E7E5E0"
  # Neutrals
  n-900: "#333333"
  n-700: "#4A4F54"
  n-600: "#686F76"
  n-400: "#A5A9AF"
  n-200: "#E0DDD6"
  n-100: "#F1F1EF"
  # Function
  success: "#16A34A"
  warning: "#F59E0B"
typography:
  display:
    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', -apple-system, sans-serif"
    fontSize: "clamp(34px, 3.5vw, 54px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.044em"
  headline:
    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', -apple-system, sans-serif"
    fontSize: "clamp(36px, 4.5vw, 64px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.032em"
  title:
    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', -apple-system, sans-serif"
    fontSize: "clamp(22px, 2vw, 28px)"
    fontWeight: 700
    lineHeight: 1.10
    letterSpacing: "-0.018em"
  subtitle:
    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', -apple-system, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.010em"
  body:
    fontFamily: "var(--font-inter), -apple-system, 'Segoe UI', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
  button:
    fontFamily: "var(--font-inter), -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "-0.005em"
  italic:
    fontFamily: "var(--font-fraunces), 'Fraunces', 'Cormorant Garamond', serif"
    fontWeight: 700
  mono:
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, 'SF Mono', monospace"
    fontWeight: 400
    letterSpacing: "0"
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  pill: "999px"
spacing:
  gutter: "28px"
  section: "clamp(64px, 9vw, 112px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-primary-hover:
    backgroundColor: "{colors.n-900}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-nystart:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  input:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  card:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "28px"
  eyebrow-pill:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.n-700}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  nav:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.n-700}"
    padding: "0 48px"
    height: "64px"
---

# Design System: Elivro — Vaken pondus

## 1. Overview

**Creative North Star: "Vaken pondus" — alert gravitas.**

Elivro builds the verksamhetssystem that Swedish assistansanordnare run their
operations on. The buyer is a VD or verksamhetschef reading between operational
fires, skeptical by experience, carrying the weight of real people in real
homes depending on the schedule landing right. The surface has one job: prove
the system is serious enough to bet a verksamhet on. So the design carries
*pondus* — institutional weight, the bearing of an organization that knows its
work — but it stays **awake**, never the sleepy navy-and-white of a legacy
branschsystem. Paper-light, ink-set, editorial. Red appears like a stamp of
consequence. Moss appears like a quiet "system is on" light. Nothing decorates.

This system explicitly rejects the **AI-aesthetic surface** (purple gradients,
sparkle iconography, glowing orbs, streaming-text reveals, neon-on-black), the
**generic SaaS template** (hero-metric blocks, identical icon-and-heading card
grids, gradient-text headlines, side-stripe colored borders), and the
**branschsystem cliché** (heavy navy corporate palettes, dense feature
checklists, stockfoton of smiling teams). Elivro visibly embraces AI, it is the
product, but the *face* on the page is craft, not the machine.

The page is built as a strict **light/dark alternation**: each section sits on a
`data-surface="light"` or `data-surface="dark"` wrapper, and the rhythm of paper
giving way to ink and back is the document's spine. On light surfaces red is the
expressive accent; on dark surfaces moss takes over, because pure red dies on
ink. Depth comes from restraint: hairlines and one soft shadow, never stacked
elevation.

**Key Characteristics:**

- Paper-light canonical, ink-set, with strict light/dark surface alternation.
- One disciplined red, used like a stamp; moss rarer still, scoped to AI/status.
- Plus Jakarta Sans as a heavy display voice; Fraunces italic for the one
  accented word per heading.
- Editorial weight without corporate coldness, awake, not sleepy.
- Flat by default. Hairlines and a single soft shadow carry all elevation.
- Specifics over abstraction: verified numbers, named people, named days.

## 2. Colors

A narrow, warm-neutral palette. Most of the page is paper or ink; color is an
event, not a texture.

### Primary

- **Ink (`#111111`)** is the workhorse: body text, headings, the primary button
  fill, focus outlines. Near-black but tinted warm, never pure `#000`.
- **Paper (`#FAFAF7`)** is the canonical page background, a warm off-white that
  reads as good stock, not screen-white. **Paper-soft (`#FAFAF8`)** is the
  alternate light section; **Paper-card (`#FFFFFF`)** is the only true white,
  reserved for cards and modals so they lift cleanly off paper. **Hero-bg
  (`#F9F7F6`)** is a half-step warmer ground for the hero.

### Secondary

- **Red (`#DC2626`)** is the stamp of consequence. It is **rare** and has
  exactly five sanctioned positions: the logo hexagon, the Fraunces italic
  accent word inside heading `<em>`, the nystart CTA (as a `red → red-dark`
  gradient), section kicker tags, and small accent dots (eyebrow, category,
  feature-number). On dark surfaces small red drops to a lifted `#F87171` so AA
  contrast holds at 11px; large red heading text uses `#DC2626` directly.
- **Moss (`#1E7D59`)** is **rarer than red**, a single-purpose signal: AI is in
  service, or a status is approved. It carries the pulsing AI-tag dot, status
  indicators ("Anställd", "Schema klart", "FK-räkning godkänd"), and accents on
  dark surfaces where red would die. **Red-dark (`#991B1B`)** is only the deep
  stop of the nystart gradient and its hover.

### Neutral

- **Warm (`#E7E5E0`)** is the warm hover and secondary background tint.
- **Neutral text ramp:** `n-900 #333333` (dark hover text), `n-700 #4A4F54`
  (secondary text, nav links), `n-600 #686F76` (descriptions, placeholders),
  `n-400 #A5A9AF` (disabled, fine metadata).
- **Neutral surfaces:** `n-200 #E0DDD6` (dividers, scrollbar thumb), `n-100
  #F1F1EF` (alternate section ground).
- **Lines** are ink at low alpha: `--line` `rgba(17,17,17,0.07)` for hairlines,
  `--line-strong` `rgba(17,17,17,0.14)` for borders and input strokes.

### Function

- **Success (`#16A34A`)** for "Anställd" / success tags; **Warning (`#F59E0B`)**
  for non-critical flags. Functional only, never decorative.

### Named Rules

**The Five-Position Red Rule.** Red lives in exactly five places: logo, heading
`<em>` accent, nystart CTA, section kickers, accent dots. A sixth red usage is a
system break. Red on a standard button, on body text, or as a large fill is
forbidden, standard buttons are ink.

**The Moss Means Machine Rule.** Moss says one thing only: AI is working, or a
state is approved. Never a link, never a CTA, never a decorative second accent.
On a light surface it never out-shouts red.

**The Warm-Neutral Rule.** No pure `#000`, no pure `#fff` on a content surface.
Every neutral is tinted toward warm paper. `#FFFFFF` is permitted only as a card
or modal fill, where its job is to lift.

## 3. Typography

**Display Font:** Plus Jakarta Sans (with `-apple-system`, sans-serif fallback)
**Body Font:** Inter (with `-apple-system`, "Segoe UI", sans-serif fallback)
**Italic Accent:** Fraunces (with Cormorant Garamond, serif fallback)
**Label/Mono Font:** JetBrains Mono (with "SF Mono", monospace fallback)

**Character:** Two working voices and one signature. Plus Jakarta Sans carries
all headings, set heavy (700–800) with tight negative tracking so a headline
reads as a confident, compact block, weight is the hierarchy, not size alone.
Inter does every word of body and UI. Fraunces, italic only, is the brand
signature: one accented word per heading, set in red. Headings are never bolded
for emphasis; the italic carries it.

### Hierarchy

- **Display / H1** (Plus Jakarta, 700, `clamp(34px, 3.5vw, 54px)`, line-height
  1.08, letter-spacing −0.044em). The single page-defining headline. The tight
  −0.044em tracking is deliberate and load-bearing.
- **Headline / H2** (Plus Jakarta, 800, `clamp(36px, 4.5vw, 64px)`, line-height
  1.08, −0.032em). Section openers, the heaviest weight in the system.
- **Title / H3** (Plus Jakarta, 700, `clamp(22px, 2vw, 28px)`, line-height 1.10,
  −0.018em). Sub-section headings.
- **Subtitle / H4** (Plus Jakarta, 600, 18px, line-height 1.18). Card and block
  titles. H5 steps down to 16px / 600.
- **Body** (Inter, 400, 17px, line-height 1.55). Default running text. Keep
  measure in the 65–75ch band. Body-small is Inter 400 at 14px for meta and
  secondary lines.
- **Label / Eyebrow** (Plus Jakarta, 500, 12px, letter-spacing 0.18em,
  UPPERCASE). Section kickers and eyebrows, set in red.
- **Mono** (JetBrains Mono, 400) is reserved for code, URLs, and file paths,
  never body, never CTAs.

### Named Rules

**The Italic-Not-Bold Rule.** Emphasis inside a heading is one Fraunces italic
word, set in red, inside an `<em>`. Bold is never used for emphasis in a
heading or in body text, the weight scale is structure, not stress.

**The Sentence-Case Rule.** Headings are sentence case. Only mono eyebrows and
12px labels take uppercase, and they always get the 0.18em tracking. ALL-CAPS
headlines are forbidden.

**The Heading-Voice-Is-Jakarta Rule.** Every `h1`–`h6` is Plus Jakarta Sans via
the unlayered base rule. Do not set headings in Fraunces or a serif, Fraunces
appears only inside `<em>`.

## 4. Elevation

The system is **flat by default**. Depth is drawn with hairlines and exactly one
soft, low shadow, never stacked elevation, never glow, never backdrop-blur as
decoration. A surface separates from paper because it is `#FFFFFF` card-white
with a 1px line, or because it carries the single resting lift shadow. If a
panel needs more presence than that, the layout is wrong, not the shadow.

### Shadow Vocabulary

- **Lift** (`box-shadow: 0 18px 36px -22px rgba(17,17,17,0.18)`): the resting
  shadow on cards and portraits-in-cards. A diffuse, long, low-opacity drop.
- **Hover** (`box-shadow: 0 24px 48px -28px rgba(17,17,17,0.16)`): the card
  hover state, lifted slightly higher and softer.
- **CTA** (`box-shadow: 0 6px 16px -8px rgba(17,17,17,0.4)`): the tight,
  grounded shadow under the ink primary button. On hover it deepens to
  `0 10px 24px -8px rgba(17,17,17,0.5)`.
- **Focus halo** (`box-shadow: 0 0 0 3px rgba(17,17,17,0.08)`): the soft ink
  ring on a focused input, paired with an ink border.

### Named Rules

**The One-Shadow Rule.** One shadow layer per surface. Stacked decorative
shadows are forbidden. A shadow always accompanies a real change of plane (a
card off paper, a button off the page), never pure decoration.

**The Hairline-First Rule.** Reach for a 1px `--line` / `--line-strong` hairline
before a shadow. Most separation on this page is a hairline; shadow is the
exception for genuinely lifted objects.

## 5. Components

### Buttons

Three voices, one shape. Every button is a full pill (`border-radius: 999px`)
with 15/26 padding and Inter 600 at 15px. Variation is color, never size, and
never more than one primary action per view.

- **Primary** (`Boka demo`): ink fill, paper text, the CTA shadow. Hover shifts
  the fill to `n-900` and lifts 1px with a deeper shadow; active settles back.
  This is the standard primary, it is **ink, not red**.
- **Secondary** (`Se hur 2U Assistans gjorde`): paper-card fill, ink text, 1px
  ink border. Hover inverts to ink fill / paper text.
- **Nystart CTA**: a `red → red-dark` gradient with paper text. The *only*
  button allowed to be red, and only on the nystart card. Hover deepens toward
  `red-dark`.

### Cards

- **Corner Style:** 14px (`md`) radius. Photos inside cards sit at 14–18px.
- **Background:** `paper-card` (`#FFFFFF`) so the card lifts off paper.
- **Shadow Strategy:** the resting **Lift** shadow; **Hover** on interactive
  cards. See Elevation.
- **Border:** an optional 1px `--line` hairline; card-white plus shadow is
  usually enough on its own.
- **Internal Padding:** 28px standard; 32–40px for feature panels. Cards are
  never nested inside cards.

### Inputs / Fields

- **Style:** `paper-card` fill, 1px `--line-strong` stroke, 14px radius, Inter
  15px ink text on `n-600` placeholder, 12/16 padding.
- **Focus:** the border shifts to ink and a soft `rgba(17,17,17,0.08)` 3px ink
  halo appears, no browser outline. The ink (not red) focus state is deliberate;
  red is reserved.
- **Disabled:** `n-400` text, no shadow.

### Navigation

Sticky top nav, 64px tall, 48px side padding. At rest it sits on
`paper` at 70% with a transparent bottom border and a faint backdrop blur; once
scrolled past 8px it firms to `paper` at 92% with a 1px `--line` bottom border
and a stronger blur. The mark (28px hexagon) pairs with the lowercase "elivro"
wordmark in Plus Jakarta 500. Links are Inter 14px in `n-700`, hovering to ink.
The nav's `Boka demo` is a compact ink pill. Mobile collapses to a `paper-card`
sheet of stacked links.

### Signature: Section Kicker + Eyebrow Pill

Two small editorial marks open most sections:

- **Section kicker**: an inline Plus Jakarta 500, 12px, 0.18em-tracked,
  UPPERCASE label set in **red**, sitting directly above a section headline.
- **Eyebrow pill**: a pill-radius chip, 1px `--line-strong` border on
  translucent white, 13px/600 `n-700` text, with a 6px leading dot, red
  for general use, moss (pulsing) when the line is about AI.

## 6. Do's and Don'ts

### Do:

- **Do** keep the page paper-light and ink-set, with strict `data-surface`
  light/dark alternation as the structural rhythm.
- **Do** keep red to its five sanctioned positions, and let moss stay rarer
  still, scoped to AI-in-service and approved-status signals.
- **Do** carry heading emphasis with one Fraunces italic word in red inside an
  `<em>`. Italic always, bold never.
- **Do** set every heading in Plus Jakarta Sans, heavy (700–800), with the tight
  negative tracking (H1 at −0.044em).
- **Do** keep elevation flat: one hairline or one soft shadow per surface.
- **Do** quantify with verified data only, named numbers, named people, named
  days. If a sentence could sit on any SaaS site, rewrite it.
- **Do** label the primary CTA exactly `Boka demo`, an ink pill, never red.

### Don't:

- **Don't** reach for the AI-aesthetic surface: purple gradients, sparkle
  iconography (✨), glowing orbs, streaming-text reveals, "AI typing" pulses, or
  neon-on-black palettes. Elivro is AI; the surface must not look it.
- **Don't** use SaaS clichés: the hero-metric block (big number + label +
  supporting stats + gradient), identical icon-and-heading card grids,
  gradient-text headlines (`background-clip: text`), or side-stripe colored
  borders on cards and callouts.
- **Don't** use backdrop-blur or frosted-glass cards as decoration. The nav's
  subtle functional blur is the single sanctioned exception.
- **Don't** put red on a standard button, on body text, or as a large fill,
  standard buttons are ink, the nystart gradient is the one red button.
- **Don't** stack shadows, add a second easing curve, or use pure `#000` / pure
  `#fff` on a content surface.
- **Don't** set headings in a serif, in ALL CAPS, or bold-for-emphasis. Jakarta
  heavy, sentence case, italic accent.
- **Don't** use stockfoton of smiling teams, or carry the heavy navy-and-white
  branschsystem corporate palette. Real people, real workdays, warm paper.
