# HANDOFF — Elivro landing page

**Date:** 2026-05-28
**Branch:** `master` (several commits ahead of `origin/master`)
**Dev server:** `npm run dev` → `http://localhost:3001`
**Prod (for Lighthouse):** `PORT=3002 npm run start` → `http://localhost:3002`

Hand-off snapshot. Reads top-to-bottom; the most useful state is in the
**What just shipped** section.

---

## Source-of-truth files (read these before touching surface code)

| File | What it owns |
|---|---|
| `CLAUDE.md` | Project quickstart, voice rules, anti-patterns |
| `PRODUCT.md` | Buyer (VD/verksamhetschef), tone, anti-references, design principles |
| `DESIGN.md` | Color/typography/components — canonical visual system |
| `DESIGN_RULES.md` | Operational mapping of DESIGN.md to this codebase |
| `app/globals.css` | `@theme` tokens, surface remapping, section styles |
| `tailwind.config.mjs` | Tailwind extends (loaded via `@config` directive) |

Composition is at `app/(app)/page.tsx`:
TopBanner → Navbar → Hero → LogoStrip → Features → ProductShowcase →
AboutUs → Manifesto → CaseProof → StartupOffer → Footer.

---

## What just shipped (this session)

### Performance pass

**Mobile: 81 → 88** (3-run average, stable across reruns). Desktop **99 → 100**.
LCP 4.3 s → 3.6 s; total page weight 521 KB → ~400 KB (−23%). CLS 0 throughout.

Concrete changes:

- `app/(app)/layout.tsx`:
  - `Plus_Jakarta_Sans` now `display: 'optional'` (drove most of the FCP win; didn't move LCP because the LCP element isn't H1 text — likely a deeper element that paints late on simulated 4G + 4× CPU).
  - **Fraunces cut from 10 cuts to 2** (`weight: ['500', '700'], style: ['italic']`). It's only ever used inside `<em>` per DESIGN.md; the heavy roman weights were dead bytes.
  - `DM_Sans` and `Quicksand` removed entirely (DM Sans was declared and unused; Quicksand had 2 CSS rules, swapped to Jakarta in `globals.css`).
  - Favicon metadata wired to the full PWA set under `/public/`: `favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`, `favicon.ico` as shortcut.

- All component image references migrated to `.webp` after the user
  converted source assets (the `.png`/`.jpg` originals are deleted):
  - `components/AboutUs.tsx` — `jimmy/filiph/daniel.webp`, `group.webp`
  - `components/Hero.tsx` — `cropped_3d_hero.webp` (added `sizes` attribute on the priority image too)
  - `components/LogoStrip.tsx` — `2ulogga.webp`, `susanne_2u.webp`
  - `components/ProductShowcase.tsx` — 4 marketing screenshots → `.webp`

- DemoModal dynamic-import was tried, reverted — chunk overhead
  exceeded savings (DemoModal is ~5 KB; splitting added 7 new chunks
  with HTTP overhead).

### AboutUs section — rebuilt twice

The section went through two redesigns this session:

**First attempt** (replaced hover with always-visible founder carousel):
new headline "Därför finns *Elivro.*", carousel-style aside card with
`02/03` pager + prev/next buttons, separate full-width trust band.
*Rejected by user* — wanted to keep hover and the original headline.

**Final state** (current):
- Headline reverted to "Vi byggde det vi själva *saknade.*" (Fraunces italic, red `<em>` accent).
- **Hover behavior restored**: hover zones on each founder in the group photo surface a sequenced dossier card on the right. Same crossfade timing as before (120 ms swap when changing founders). Empty state when no one is hovered.
- **Brighter background**: `#e8dec8` (was `#c5baa6b3` — too dusty/dark; the user pointed at a brighter cream reference).
- **Section is shorter**: `pb-16` dropped; `.about-stage` `min-height: 520px` (was 620). Photo also visually shifted right via `object-position: 58% 38%` plus wider left mask fade (`24%–32%` instead of `18%–26%`).
- **Bullets are icon-cards** (calendar / building / handshake icons). Title + subtitle structure, hover darkens the icon background.
- **Trust pills are a HORIZONTAL ribbon at the bottom of the wrap** — `grid-column: 1 / span 2`, `grid-row: 2`, `display: grid` with 3 equal columns. Spans the copy + stage columns (not the aside) so it sits in the bottom-left of the section, matching reference 1's layout. Each pill has an icon in a circular badge (shield / landmark / spark), title + subtitle, soft border, translucent white bg that lifts on hover. Carries "Säkerhet först · GDPR i kod, inte i PDF.", "Byggt för det offentliga · Tillgänglighet. Stabilitet. Ansvar.", "Grundare vid din sida · Inga mellanhänder."
- **Aside card** structure: header with `OM [FIRSTNAME]` mono eyebrow + `0X / 03` sequence, photo (4:5), heavy-sans full name, mono uppercase role, bio.
- **LabelDoodle component** replaces the old `ArrowDoodle` — thinner, more refined hand-drawn curves below each name+role label.
- **`.about-content` has `pointer-events: none`** with `pointer-events: auto` re-enabled on direct children. Without this, the copy column (`z-index: 3`) intercepts hover events on the founder zones at wider viewports — the photo's mask-faded left edge sits under the content column visually, but the DOM stacking still wins.
- Mobile fallback: stage drops the mask + height-pin overrides; shows clean rectangular photo. Trust ribbon collapses to single-column stack. Mobile roster sits below with circular thumbs.

