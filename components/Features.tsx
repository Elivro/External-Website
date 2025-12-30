'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import DemoModal from './DemoModal'

interface Pillar {
  title: string
  headline: string
  benefits: string[]
  accent: string
}

export default function Features() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pillars: Pillar[] = [
    {
      title: 'Rekrytering',
      headline: 'När rätt person möter rätt uppdrag',
      benefits: [
        'Intelligens som förstår nyans, inte bara checkboxar',
        'Assistenter som blommar i rätt kontext',
        'Kontinuitet som bygger förtroende över tid'
      ],
      accent: 'bg-terracotta'
    },
    {
      title: 'Kvalitetsledning',
      headline: 'Värdighet i varje detalj',
      benefits: [
        'Dokumentation som stödjer reflektion, inte bara efterlevnad',
        'Tydlighet som skapar förtroende mellan alla parter',
        'Mental energi frigörs från pappersarbete till personkontakt'
      ],
      accent: 'bg-sage-500'
    },
    {
      title: 'Schemaläggning',
      headline: 'Förutsägbarhet som frigör',
      benefits: [
        'Real-time klarhet – budget, avtal, ATL innan du sparar',
        'Stabilitet som gör att relationer får tid att växa',
        'Trygghet för kunder som vet vem som kommer'
      ],
      accent: 'bg-charcoal-400'
    }
  ]

  return (
    <>
      <section
        id="three-pillars"
        ref={sectionRef}
        aria-labelledby="features-title"
        className="w-full bg-cream py-20 md:py-28 lg:py-32 relative overflow-hidden"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header - Editorial */}
          <header className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
            <h2
              id="features-title"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-700 tracking-tight mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.5s ease-out 0.1s'
              }}
            >
              Tre dimensioner av skickligt omsorgsarbete
            </h2>

            <p
              className="font-mono text-charcoal-500 text-lg tracking-wide max-w-2xl mx-auto"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.5s ease-out 0.2s'
              }}
            >
              Där precision möter mänsklighet – verktygen som ger rum för omsorg
            </p>
          </header>

          {/* Pillars - Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="relative bg-cream-50 border border-charcoal/10 rounded-sm p-8 lg:p-10 transition-all duration-300 hover:border-charcoal/20 hover:shadow-md group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `all 0.5s ease-out ${0.3 + index * 0.1}s`
                }}
              >
                {/* Accent line - top */}
                <div className={`absolute top-0 left-8 right-8 h-0.5 ${pillar.accent} rounded-full`} />

                {/* Number - Editorial style */}
                <span className="font-mono text-sm text-charcoal-400 tracking-wider mb-4 block">
                  0{index + 1}
                </span>

                {/* Title - Serif */}
                <h3 className="font-serif text-2xl lg:text-3xl text-charcoal-700 mb-3">
                  {pillar.title}
                </h3>

                {/* Headline - Mono subhead */}
                <p className="font-mono text-sm text-terracotta tracking-wide mb-6">
                  {pillar.headline}
                </p>

                {/* Benefits */}
                <ul className="space-y-3">
                  {pillar.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-charcoal-500 text-sm leading-relaxed"
                    >
                      <span className="text-sage-500 mt-1 flex-shrink-0 text-xs">●</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className="mt-16 md:mt-20 flex justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.6s'
            }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 text-base font-mono font-medium text-cream-50 bg-terracotta hover:bg-terracotta-600 rounded-sm transition-all duration-200 shadow-terracotta hover:shadow-terracotta-lg"
            >
              <span>Låt oss visa hur det fungerar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
