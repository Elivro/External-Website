'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

/**
 * ProofOfLifeMock — replaces the generic dashboard mock with a small
 * card showing the system *acting*, not data sitting still.
 *
 * Coral on "Elivro föreslår" because that's the system speaking
 * (per design-strategi.md § 4.2). The Liv dot is position 3:
 * the dashboard "Realtid · synkat" indicator.
 */
export default function ProofOfLifeMock() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

  return (
    <section
      ref={sectionRef}
      className="w-full bg-ink py-24 md:py-32 relative"
      aria-labelledby="pol-title"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-12">

        <header className="mb-12 max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
            Vad ni faktiskt ser
          </p>
          <h2
            id="pol-title"
            className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.05]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Förslaget <em className="font-serif italic">står där</em> när ni öppnar appen.
          </h2>
        </header>

        <div
          className="relative bg-ink-card border border-edge-strong rounded-obs-lg p-8 md:p-10 shadow-obs-card"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
          }}
        >
          {/* Soft halo behind card */}
          <div
            aria-hidden="true"
            className="absolute -inset-px rounded-obs-lg pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 80% 0%, rgba(255,122,69,0.10), transparent 50%)',
              zIndex: -1,
            }}
          />

          {/* Top status row — Liv position 3 */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-edge">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted">
                Schemavy · vecka 14
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="liv-dot" />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-fg-soft">
                Realtid · synkat
              </span>
            </div>
          </div>

          {/* The proposal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent mb-3">
                Elivro föreslår
              </p>
              <p className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light text-fg leading-[1.15] tracking-[-0.018em] mb-4">
                Byt Anna L. mot Elin S. på torsdagens kvällspass.
              </p>
              <p className="text-fg-soft text-base leading-[1.55]">
                Anna är inbokad på Liljas omläggning samtidigt. Elin har täckt liknande pass
                hos Lilja tidigare och har grön ATL-marginal till nästa vecka.
              </p>

              <div className="mt-6 flex items-center gap-3 flex-wrap">
                <button className="px-4 py-2 text-sm font-sans text-ink bg-accent hover:bg-accent-bright rounded-obs-md transition-colors ease-obsidian duration-obs-sm">
                  Godkänn
                </button>
                <button className="px-4 py-2 text-sm font-sans text-fg bg-ink-lift hover:bg-ink-card border border-edge rounded-obs-md transition-colors ease-obsidian duration-obs-sm">
                  Visa alternativ
                </button>
                <button className="px-4 py-2 text-sm font-sans text-fg-muted hover:text-fg rounded-obs-md transition-colors ease-obsidian duration-obs-sm">
                  Avvisa
                </button>
              </div>
            </div>

            {/* Right column — match reasoning */}
            <aside className="md:border-l md:border-edge md:pl-8">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
                Match-poäng
              </p>
              <p className="font-serif text-[3.5rem] font-light text-fg leading-none tracking-[-0.028em] mb-6">
                94<span className="text-fg-muted text-2xl">%</span>
              </p>

              <ul className="space-y-2.5">
                {[
                  ['Tidigare hos Lilja', '17 pass'],
                  ['ATL-marginal', '12,5 h kvar'],
                  ['Personlighetsmatchning', 'Stark'],
                  ['Geografi', '4 km från brukare'],
                ].map(([label, value]) => (
                  <li key={label} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-fg-muted">{label}</span>
                    <span className="font-mono text-[11px] tracking-[0.04em] text-fg">{value}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {/* Footer note */}
          <p className="mt-8 pt-6 border-t border-edge font-mono text-[10px] tracking-[0.15em] uppercase text-fg-dim">
            Detta förslag står där när Karin loggar in i morse — utan att hon bett om det.
          </p>
        </div>
      </div>
    </section>
  )
}
