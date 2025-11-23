'use client'

import { ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import FadeSection from './FadeSection'

interface Step {
  number: string
  title: string
  description: string
  gradient: string
}

export default function HowItWorks() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

  const steps: Step[] = [
    {
      number: '01',
      title: 'Boka demo',
      description: 'Vi visar hur Elivro fungerar anpassat efter era behov och processer',
      gradient: 'from-purple-400 to-violet-500'
    },
    {
      number: '02',
      title: 'Konfigurera och importera',
      description: 'Vi hjälper er konfigurera systemet och importera befintlig data',
      gradient: 'from-violet-400 to-blue-500'
    },
    {
      number: '03',
      title: 'Gå live',
      description: 'Utbildning av teamet, aktivering av första scheman och tidrapporter. 30 dagars pengarna-tillbaka-garanti',
      gradient: 'from-blue-400 to-teal-500'
    }
  ]

  return (
    <FadeSection>
      <section
        id="how-it-works"
        ref={sectionRef}
        aria-labelledby="how-it-works-title"
        className="w-full bg-zinc-950 py-18 md:py-24 lg:py-32 relative overflow-hidden"
      >
        {/* Background gradient elements - Subtle */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <header className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
            <h2
              id="how-it-works-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.3s ease-out'
              }}
            >
              Hur det fungerar
            </h2>
            <p
              className="text-base md:text-lg text-zinc-400"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease-out 200ms'
              }}
            >
              Från demo till live på 2-4 veckor
            </p>
          </header>

          {/* Steps - Horizontal Layout */}
          <div className="relative">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: `all 0.4s ease-out ${(index + 1) * 150}ms`
                  }}
                >
                  {/* Card */}
                  <div
                    className="
                      group relative overflow-hidden rounded-2xl
                      bg-zinc-900/30
                      backdrop-blur-sm border border-zinc-700/20
                      hover:border-teal-400/40
                      transition-all duration-300 ease-out
                      hover:shadow-lg hover:shadow-teal-500/10
                      hover:-translate-y-1
                      p-8 md:p-10
                      h-full
                      flex flex-col
                    "
                  >
                    {/* Step Number with Gradient */}
                    <div className="relative mb-6">
                      <span
                        className={`text-7xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between steps - Desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-teal-400" strokeWidth={2} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FadeSection>
  )
}
