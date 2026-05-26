'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DemoModal from './DemoModal'

/**
 * Hero — Brand Kit v4
 * Mirrors strategy-analysis/elivro-landing-mockup-v2.html § HERO + TRUST.
 *
 * Structure:
 *   eyebrow pill → H1 (three results) → sub → three pillars → CTA row
 *   right column: floating 3D hexagon asset
 *   below: full-width trust band (pillar axiom + six trust items)
 *
 * Tokens used: --paper, --hero-bg, --ink, --red (eyebrow dot, pillar
 * icon), --moss, --line, --line-strong, --n-600, --n-700.
 *
 * Per BK v4 § 8, hero copy is LOCKED — do not modify without a brand
 * decision. Edit BRAND_KIT_v4.md first, then sync.
 */
export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="relative flex min-h-screen flex-col overflow-visible bg-hero-bg">
        <div className="container-default flex flex-1 items-center py-12 lg:py-16">
          <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.2fr] lg:gap-[72px]">
            {/* LEFT — editorial content */}
            <div>
              <div className="eyebrow-pill mb-8">
                <span className="eyebrow-dot" />
                Funderar ni på att byta verksamhetssystem?
              </div>

              <h1 className="mb-6 max-w-[20ch] font-display text-[clamp(34px,3.5vw,54px)] font-bold leading-[1.08] tracking-[-0.044em] text-ink">
                Mindre admin.<br />
                Tryggare regelefterlevnad.<br />
                Snabbare rekrytering.
              </h1>

              <p className="mb-7 max-w-[480px] text-[clamp(15.5px,1.1vw,17.5px)] leading-[1.52] text-n-700">
                Höj kvaliteten för era{' '}
                <em className="font-sans font-semibold not-italic text-ink">
                  kunder, assistenter, arbetsledare och kundansvariga
                </em>
                . Byggt från grunden för att effektivisera med kraften från AI.
              </p>

              <div className="mb-8 grid max-w-[540px] grid-cols-1 gap-5 sm:grid-cols-3">
                <HeroPillar
                  icon={<UsersIcon />}
                  label="Byggt inifrån"
                  sub="Tekniknördar som jobbat med personlig assistans."
                />
                <HeroPillar
                  icon={<LayersIcon />}
                  label="Allt på ett ställe"
                  sub="Schema, FK, avtal, rekrytering, ledning — samma system."
                />
                <HeroPillar
                  icon={<AwardIcon />}
                  label="Utfall, inte försök"
                  sub="Pilot 90 dagar med pengarna-tillbaka-garanti."
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary group"
                >
                  Boka demo
                  <span className="arrow inline-block transition-transform duration-fast ease-out group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <Link href="#case-proof" className="btn-secondary group">
                  Se hur 2U Assistans gjorde
                </Link>
              </div>
            </div>

            {/* RIGHT — floating 3D hexagon asset */}
            <div className="relative">
              <div className="flex items-center justify-center">
                <Image
                  src="/brand-assets/cropped_3d_hero.png"
                  alt="Elivro — verksamhetssystem med tio funktioner runt en gemensam kärna"
                  width={1200}
                  height={1200}
                  priority
                  className="elv-float h-auto w-full 2xl:w-[122%] 2xl:max-w-none 2xl:-mx-[11%]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TRUST BAND — full-width, paper-card surface, sits inside hero
            section so it anchors above the fold. The section is min-h-screen
            with flex-col, so the trust band naturally pins to the bottom of
            the viewport on the first paint. */}
        <div className="border-t border-line bg-paper-card py-7 shadow-[inset_0_-1px_0_rgba(255,255,255,0.5)]">
          <div className="px-7">
            <div className="grid grid-cols-1 items-center gap-y-5 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(6,minmax(0,1fr))]">
              <div className="flex items-center gap-4 border-line pr-8 lg:border-r">
                <span
                  aria-hidden="true"
                  className="w-[3px] self-stretch min-h-[36px] rounded-sm bg-red"
                />
                <span className="font-display text-[16.5px] font-medium leading-[1.25] tracking-[-0.008em] text-ink">
                  Vi tar betalt för utfall, inte för försök.
                </span>
              </div>

              <TrustItem icon={<AwardIcon />} text="Betala endast vid levererat resultat" />
              <TrustItem icon={<ClipboardIcon />} text="Tillsyns-redo (IVO + Arbetsmiljöverket)" />
              <TrustItem icon={<CpuIcon />} text="Säker AI på svensk infrastruktur" />
              <TrustItem icon={<ShieldIcon />} text="Säkert, stabilt och tillgängligt" />
              <TrustItem icon={<LockIcon />} text="GDPR-säkert byggt för verkligheten" />
              <TrustItem icon={<HeadsetIcon />} text="Personlig support som svarar och förstår" />
            </div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

/* -------------------- Sub-components -------------------- */

function HeroPillar({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode
  label: string
  sub: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-red [&>svg]:h-[22px] [&>svg]:w-[22px]">{icon}</span>
      <span className="mt-1 font-sans text-[14.5px] font-bold tracking-[-0.01em] text-ink">
        {label}
      </span>
      <span className="font-sans text-[13px] leading-[1.42] text-n-600">{sub}</span>
    </div>
  )
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 border-line px-4 lg:border-r lg:last-of-type:border-r-0">
      <span className="text-n-700 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      <div className="text-[12.5px] leading-[1.32] text-n-700 text-balance">{text}</div>
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

function UsersIcon() {
  return (
    <svg {...iconProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="7" />
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <svg {...iconProps}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
    </svg>
  )
}

function CpuIcon() {
  return (
    <svg {...iconProps}>
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
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

function HeadsetIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1zM21 14h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2a1 1 0 0 0 1-1z" />
      <path d="M3 14a9 9 0 1 1 18 0" />
    </svg>
  )
}
