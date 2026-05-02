# CLAUDE.md

Guidance for Claude Code working in this repo.

## Project

Elivro landing page — Swedish B2B for an AI platform that serves
assistansbolag (personal-care companies). Single repo, Next.js 16 +
Payload CMS (admin only) + Tailwind v4. Pre-launch — no testimonials,
no customer logos, no case studies.

## Authoritative sources

| What | Where |
|---|---|
| **Design system** | `./DESIGN_RULES.md` (operational mapping) → `../elivro-business/DESIGN.md` (canonical Obsidian spec) |
| **Voice & positioning** | `../elivro-business/positionering.md` |
| **Marketing vs app dialect** | `../elivro-business/design-strategi.md` |
| **Token CSS** | `../elivro-business/Elivro Design System/tokens.css` |

`DESIGN.md` always wins. `positionering.md` wins on voice and copy.
This file is a quickstart, not a source of truth.

## The three governing rules

Every choice in this codebase derives from these. From `DESIGN.md`:

1. **Restraint over cleverness** — one accent, one easing curve, one
   italic for emphasis. *If a flourish has to be defended, it leaves.*
2. **Specifics over abstractions** — "14 timmar per vecka per
   koordinator" beats "productivity gains."
3. **Warmth without softness** — dark surfaces, never cold. Halos,
   hairlines, a mark that breathes once every 30 seconds.

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5.9**
- **Tailwind CSS 4** (`@theme` block in `app/globals.css` + legacy
  `tailwind.config.mjs` loaded via `@config` directive — NOTE the file
  is `.mjs`, not `.cjs`, because it uses `export default` ES module syntax)
- **next/font** for self-hosted Fraunces / Inter / JetBrains Mono /
  Instrument Serif / Newsreader / Bodoni Moda (display switcher in dev)
- **Framer Motion** for the few transitions that need orchestration
- **GSAP + ScrollTrigger** for HowItWorks scroll-pinning
- **Resend** for `/api/demo` email submissions
- **Payload CMS** (admin login only — no content collections wire to
  the marketing surface yet)

## Commands

```bash
npm run dev          # Start dev server (localhost:3000, falls back to 3001)
npm run build        # Production build
npm run lint         # ESLint
npm run clean        # Clean .next cache
```

## Architecture

### Route groups

- `app/(app)/` — public marketing surface. Layout renders `<html>`,
  `<body>`, mounts `next/font` variable classes, attaches the
  `DisplayFontSwitcher` in dev only.
- `app/(payload)/` — Payload admin (Users-only collection).

### Page composition

`app/(app)/page.tsx` mounts sections in this order:
Navbar → Hero → LogoStrip → ProductShowcase → Features → AboutUs →
WhyPickUs → StartupOffer → QuizCTA → FAQSection → CTA → Footer.

`Philosophy`, `ProblemSection`, `SystemDoesItself`, and `HowItWorks` were
removed from the page on 2026-04-29 as part of the restructure that
introduced reference customers, the four-tool showcase, the founder
carousel, the uppstartskampanj, and the matchning-quiz CTA. The old
component files remain on disk for reuse but are no longer mounted.

### Where things live

| Concern | File |
|---|---|
| Tokens | `app/globals.css` (`@theme` + `:root`) and `tailwind.config.mjs` |
| Components | `components/*.tsx` (flat, no UI sub-library) |
| Quiz flow | `components/quiz/*.tsx` + `app/(app)/quiz/page.tsx` |
| Hooks | `hooks/*.ts` (intersection observer, reduced-motion) |
| Demo API | `app/api/demo/route.ts` (Resend) |
| Quiz API | `app/api/quiz/route.ts` |

### Liv — the alive signal

`#7a8a6b` muted sage. The ONLY permitted secondary accent. Strictly
scoped to **three positions** on this site:

1. **Nav heartbeat** — dot adjacent to wordmark in `Navbar.tsx`.
2. **Hero / system-status pill** — leading-edge dot in `LiveTicker.tsx`.
3. **Dashboard "Realtid" indicator** — inside `ProofOfLifeMock.tsx`.

