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
}

const FOUNDERS: Founder[] = [
  {
    slug: 'jimmy',
    name: 'Jimmy Södermark',
    role: 'Sälj & verksamhet',
    shortBio: 'Ex-säljchef. Tio månader som personlig assistent.',
    longBio:
      'Tio månader som personlig assistent. Drev tidigare ett säljteam — vet vad som krävs för att en lösning ska användas, inte bara köpas in.',
    photo: '/founders/jimmy.png',
  },
  {
    slug: 'filiph',
    name: 'Filiph Arverot-Falk',
    role: 'Utveckling & systemarkitektur',
    shortBio: 'Tio år som utvecklare. Säkerhet och tillgänglighet i ryggraden.',
    longBio:
      'Tio år som utvecklare med tunga projekt för det offentliga och system där säkerhet och tillgänglighet inte är förhandlingsbart. Ansvarar för arkitektur, plattform, integrationer och att GDPR sitter i koden — inte i en PDF.',
    photo: '/founders/filiph.png',
  },
  {
    slug: 'daniel',
    name: 'Daniel Nakhost',
    role: 'Kundsupport & utveckling',
    shortBio: 'Expert på kundsupport. Utbildad utvecklare.',
    longBio:
      'År av kundsupport på allvar, med en utbildning i utveckling i ryggen. Vet vad som händer när ett system sviker mitt i ett samtal — och vad som krävs för att det aldrig ska göra det.',
    photo: '/founders/daniel.png',
  },
]

const GROUP_PHOTO = '/founders/group.jpg'
const INTRO =
  'Vi byggde Elivro tillsammans under sex månader. Jimmy har arbetat tio månader som personlig assistent. Filiph har tio år som utvecklare för det offentliga, i system med höga krav på säkerhet och tillgänglighet. Daniel är expert på kundsupport och utbildad utvecklare. Tre olika bakgrunder, samma frustration över systemen vi själva använt.'

const BULLETS = [
  'Sex månader. Byggt parallellt med dagligt arbete som personlig assistent.',
  'Sambygget med 2u Assistans — Västerås största assistansanordnare.',
  'Du pratar med en grundare. Inte en supportkö.',
]

// Hover-zone + label coordinates in % of the stage. Photo order L→R is
// Jimmy · Filiph · Daniel. Stage now spans full wrap width (no horizontal
// crop on the image), so coordinates are people-positions in the photo
// roughly: ~28% / 50% / 72%. Fine-tune in browser if the crop changes.
const ZONES: Record<string, { left: number; width: number; top: number; height: number }> = {
  jimmy:  { left: 22, width: 13, top: 22, height: 72 },
  filiph: { left: 43, width: 13, top: 20, height: 74 },
  daniel: { left: 64, width: 13, top: 22, height: 72 },
}

const LABELS: Record<string, { left: number; top: number; align: 'left' | 'center' | 'right' }> = {
  jimmy:  { left: 28, top: 8, align: 'left' },
  filiph: { left: 50, top: 5, align: 'center' },
  daniel: { left: 71, top: 8, align: 'right' },
}

/**
 * AboutUs — "Tre grundare". Group portrait with hover zones; tooltip card
 * surfaces a single founder on hover/focus. No default selection so the
 * scene reads as a scene, not a profile-of-Jimmy.
 */
