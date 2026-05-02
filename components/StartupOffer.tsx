'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import DemoModal from './DemoModal'

const TOTAL_SLOTS = 5
const FILLED_SLOTS = 1

/**
 * Uppstartskampanj — the page's loudest moment in pondus terms. Drop the
 * card-on-card containment, let display-scale typography carry the call,
 * render the scarcity as a five-slot ruler with mono index numbers above
 * a hairline track. Big italic ember on "flerårig rabatt" is the carrot;
 * the deadline stamp underneath is the quiet temporal pressure.
 */
export default function StartupOffer() {
  const { ref, isVisible } = useIntersectionObserver(0.05)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const remaining = TOTAL_SLOTS - FILLED_SLOTS

  return (
    <>
      <section
        id="startup-offer"
        ref={ref}
        aria-labelledby="startup-offer-title"
        className="w-full bg-ink py-28 md:py-40 relative overflow-hidden border-t border-edge"
      >
        {/* Asymmetric warm halo — slightly louder than other sections */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 880px 620px at 75% 25%, rgba(210,88,68,0.10), transparent 60%), radial-gradient(ellipse 600px 460px at 15% 85%, rgba(210,88,68,0.05), transparent 65%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 text-center">

          {/* Eyebrow pill — stamped notice */}
          <div
            className="inline-flex items-center gap-3 rounded-full border border-edge-strong bg-ink-lift/70 backdrop-blur-[2px] px-4 py-2 mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
              transition:
                'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            <span
              aria-hidden="true"
              className="block w-1.5 h-1.5 rounded-full bg-accent"
              style={{ boxShadow: '0 0 0 3px rgba(210, 88, 68, 0.18)' }}
            />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg">
              Uppstartskampanj 2026 · {remaining} platser kvar
            </span>
          </div>

          {/* Display headline */}
          <h2
            id="startup-offer-title"
            className="font-serif text-fg tracking-[-0.024em] leading-[1.02] mb-8 max-w-4xl mx-auto"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 300,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition:
                'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms',
            }}
          >
            Vill du få{' '}
            <em className="font-serif italic text-accent">flerårig rabatt</em>{' '}
            i utbyte mot feedback?
          </h2>

          {/* Sub copy */}
          <p
            className="text-fg-soft text-lg md:text-xl leading-[1.55] max-w-2xl mx-auto mb-16 md:mb-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition:
                'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 240ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 240ms',
            }}
          >
            Vi söker fyra assistansanordnare som vill vara med och forma
            systemet — och få betydligt lägre pris i flera år.
          </p>

          {/* Slot ruler — five marks on a hairline track */}
          <div
            className="mx-auto max-w-2xl mb-14"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition:
                'opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 360ms, transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 360ms',
            }}
            role="status"
            aria-label={`${remaining} av ${TOTAL_SLOTS} platser kvar`}
          >
            <div className="relative">
              {/* The track */}
              <span
                aria-hidden="true"
                className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-px bg-edge-strong"
              />

              {/* Slots */}
              <ul
                className="relative flex items-center justify-between"
                aria-hidden="true"
              >
                {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
                  const filled = i < FILLED_SLOTS
                  return (
                    <li key={i} className="flex flex-col items-center gap-3">
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={
                          filled
                            ? 'block w-5 h-5 rounded-full bg-accent ring-2 ring-accent/25 ring-offset-2 ring-offset-ink'
                            : 'block w-5 h-5 rounded-full bg-ink border border-accent/50'
                        }
                        style={
                          filled
                            ? { boxShadow: '0 0 16px rgba(210,88,68,0.35)' }
                            : undefined
                        }
                      />
                      <span
                        className={
                          filled
                            ? 'font-mono text-[9px] tracking-[0.2em] uppercase text-accent'
                            : 'font-mono text-[9px] tracking-[0.2em] uppercase text-fg-muted'
                        }
                      >
                        {filled ? 'Tagen' : 'Öppen'}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <p className="mt-8 font-mono text-[11px] tracking-[0.16em] uppercase text-fg-muted">
              {`${FILLED_SLOTS} av ${TOTAL_SLOTS} tagna · ${remaining} platser kvar`}
            </p>
          </div>

          {/* CTA — scaled up half a step from the rest of the site */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition:
                'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 480ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 480ms',
            }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-sans font-medium text-ink bg-accent hover:bg-accent-bright active:bg-accent-deep rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
            >
              Boka 30 minuter
              <ArrowRight
                className="w-4 h-4 transition-transform ease-obsidian duration-obs-sm group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
          </div>

          {/* Deadline stamp — quiet temporal pressure */}
          <div
            className="mt-10 inline-flex items-center gap-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transition:
                'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 600ms',
            }}
          >
            <span aria-hidden="true" className="block w-6 h-px bg-accent/60" />
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-fg-muted">
              Slutar 2026-09-30
            </span>
            <span aria-hidden="true" className="block w-6 h-px bg-accent/60" />
          </div>
        </div>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
