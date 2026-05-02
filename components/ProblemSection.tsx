'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface PainPoint {
  problem: string
  consequences: string[]
}

export default function ProblemSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

  const painPoints: PainPoint[] = [
    {
      problem: 'Matchning som missar',
      consequences: [
        'Kortare anställningstider när person och uppdrag inte passar',
        'Brukare som inte får den kontinuitet de behöver',
        'Rekryteringsprocessen börjar om — igen',
      ],
    },
    {
      problem: 'Schemat som äter budget',
      consequences: [
        'Budgetöverskridanden som kommer som överraskningar',
        'Risk att bryta mot ATL eller kundavtal',
        'Omläggningar som stressar både assistenter och brukare',
      ],
    },
    {
      problem: 'System som försvårar regelefterlevnad',
      consequences: [
        'Tid som skulle gått till brukare går till administration',
        'Risk för IVO-granskning på grund av luckor i dokumentationen',
        'Beslut och genomförandeplaner som inte stämmer överens',
      ],
    },
  ]

  return (
    <section
      id="problem"
      ref={sectionRef}
      aria-labelledby="problem-title"
      className="w-full bg-ink py-24 md:py-32 relative"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        <header className="mx-auto max-w-3xl mb-16 md:mb-20">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
            Vad ni känner igen
          </p>
          <h2
            id="problem-title"
            className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.05]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Tre saker som <em className="font-serif italic">stjäl tid</em> från det som faktiskt betyder något.
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {painPoints.map((point, index) => (
            <article
              key={index}
              className="relative bg-ink-lift border border-edge rounded-obs-lg p-8 lg:p-10 transition-colors ease-obsidian duration-obs-sm hover:border-edge-strong"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80}ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80}ms, border-color 200ms cubic-bezier(0.2, 0.7, 0.2, 1)`,
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted block mb-4">
                0{index + 1}
              </span>

              <h3 className="font-serif text-2xl font-normal text-fg leading-[1.2] mb-6">
                {point.problem}
              </h3>

              <ul className="space-y-3">
                {point.consequences.map((consequence, i) => (
                  <li key={i} className="text-fg-soft text-sm leading-[1.55] pl-4 relative">
                    <span aria-hidden="true" className="absolute left-0 top-[0.6em] w-2 h-px bg-fg-muted" />
                    {consequence}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
