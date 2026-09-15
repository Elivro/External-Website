---
name: ui-explore
description: |
  Generate UI mockup variants with Codex CLI's $imagegen before writing any UI code,
  present them in a local gallery for the user to pick from, then implement the chosen
  direction and have a fresh agent review the result against it.

  Use when: redesigning a page or view, reworking a layout, exploring visual direction,
  or any UI change where "how should this look" is an open question. Also used by /dev
  when a task involves non-trivial new or changed UI.

  Do NOT use for: moving a button, changing a label, fixing spacing, or any change where
  there is no design question to answer. Skip straight to the edit.
---

# ui-explore

Give the implementation agent a picture to aim at instead of letting it freestyle.
An AI writing UI from a prose description invents its own layout; an AI writing UI
from an agreed reference image builds the thing you actually chose.

## How many variants

| Change | Variants |
|---|---|
| Trivial (label, spacing, one button) | none — skip this skill |
| Small, one obvious shape | 1 — an anchor, not a choice |
| Real layout/hierarchy question | 3–4 — genuinely different directions |
| Whole-surface direction (e.g. light theme) | 3–4 moodboards, direction only |

## Workflow

### 1. Screenshot the view being changed

The screenshot **is** the design system input. It carries our colors, typography,
spacing, component shapes and density implicitly — far more reliably than describing
them. Do not paste `.interface-design/system.md` into the prompt; it bloats the prompt
and the model follows the picture anyway.

Use `/local-server` to get the HTTPS prod build up, then `/playwright-cli` to capture
the page. Save to `.tmp/ui-mockups/<slug>/current.png`.

No existing view (brand new page)? Screenshot the nearest sibling page instead, and say
in the prompt which parts are new.

### 2. Write the prompt

One prompt file per variant. Keep it to: what the screenshot is, what to change, and
what makes *this* variant different.

```
Attached is a screenshot of an existing screen in our Swedish care-management web app.

REDESIGN THIS SCREEN. It must stay recognisably the same product — same colors,
typography, component style and general chrome as the screenshot.

WHAT TO CHANGE:
<the actual intent, concretely. e.g. "The overview is a flat 2x3 card salad — every
card has equal weight. Give it a clear hierarchy: what a samordnare needs at a glance
first, secondary detail below.">

THIS VARIANT:
<what makes this one different. e.g. "Lead with one wide summary panel across the top,
then a denser two-column list beneath it.">

Output one flat, screenshot-like rendering of the screen. 16:9, sharp, no device frame,
no photograph, no 3D perspective, no drop shadows around the canvas.
All text must be legible, correctly spelled Swedish.
```

Variants must differ in **structure** (what leads, what groups with what, density),
not in accent color. Four recolors of the same layout is not a choice.

### 3. Generate

```bash
bash .Codex/skills/ui-explore/run-imagegen.sh \
  .tmp/ui-mockups/<slug>/v1.prompt.txt \
  .tmp/ui-mockups/<slug>/v1.png \
  .tmp/ui-mockups/<slug>/current.png
```

Third arg onward = reference images passed to `codex exec -i`. Run variants
sequentially, ~60–90s each. The wrapper retries once and compresses the output.

### 4. Gallery

```bash
cp .Codex/skills/ui-explore/gallery.html .tmp/ui-mockups/<slug>/
```

Write `.tmp/ui-mockups/<slug>/manifest.js` next to it — the only file that changes
between runs:

```js
window.MOCKUPS = {
  title: 'Kundprofil — översikt',
  intent: 'Tydligare hierarki, mindre kortsallad',
  variants: [
    { file: 'current.png', label: 'Nuvarande', reference: true },
    { file: 'v1.png', label: 'V1 — Sammanfattning överst', notes: 'Bred hero + tät tvåkolumn under' },
    { file: 'v2.png', label: 'V2 — Vänsterkolumn som index', notes: 'Sticky nav, innehåll till höger' },
  ],
};
```

Tell the user the absolute path to `gallery.html` — they open it themselves. Click any
image to enlarge. Then ask which variant, and which parts of the others to graft in.

### 5. Implement

Load `/use-component-library` first. The mockup decides **layout, hierarchy, grouping,
density**. The component library decides **everything else** — never hand-roll a
component to match a mockup pixel when `src/components/ui/` has one. Where they
conflict, the component library wins and you say so.

Text in mockups is plausible-looking filler. Never copy labels, values or dates from a
mockup into real code.

### 6. Fresh-agent review — required

A separate agent (not the one that implemented it) screenshots the result and compares
it against the chosen mockup. The implementing agent declares victory too early; this
step exists because of that.

Report only:
- Elements from the mockup that are **missing**
- Elements in the **wrong place** or wrong reading order
- **Hierarchy** inverted — something secondary reading as primary
- Raw HTML or hardcoded hex where a component or token exists

Not reported: exact pixel offsets, font-weight deltas, shade differences. We are not
chasing pixel parity.

## The same gallery carries results, not just mockups

`gallery.html` is generic — it renders whatever `manifest.js` lists. `/dev` Phase 3.5
reuses it for the *outcome*: chosen reference and actual screenshots side by side, so
"did this come out right?" is one click instead of boot a server, log in, navigate.

Order reference-then-result per surface, and mark the reference so it reads as the
thing being matched against:

```js
window.MOCKUPS = {
  title: '#1234 — Kundprofil',
  intent: 'Tydligare hierarki på Översikt',
  variants: [
    { file: 'v5a.png', label: 'Referens — vald variant', reference: true },
    { file: 'after-oversikt.png', label: 'Resultat — Översikt' },
    { file: 'after-oversikt-dark.png', label: 'Resultat — mörkt läge' },
  ],
}
```

Same rules as an exploration run: compress every PNG first, keep everything under
`.tmp/` (gitignored), never commit it.

## Gotchas

- **`codex exec` can exit 0 with no image** and no error — an empty assistant turn.
  Never trust the exit code; the wrapper asserts the PNG exists and retries. Observed
  once in four runs.
- `$imagegen` is built into Codex CLI (verified 0.146.0) and uses your Codex session
  auth. It needs no `OPENAI_API_KEY`. The skill also ships a `scripts/image_gen.py` CLI
  fallback that *does* want a key — don't let it go down that path.
- Unless told otherwise, output lands in `~/.codex/generated_images/<session>/call_*.png`.
  The wrapper pins an absolute destination so nothing has to be hunted for.
- ~20–55k Codex tokens per variant, mostly skill-description overhead. The wrapper
  pins `-m gpt-5.6-luna` (cheapest vision-capable tier) — the driving model only looks
  at the screenshot and calls the image tool, so a reasoning model buys nothing here.
  Override with `IMAGEGEN_MODEL=<slug>` if the picture quality ever regresses.
- Everything lives under `.tmp/` (gitignored). Mockups are disposable — never commit
  them. `output/` in the repo root is **not** ignored; if Codex drops something there,
  move it.
