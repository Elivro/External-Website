---
name: Elivro — Obsidian
description: >-
  A quiet, craftsman-like system for Elivro's operating system for Swedish
  care work. Obsidian darks, ember orange, thin display type, and italic
  emphasis. Restraint over invention — the system should feel inevitable.

colors:
  # Brand
  primary: "#ff7a45"
  primary-bright: "#ff9566"
  primary-deep: "#e55a22"

  # Surfaces — dark mode is canonical
  ink: "#0a0806"
  ink-lift: "#12100d"
  ink-card: "#1a1714"
  ink-card-soft: "#15120f"

  # Inverted surface (light)
  bone: "#f5efe3"

  # Foreground / text
  fg: "#f5efe3"
  fg-soft: "#bdb5a6"
  fg-muted: "#8a8275"
  fg-dim: "#5c5649"
  fg-on-light: "#0a0806"

  # Liv — the alive signal. Strictly scoped. See "Colors" prose for rules of use.
  liv: "#7a8a6b"

typography:
  display-xl:
    fontFamily: Fraunces
    fontSize: 6.75rem
    fontWeight: 300
    lineHeight: 0.94
    letterSpacing: -0.028em
  display-lg:
    fontFamily: Fraunces
    fontSize: 5.5rem
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: -0.028em
  display:
    fontFamily: Fraunces
    fontSize: 4rem
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: -0.023em
  h1:
    fontFamily: Fraunces
    fontSize: 3.5rem
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: -0.021em
  h2:
    fontFamily: Fraunces
    fontSize: 3rem
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.021em
  h3:
    fontFamily: Fraunces
    fontSize: 2.5rem
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.02em
  h4:
    fontFamily: Fraunces
    fontSize: 2rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.016em
  h5:
    fontFamily: Fraunces
    fontSize: 1.625rem
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.012em
  body-lg:
    fontFamily: Inter
    fontSize: 1.1875rem
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
  body:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  mono-eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.12em
  mono-meta:
    fontFamily: JetBrains Mono
    fontSize: 0.625rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.15em

rounded:
  none: 0px
  sm: 8px
  md: 10px
  lg: 14px
  xl: 20px
  pill: 50px
  full: 9999px

spacing:
  px: 2px
  xs: 6px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  "2xl": 80px
  "3xl": 120px
  "4xl": 182px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-bright}"
    textColor: "{colors.ink}"
  button-primary-pressed:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.ink-lift}"
    textColor: "{colors.fg}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.fg-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  button-ghost-hover:
    textColor: "{colors.fg}"
  link:
    textColor: "{colors.fg-soft}"
    typography: "{typography.body-sm}"
  link-hover:
    textColor: "{colors.fg}"
  card:
    backgroundColor: "{colors.ink-lift}"
    textColor: "{colors.fg}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-elevated:
    backgroundColor: "{colors.ink-card}"
    textColor: "{colors.fg}"
    rounded: "{rounded.lg}"
    padding: 48px
  card-inverted:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.fg-on-light}"
    rounded: "{rounded.lg}"
    padding: 48px
  nav:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.fg}"
    padding: 12px 48px
  input:
    backgroundColor: "{colors.ink-lift}"
    textColor: "{colors.fg}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  pill:
    backgroundColor: "{colors.ink-lift}"
    textColor: "{colors.fg-soft}"
    typography: "{typography.mono-eyebrow}"
    rounded: "{rounded.pill}"
    padding: 6px 14px
---

# Design System: Elivro — Obsidian

## Overview

**Creative North Star: "Obsidian, quiet confidence made with the texture of craft."**

Obsidian isn't a theme. It's a posture: quiet confidence, Swedish restraint, the
texture of craft. Elivro builds tools for the people who do care work, and the
brand should feel made by people who respect that work. The system favors the
inevitable over the inventive: thin Fraunces display type set against deep
obsidian surfaces, lit by a single ember orange. No second accent color, no
second easing curve, no second mood.

What this system explicitly rejects: the AI-aesthetic surface (purple gradients,
sparkle iconography, glowing orbs, streaming-text reveals), generic SaaS
templates (hero-metric blocks, identical icon-and-heading card grids,
gradient-text headlines), and the *branschsystem* cliché (heavy navy-and-white
corporate palettes, dense feature checklists, stockfoton of smiling teams). The
brand visibly embraces AI; the *surface* must not look AI-made.

Three rules govern the system:

