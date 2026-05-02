'use client'

import { useEffect, useState } from 'react'

/**
 * LiveTicker — "Just nu i Elivro" strip below the hero.
 *
 * The Liv-position-2 expression: a thin mono one-liner that crossfades
 * between system-event samples on a slow 6-8s cycle. The leading
 * Liv-dot breathes (3.2s ease-in-out, opacity 0.55 ↔ 1.0) — disabled
 * under prefers-reduced-motion.
 *
 * Per design-strategi.md, mono is the system's voice. This component is
 * the system citing itself in real time. The strip looks unremarkable on
 * purpose — the discipline of restraint is the whole point.
 *
 * From website-feedback.md priority 1:
 *   "This single element does more for the 'levande' claim than any headline."
 */
const EVENTS = [
  '12:47 — schemakonflikt upptäckt torsdag · ersättare föreslagen',
  '12:51 — match: ny kandidat för brukare i Västerås (94% kompetens)',
  '12:53 — daganteckning saknas · påminnelse skickad till koordinator',
  '12:58 — budgetprognos avviker −2,3% mot mål · värt att titta på',
  '13:02 — kontinuitet: Anders L. har täckt 87% av Liljas pass i 6 mån',
] as const

const CYCLE_MS = 6500

export default function LiveTicker() {
  const [index, setIndex] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % EVENTS.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section
      aria-label="Live system events"
      className="w-full bg-ink border-y border-edge"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex items-center gap-3 py-3 overflow-hidden">

          {/* Liv heartbeat — Liv position 2 */}
          <span aria-hidden="true" className="liv-dot flex-shrink-0" />

          {/* Mono eyebrow label */}
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-fg-muted flex-shrink-0">
            Just nu i Elivro
          </span>

          {/* Vertical hairline separator */}
          <span aria-hidden="true" className="block w-px h-3 bg-edge-strong flex-shrink-0" />

          {/* Crossfading event line */}
          <div className="relative flex-1 h-5 overflow-hidden">
            {EVENTS.map((event, i) => (
              <span
                key={i}
                className="absolute inset-0 font-mono text-[11px] tracking-[0.04em] text-fg-soft whitespace-nowrap overflow-hidden text-ellipsis"
                style={{
                  opacity: i === index ? 1 : 0,
                  transition: reduced ? 'none' : 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                }}
                aria-hidden={i !== index}
              >
                {event}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
