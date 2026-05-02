'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

/**
 * SystemDoesItself — "Vad systemet gör medan ni jobbar."
 *
 * Pure typography, no mockups, no icons. Each line is a system verb in
 * present tense. One italicized word per line — the verb that does the
 * load-bearing work. From positionering.md voice register.
 *
 * Per website-feedback.md § 9 — the missing piece between "what the
 * product contains" and "what the system does on its own."
 */
const VERBS: Array<{ verb: string; rest: string }> = [
  { verb: 'Letar', rest: 'efter konflikter i schemat innan ni hinner märka dem.' },
  { verb: 'Föreslår', rest: 'matchningar baserat på personlighet — inte bara kompetens.' },
  { verb: 'Granskar', rest: 'dokumentation mot beslut och genomförandeplaner — säger till om något inte stämmer.' },
  { verb: 'Märker', rest: 'mönster i er verksamhet ni inte hade tid att leta efter.' },
  { verb: 'Varnar', rest: 'för budgetavvikelser veckor innan de blir ett problem.' },
  { verb: 'Frigör', rest: 'tid till brukaren — den enda tid som faktiskt räknas.' },
]

export default function SystemDoesItself() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

  return (
    <section
      ref={sectionRef}
      className="w-full bg-ink-lift py-24 md:py-32 relative"
      aria-labelledby="sds-title"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">

        <header className="mb-16 md:mb-20">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
            Medan ni jobbar
          </p>
          <h2
            id="sds-title"
            className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.05]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Det systemet <em className="font-serif italic">gör</em> medan ni gör det viktigaste.
          </h2>
        </header>

        <ul className="divide-y divide-edge">
          {VERBS.map(({ verb, rest }, i) => (
            <li
              key={verb}
              className="py-7 md:py-8 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${100 + i * 60}ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${100 + i * 60}ms`,
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted md:w-12 flex-shrink-0 md:text-right">
                0{i + 1}
              </span>
              <p className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-normal text-fg leading-[1.2] tracking-[-0.018em] flex-1">
                <em className="font-serif italic text-accent">{verb}</em>{' '}
                <span className="text-fg-soft font-light">{rest}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