- **Restraint over cleverness.** One accent. One easing curve. One italic for
  emphasis. If a flourish has to be defended, it leaves.
- **Specifics over abstractions.** "14 timmar per vecka" beats "productivity
  gains." Numbers, hours, names, never empty superlatives.
- **Warmth without softness.** Dark surfaces, but never cold. Grain, ember
  halos, and a mark that breathes once every 30 seconds.

### Layout

The system uses a **2px base unit** with a coarse, opinionated scale:
`xs`/`sm`/`md`/`lg`/`xl`/`2xl`/`3xl`/`4xl`. Most rhythms land on `md` (24px),
`lg` (40px), or `xl` (64px); the larger values exist for sectional breathing
room, not decoration.

Container widths cluster around three values:

- **Reading** (720–820px, no horizontal padding) for prose.
- **Default** (1100–1280px with 48px gutter) for most content.
- **Wide** (1400px with 48px gutter) for hero and full-bleed grids.

Grids are 2- or 3-column with gaps of 24–80px. Avoid 4-column unless the cells
are deliberately tight. Flex is row-default; column flex is the exception.

**Key Characteristics:**

- One accent (ember orange), one easing curve, one italic for emphasis.
- Dark canonical, lit by warm ember light, never cold.
- Italic carries emphasis in headings; bold is forbidden in body.
- Specifics over adjectives: time, money, named days, named people.
- Two voices in type: Fraunces display, Inter body. Mono is system voice only.
- Liv (sage `#7a8a6b`) appears in exactly three positions, never elsewhere.

## Colors

The palette is intentionally narrow. Most surfaces are obsidian; most type is
bone. Orange is reserved for the moments that matter, the mark, the primary
action, a single italicized word.

### Primary

- **Ember (`#ff7a45`)** is the system's voice. Used for the logo, primary CTAs,
  focus rings, and a single italicized word per heading. `primary-bright`
  (`#ff9566`) is reserved for hover states; `primary-deep` (`#e55a22`) is
  reserved for pressed states and the deepest stop in any orange gradient.

### Secondary

- **Liv (`#7a8a6b`)** is a muted sage, the *only* permitted secondary accent.
  Its job is singular: to be the visible signal that the system is alive. It
  must appear in **at most three positions** in any given surface: a heartbeat
  dot adjacent to the wordmark in nav, a small dot inside a hero/system-status
  pill, and a "Realtid · synkat" indicator on dashboard surfaces. **Never**
  used for links, CTAs, eyebrows, body emphasis, or any decorative purpose.
  Always paired with a 3.2s ease-in-out breath loop on opacity (0.55 ↔ 1.0).
  Always disabled under `prefers-reduced-motion`. Together with the 30-second
  mark rotation, Liv is how Obsidian *performs* "levande" instead of just
  claiming it.

### Neutral

- **Surfaces.** `ink` (`#0a0806`) is the canonical page background. `ink-lift`
  (`#12100d`) is one step up for cards. `ink-card` (`#1a1714`) is the deepest
  card surface used inside lifted contexts. `ink-card-soft` (`#15120f`) sits
  between lift and card for subtle inner panels.
- **Inverted surface.** `bone` (`#f5efe3`) is the dominant body-text color on
  dark and the background of inverted hero panels (`card-inverted`). On those
  panels, text is `fg-on-light` (`#0a0806`).
- **Foreground.** `fg` (`#f5efe3`) for primary text on dark, `fg-soft`
  (`#bdb5a6`) for secondary, `fg-muted` (`#8a8275`) for de-emphasized links and
  labels, `fg-dim` (`#5c5649`) for captions and inactive scrollbar thumbs.

All primary text/background pairings clear WCAG AAA (`fg`/`ink-lift` is 16.6:1;
`fg-on-light`/`primary` is 7.7:1).

### Named Rules

**The One Voice Rule.** The primary accent is the system's voice. It carries
the logo, the primary CTA, the focus ring, and one italicized word per heading,
nothing else. If a button, eyebrow, or bullet is reaching for ember to feel
important, the answer is no.

**The Liv Three-Position Rule.** Liv lives in exactly three positions: nav
heartbeat, hero/system-status pill dot, dashboard "Realtid" indicator. A
fourth Liv usage anywhere is a system-break.

## Typography

**Display Font:** Fraunces (with Georgia, serif fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with Consolas, monospace fallback)

