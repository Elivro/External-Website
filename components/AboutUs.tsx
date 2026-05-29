'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Founder {
  slug: string
  name: string
  role: string
  shortBio: string
  longBio: string
  photo: string
  /** object-position for the hover-card photo. Defaults to 'center 26%'. */
  photoPosition?: string
}

const FOUNDERS: Founder[] = [
  {
    slug: 'jimmy',
    name: 'Jimmy Södermark',
    role: 'Sälj & verksamhet',
    shortBio: 'Ex-säljchef. Tio månader som personlig assistent.',
    longBio:
      'Tio månader som personlig assistent. Drev tidigare ett säljteam — vet vad som krävs för att en lösning ska användas, inte bara köpas in.',
    photo: '/founders/jimmy.webp',
    // Jimmy's head sits high in his source frame — pin to the top so the
    // square card crop keeps his face, not headroom.
    photoPosition: 'center top',
  },
  {
    slug: 'filiph',
    name: 'Filiph Arverot-Falk',
    role: 'Utveckling & systemarkitektur',
    shortBio: 'Tio år som utvecklare. Säkerhet och tillgänglighet i ryggraden.',
    longBio:
      'Tio år som utvecklare med tunga projekt för det offentliga, i system där säkerhet och tillgänglighet inte är förhandlingsbart. Ansvarar för arkitektur, plattform och integrationer.',
    photo: '/founders/filiph.webp',
  },
  {
    slug: 'daniel',
    name: 'Daniel Nakhost',
    role: 'Kundsupport & utveckling',
    shortBio: 'Expert på kundsupport. Utbildad utvecklare.',
    longBio:
      'År av kundsupport på allvar, med en utbildning i utveckling i ryggen. Vet vad som händer när ett system sviker mitt i ett samtal — och vad som krävs för att det aldrig ska göra det.',
    photo: '/founders/daniel.webp',
  },
]

const GROUP_PHOTO = '/founders/group.webp'

const INTRO =
  'Vi byggde Elivro tillsammans under sex månader. Jimmy har arbetat tio månader som personlig assistent. Filiph har tio år som utvecklare för det offentliga, i system med höga krav på säkerhet och tillgänglighet. Daniel är expert på kundsupport och utbildad utvecklare. Tre olika bakgrunder, samma frustration över systemen vi själva använt.'

type BulletIconKind = 'calendar' | 'building' | 'handshake' | 'shield'

const BULLETS: { title: string; sub: string; icon: BulletIconKind }[] = [
  {
    title: 'Sex månader.',
    sub: 'Byggt parallellt med dagligt arbete som personlig assistent.',
    icon: 'calendar',
  },
  {
    title: 'Sambygget med 2U Assistans',
    sub: 'Västerås största assistansanordnare.',
    icon: 'building',
  },
  {
    title: 'Du pratar med en grundare.',
    sub: 'Inte en supportkö.',
    icon: 'handshake',
  },
  {
    title: 'Säkerhet först',
    sub: 'GDPR i kod, inte i PDF. Stabilt, tillgängligt och ansvarsfullt.',
    icon: 'shield',
  },
]

// Hover-zone + label coordinates as % of the stage. Stage spans the full
// wrap, but .about-stage-img is offset `left: 230px` so the visible photo
// content lives in the right portion. Founder positions L→R inside the
// shifted photo land roughly at: ~35% / 56% / 78% of the stage width.
const ZONES: Record<string, { left: number; width: number; top: number; height: number }> = {
  jimmy: { left: 34, width: 16, top: 18, height: 82 },
  filiph: { left: 51, width: 15, top: 24, height: 76 },
  daniel: { left: 66, width: 16, top: 28, height: 72 },
}

const LABELS: Record<string, { left: number; top: number; align: 'left' | 'center' | 'right' }> = {
  jimmy: { left: 35, top: 7, align: 'left' },
  filiph: { left: 58.5, top: 6, align: 'center' },
  daniel: { left: 78, top: 7, align: 'right' },
}

/**
 * AboutUs — "Tre grundare". Group portrait with hover zones. Tooltip card
 * surfaces a single founder on hover/focus. No default selection so the
 * scene reads as a scene, not a profile-of-Jimmy.
 */
