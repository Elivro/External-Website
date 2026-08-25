# CLAUDE.md

Guidance for Claude Code working in this repo.

## Project

Elivro landing page — Swedish B2B for an AI platform that serves
assistansbolag (personal-care companies). Single repo, Next.js 16 +
Tailwind v4. Pre-launch — no testimonials,
no customer logos beyond 2u Assistans, no case studies.

## Design system: Brand Kit v4 — "Vaken pondus"

**The site is paper-light canonical.** Warm off-white surfaces, near-black
ink, one disciplined red. This replaced the previous "Obsidian" dark/ember
system entirely. If you find guidance describing dark surfaces, ember
`#d25844`, bone `#f5efe3`, or a "Liv" sage accent, it is **pre-v4 and
wrong** — see *Legacy traps* below.

### Authoritative sources

All paths verified 2026-08-24. `REF/` below is shorthand for
`../elivro-business/elivro-design-plugin/skills/elivro-design/references/`.

| What | Where |
|---|---|
| **Design system (in-repo)** | `./DESIGN.md` — "Vaken pondus", v4 |
| **Upstream kit (canonical)** | `REF/BRAND_KIT_v4.md` |
| **Token values** | `REF/tokens.json` + `REF/primitives.css` |
| **Visual rules** | `REF/brand-guidelines.md` (also `./brand-guidelines.md`) |
| **Component / surface specs** | `REF/components/`, `REF/surfaces/` |
| **Voice & positioning** | `../elivro-business/docs/positionering.md` |
| **Buyer, tone, anti-references** | `./PRODUCT.md` |
| **Illustration catalog** | `./ILLUSTRATIONS.md` |

`BRAND_KIT_v4.md` wins on visual questions; `./DESIGN.md` is the repo-local
mirror. `positionering.md` wins on voice and copy. This file is a
quickstart, not a source of truth.

`../elivro-business/design-system/tokens/` holds byte-identical copies of
`tokens.json` and `primitives.css` — either location is fine.

### Dependency notes

- **`graphql` is now an orphan.** It was pinned to 16.x for Payload's peer
  range; Payload is gone, so nothing should need it. Check before removing —
  if nothing imports it, drop it.
- **`tsconfig.json` has no `baseUrl`** — TypeScript 7 removed the option
  (`error TS5102`). `paths` resolve relative to the tsconfig's directory on
  their own, so `"@/*": ["./*"]` works unchanged. Don't add it back.

There is an `elivro-design` skill available that loads the canonical tokens
and component patterns — prefer it over guessing.

> **Paths that no longer exist** (older notes and `DESIGN_RULES.md` still
> cite them): `../elivro-business/DESIGN.md`,
> `../elivro-business/positionering.md`,
> `../elivro-business/design-strategi.md`, and
> `../elivro-business/Elivro Design System/tokens.css`. All moved or gone.

> ⚠️ **`./DESIGN_RULES.md` is stale.** It is dated 2026-04-29 and documents
> the Obsidian system ("the codebase is fully on Obsidian"). It has not been
> migrated to v4. Do not follow it. `./HANDOFF.md` still lists it as a
> source of truth — that line is also stale.

### The palette

Defined in `app/globals.css` (`@theme` block + `:root` mirror).

- **Surfaces** — `paper #FAFAF7`, `paper-soft #FAFAF8`, `paper-card #FFFFFF`,
  `hero-bg #F9F7F6`
- **Ink + accents** — `ink #111111`, `red #DC2626`, `red-dark #991B1B`,
  `moss #1E7D59`, `warm #E7E5E0`
- **Neutrals** — `n-900 #333333`, `n-700 #4A4F54`, `n-600 #686F76`,
  `n-400 #A5A9AF`, `n-200 #E0DDD6`, `n-100 #F1F1EF`
- **Lines** — `--line rgba(17,17,17,0.07)`, `--line-strong rgba(17,17,17,0.14)`
- **Easing** — `--ease-out cubic-bezier(0.2, 0.8, 0.2, 1)` everywhere

### Motion

One curve — `--ease-out cubic-bezier(0.2, 0.8, 0.2, 1)` — and a fixed set of
named keyframes in `globals.css`. **Don't invent new ones**; compose from
these:

