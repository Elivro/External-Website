'use client'

import { useState } from 'react'
import { UserX, AlertTriangle, FileWarning } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import FadeSection from './FadeSection'
import DemoModal from './DemoModal'

interface PainPoint {
  problem: string
  consequences: string[]
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
}

export default function ProblemSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const painPoints: PainPoint[] = [
    {
      problem: 'Matchning som misslyckas',
      consequences: [
        'Kortare anställningstider när person och roll inte passar',
        'Missnöjda kunder som inte får den kontinuitet de behöver',
        'Rekryteringsprocessen börjar om – igen och igen'
      ],
      icon: UserX
    },
    {
      problem: 'Schemaläggning riskerar att gå över budget och bryta mot avtal',
      consequences: [
        'Budgetöverskridningar som kommer som överraskningar',
        'Risk att bryta mot ATL och kundavtal',
        'Omläggningar som stressar både assistenter och kunder'
      ],
      icon: AlertTriangle
    },
    {
      problem: 'Krångliga system gör det svårt att följa lagar och regler',
      consequences: [
        'Tid som kunde spenderas med kunder går till administration',
        'Risk för granskningar från Inspektionen för vård och omsorg (IVO)',
        'Dokumentation som inte håller måttet när det gäller'
      ],
      icon: FileWarning
    }
  ]

  return (
    <FadeSection>
      <section
        id="problem"
        ref={sectionRef}
        aria-labelledby="problem-title"
        className="w-full bg-zinc-950 py-18 md:py-24 lg:py-32 relative overflow-hidden"
      >
        {/* Background gradient elements - Purple theme */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <header className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
            <h2
              id="problem-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.3s ease-out'
              }}
            >
              Tre utmaningar för assistansföretag idag
            </h2>
          </header>

          {/* Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="
                  group relative overflow-hidden rounded-3xl
                  bg-gradient-to-br from-zinc-800/50 to-zinc-900/50
                  backdrop-blur-sm border border-purple-500/30
                  hover:border-purple-400/50
                  transition-all duration-500 ease-out
                  p-7 md:p-8 lg:p-10
                "
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 0.3s ease-out ${(index + 1) * 150}ms`
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-purple-500/0 to-violet-500/0 group-hover:from-red-500/5 group-hover:via-purple-500/5 group-hover:to-violet-500/5 transition-all duration-500 pointer-events-none" />

                {/* Icon - Content-specific */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <point.icon className="w-12 h-12 text-red-400" strokeWidth={1.5} />
                </div>

                {/* Problem Statement */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 leading-tight">
                  {point.problem}
                </h3>

                {/* Consequences */}
                <ul className="space-y-3">
                  {point.consequences.map((consequence, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-zinc-300 text-sm lg:text-base"
                    >
                      <span className="text-red-400/70 mt-1 flex-shrink-0">→</span>
                      <span className="leading-relaxed">{consequence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className="mt-12 md:mt-16 flex flex-col items-center gap-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.3s ease-out 600ms'
            }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                group inline-flex items-center justify-center gap-2
                px-8 py-4
                bg-gradient-to-r from-purple-600 to-violet-600
                text-white text-lg font-semibold rounded-xl
                shadow-lg shadow-purple-500/40
                hover:shadow-xl hover:shadow-purple-500/60
                transition-all duration-300
                hover:scale-[1.02]
              "
            >
              <span>Boka gratis demo</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <p className="text-sm text-white/60">
              Se hur Elivro löser dessa utmaningar
            </p>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </FadeSection>
  )
}
