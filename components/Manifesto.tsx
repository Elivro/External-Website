'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

/**
 * Manifesto — full-bleed dark editorial moment that carries the strongest
 * single sentence in the copy: building a verksamhetssystem isn't about
 * knowing everything; it's about asking for help where it counts. The 2u
 * attribution that follows turns humility into evidence (we did ask, they
 * answered).
 *
 * Sits between Features (the catalog) and CaseProof (the numbers). The
 * catalog earns the breadth claim; the manifesto earns the *honesty* claim;
 * the case proof earns the *outcome* claim.
 */
export default function Manifesto() {
  const { ref, isVisible } = useIntersectionObserver(0.1)

  return (
    <section
      id="manifesto"
      ref={ref}
      aria-labelledby="manifesto-quote"
      className="w-full bg-ink py-28 md:py-40 relative overflow-hidden"
    >
      {/* Quiet warm halo — same pondus posture as Hero, slightly off-center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 720px 520px at 30% 20%, rgba(220,77,61,0.045), transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 text-center">
        <p
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-muted mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
        >
          Vår övertygelse
        </p>

        <p
          id="manifesto-quote"
          className="font-serif text-[clamp(1.75rem,4vw,3.25rem)] font-light text-fg leading-[1.12] tracking-[-0.022em] mb-10 max-w-3xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition:
              'opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms, transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms',
          }}
        >
          Det viktigaste när man bygger ett verksamhetssystem är inte att kunna
          allt. Det viktigaste är att{' '}
          <em className="font-serif italic text-accent">
            våga fråga om hjälp
          </em>{' '}
          när det behövs.
        </p>

        <p
          className="font-serif text-[clamp(1.125rem,2vw,1.5rem)] font-light text-fg-soft leading-[1.35] tracking-[-0.012em] mb-12 max-w-2xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition:
              'opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 280ms, transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 280ms',
          }}
        >
          Och det vi inte hade koll på? Det har vi fått koll på — tack vare
          feedback från{' '}
          <em className="font-serif italic text-fg">2u Assistans</em>, Västerås
          största assistansanordnare.
        </p>

        <div
          className="inline-flex items-center gap-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 440ms',
          }}
        >
          <span aria-hidden="true" className="block w-6 h-px bg-edge-strong" />
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-fg-muted">
            Elivro
          </span>
          <span aria-hidden="true" className="block w-6 h-px bg-edge-strong" />
        </div>
      </div>
    </section>
  )
}