| Keyframe | Class | Use |
|---|---|---|
| `elvReveal` | `.elv-reveal` | Scroll reveal. Slow (800ms), 20px, no filter |
| `elvRise` | `.elv-rise` | **Load entrance.** 560ms, 10px, resolves out of a 6px blur |
| `elvFloat` / `elvPulse` / `progressSweep` | `.elv-float` / `.elv-pulse` | Perpetual |

`.elv-rise` is parameterised — `--rise-y`, `--rise-blur`, `--rise-scale`,
`--rise-duration` — and every reveal takes `--reveal-delay` for stagger:

```tsx
<div style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
     className="elv-rise">
```

`elvRise` is deliberately *not* folded into `elvReveal`: a `filter` in the
keyframe creates a stacking context for the animation's whole duration,
which would silently break `position: fixed` descendants of any future
scroll-reveal element.

**Four rules, each learned the hard way:**

1. **Never delay the LCP element.** The hero headline is it. Line 1 carries
   no delay; only lines 2–3 and the elements after it are staggered.
2. **`elvRise` and `elvFloat` cannot share an element** — both animate
   `transform`, so the later one silently wins. Reveal on a wrapper, float on
   the child (see `Hero.tsx`).
3. **Blur scales with type size.** 6px reads as soft on 16px body text and
   barely registers on 50px display type. The hero headline uses 12px, the
   object 8px, body 6px.
4. **Don't blur inside `overflow: hidden`.** A line-mask wipe was tried and
   removed: the blur halo gets clipped at the box edge and reads as a hard
   seam. (It also needs `padding-bottom` + equal negative `margin-bottom` or
   `overflow: hidden` shears the g/y/j in "Tryggare"/"rekrytering".)
5. **Measure, don't assume.** Entrance animations here cost nothing: LCP is
   ~200ms unthrottled and ~2.6s at 1.6 Mbps + 4× CPU — *identical with the
   animations disabled*, because the hero image is the LCP element under
   throttling either way. CLS is 0 at every breakpoint. Re-measure if you
   change the timings rather than reasoning about it.

`prefers-reduced-motion: reduce` is handled globally at the bottom of
`globals.css` (`animation: none !important`). None of these classes sets a
static opacity or transform, so elements simply render in place. Verified:
all seven hero reveals sit at opacity 1, `transform: none`, `filter: none`.

### Red is the only accent

`#DC2626` carries emphasis, heading italics, eyebrow labels, and the primary
mark. One accent, spent sparingly.

**Moss `#1E7D59`** is the single permitted secondary, and it means one thing:
*"AI i tjänst" / the system is on.* It is currently used in exactly one
place — the pulse dot in `StartupOffer.tsx`'s tag pill. Don't add a second
usage without a brand decision. It was removed from `TopBanner` on
2026-08-24 because a full-width green ribbon read as a promo bar and put a
second strong colour at the very top of a one-accent page.

## Tech stack

- **Next.js 16** (App Router; Turbopack in dev, webpack for `build`)
- **React 19**
- **TypeScript 5.9**
- **Tailwind CSS 4** (`@theme` block in `app/globals.css` + legacy
  `tailwind.config.mjs` loaded via `@config` — NOTE the file is `.mjs`, not
  `.cjs`, because it uses `export default` ES module syntax)
- **next/font/google** — Plus Jakarta Sans (display/headings), Inter
  (body/UI), Fraunces (italic accent inside `<em>`), JetBrains Mono (code,
  URLs). Loaded in `app/(app)/layout.tsx`; Jakarta uses `display: 'optional'`
  so the H1 paints immediately in the fallback.
- **Framer Motion** — listed in `package.json` (v13) but **imported by
  nothing**. Dead dependency; safe to remove.
- **GSAP + ScrollTrigger** for the unmounted `HowItWorks` scroll-pinning
- **Resend** for `/api/demo` and `/api/quiz` submissions
- **remark/rehype** renders `/kunskap` articles from markdown at build time

**There is no database and no CMS.** Payload was removed on 2026-08-25: it
served an admin login nothing used, its Nhost database had gone dead, its
public `/admin` route was returning 500, and `PAYLOAD_SECRET` fell back to a
string committed in the repo. Articles are markdown files under
`content/kunskap/`, which are version-controlled, statically rendered, and
have no runtime dependency. Removing it also cleared every npm audit finding.

