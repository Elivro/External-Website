'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface PhilosophyPillar {
  title: string
  description: string
  emphasis: string
}

export default function Philosophy() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

  const pillars: PhilosophyPillar[] = [
    {
      title: 'AI utan inlärning',
      emphasis: 'inlärning',
      description: 'Inga prompts. Inga rutor med "fråga AI." Inga blinkande sparkles. Vi tar all teknisk komplexitet på vår sida av gränssnittet — det ni möter är resultatet.',
    },
    {
      title: 'Tystnad är en feature',
      emphasis: 'Tystnad',
      description: 'Inga notifikationsbubblor. Inga onboarding-popovers. Levande system ska kännas lugna, inte upptagna. När systemet talar är det för att det har något viktigt att säga.',
    },
    {
      title: 'Specifikt över abstrakt',
      emphasis: 'Specifikt',
      description: '"Schemat upptäcker konflikten på torsdag innan ni hinner" — inte "AI-driven optimering." Tid, namn, siffror. Vi visar — vi påstår inte.',
    },
  ]

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      aria-labelledby="philosophy-title"
      className="w-full bg-ink-lift py-24 md:py-32 relative"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        <header className="mx-auto max-w-3xl mb-16 md:mb-20">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
            Filosofi
          </p>
          <h2
            id="philosophy-title"
            className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.05]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Tre principer som <em className="font-serif italic">vägleder</em> allt vi bygger.
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-edge rounded-obs-lg overflow-hidden">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="bg-ink-card p-8 lg:p-10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80}ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${index * 80}ms`,
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted block mb-6">
                Princip {index + 1}
              </span>

              <h3 className="font-serif text-[1.75rem] font-normal text-fg leading-[1.15] mb-5">
                {pillar.title.split(pillar.emphasis).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <em className="font-serif italic">{pillar.emphasis}</em>
                    )}
                  </span>
                ))}
              </h3>

              <p className="text-fg-soft text-base leading-[1.55]">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
