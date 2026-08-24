'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DemoModal from './DemoModal'

/**
 * Hero — Brand Kit v4
 *
 * Structure:
 *   left column:  H1 (three results) → sub → CTA row
 *   right column: floating 3D module asset
 *   foot:         hairline + three trust items
 *
 * Decluttered 2026-08-24 (mockup direction V6, minus the card frame):
 *   - the "Funderar ni på att byta verksamhetssystem?" eyebrow pill is gone;
 *     it asked a question the headline already answers
 *   - the three icon pillars (Byggt inifrån / Allt på ett ställe / Utfall,
 *     inte försök) are gone; three headings plus three descriptions competed
 *     with the H1 and pushed the CTAs down the page
 *   - the six-item trust band is down to three, on the hero surface behind a
 *     hairline instead of its own paper-card slab. "Vi tar betalt för utfall,
 *     inte för försök" was dropped as redundant next to "Betala endast vid
 *     levererat resultat"; the axiom still leads StartupOffer.
 *
 * Entrance: the section arrives on load, staggered in reading order —
 * headline, object, sub, CTAs, trust foot — so the eye lands on the promise
 * first. Three treatments, all on the single ease curve:
 *
 *   h1      `elv-rise`  each line resolves out of a 12px blur, 70ms apart.
 *                       Blur scales with type size — 6px on 16px body text
 *                       is soft, on 50px display type it barely registers.
 *                       Line 1 carries NO delay: the h1 is the LCP element,
 *                       and delaying it pushes Largest Contentful Paint out
 *                       by exactly that much.
 *   object  `elv-rise`  scale 0.97 -> 1 over a longer 900ms, so the product
 *                       shot settles rather than keeping step with the text.
 *   rest    `elv-rise`  10px lift resolving out of a 6px blur, 560ms.
 *
 * `prefers-reduced-motion` is handled globally in globals.css.
 *
 * Tokens used: --hero-bg, --ink, --red, --line, --n-600, --n-700.
 */

/** Stagger slot. 0ms renders no custom property so the default applies. */
const rise = (ms: number, extra?: Record<string, string>) =>
  ({ ...(ms ? { '--reveal-delay': `${ms}ms` } : null), ...extra }) as React.CSSProperties

const HEADLINE = ['Mindre admin.', 'Tryggare regelefterlevnad.', 'Snabbare rekrytering.']
export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="relative flex min-h-[clamp(34rem,74svh,50rem)] flex-col overflow-x-clip bg-hero-bg">
        <div className="container-default flex flex-1 items-center py-12 lg:py-16">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-[40px]">
            {/* LEFT — editorial content */}
            <div>
              {/* Size, weight and tracking come from the unlayered h1 rule in
                  globals.css -- utilities here would be silently ignored. */}
              <h1 className="mb-7 max-w-[26ch] text-ink">
                {HEADLINE.map((line, i) => (
                  <span
                    key={line}
                    style={rise(i * 70, {
                      '--rise-blur': '12px',
                      '--rise-y': '14px',
                      '--rise-duration': '720ms',
                    })}
                    className="elv-line elv-rise"
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <p
                style={rise(240)}
                className="elv-rise mb-9 max-w-[480px] text-[clamp(15.5px,1.1vw,17.5px)] leading-[1.52] text-n-700"
              >
                Höj kvaliteten för era{' '}
                <em className="font-sans font-semibold not-italic text-ink">
                  kunder, assistenter, arbetsledare och kundansvariga
                </em>
                . Byggt från grunden för att effektivisera med kraften från AI.
              </p>

              <div
                style={rise(320)}
                className="elv-rise flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary group w-full justify-center sm:w-auto sm:justify-start"
                >
                  Boka demo
                  <span className="arrow inline-block transition-transform duration-fast ease-out group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <Link
                  href="#case-proof"
                  className="btn-secondary group w-full justify-center sm:w-auto sm:justify-start"
                >
                  Se hur 2U Assistans gjorde
                </Link>
              </div>
            </div>

            {/* RIGHT — floating 3D module asset */}
            <div className="relative">
              {/* Reveal lives on the wrapper, `elv-float` on the image — both
                  animate transform, so they cannot share an element. */}
              <div
                style={rise(120, {
                  '--rise-duration': '900ms',
                  '--rise-scale': '0.97',
                  '--rise-blur': '8px',
                })}
                className="elv-rise flex items-center justify-center"
              >
                <Image
                  src="/brand-assets/cropped_3d_hero.webp"
                  alt="Elivro — verksamhetssystem med tio funktioner runt en gemensam kärna"
                  /* True intrinsic size of the asset (2× Lanczos master).
                     Was 1200×1200 — a square aspect the image never had,
                     which made the hero reflow on load. */
                  width={2222}
                  height={2048}
                  priority
                  quality={92}
                  sizes="(min-width: 1536px) 680px, (min-width: 1024px) 52vw, 100vw"
                  /* Overshoots its column — the render carries a lot of baked-in
                     margin, so w-full leaves the object looking small. The
                     section clips overflow-x, so this can never widen the page.
                     At ~656px CSS the 2222px master still covers DPR2. */
                  className="elv-float h-auto w-full lg:w-[122%] lg:max-w-none lg:-mx-[11%]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TRUST FOOT — three items behind a hairline, on the hero surface.
            Pinned to the bottom of the section by flex-col + being the last
            flex child. */}
        <div className="container-default">
          <div
            style={rise(420)}
            className="elv-rise grid grid-cols-1 gap-y-5 border-t border-line py-7 sm:grid-cols-3 sm:gap-y-0"
          >
            <TrustItem icon={<AwardIcon />} text="Betala endast vid levererat resultat" />
            <TrustItem icon={<ShieldIcon />} text="Tillsynsredo (IVO + Arbetsmiljöverket)" />
            <TrustItem icon={<LockIcon />} text="GDPR-säkert byggt för verkligheten" />
          </div>
        </div>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

/* -------------------- Sub-components -------------------- */

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 border-line sm:px-6 sm:first-of-type:pl-0 sm:not-first-of-type:border-l">
      <span className="shrink-0 text-ink [&>svg]:h-[22px] [&>svg]:w-[22px]">{icon}</span>
      <div className="text-[13.5px] leading-[1.35] text-n-700 text-balance">{text}</div>
    </div>
  )
}

/* -------------------- Icons -------------------- */
/* 24×24 viewBox, 1.6 stroke, round caps + joins — per BK v4 § 6 spec. */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function AwardIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="7" />
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg {...iconProps}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