## Commands

```bash
npm run dev          # Dev server, Turbopack (localhost:3000, falls back to 3001)
npm run build        # Production build — pinned to webpack via `next build --webpack`
npm run clean        # Wipe .next, then dev
npx tsc --noEmit     # Typecheck — use this as the gate
```

⚠️ **`npm run lint` is broken.** The script is `next lint`, which Next 16
removed; it fails with "Invalid project directory provided, no such
directory: …/lint". Pre-existing. Use `npx tsc --noEmit` to gate changes, or
migrate the script to `eslint .`.

## Architecture

### Route groups

- `app/(app)/` — public marketing surface. Layout renders `<html>`, `<body>`,
  mounts `next/font` variable classes, attaches `DisplayFontSwitcher` in dev.
  Canonical URLs are declared **per page**, never in the shared layout.
- Articles live in `content/kunskap/*.md`, read by `lib/kunskap.ts` and
  rendered by `app/(app)/kunskap/[slug]/page.tsx`. `draft: true` in the
  frontmatter hides a piece from the production deployment while keeping it
  visible locally and on Vercel previews. See `.claude/skills/kunskap/`.

### Page composition

`app/(app)/page.tsx` mounts, in order:

TopBanner → Navbar → Hero → LogoStrip → Features → ProductShowcase →
AboutUs → Manifesto → CaseProof → StartupOffer → Footer

Each section is wrapped in a `data-surface` div (`light` / `dark` /
`light-soft`) which drives the v4 palette override layer. The page
alternates light and dark; Hero is light, LogoStrip (Susanne) opens dark.

**Dead section components** — on disk, imported by nothing (verified
2026-08-24): `Philosophy`, `ProblemSection`, `SystemDoesItself`,
`HowItWorks`, `FounderStory`, `LiveTicker`, `ProofOfLifeMock`, `QuizCTA`,
`FAQSection`, `CTA`, `WhyPickUs`, `SectionDivider`, `HeroAtmosphere`,
`HeroLiveFeed`. Kept for reuse. Check `page.tsx` before editing a section —
only the eleven above actually render.

The rest of `components/` is shared plumbing (`Navbar`, `Footer`,
`DemoModal`, `CookieConsent`, `ElivroLogo`, `FadeSection`, `AnimatedText`,
`ScrollThread`, `GoogleAnalytics`, `DisplayFontSwitcher`).

### Where things live

| Concern | File |
|---|---|
| Tokens | `app/globals.css` (`@theme` + `:root`) and `tailwind.config.mjs` |
| Components | `components/*.tsx` (flat, no UI sub-library) |
| Quiz flow | `components/quiz/*.tsx` + `app/(app)/quiz/page.tsx` |
| Hooks | `hooks/*.ts` (intersection observer, reduced-motion) |
| Demo API | `app/api/demo/route.ts` (Resend) |
| Quiz API | `app/api/quiz/route.ts` |

## Common pitfalls when editing

### ⚠️ Unlayered element rules beat every Tailwind utility

`app/globals.css` sets bare `h1`–`h6` and `em` rules **outside any
`@layer`**. Tailwind v4 puts its utilities *inside* `@layer utilities`, and
unlayered CSS always wins over layered CSS. Consequences:

- `<h1 className="text-[48px] tracking-tight">` — **both classes are
  silently ignored.** Change the H1 scale in the `h1 { … }` rule in
  `globals.css`, not in the component.
- `<em className="not-italic font-sans text-ink">` — **all three are
  silently ignored.** The `em` rule forces Fraunces italic 700.

Nothing errors; the element just renders the base rule. If a type utility
"isn't doing anything," this is why. Verify with `getComputedStyle`, not by
reading the class list.

### Other traps

- **`rounded-md` is 10px**, not Tailwind's default 6px. The borderRadius
  scale is overridden in `tailwind.config.mjs`.
- **Mono is the system's voice.** Body text and CTAs use Inter. Reach for
  `font-mono` only when the system is being cited (timestamps, system-event
  lines, AI-proposal labels).
- **Next's dev image cache is `.next/dev/cache/images`**, not
  `.next/cache/images`. If you replace an image in `public/` and the browser
  still gets the old dimensions, clear that directory *and* restart dev —
  clearing the wrong path looks like the optimizer is broken.
