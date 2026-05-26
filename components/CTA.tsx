'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import DemoModal from './DemoModal'

const REASSURANCE = [
  'Ingen kostnad',
  'Svar inom 24h',
  '30 dagars test',
] as const

export default function CTA() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.15)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section
        id="cta-section"
        ref={sectionRef}
        className="relative w-full bg-ink overflow-hidden pt-28 pb-24 md:pt-36 md:pb-28"
      >
        {/* Halo — soft warm atmosphere cradling the headline. Single radial,
            no hard edges, no opaque cap. The bead-arrival bloom (below) is
            what carries the "arrived at" emotion now — a darkness-to-warmth
            cut would fight it. */}
        <div aria-hidden="true" className="cta-halo" />

        {/* Bloom — driven by ScrollThread's `--thread-arrival` CSS var. As the
            bead approaches the closing italic, this layer fades in: the system
            arrives, settling its warmth into the spread. */}
        <div aria-hidden="true" className="cta-halo-bloom" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">

          <p
            className="font-mono text-accent text-[11px] tracking-[0.2em] uppercase mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Låt oss börja samtalet
          </p>

          <h2
            className="font-serif font-light text-fg leading-[1.05] tracking-[-0.025em] text-[clamp(2.25rem,5.6vw,4.25rem)]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition:
                'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms',
            }}
          >
            Omsorg är ett hantverk.
            <br />
            <em
              className="font-serif italic"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition:
                  'opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 480ms, transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 480ms',
                display: 'inline-block',
              }}
            >
              Era verktyg borde också vara det.
            </em>
          </h2>

          <p
            className="text-fg-soft text-lg md:text-xl leading-[1.55] max-w-2xl mx-auto mt-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition:
                'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 320ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 320ms',
            }}
          >
            Ett samtal om er verksamhet, era utmaningar, och hur omsorgen kan
            organiseras vackrare. Ingen demo-mall — bara äkta dialog.
          </p>

          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition:
                'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 440ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 440ms',
            }}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-halo group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-sans font-medium text-ink bg-accent hover:bg-accent-bright active:bg-accent-deep rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
            >
              Boka demo
              <ArrowRight
                className="w-4 h-4 transition-transform ease-obsidian duration-obs-sm group-hover:translate-x-0.5"
                strokeWidth={1.6}
              />
            </button>

            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-sans font-medium text-fg bg-transparent border border-edge-strong hover:border-fg-muted hover:bg-ink-lift rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
            >
              Gör testet på 2 min
            </Link>
          </div>

          <ul
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-fg-muted text-[13px]"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 600ms',
            }}
          >
            {REASSURANCE.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="text-accent">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

        </div>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
