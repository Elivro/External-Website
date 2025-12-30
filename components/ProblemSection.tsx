'use client'

import { UserX, AlertTriangle, FileWarning } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import FadeSection from './FadeSection'

interface PainPoint {
  problem: string
  consequences: string[]
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
}

export default function ProblemSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

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
      problem: 'Schemaläggning som riskerar budget och avtal',
      consequences: [
        'Budgetöverskridningar som kommer som överraskningar',
        'Risk att bryta mot ATL och kundavtal',
        'Omläggningar som stressar assistenter och kunder'
      ],
      icon: AlertTriangle
    },
    {
      problem: 'System som försvårar regelefterlevnad',
      consequences: [
        'Tid som kunde gå till kunder går till administration',
        'Risk för granskningar från IVO',
        'Dokumentation som inte håller måttet'
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
        className="w-full bg-surface-base py-20 md:py-28 lg:py-32 relative overflow-hidden"
      >
        {/* Subtle top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <header className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
            <h2
              id="problem-title"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.25s ease-out'
              }}
            >
              Tre utmaningar för assistansföretag
            </h2>
          </header>

          {/* Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="relative group bg-surface-card border border-border-subtle hover:border-status-urgent/40 rounded-lg p-6 lg:p-8 transition-all duration-150"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.25s ease-out ${index * 75}ms`
                }}
              >
                {/* Status bar - urgent/red */}
                <div className="absolute left-0 top-0 w-1 h-full bg-status-urgent/60 rounded-l-lg" />

                {/* Icon */}
                <div className="mb-5">
                  <point.icon className="w-10 h-10 text-status-urgent/80" strokeWidth={1.5} />
                </div>

                {/* Problem Statement */}
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 leading-tight">
                  {point.problem}
                </h3>

                {/* Consequences */}
                <ul className="space-y-2.5">
                  {point.consequences.map((consequence, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-zinc-400 text-sm"
                    >
                      <span className="text-status-urgent/50 mt-0.5 flex-shrink-0">→</span>
                      <span className="leading-relaxed">{consequence}</span>
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
