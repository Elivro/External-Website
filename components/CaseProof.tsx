'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Kpi {
  number: React.ReactNode
  label: React.ReactNode
}

const KPIS: Kpi[] = [
  {
    number: <>548</>,
    label: 'ansökningar in',
  },
  {
    number: <>5</>,
    label: (
      <>
        anställda · exakt de <em className="font-serif italic">AI:n föreslog</em>
      </>
    ),
  },
  {
    number: <>4&thinsp;475</>,
    label: 'produktuppdateringar på tio månader',
  },
]

const META = [
  { value: '60', unit: 'kunder' },
  { value: '215', unit: 'anställda' },
  { value: '100 MSEK', unit: 'omsättning' },
]

/**
 * Case proof — editorial centered layout inspired by the light mockup, in
 * dark Obsidian. Header → quote card → KPI strip (naked numbers separated by
 * vertical hairlines, no per-tile box) → meta strip. Pondus: numbers stand
 * on their own; the rule between them is the only structure they need.
 */
export default function CaseProof() {
  const { ref, isVisible } = useIntersectionObserver(0.05)

  return (
    <section
      id="case-proof"
      ref={ref}
      aria-labelledby="case-proof-title"
      className="w-full bg-ink py-24 md:py-32 relative border-t border-edge"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header — centered editorial */}
        <header className="text-center mb-12 md:mb-16">
          <p
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-muted mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Case · 2U Assistans · Västerås
          </p>
          <h2
            id="case-proof-title"
            className="font-serif text-fg tracking-[-0.022em] leading-[1.05] mx-auto max-w-3xl"
            style={{
              fontSize: 'clamp(2rem, 4.2vw, 3.25rem)',
              fontWeight: 600,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition:
                'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms',
            }}
          >
            Tio månader inifrån. Vi byggde{' '}
            <em className="font-serif italic">med kundansvariga.</em>
          </h2>
        </header>

        {/* Pull-quote — centered card */}
        <figure
          className="relative bg-ink-card border border-edge rounded-obs-lg px-7 py-12 md:px-14 md:py-16 mx-auto max-w-3xl mb-20 md:mb-24"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition:
              'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
          }}
        >
          <blockquote
            className="font-serif text-fg leading-[1.25] tracking-[-0.012em] text-center"
            style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.875rem)', fontWeight: 300 }}
          >
            <span aria-hidden="true" className="text-fg-muted">&ldquo;</span>
            Ett modernt system med snabb support och en lösning som verkligen{' '}
            <em className="font-serif italic">levererar</em> för verksamheten.
            <span aria-hidden="true" className="text-fg-muted">&rdquo;</span>
          </blockquote>

          <figcaption className="mt-10 pt-8 border-t border-edge flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-ink-lift border border-edge font-serif text-fg leading-none"
              style={{ fontSize: '0.9375rem', fontWeight: 500 }}
            >
              2U
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-muted">
              Susanne Pettersson · Arbetsmiljöansvarig · 2U Assistans
            </span>
          </figcaption>
        </figure>

        {/* KPI strip — naked numbers, vertical hairlines between, top+bottom rule */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-3 border-y border-edge divide-y sm:divide-y-0 sm:divide-x divide-edge"
          aria-label="Resultat efter tio månaders samarbete med 2U Assistans"
        >
          {KPIS.map((kpi, i) => (
            <li
              key={i}
              className="px-6 py-10 md:px-8 md:py-14 text-center flex flex-col items-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) ${320 + i * 90}ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) ${320 + i * 90}ms`,
              }}
            >
              <span
                className="font-italic not-italic text-fg leading-[1] tracking-[-0.04em] mb-6"
                style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)', fontWeight: 400 }}
              >
                {kpi.number}
              </span>
              <span className="font-sans text-[15px] text-fg-soft leading-[1.5] max-w-[18rem]">
                {kpi.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Meta strip — centered, bullet-dot separators */}
        <div
          className="mt-14 md:mt-16 flex items-center justify-center flex-wrap gap-x-7 gap-y-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
            transition:
              'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 720ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 720ms',
          }}
        >
          {META.map((m, i) => (
            <span key={m.unit} className="inline-flex items-center gap-2 text-fg-soft">
              <span
                className="font-italic not-italic text-fg leading-none tracking-[-0.012em]"
                style={{ fontSize: '1.0625rem', fontWeight: 600 }}
              >
                {m.value}
              </span>
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-muted">
                {m.unit}
              </span>
              {i < META.length - 1 && (
                <span aria-hidden="true" className="block w-1 h-1 rounded-full bg-edge-strong ml-5" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