export default function AboutUs() {
  const [active, setActive] = useState<string | null>(null)
  // `displayed` lags `active` so the tooltip's inner content stays
  // rendered through the fade-out animation. `show` is the visibility
  // flag the CSS reads — separating it from `active` lets us drop
  // visibility for ~120ms when switching between founders, so the old
  // card fades out before the new one fades in (sequential crossfade).
  const [displayed, setDisplayed] = useState<Founder | null>(null)
  const [show, setShow] = useState(false)
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Mobile-only founder carousel: one founder at a time below the group
  // photo. The full bio is always shown (no expand affordance).
  const [mobileIdx, setMobileIdx] = useState(0)
  const goMobile = (dir: 1 | -1) => {
    setMobileIdx((i) => (i + dir + FOUNDERS.length) % FOUNDERS.length)
  }

  useEffect(() => {
    if (swapTimer.current) {
      clearTimeout(swapTimer.current)
      swapTimer.current = null
    }

    const target = active ? FOUNDERS.find((f) => f.slug === active) ?? null : null

    if (!target) {
      setShow(false)
      return
    }

    if (!displayed || displayed.slug === target.slug) {
      setDisplayed(target)
      setShow(true)
      return
    }

    setShow(false)
    swapTimer.current = setTimeout(() => {
      setDisplayed(target)
      setShow(true)
      swapTimer.current = null
    }, 120)

    return () => {
      if (swapTimer.current) {
        clearTimeout(swapTimer.current)
        swapTimer.current = null
      }
    }
  }, [active, displayed])

  return (
    <section
      id="about-us"
      aria-labelledby="about-title"
      className="w-full pt-16"
      style={{ backgroundColor: '#d5cbc2' }}
    >
      <div className="about-wrap">
        {/* LEFT — editorial copy */}
        <div className="about-content">
          <span className="about-kicker">Om oss</span>
          <h2 id="about-title" className="about-title">
            Vi byggde det vi själva <em>saknade.</em>
          </h2>
          <p className="about-intro">{INTRO}</p>

          <ul className="about-bullets" aria-label="Vad som präglar bygget">
            {BULLETS.map((b) => (
              <li key={b.title} className="about-bullet">
                <span className="about-bullet-icon" aria-hidden="true">
                  <BulletIcon kind={b.icon} />
                </span>
                <div className="about-bullet-text">
                  <p className="about-bullet-title">{b.title}</p>
                  <p className="about-bullet-sub">{b.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* MIDDLE — group photo + labels + hover zones. Spans the full wrap;
            copy and aside sit on top via z-index. The photo's mask fades the
            left edge so the copy area reads on the section bg. */}
        <div
          className="about-stage"
          data-active={active ?? 'none'}
          onMouseLeave={() => setActive(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setActive(null)
            }
          }}
        >
          <div className="about-stage-img">
            <Image
              src={GROUP_PHOTO}
              alt="Jimmy, Filiph och Daniel — Elivros tre grundare"
              fill
              sizes="(max-width: 1280px) 100vw, (min-width: 1440px) 1800px, 1200px"
              quality={92}
              className="about-stage-img-el"
              priority
            />
          </div>

          {FOUNDERS.map((f) => {
            const label = LABELS[f.slug]
            return (
              <span
                key={`label-${f.slug}`}
                className="about-label"
                data-align={label.align}
                style={{ left: `${label.left}%`, top: `${label.top}%` }}
                aria-hidden="true"
              >
                <span className="about-label-name">{f.name.split(' ')[0]}</span>
                <span className="about-label-role">{f.role}</span>
                <LabelDoodle align={label.align} className="about-label-doodle" />
              </span>
            )
          })}

          {FOUNDERS.map((f) => {
            const z = ZONES[f.slug]
            return (
              <button
                key={`zone-${f.slug}`}
                type="button"
                className="about-zone"
                style={{
                  left: `${z.left}%`,
                  width: `${z.width}%`,
                  top: `${z.top}%`,
                  height: `${z.height}%`,
                }}
                aria-label={`${f.name} — ${f.role}`}
                aria-describedby={active === f.slug ? `about-tip-${f.slug}` : undefined}
                onMouseEnter={() => setActive(f.slug)}
                onFocus={() => setActive(f.slug)}
              />
            )
          })}
        </div>

        {/* RIGHT — hover-controlled aside card */}
        <aside
          className="about-aside"
          data-visible={show ? 'true' : 'false'}
          aria-hidden={!show}
        >
          {displayed && (() => {
            const idx = FOUNDERS.findIndex((f) => f.slug === displayed.slug)
            const seq = String(idx + 1).padStart(2, '0')
            const total = String(FOUNDERS.length).padStart(2, '0')
            const firstName = displayed.name.split(' ')[0]
            return (
              <article id={`about-tip-${displayed.slug}`} className="about-card">
                <header className="about-card-header">
                  <span className="about-card-eyebrow">Om {firstName}</span>
                  <span className="about-card-seq">
                    {seq} <span className="about-card-seq-sep">/</span> {total}
                  </span>
                </header>
                <div className="about-card-photo">
                  <Image
                    src={displayed.photo}
                    alt=""
                    fill
                    sizes="320px"
                    quality={92}
                    className="about-card-photo-el"
                    style={{ objectPosition: displayed.photoPosition ?? 'center 26%' }}
                  />
                </div>
                <div className="about-card-body">
                  <h3 className="about-card-name">{displayed.name}</h3>
                  <p className="about-card-role">{displayed.role}</p>
                  <p className="about-card-bio">{displayed.longBio}</p>
                </div>
              </article>
            )
          })()}
        </aside>
      </div>

      {/* MOBILE founder block — group photo flush to the top of a single
          founder carousel card. Replaces the desktop stage + hover aside on
          small screens. */}
      {(() => {
        const f = FOUNDERS[mobileIdx]
        const seq = String(mobileIdx + 1).padStart(2, '0')
        const total = String(FOUNDERS.length).padStart(2, '0')
        return (
          <div className="about-fm" aria-roledescription="carousel" aria-label="Grundare">
            <div className="about-fm-photo">
              <Image
                src={GROUP_PHOTO}
                alt="Jimmy, Filiph och Daniel — Elivros tre grundare"
                fill
                sizes="100vw"
                quality={92}
                className="about-fm-photo-el"
              />
            </div>

            <article className="about-fm-card" aria-live="polite">
              <header className="about-fm-head">
                <span className="about-fm-eyebrow">Grundare</span>
                <div className="about-fm-nav">
                  <span className="about-fm-seq">
                    {seq} <span className="about-fm-seq-sep">/</span> {total}
                  </span>
                  <button
                    type="button"
                    className="about-fm-arrow"
                    onClick={() => goMobile(-1)}
                    aria-label="Föregående grundare"
                  >
                    <ArrowGlyph dir="left" />
                  </button>
                  <button
                    type="button"
                    className="about-fm-arrow"
                    onClick={() => goMobile(1)}
                    aria-label="Nästa grundare"
                  >
                    <ArrowGlyph dir="right" />
                  </button>
                </div>
              </header>

              <div className="about-fm-body">
                <h3 className="about-fm-name">{f.name}</h3>
                <p className="about-fm-role">{f.role}</p>
                <div className="about-fm-lower">
                  <p className="about-fm-bio">{f.longBio}</p>
                  <div className="about-fm-thumb">
                    <Image
                      src={f.photo}
                      alt=""
                      fill
                      sizes="160px"
                      quality={92}
                      className="about-fm-thumb-el"
                      style={{ objectPosition: f.photoPosition ?? 'center 26%' }}
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        )
      })()}
    </section>
  )
}

function ArrowGlyph({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d={dir === 'left' ? 'M14 6l-6 6 6 6' : 'M10 6l6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* -------------------- Icons -------------------- */
/* 24×24 viewBox, 1.6 stroke, round caps + joins — matches the Hero icon
   set per BK v4 § 6 spec for visual consistency across the page. */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function BulletIcon({ kind }: { kind: BulletIconKind }) {
  switch (kind) {
    case 'calendar':
      // Calendar with a check inside — six months of build
      return (
        <svg {...iconProps}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      )
    case 'building':
      // Building — 2U Assistans as the partner
      return (
        <svg {...iconProps}>
          <path d="M4 21V7l8-4 8 4v14" />
          <path d="M4 21h16" />
          <path d="M9 21v-6h6v6" />
          <path d="M10 11h1M13 11h1M10 8h1M13 8h1" />
        </svg>
      )
    case 'handshake':
      // Handshake — founder-to-customer, not via a supportkö
      return (
        <svg {...iconProps}>
          <path d="M11 17 8 14l-1 1-3-3 4-4 2 2" />
          <path d="m13 17 3-3 1 1 3-3-4-4-2 2" />
          <path d="m11 17 2 2 1-1 2 2" />
          <path d="m11 12 2 2" />
        </svg>
      )
    case 'shield':
      // Shield with a check — security and GDPR baked in
      return (
        <svg {...iconProps}>
          <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
  }
}

/**
 * LabelDoodle — thin line dropping from the name label toward the founder
 * below, ending in a small arrowhead. Center is dead straight. The left
 * and right variants are true mirror images: each curves inward (toward
 * the photo centre) and its arrowhead is angled along the curve's end
 * tangent so the tip points AT the founder, not straight down.
 */
function LabelDoodle({
  align,
  className,
}: {
  align: 'left' | 'center' | 'right'
  className?: string
}) {
  const stroke = 1.3
  if (align === 'center') {
    return (
      <svg viewBox="0 0 14 56" className={className} fill="none" aria-hidden="true">
        <path
          d="M7 2 L7 46"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d="M3 42 L7 50 L11 42"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  const isLeft = align === 'left'
  return (
    <svg viewBox="0 0 40 56" className={className} fill="none" aria-hidden="true">
      {/* Curve sweeps inward toward the photo centre. Left ends pointing
          down-right; right is its mirror, ending down-left. */}
      <path
        d={
          isLeft
            ? 'M 8 2 C 8 18, 26 30, 32 46'
            : 'M 32 2 C 32 18, 14 30, 8 46'
        }
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      {/* Arrowhead barbs splay back from the tip along the curve tangent,
          so the tip points toward the founder. Mirror of each other. */}
      <path
        d={
          isLeft
            ? 'M 34 37 L 32 46 L 25 41'
            : 'M 6 37 L 8 46 L 15 41'
        }
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
