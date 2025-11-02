'use client'

import { useState } from 'react'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '🤖',
    title: 'AI-Driven Matching',
    description:
      'Vår AI analyserar kandidatprofiler automatiskt för att hitta bästa matchningen med dina specifika krav.',
  },
  {
    icon: '⚡',
    title: 'Snabb Rekrytering',
    description:
      'Minska rekryteringstiden från veckor till dagar. Automatisera screening och fokusera på intervjuer.',
  },
  {
    icon: '🎯',
    title: 'Perfekt Matchning',
    description:
      'Hitta kandidater som passar både jobbkrav och organisationskultur.',
  },
  {
    icon: '🔒',
    title: 'Säker & Tillförlitlig',
    description:
      'Högsta nivå av datasäkerhet och GDPR-compliance för dina kandidaters data.',
  },
]

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="w-full py-20 sm:py-32 bg-zinc-900 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center mb-16 sm:mb-24 animate-slide-in-up">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">
              Varför välja Elivro?
            </h2>
            <div className="w-full flex justify-center">
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed text-center">
                Vi kombinerar avancerad AI-teknik med ett användarvänligt gränssnitt
                för att revolutionera rekrytering inom assistansbranschen.
              </p>
            </div>
          </div>

        {/* Features Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 justify-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`glass p-10 sm:p-12 rounded-xl transition-all duration-300 cursor-pointer group w-full max-w-sm
                ${
                  hoveredIndex === index
                    ? 'bg-violet-500/10 border-violet-500/50 shadow-lg shadow-violet-500/20'
                    : 'border-slate-800'
                }`}
              style={{
                animation: `slideInUp 0.6s ease-out ${0.1 * index}s both`,
              }}
            >
              {/* Icon */}
              <div className="text-5xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Accent line on hover */}
              <div
                className={`mt-6 h-1 bg-gradient-to-r from-violet-500 to-transparent rounded-full transform origin-left transition-all duration-300 ${
                  hoveredIndex === index ? 'scale-x-100' : 'scale-x-0'
                }`}
              ></div>
            </div>
          ))}
        </div>

          {/* Bottom CTA */}
          <div className="mt-24 sm:mt-32 text-center animate-slide-in-up w-full" style={{ animationDelay: '1s' }}>
            <p className="text-zinc-400 mb-8 text-lg">Redo att förbättra din rekrytering?</p>
            <button className="px-14 py-6 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 text-lg sm:text-xl">
              Starta din kostnadsfria provperiod
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
