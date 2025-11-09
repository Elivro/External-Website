'use client'

import { useRef, useEffect, useState } from 'react'
import FadeSection from './FadeSection'

interface Pillar {
  title: string
  headline: string
  benefits: string[]
  icon: string
}

export default function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const pillars: Pillar[] = [
    {
      title: 'Rekrytera rätt',
      headline: 'Matchning som bygger relationer',
      benefits: [
        'AI matchar på personkemi, inte bara CV',
        'Längre anställningstid när matchningen är rätt',
        'Djupare förståelse för kundens behov över tid'
      ],
      icon: '👥'
    },
    {
      title: 'Schemalägg smart',
      headline: 'Kontinuitet som skapar trygghet',
      benefits: [
        'Real-time budgetöversikt – inga överraskningar',
        'Se omedelbart om schema följer avtal och ATL',
        'Stabilt schema = samma assistenter = tryggare kunder'
      ],
      icon: '📅'
    },
    {
      title: 'Rapportera enkelt',
      headline: 'Automation som frigör tid för omsorg',
      benefits: [
        'Mindre administration = mer tid med kunden',
        'Assistenter mentalt närvarande, inte stressade',
        'Transparent dokumentation skapar förtroende'
      ],
      icon: '📊'
    }
  ]

  return (
    <FadeSection>
      <section
        id="three-pillars"
        ref={sectionRef}
        aria-labelledby="features-title"
        className="w-full bg-black py-20 md:py-32 relative overflow-hidden"
      >
        {/* Background gradient elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header - CONDENSED */}
          <header className="mx-auto max-w-3xl text-center mb-16">
            <h2
              id="features-title"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease-out'
              }}
            >
              Tre pelare för bättre assistans
            </h2>
          </header>

          {/* Bento Grid - Mixed Sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`
                  group relative overflow-hidden rounded-3xl
                  bg-gradient-to-br from-zinc-800/50 to-zinc-900/50
                  backdrop-blur-sm border border-zinc-700/30
                  hover:border-purple-500/50
                  transition-all duration-500 ease-out
                  p-8 lg:p-10
                  ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 0.8s ease-out ${(index + 1) * 150}ms`
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-violet-500/0 to-purple-600/0 group-hover:from-purple-500/5 group-hover:via-violet-500/5 group-hover:to-purple-600/5 transition-all duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
                  {pillar.title}
                </h3>

                {/* Headline */}
                <p className="text-lg text-purple-300 mb-6 font-medium">
                  {pillar.headline}
                </p>

                {/* Benefits - Bullets */}
                <ul className="space-y-3">
                  {pillar.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-zinc-300 text-sm lg:text-base"
                    >
                      <span className="text-purple-400 mt-1 flex-shrink-0">✓</span>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeSection>
  )
}
