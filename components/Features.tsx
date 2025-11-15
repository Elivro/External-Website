'use client'

import { useState } from 'react'
import { ArrowRight, Users, CalendarCheck, FileText } from 'lucide-react'
import { scrollToSection } from '@/lib/scroll-utils'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import FadeSection from './FadeSection'
import DemoModal from './DemoModal'

interface Pillar {
  title: string
  headline: string
  benefits: string[]
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
}

export default function Features() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pillars: Pillar[] = [
    {
      title: 'Lättare rekrytering',
      headline: 'Matchning som bygger relationer',
      benefits: [
        'Intelligent matchning på personkemi, inte bara CV',
        'Längre anställningstid när matchningen är rätt',
        'Djupare förståelse för kundens behov över tid'
      ],
      icon: Users
    },
    {
      title: 'Snabbare schemaläggning',
      headline: 'Kontinuitet som skapar trygghet',
      benefits: [
        'Real-time budgetöversikt – inga överraskningar',
        'Se omedelbart om schema följer avtal och ATL',
        'Stabilt schema = samma assistenter = tryggare kunder'
      ],
      icon: CalendarCheck
    },
    {
      title: 'Enklare rapportering',
      headline: 'Automation som frigör tid för omsorg',
      benefits: [
        'Mindre administration = mer tid med kunden',
        'Assistenter mentalt närvarande, inte stressade',
        'Transparent dokumentation skapar förtroende'
      ],
      icon: FileText
    }
  ]

  return (
    <FadeSection>
      <section
        id="three-pillars"
        ref={sectionRef}
        aria-labelledby="features-title"
        className="w-full bg-black py-16 md:py-24 lg:py-32 relative overflow-hidden"
      >
        {/* Background gradient elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header - CONDENSED */}
          <header className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
            <h2
              id="features-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.3s ease-out'
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
                  p-6 md:p-8 lg:p-10
                  ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 0.3s ease-out ${(index + 1) * 150}ms`
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-violet-500/0 to-purple-600/0 group-hover:from-purple-500/5 group-hover:via-violet-500/5 group-hover:to-purple-600/5 transition-all duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <pillar.icon className="w-14 h-14 text-violet-400" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
                  {pillar.title}
                </h3>

                {/* Headline */}
                <p className="text-lg text-purple-200 mb-6 font-medium">
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

          {/* Centralized CTA Button */}
          <div
            className="mt-10 md:mt-16 lg:mt-20 flex justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out 600ms'
            }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                group relative px-8 py-4
                bg-gradient-to-r from-violet-600 to-purple-600
                text-white text-lg font-semibold rounded-xl
                shadow-lg shadow-violet-500/40
                hover:shadow-xl hover:shadow-violet-500/60
                transition-all duration-300
                hover:scale-[1.02]
                flex items-center gap-3
              "
            >
              <span>Boka gratis demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </FadeSection>
  )
}