**Character:** Two voices: Fraunces for display and headings (carries the
italic), Inter for body and UI. JetBrains Mono is the system speaking, used
only for eyebrows, meta, timestamps, and AI-proposal labels, short, tracked,
uppercase. Cormorant Garamond is reserved for very rare editorial moments and
may go unused entirely.

### Hierarchy

- **Display** (Fraunces, weight 300, clamp 2.5rem → 6.75rem, line-height 0.94,
  letter-spacing -0.028em). Hero and section openings.
- **Headline / H1** (Fraunces, weight 300, 3.5rem, line-height 1.05). Page
  titles.
- **H2** (Fraunces, weight 300, 3rem, line-height 1.1). Section titles.
- **H3** (Fraunces, weight 400, 2.5rem). Sub-sections; weight bumps from 300 to
  400 so smaller display sizes don't feel anemic.
- **Body** (Inter, weight 400, 1.0625rem, line-height 1.55, letter-spacing
  -0.005em). Body line length stays in the 65–75ch band.
- **Body-sm** (Inter, weight 400, 0.875rem). Buttons, secondary text, meta
  paragraphs.
- **Mono-eyebrow** (JetBrains Mono, weight 500, 0.6875rem, letter-spacing
  +0.12em, uppercase). Section eyebrows, timestamps, system-event lines.

### Named Rules

**The Italic-Not-Bold Rule.** Italic emphasizes. Bold never. One italicized
word per heading. The italic, set in Fraunces, is the brand's typographic
signature. Bold weights are absent from headings entirely.

**The Sentence-Case Rule.** Headings are sentence case. Eyebrows are uppercase
mono with wide tracking. ALL CAPS in headlines is forbidden.

**The Mono-as-System-Voice Rule.** Mono is the system speaking. Body text and
CTAs use Inter, not JetBrains Mono. Reach for `font-mono` only when the system
is being cited (eyebrows, timestamps, system-event lines, AI-proposal labels).

## Elevation

Elevation comes from **light, not shadow stacks**. Two languages do most of the
work:

- **Halos.** Radial-gradient ember washes (`primary` at 12–22% alpha, fading
  to transparent by 60%) sitting behind hero content and cards.
- **Hairlines.** 1px borders in `primary` at 8–25% alpha replace heavy drop
  shadows. Where shadow is used, it is paired with a hairline of the same
  color.

### Shadow Vocabulary

- **`sh-rim`** (`0 0 0 1px rgba(255,122,69,0.46)`). A glowing edge for active
  states and focus rings.
- **`sh-cta`** (`0 0 0 1px var(--bone), 0 20px 40px -12px rgba(255,122,69,0.25)`).
  The default lift on a primary CTA, bone hairline plus warm ember diffusion.
- **`sh-card`** (`0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,122,69,0.08)`).
  Card-class lift, deeper diffusion plus a faint ember edge.
- **`sh-hero`** (`0 0 0 1px rgba(255,122,69,0.08), 0 60px 120px -20px rgba(0,0,0,0.7), 0 30px 60px -20px rgba(255,122,69,0.15)`).
  Modal-class surfaces only.

### Named Rules

**The No-Blur Rule.** Backdrop-blur is forbidden. If a surface needs
separation, lift it with `ink-lift` or `ink-card`, never with blur.

**The One Layer Rule.** One layer of light per surface. Stacked decorative
shadows are forbidden. Where shadow is used, it is paired with a 1px hairline
in the same color family.

## Components

### Shape & Radii

Five working radii. Most UI uses `md` (10px); cards and panels use `lg` (14px);
the pill (`50px`) is reserved for tags and badges. Sharp corners (`none`) are
used deliberately on full-bleed editorial sections, the contrast against
rounded UI is a feature, not noise. Images are `lg` radius or square, nothing
in between.

### Buttons

Buttons come in three voices and one rule: never more than one primary per view.

- **Primary.** Ember on dark text. Carries the single most important action in
  any context (sign up, book demo, submit). 10/20 padding, 10px radius,
  body-sm Inter (NOT mono).
- **Secondary.** `ink-lift` on bone with a 1px hairline border. The standard
  non-destructive action.
- **Ghost.** Transparent on `fg-muted`. Tertiary navigation and toolbar
  actions. Hover lifts to `fg`.

All three share the same dimensions (10/20 padding, 10px radius, body-sm type).
The variation is color, not size. The primary button has explicit hover
(`primary-bright`) and pressed (`primary-deep`) states; the others rely on
foreground-color shifts only.

### Cards

