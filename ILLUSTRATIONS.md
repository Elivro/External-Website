# ILLUSTRATIONS — sketchbook primitives

**Version:** 1.0 (initial promotion)
**Date:** 2026-04-29
**Source:** `../elivro-business/_exploration/system-language-sketchbook.html` (38 scenes)
**Sibling spec:** `DESIGN_RULES.md` (operational mapping)
**Authoritative spec:** `../elivro-business/DESIGN.md` (Obsidian)

This file is the index for the visual-language compositions used across
the marketing surface. The full sketchbook lives in `elivro-business/`
under `_exploration/system-language-sketchbook.html` and contains 38
scenes across five categories — most stay in the sketchbook. This page
lists only the compositions that have been **promoted** into
`components/illustrations/` for production use.

If you are an agent picking an illustration: read this file before
choosing. Don't pick by guessing from a filename.

---

## How they work

Each illustration is a small typed React component built from the
canonical primitive vocabulary defined in `DESIGN.md`:

- **Primitives:** dot, ring, ring-with-dot, listening arc, threshold
  arch, partial orbit, bracket, hairline, connector, soft underline,
  caret.
- **Stroke:** 1.4 default, 0.9 with `.illust-thin`. `linecap=round`,
  `linejoin=round`.
- **Color:** the `<svg>` reads `currentColor`, defaulting to `--accent`.
  Wrap in `text-fg-muted` etc. to recolor for context.
- **Animation:** `animate` prop. Static by default. When true, lines
  draw in (`stroke-dashoffset`) once, then `.illust-breathe` elements
  loop on the canonical 3.2s ease-in-out breath. `prefers-reduced-motion`
  is handled globally — no per-component guard.
- **Trigger:** wrap in `useIntersectionObserver` and pass
  `animate={isVisible}` so the draw-in fires on first view, not on mount.

CSS lives in `app/globals.css` under the `ILLUSTRATIONS` block.

---

## Promoted compositions

| Component | Sketchbook # | Category | Semantic intent | Used by |
|---|---|---|---|---|
| `ListeningArc` | 01 | Noticing | The system observes before it speaks. Receptive attention. | reserved (Hero / live feed contexts) |
| `ReasoningVisible` | 11 | Speaking | A small set, deliberately chosen. Counted scarcity without aggression. | reserved (StartupOffer uses a custom slot indicator instead) |
| `ActionPropagates` | 23 | Acting | One decision moving through the system. Tool-to-tool effect. | reserved (was used in ProductShowcase before it became a tabbed carousel) |
| `TwoPeopleOneRhythm` | 31 | Relationship | Pairing as continuity, not connection. Founder/coordinator, builder/operator. | `AboutUs` |
| `SharedContext` | 35 | Relationship | Co-built work; triangulated trust. Us with a customer. | `WhyPickUs` |
| `AConversation` | 37 | Relationship | Dialogue before commitment. Low-stakes exchange. | `QuizCTA` |

---

## Selection guide

When a section needs an illustration, ask in this order:

1. **Does it earn placement?** If the composition is decorative — adding
   visual interest without carrying semantic load — skip it. The brand's
   restraint is the asset; an illustration must say something the copy
   doesn't already.
2. **Is the section about noticing, speaking, acting, rhythm, or
   relationship?** Pick from the matching sketchbook category. Don't
   reach across categories.
3. **Is there an existing promoted composition that fits?** Use it.
   If multiple sections use the same composition, that is fine —
   repetition reads as system, not as duplication.
4. **If nothing fits**, promote a new scene from the sketchbook (38
   numbered cells in the source). Pick the closest match by primitive
   vocabulary, write a new component file under
   `components/illustrations/`, and add a row to the table above.

Do not invent new compositions. The vocabulary is closed; the
combinations are the language.

---

## Animation guidelines

- **One rhythm:** 3.2s ease-in-out, opacity 0.55 ↔ 1.0. Do not introduce
  a second breath duration.
- **Draw-in fires once.** No looping line animations.
- **Trigger on first visibility, not on mount.** Use
  `useIntersectionObserver(0.1)` and pass `animate={isVisible}`.
- **No more than one breathing focal element per composition.** The
  breath is a signal of life; multiple breaths read as flicker.
- **No new easing curves.** `cubic-bezier(0.2, 0.7, 0.2, 1)` everywhere.
- **No stroke-width above 1.4 or below 0.9.** 1.4 is the brand line
  weight; 0.9 (`.illust-thin`) is the supporting weight.

If a section needs motion the contract above can't express, pause and
discuss before adding a third easing curve or a fourth stroke weight.

---

## Restraint check

Across the page, aim for **≤ 6 illustration placements total**, not
one per section. The hero already carries a generative live feed —
that is the dense moment. Subsequent sections should feel quieter.
If half the sections have a composition, the system has stopped
working.

If you are about to add a seventh placement, the answer is to remove
one, not add another.