- **`@/lib/gsap-config`** needs both `gsap` and `@gsap/react` in
  `package.json`. If you see "Module not found: Can't resolve
  '@gsap/react'", run `npm install @gsap/react`.
- **Tailwind config is `.mjs`** (ES module). Renaming to `.cjs` requires
  changing `export default` to `module.exports =`, otherwise Node silently
  fails to load it and the `obs-*` token aliases no-op.

## The hero 3D asset

`public/brand-assets/cropped_3d_hero.webp` — the red layered "E" with its
module tiles. Master render lives at
`../elivro-business/brand-assets/cropped_3d_hero.png`.

The master is only **1111×1024** — there is no higher-res original
(`3d-elivro-hero.png` at 1536×1024 is the same render uncropped, same pixels
on the subject). The shipped webp is a **2× Lanczos upscale + light unsharp,
2222×2048**, so `next/image` has a real candidate at retina widths instead
of capping the srcset at 1111px. If you re-export it, keep it ≥2000px wide
or the hero goes soft again.

Its `width`/`height` props must stay at the true **2222×2048** aspect. They
were once `1200×1200` — a square the image never had — which made the hero
reflow on load.

## Voice rules (positionering.md § 6)

- **Swedish first.** English is a second skin, never primary.
- **"du" form, never "Ni."**
- **Italic emphasizes — bold never.** Heading `<em>` renders Fraunces italic
  in red (`h1 em … h6 em { color: var(--red) }`). One italicized word per
  heading.
- **Quantify in time, money, names:** "14 timmar per vecka per koordinator,"
  "30 dagars test," "Anders L. på torsdag."
- **Forbidden vocabulary:** synergier, disrupta, revolutionera, transformera,
  empowerment, journey, solution, best-in-class, cutting-edge, next-gen,
  10x, unlock, seamless.
- **No emoji, no exclamation marks, no testimonials, no comparison tables,
  no "Powered by GPT-X" attribution.**

## Anti-patterns (HARD don'ts)

From `positionering.md` § 9 and `DESIGN.md` § 6:

- ❌ Bold for emphasis in body or headings. Italic always.
- ❌ A third accent colour beyond red and moss's single position.
- ❌ Purple gradients, AI sparkles, glowing AI orbs, streaming-text reveals.
- ❌ Stacked shadows. One layer of light per surface.
- ❌ ALL CAPS in headlines. Only 12px labels and mono eyebrows are tracked +
  uppercase.
- ❌ Mixed easing curves. `cubic-bezier(0.2, 0.8, 0.2, 1)` everywhere.
- ❌ `dark:` Tailwind prefix. Surface is chosen by the `data-surface`
  wrapper in `page.tsx`, not by a user-facing theme toggle.
- ❌ Generic stockfoton. The 3D module asset is the brand object.
- ❌ Decorative iconography. Icons earn their place by carrying
  differentiating information.

## Legacy traps

`globals.css` still defines an **"Obsidian legacy compat"** token block —
`--accent #d25844`, `--liv #7a8a6b`, `--bone`, `--bg`, `--fg-*`, and the
`.liv-dot` breath animation. These exist only so unmigrated components keep
rendering. **New code must not use them.** Use the v4 palette above.

Any reference you find to the "Liv" sage accent and its three permitted
positions (nav heartbeat, hero status pill, dashboard "Realtid" indicator)
describes the Obsidian system. Two of those three components
(`LiveTicker`, `ProofOfLifeMock`) are no longer mounted.

## Pre-launch context

Elivro has **one named customer (2u Assistans) and co-built credibility**.
The page focuses on:

- A single-customer credibility mark (`LogoStrip`) — do not list other names
  here; one honest customer beats five suggested ones.
- Product completeness (`ProductShowcase` four tools, `Features` catalog).
- De-risking (`StartupOffer` uppstartskampanj, 30-day test, no bindningstid).
- Founder credibility (`AboutUs` — Jimmy / Filiph / Daniel as a team).

Do NOT add testimonial quotes, case studies, "X% mindre tid" claims, or
comparison-vs-competitor tables. The reference strip is the only permitted
social-proof element.

## Email

Demo form → `/api/demo` (Resend) → `daniel@elivro.se`.
Quiz form → `/api/quiz` (Resend) → same.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
