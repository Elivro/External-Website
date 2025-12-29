'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Step {
  number: string
  title: string
  description: string
}

export default function HowItWorks() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

  const steps: Step[] = [
    {
      number: '01',
      title: 'Utforska tillsammans',
      description: 'Vi lyssnar på er verksamhets rytm och behov. Sedan visar vi hur Elivro kan stödja ert arbete – inte tvinga in er i en mall.'
    },
    {
      number: '02',
      title: 'Forma systemet efter er',
      description: 'Vi hjälper er anpassa Elivro till era processer. Importerar befintlig data med omsorg. Bygger en grund som känns naturlig.'
    },
    {
      number: '03',
      title: 'Låt arbetet blomma',
      description: 'Utbildning som ger trygghet. Aktivering utan stress. Och 30 dagar att uppleva skillnaden – utan risk.'
    }
  ]

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="how-it-works-title"
      className="w-full bg-cream-200/50 py-20 md:py-28 lg:py-32 relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header - Editorial */}
        <header className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          {/* Accent line */}
          <div
            className="mx-auto w-16 h-0.5 bg-terracotta mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'all 0.5s ease-out'
            }}
          />

          <h2
            id="how-it-works-title"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-700 tracking-tight mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.1s'
            }}
          >
            Vägen till värdigt arbete
          </h2>

          <p
            className="font-mono text-charcoal-500 text-lg tracking-wide"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.2s'
            }}
          >
            En omtänksam process som tar 2–4 veckor
          </p>
        </header>

        {/* Steps - Editorial Timeline */}
        <div className="relative">
          {/* Connecting line - Desktop only */}
          <div
            className="hidden lg:block absolute top-24 left-[16.666%] right-[16.666%] h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, var(--sage) 10%, var(--sage) 90%, transparent 100%)',
              opacity: isVisible ? 0.4 : 0,
              transition: 'opacity 0.8s ease-out 0.5s'
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <article
                key={index}
                className="relative text-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `all 0.5s ease-out ${0.3 + index * 0.15}s`
                }}
              >
                {/* Step Number - Large Serif */}
                <div className="mb-6">
                  <span className="font-serif text-6xl md:text-7xl lg:text-8xl text-terracotta/20">
                    {step.number}
                  </span>
                </div>

                {/* Title - Serif */}
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal-700 mb-4">
                  {step.title}
                </h3>

                {/* Description - Sans */}
                <p className="text-charcoal-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
