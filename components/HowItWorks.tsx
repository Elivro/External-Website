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
        className="w-full bg-black py-16 md:py-24 lg:py-32 relative overflow-hidden"
      >
        {/* Background gradient elements - Blue/Teal theme */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <header className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
            <h2
              id="how-it-works-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.3s ease-out'
              }}
            >
              Hur det fungerar
            </h2>
            <p
              className="mt-6 text-lg md:text-xl text-zinc-400"
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: `all 0.3s ease-out ${(index + 1) * 150}ms`
                  }}
                >
                  {/* Card */}
                  <div
                    className="
                      group relative overflow-hidden rounded-3xl
                      bg-gradient-to-br from-zinc-800/50 to-zinc-900/50
                      backdrop-blur-sm border border-teal-500/30
                      hover:border-teal-400/50
                      transition-all duration-500 ease-out
                      p-6 md:p-8 lg:p-10
                      h-full
                    "
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-teal-400/0 to-blue-600/0 group-hover:from-blue-500/5 group-hover:via-teal-400/5 group-hover:to-blue-600/5 transition-all duration-500 pointer-events-none" />

                    {/* Step Number with Gradient */}
                    <div className="relative mb-6">
                      <span
                        className={`text-7xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-300 text-base lg:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between steps - Desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
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