Cards use `card` (32px padding) for content blocks and `card-elevated` (48px
padding, `ink-card` surface) for feature panels. `card-inverted` flips the
system to `bone` on `fg-on-light` for editorial hero panels, used sparingly,
never inside another inverted context. Cards never carry shadow alone; always
border + radial halo + optional shadow.

- **Corner Style.** `lg` (14px).
- **Background.** `ink-lift` default; `ink-card` for elevated; `bone` for
  inverted.
- **Border.** 1px `var(--border)` hairline at rest; lifts to
  `var(--border-strong)` on hover.

### Inputs

Inputs match the secondary button: `ink-lift` surface, 10px radius, 12/16
padding. Focus rings are a 1px `primary` edge plus an outer halo at 25%.

- **Style.** Dark canonical (`var(--bg)`), 1px `border-strong` hairline,
  Inter body-sm, `fg` text on `fg-muted` placeholder.
- **Focus.** Border shifts to `--accent`, outer 3px `--accent-glow` halo, no
  outline ring.

### Pills

Pills use mono-eyebrow type, `pill` radius (50px), and live almost exclusively
in metadata strips and feature labels.

### Navigation

Sticky, `ink` at 85% opacity (no blur), with 12/48 padding and `link`
typography. The mark sits at 22px on the left, paired with the wordmark and the
**Liv heartbeat dot** (Liv position 1, see Colors § Secondary).

### Signature: The Elivro Mark

The Elivro mark, four quadratic petals meeting at a point on a 40×40 grid, is
the only complex shape in the system. Stroke width is 1.3 at small sizes, 1.6
at large. Never re-color, never re-stroke. It rotates once every 30 seconds in
hero contexts (linear, infinite), and stays still everywhere else. The 30s
rotation is one of two named exceptions to the single Obsidian easing curve;
the other is the 3.2s Liv breath.

## Do's and Don'ts

### Do:

- **Do** use one italicized word per heading to carry emphasis. The italic is
  the brand's signature.
- **Do** write in Swedish first. English is the second skin, never the first.
- **Do** quantify benefits in units of time ("14 timmar per vecka per
  koordinator"), money, or named days ("Anders L. på torsdag").
- **Do** use "du", informal, warm, close. Never "Ni".
- **Do** pair every shadow with a 1px hairline border in the same color family.
- **Do** let surfaces breathe. `xl` and `2xl` spacing exist to be used.
- **Do** keep Liv to its three permitted positions; treat the scope as
  inviolable.

### Don't:

- **Don't** use bold for emphasis in body text. Italic always, bold never.
- **Don't** introduce a second accent color beyond the strictly-scoped Liv
  exception. Orange is the system; Liv is the heartbeat. Nothing else.
- **Don't** use the AI-aesthetic surface: purple gradients, sparkle
  iconography (✨), glowing orbs, streaming-text reveals, "AI typing" pulsing
  dots. The brand is AI; the surface must not be.
- **Don't** reach for SaaS clichés: hero-metric template (big number + label +
  supporting stats + gradient), identical card grids, gradient-text headlines,
  side-stripe colored borders on callouts, comparison-vs-competitor tables,
  customer logo strips, testimonials.
- **Don't** write startup copy: synergier, disrupta, revolutionera,
  transformera, empowerment, journey, solution, best-in-class, world-class,
  cutting-edge, next-gen, 10x, unlock, seamless. Specificity beats every one
  of these.
- **Don't** use `backdrop-blur` or any glassmorphism. Lift surfaces with
  `ink-lift` or `ink-card`, never with blur.
- **Don't** use emoji in product copy. Ever.
- **Don't** stack shadows. One layer of light per surface.
- **Don't** set headings in ALL CAPS. Only mono eyebrows get tracking.
- **Don't** add a second easing curve. `cubic-bezier(0.2, 0.7, 0.2, 1)` is the
  system. The two named exceptions (mark rotation, Liv breath) are the entire
  set.
- **Don't** use the `dark:` Tailwind prefix. Marketing is dark canonical, no
  toggle. Theme switching, when it ever exists, uses `[data-theme]` on `<html>`.
- **Don't** round photos differently than UI. Images are `lg` radius or square,
  nothing in between.
- **Don't** attribute the model in product copy ("Powered by GPT-X"). The
  model is supply chain, not product.
- **Don't** use generic stockfoton. The hands illustration is the brand asset;
  any new imagery must be warm, granulated, real.
