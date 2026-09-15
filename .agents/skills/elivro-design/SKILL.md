---
name: elivro-design
description: |
  Design and implement Elivro UI using the Obsidian design system — dark warm
  surfaces, single ember accent, Fraunces italic emphasis, halos+hairlines,
  one easing curve. Use when building any Elivro UI: marketing pages,
  app dashboards, components, or design refinements. Loads canonical tokens,
  type rules, motion, and component patterns from the design system folder.
---

# Elivro Design System — Obsidian

Obsidian is a quiet, craftsman-like dark system. Restraint over invention.
The system should feel inevitable, not designed.

This skill is the **routing layer** between an agent and the canonical
design system. It does not redefine tokens — it points at them.

## Authoritative sources (read in this order)

When asked to design or implement anything Elivro, read in order:

1. **`DESIGN.md`** (repo root) — canonical spec. Three governing rules,
   color/type/motion tokens, do's and don'ts. **Source of truth — DESIGN.md
   wins all conflicts.**
2. **`positionering.md`** — strategic positioning. Asymmetry, "levande,"
   anti-AI-slop, voice rules, forbidden vocabulary.
3. **`design-strategi.md`** — marketing vs app dialect ("one design language,
   two dialects"). Rules for what diverges between the two contexts.
4. **`Elivro Design System/extract/design-language.md`** — auto-extracted
   reference. **Use as cross-check, NEVER as source of truth.** The extractor
   reports surface symptoms (e.g. `body { font-size: 13px }` because of one
   button row), not authored intent.

If `DESIGN.md` and the extract conflict, `DESIGN.md` wins. If
`positionering.md` and `DESIGN.md` conflict on voice, `positionering.md`
wins. Otherwise no conflicts should exist.

## The three governing rules (memorize these)

From `DESIGN.md`:

1. **Restraint over cleverness** — one accent, one easing curve, one italic
   for emphasis. *If a flourish has to be defended, it leaves.*
2. **Specifics over abstractions** — "14 timmar per vecka per koordinator"
   beats "productivity gains." Numbers, hours, names — never empty
   superlatives.
3. **Warmth without softness** — dark surfaces, but never cold. Halos,
   hairlines, and a mark that breathes once every 30 seconds.

Every design choice should be derivable from these. If you can't derive it,
don't ship it.

## Tokens — where to read

**Do not duplicate token values in your output.** Reference the source files:

| What you need | File to import / reference |
|---|---|
| CSS variables (vanilla / direct stylesheet) | `Elivro Design System/tokens.css` |
| Tailwind theme | `Elivro Design System/extract/tailwind.config.js` |
| Framework-neutral JSON | `Elivro Design System/extract/design-tokens.json` |
| `@font-face` declarations | `Elivro Design System/fonts.css` (+ `fonts/`) |
| Brand mark SVG | `Elivro Design System/assets/logo.svg` |

Never hardcode `#ff7a45` or `#0a0806` in component code. Always use
`var(--c-accent)` / `var(--c-bg)` / equivalent tokens.

## Type — three voices, each with one job

- **Fraunces** (display) — narrating. Headlines, founder quotes, atmospheric
  moments. Weight 300 for hero (clamp 48–108px). Weight 400 for h3 and
  smaller. **Italic emphasizes — bold never.**
- **Inter** (body) — explaining. Paragraphs, UI labels, navigation.
- **JetBrains Mono** (system) — citing. Eyebrows, meta, timestamps,
  numerical readouts, "Elivro föreslår"-style labels. Always tracked
  (~+0.12em), uppercase, small (~11–14px).
- **Cormorant Garamond** — reserved for very rare editorial moments.
  May go unused entirely. Don't reach for it without reason.

### The italic signature

One italicized word (or one short clause) per heading carries emphasis.
This is the brand signature — not a stylistic preference. Examples:

> Tre dimensioner av *skickligt* omsorgsarbete.
> Som om någon redan tänkt *tanken* åt dig.
> Låt människorna vara den komplexa delen. *Inte systemet.*

Bold-for-emphasis is **forbidden** in body text. Italic always.

## Color — single accent discipline

**One brand accent: `--c-accent: #ff7a45` (ember).** No second accent
permitted (see Liv amendment below for the *one* exception under review).

Surfaces:
- Dark canonical: `#0a0806` (canvas) → `#12100d` (lift) → `#1a1714` (card)
- Light counterparts: `#f5efe3` (bone) → `#fff0dc` (raised)

Foreground: `--c-fg` (`#f5efe3` on dark, `#0a0806` on light), with
`--c-fg-soft` (`#bdb5a6`) and `--c-fg-muted` (`#8a8275`) for hierarchy.

**No status tokens.** `DESIGN.md` does not define `success` / `info` /
`error` colors. Earlier drafts had them; the user removed them deliberately.
If a feature genuinely needs status communication, write it in plain
Swedish copy ("schemat saknar täckning på torsdag" — not a red dot).
There is **no error red.** Don't add status tokens without an explicit
`DESIGN.md` amendment.

### Coral semantics by context

Per `design-strategi.md`:

- **Marketing surfaces** — coral is expressive. CTA, eyebrow accents,
  italic-emphasis word color (in feature card subtitles), bullet markers,
  hairline rules. Use freely *within* the discipline.
- **App surfaces** — coral is **strictly semantic**: "the system is
  speaking." Used for primary CTA, AI proposals, system suggestions,
  realtime status. **Not** for links, eyebrows, bullets, or decorative
  emphasis. When a koordinator sees coral in the app, it should mean
  *Elivro itself is talking right now*.

## Motion — one easing, five durations

Single easing token: `cubic-bezier(0.2, 0.7, 0.2, 1)`. Reach for
no other curve. Mixing easings is a system-break.

Durations (from `tokens.css`): `xs 100ms · sm 200ms · md 300ms · lg 600ms · xl 800ms`.

Hover/focus state changes use `sm`. Modal/popover entry uses `md`.
Hero atmospheric breathing uses `xl`. The mark's hero rotation runs
once every 30 seconds (linear, infinite). All motion respects
`prefers-reduced-motion`.

Named keyframes (defined in extract — use these, don't invent new):
`obsRise`, `obsFadeUp`, `obsFadeSlide`, `obsSweep`, `obsRotate`,
`obsTwinkle`, `obsPulseGlow`, `obsNudge`.

## Elevation — light, not shadow stacks

Elevation comes from light, not from drop-shadow piles. Three working
shadow tokens:

- `sh-rim` — `0 0 0 1px rgba(255,122,69,0.46)` — glowing edge for active
  states.
- `sh-card` — `0 20px 40px -12px rgba(255,122,69,0.25)` + 1px bone border.
  Default card lift.
- `sh-hero` — `0 60px 120px -20px rgba(0,0,0,0.7)` + 1px accent edge at 8%.
  Modal-class surfaces only.

Pair every shadow with a hairline border in the same color family.
**Backdrop-blur is forbidden.**

## The mark — never re-color, never re-stroke

The 4-petal mark in `Elivro Design System/assets/logo.svg` is the only
complex shape in the system. Stroke width 1.3 at small sizes, 1.6 at
large. **It rotates once every 30 seconds in hero contexts** and stays
still everywhere else. Don't redraw it. Don't tint it.

The 30-second rotation is the brand's visual expression of "levande" —
the system is alive. Don't add additional motion to compensate for not
knowing this.

## Component reference cards (read before building)

Each canonical component has a reference HTML. Read the relevant card
before building or modifying:

| Component / topic | Reference card |
|---|---|
| Buttons (primary / secondary / ghost) | `Elivro Design System/cards/components.html` |
| Cards (`card`, `card-elevated`) | `Elivro Design System/cards/components.html` |
| Brand & logo usage | `Elivro Design System/cards/brand.html` |
| Color palette in context | `Elivro Design System/cards/colors.html` |
| Typography scale & rhythm | `Elivro Design System/cards/typography.html` |
| Motion patterns | `Elivro Design System/cards/motion.html` |
| Spacing scale | `Elivro Design System/cards/spacing.html` |

The interactive showcase: `Elivro Design System/index.html` (open in
browser when iterating).

## Voice rules (from positionering.md)

- **Swedish first**, English second skin. Never English-first copy in
  product surfaces.
- **"Du"** form, never "Ni." Informal, warm, close.
- **Never write startup copy:** synergy · disrupta · revolutionera ·
  transformera · empowerment · journey · solution · best-in-class ·
  cutting-edge · next-gen · 10x · unlock · seamless. (Full list in
  `positionering.md` § 6.)
- **Quantify in time/money/names:** "14 timmar per vecka per koordinator,"
  "449 kr per brukare," "30 dagars test," "Anders L. på torsdag."
- **No emoji in product copy. Ever.**
- **No exclamation marks anywhere.**

## Anti-patterns (HARD don'ts)

These are non-negotiable. If a brief asks for any of these, push back:

- ❌ **Bold for emphasis in body.** Italic always, bold never.
- ❌ **Second accent color.** (Except the proposed Liv exception below.)
- ❌ **Backdrop-blur / glassmorphism.**
- ❌ **Purple gradients.** AI sparkles. "✨" emojis. Glowing AI orbs.
- ❌ **AI-typing pulsing dots / streaming text reveals.** Most overused
  AI cliché of 2024–2025.
- ❌ **Stacked shadows.** One layer of light per surface.
- ❌ **ALL CAPS in headlines.** Only mono eyebrows are tracked.
- ❌ **Mixed easing curves.** One easing — `cubic-bezier(0.2, 0.7, 0.2, 1)`.
- ❌ **Photo radii different from UI radii.** Images: `lg` or square.
- ❌ **`dark:` Tailwind prefix.** Use `[data-theme]` attribute.
- ❌ **Decorative iconography.** Icons earn their place by carrying
  differentiating information, not by occupying space.
- ❌ **Generic "Powered by GPT-X" or model-name attribution** anywhere
  in the product. The model is supply chain, not product.

## Liv — the alive signal

Codified in `DESIGN.md` (color token `liv: #7a8a6b`, see § "Colors").
Liv is the *only* permitted secondary accent. Its job is singular:
to be the visible signal that the system is alive.

Permitted positions — **at most three per surface**:

1. **Nav heartbeat** — a 6px dot adjacent to the wordmark.
2. **Hero pill / system-status pill** — small dot inside a status pill.
3. **Dashboard "Realtid · synkat" indicator.**

Always paired with a 3.2-second ease-in-out breath loop on opacity
(0.55 ↔ 1.0). Always disabled under `prefers-reduced-motion`. **Never**
used for links, CTAs, eyebrows, body emphasis, or any decorative purpose.

If your task is "make this feel alive" — Liv is the canonical solution.
Together with the 30-second mark rotation, Liv is how Obsidian *performs*
levande instead of just claiming it. Do not introduce any other
secondary accent.

If you find yourself reaching for Liv outside the three positions, the
answer is no.

## Decision tree

```
Need UI?
  1. Read DESIGN.md (always — every session)
  2. Read positionering.md if voice/copy/positioning is in scope
  3. Read design-strategi.md if marketing vs app distinction matters
  4. Check the matching card in Elivro Design System/cards/
  5. Use tokens (tokens.css / tailwind.config.js / design-tokens.json)
  6. Test in dark first; if app-context, test in light too
  7. Verify against the three governing rules before shipping
```

## Marketing vs app dialect (quick reference)

Per `design-strategi.md` § 3:

| Dimension | Marketing | App |
|---|---|---|
| Default mode | Dark canonical | Light canonical (toggle to dark) |
| Density | Generous, glesa | Tight, structured |
| Type | Serif present, italic signature | Sans dominant; serif rare (empty states, onboarding) |
| Coral | Expressive | Strictly semantic ("system speaking") |
| Motion | Atmospheric (breathing, ticker) | Functional (hover, modal-entry, toast) |
| Photography | Permitted (warm, granulated, real) | None |
| Information per screen | Low (1 idea/section) | High (many widgets) |

When something is ambiguous, ask: *am I designing for a 52-year-old
verksamhetschef reading on Tuesday afternoon (marketing) or for a
koordinator using this 8 hours a day (app)?*

## Red flags

If any of these appear during work, **stop and re-anchor:**

- A new color is being introduced beyond `--c-accent`, `--c-liv`
  (proposed), and the documented neutrals/status. → Refactor to use
  existing tokens.
- A second easing curve appears anywhere. → Replace with the canonical
  curve.
- A heading uses bold for emphasis. → Replace with italic.
- A surface uses backdrop-blur. → Remove; use `surface-lift` token instead.
- A component has more than three shadow layers. → Reduce to one.
- "AI-driven" or "Powered by [model]" appears in copy. → Strip.
- The page has italic on every heading and the italic words don't
  carry semantic meaning. → Italic is punctuation, not decoration —
  use it for the *one word that matters per heading*, not as wallpaper.

## Implementation notes by context

### When working in `elivro-business/` (this repo, marketing & docs)

- HTML + CSS, no React build step required.
- Reference `Elivro Design System/tokens.css` directly via `<link>` or
  inline `<style>`.
- Marketing prototypes live in `_exploration/<date>-<topic>/`.

### When working in the Elivro app repo

- The legacy `ui-design` skill (warm sand/Inter/grain texture) describes
  a **different system that Obsidian replaces.** Retire it. Sync this
  skill in.
- Existing React components in `src/components/ui/` were built for the
  old system. They need migration. Until migrated, prefer raw JSX with
  Obsidian tokens over the legacy components — don't extend the old
  system by accident.
- Tailwind theme: extend with `Elivro Design System/extract/tailwind.config.js`.
- Dark mode: implement via `[data-theme="dark|light"]` on `<html>`,
  not `dark:` prefix.

## When you're not sure — ask

Before shipping a design choice that you can't derive from `DESIGN.md`,
positionering.md, or this skill, ask the user. Better to pause than to
introduce a fourth accent color or a second easing curve.

> *Restraint over cleverness. Specifics over abstractions. Warmth without softness.*