`.liv-dot` class in `globals.css` carries the 3.2s breath. Disabled
under `prefers-reduced-motion`. Don't introduce a fourth Liv usage.

## Voice rules (positionering.md § 6)

- **Swedish first.** English is a second skin, never primary.
- **"du" form, never "Ni."**
- **Italic emphasizes — bold never.** One italicized word per heading.
- **Forbidden vocabulary:** synergier, disrupta, revolutionera,
  transformera, empowerment, journey, solution, best-in-class,
  cutting-edge, next-gen, 10x, unlock, seamless.
- **Quantify in time, money, names:** "14 timmar per vecka per
  koordinator," "30 dagars test," "Anders L. på torsdag."
- **No emoji, no exclamation marks, no testimonials, no comparison
  tables, no "Powered by GPT-X" attribution.**

## Anti-patterns (HARD don'ts)

From `positionering.md` § 9 and `DESIGN.md` Don'ts:

- ❌ Bold for emphasis in body. Italic always.
- ❌ Second accent color beyond Liv's three positions.
- ❌ Backdrop-blur / glassmorphism.
- ❌ Purple gradients, AI sparkles, glowing AI orbs, streaming-text reveals.
- ❌ Stacked shadows. One layer of light per surface.
- ❌ ALL CAPS in headlines. Only mono eyebrows are tracked + uppercase.
- ❌ Mixed easing curves. `cubic-bezier(0.2, 0.7, 0.2, 1)` everywhere
  except the two named exceptions (mark rotation, Liv breath).
- ❌ `dark:` Tailwind prefix. Marketing is dark canonical, no toggle.
- ❌ Generic stockfoton. The hands illustration is the brand asset.
- ❌ Decorative iconography. Icons earn their place by carrying
  differentiating information.

## Pre-launch context

Elivro has **one named customer (2u Assistans) and co-built credibility**.
The page focuses on:
- A single-customer credibility mark (`LogoStrip`) — "Byggt tillsammans
  med 2u Assistans" with the 2u logo. Do not list other names here;
  one honest customer beats five suggested ones. If a second customer
  is signed and approves naming, expand to a real strip then.
- Co-built positioning (`WhyPickUs`) — the prose case for 2u Assistans
  as the largest assistansanordnare in Västerås.
- Product completeness demonstration (`ProductShowcase` four tools,
  `Features` full catalog).
- De-risking (`StartupOffer` uppstartskampanj, 30-day test, no bindningstid).
- Founder credibility (`AboutUs` — Jimmy / Filiph / Daniel as a team).

Do NOT add testimonial quotes, case studies, "X% mindre tid" claims,
or comparison-vs-competitor tables. The reference strip is the only
permitted social-proof element.

## Common pitfalls when editing

- **Mono is the system's voice.** Body text and CTAs use Inter, not
  JetBrains Mono. Reach for `font-mono` only when the system is being
  cited (eyebrows, timestamps, system-event lines, AI-proposal labels).
- **`rounded-md` is 10px**, not Tailwind's default 6px. The borderRadius
  scale is overridden in `tailwind.config.mjs` to match Obsidian.
- **`@/lib/gsap-config`** depends on `gsap` and `@gsap/react` both being
  in `package.json`. Before April 2026 the lockfile had `@gsap/react`
  but `package.json` didn't — leading to a build failure that masked
  the whole app behind an error overlay. If you see "Module not found:
  Can't resolve '@gsap/react'" run `npm install @gsap/react`.
- **Tailwind config file is `.mjs`** (ES module). If you rename to
  `.cjs`, change `export default` to `module.exports = `, otherwise
  Node will silently fail to load it and Obsidian's `obs-*` token
  aliases will no-op.

## Email

Demo form → `/api/demo` (Resend) → `daniel@elivro.se`.
Quiz form → `/api/quiz` (Resend) → same.