export default function AboutUs() {
  const [active, setActive] = useState<string | null>(null)
  // `displayed` lags `active` so the tooltip's inner content stays
  // rendered through the fade-out animation. `show` is the visibility
  // flag the CSS reads — separating it from `active` lets us drop
  // visibility for ~200ms when switching between founders, so the old
  // card fades out before the new one fades in (sequential crossfade).
  const [displayed, setDisplayed] = useState<Founder | null>(null)
  const [show, setShow] = useState(false)
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
      className="w-full pt-14 bg-[#c5baa6b3]"
    >
      <div className="about-wrap">
        <div className="about-content">
          <span className="about-kicker">Om oss</span>
          <h2 id="about-title" className="about-title">
            Vi byggde det vi själva <em>saknade.</em>
          </h2>
          <p className="about-intro">{INTRO}</p>

          <ul className="about-bullets">
            {BULLETS.map((b) => (
              <li key={b} className="about-bullet">
                <span className="about-bullet-mark" aria-hidden="true">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

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
              /* Stage column is ~57% of the wrap. Sizes scales with the
                 viewport so high-DPR displays pick a sharper srcset
                 variant (source PNG is 3072px wide — plenty of headroom). */
              sizes="(max-width: 1280px) 100vw, (min-width: 1440px) 1800px, 1200px"
              quality={95}
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
                <ArrowDoodle align={label.align} className="about-label-arrow" />
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

          <p className="about-stage-hint" aria-live="polite">
            <svg
              className="about-stage-hint-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 11V6a2 2 0 1 1 4 0v5" />
              <path d="M13 9V4.5a2 2 0 1 1 4 0V11" />
              <path d="M17 7.5a2 2 0 1 1 4 0V14a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-5.2-3l-3-5.2a2 2 0 0 1 3-2.6L11 11" />
            </svg>
            <span>Hovra över en person för att lära känna oss bättre</span>
          </p>
        </div>

        <aside
          className="about-aside"
          data-visible={show ? 'true' : 'false'}
          aria-hidden={!show}
        >
          {displayed && (() => {
            const idx = FOUNDERS.findIndex((f) => f.slug === displayed.slug)
            const seq = String(idx + 1).padStart(2, '0')
            const total = String(FOUNDERS.length).padStart(2, '0')
            const bioWords = displayed.longBio.split(' ')
            const lead = bioWords.slice(0, 2).join(' ')
            const rest = ' ' + bioWords.slice(2).join(' ')
            return (
              <article id={`about-tip-${displayed.slug}`} className="about-card">
                <div className="about-card-photo">
                  <span className="about-card-seq">№ {seq} / {total}</span>
                  <Image src={displayed.photo} alt="" fill sizes="300px" />
                </div>
                <div className="about-card-divider" />
                <div className="about-card-body">
                  <p className="about-card-role">{displayed.role}</p>
                  <h3 className="about-card-name">{displayed.name}</h3>
                  <p className="about-card-bio">
                    <span className="about-card-lead">{lead}</span>
                    {rest}
                  </p>
                  <p className="about-card-sig">{displayed.name.split(' ')[0]}</p>
                </div>
              </article>
            )
          })()}
        </aside>
      </div>

      <div className="about-mobile-roster" aria-hidden="false">
        {FOUNDERS.map((f) => (
          <div key={`mob-${f.slug}`} className="about-mobile-row">
            <div className="about-mobile-thumb">
              <Image src={f.photo} alt={f.name} fill sizes="64px" className="about-mobile-thumb-el" />
            </div>
            <div>
              <h3 className="about-mobile-name">{f.name}</h3>
              <p className="about-mobile-role">{f.role}</p>
              <p className="about-mobile-bio">{f.shortBio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ArrowDoodle({ align, className }: { align: 'left' | 'center' | 'right'; className?: string }) {
  // Hand-drawn feel: rounded caps/joins, slight S-curve, chevron tip.
  const stroke = 1.6
  if (align === 'center') {
    return (
      <svg viewBox="0 0 28 56" className={className} fill="none" aria-hidden="true">
        <path
          d="M14 3 C 16 16, 12 30, 14 48"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 41 L14 50 L20 41"
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
    <svg viewBox="0 0 56 56" className={className} fill="none" aria-hidden="true">
      <path
        d={
          isLeft
            ? 'M 10 3 C 6 18, 30 30, 46 50'
            : 'M 46 3 C 50 18, 26 30, 10 50'
        }
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={
          isLeft
            ? 'M 36 44 L 46 50 L 44 39'
            : 'M 20 44 L 10 50 L 12 39'
        }
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