Reference shots from the user are in their Screenshots folder
(`Screenshot 2026-05-28 001045.png` for the dark theme founder card,
`Screenshot 2026-05-28 005706.png` for the brighter cream layout).

---

## Audit tooling

Run all from project root with prod or dev server up:

| Script | Purpose |
|---|---|
| `node audit/responsive-audit.mjs` | Overflow check at 360/414/768/1024/1280/1536/1920. **0/7 expected.** |
| `node audit/snap-about.mjs` | AboutUs at 3 viewports + hover states for each founder. Strips sticky-positioned navbar so element screenshots are clean. |
| `node audit/verify-clicks.mjs` | Every internal anchor resolves; "Boka demo" opens DemoModal. |
| `node audit/verify-cursors.mjs` | Interactive elements have `cursor: pointer`. |
| `node audit/hero-heights.mjs` | Hero height at multiple viewport heights. |
| `node audit/snap-top.mjs` | Banner + navbar screenshots. |
| `node audit/snap-product.mjs` | ProductShowcase screenshot. |
| `node audit/snap-hero.mjs` | Hero fold screenshot. |

Lighthouse runs are written to `audit/lh-*.json` and `audit/lighthouse-*.json`.
These are gitignored — `audit/*.json` was added to `.gitignore` this session.

---

## Gotchas you'll hit if you touch this

1. **`[data-surface="light"] > section { background-color: transparent }`** in `globals.css` zeros section backgrounds. AboutUs works around this with `style={{ backgroundColor: '#e8dec8' }}` inline — attribute-selector specificity beats Tailwind utility classes.
2. **Turbopack's CSS watcher is flaky.** If a CSS change "doesn't appear", restart `npm run dev`. The `progressSweep` keyframe is mirrored inline in `ProductShowcase.tsx` for this exact reason.
3. **Section ids matter for navigation.** Anchors used: `#product`, `#features`, `#about-us`, `#case-proof`, `#startup-offer`, `#reference-customers`, `#manifesto`. Navbar's "Produkt" points at `#product` (ProductShowcase, not Features).
4. **`2ulogga.webp` source is 176×170.** The sharpness ceiling — needs a higher-res asset to improve further.
5. **No `font-semibold` for emphasis in headings/body.** Italic via Fraunces only.
6. **AboutUs photo mask is `mask-composite: intersect`** (or `source-in` for webkit). Don't simplify to a single mask layer — the top fade and the horizontal fade are independent.
7. **`favicon.ico` lives in `/public/`, not `/app/`.** Next.js auto-detects either; the metadata in `layout.tsx` is the primary source and points at the full PWA set. Don't put a `favicon.ico` at `/app/` — it would override and bypass the SVG.
8. **The Fraunces font family is italic-only now.** `style: ['italic']` in `next/font/google`. If you ever need roman Fraunces, add it back explicitly — but per DESIGN.md it shouldn't be needed.
9. **The Lighthouse mobile LCP is 3.6 s** but the LCP element isn't H1 text — `display: optional` on Jakarta didn't move it. Likely a later-painted element on simulated 4G + 4× CPU. Real-world will be much faster. Not chased further.
10. **`audit/snap-about.mjs` neutralizes `position: fixed/sticky` navbars** before taking element screenshots. Without that, the navbar bleeds into screenshots that capture areas below the viewport fold.

---

## Likely next moves

- Decide on final 2u logo asset (source still 176×170; sharpness capped).
- Real Susanne photo or confirm `/susanne_2u.webp` is final.
- CaseProof quote is still placeholder (`Citat förbereds`).
- Features section hasn't been touched recently — may want a polish pass.
- Manifesto section is mounted but the user removed "Manifest" from
  Navbar + Footer — possibly slated for removal entirely.
- AboutUs aside card could grow a "Läs mer om [name] →" link if you add
  per-founder pages later (reference shows the affordance; currently
  no destination, so omitted).
- The mobile LCP gap (3.6 s vs 2.5 s target) is the one outstanding
  perf item if you want green Web Vitals on simulated mobile. Hunt the
  late-painting element via the Lighthouse `lcp-element` audit; image
  preload or critical-CSS extraction might help.
- HANDOFF and `audit/` tooling can be deleted before pushing if you
  want a clean public history.

---

## Commit cadence + push state

Local `master` is several commits ahead of `origin/master`. Notable from
this session (not yet committed):

```
M app/(app)/layout.tsx          # Jakarta optional, Fraunces italic-only, favicon set
M app/globals.css                # AboutUs CSS rewrite (twice — final is the hover version)
M components/AboutUs.tsx         # Hover restored, brighter bg, icon-cards, trust pills in column
M components/Hero.tsx            # webp ref, sizes
M components/LogoStrip.tsx       # webp refs
M components/ProductShowcase.tsx # 4 webp refs
M next-env.d.ts                  # auto-managed by Next
M .gitignore                     # audit/*.json
?? audit/snap-about.mjs          # new helper
D public/**/*.{png,jpg}          # originals deleted by user after webp conversion
```

User has been deciding when to push. Don't push to origin without asking.
