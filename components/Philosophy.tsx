'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface PhilosophyPillar {
  title: string
  description: string
  icon: string
  iconAlt: string
}

export default function Philosophy() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

  const pillars: PhilosophyPillar[] = [
    {
      title: 'Skapad för kontakt',
      description: 'Vi bygger verktyg som förstärker mänskliga relationer, inte ersätter dem. Varje funktion är designad för att ge mer tid till det som verkligen spelar roll.',
      icon: '/brand-assets/elivro-asset_hands_small-removebg.png',
      iconAlt: 'Två händer som möts - symbol för kontakt och relation'
    },
    {
      title: 'Intuitivt flöde',
      description: 'Ett system som arbetar med dig, inte mot dig. Elegant enkelhet som frigör kapacitet för omsorg istället för administration.',
      icon: '/brand-assets/elivro-asset_floatingballhand_small-removebg.png',
      iconAlt: 'Hand som bär en sfär - symbol för balans och stöd'
    },
    {
      title: 'Bestående stöd',
      description: 'Kvalitet som varar. Vi bygger för långsiktiga relationer och kontinuitet - för dina kunder, dina assistenter och din verksamhet.',
      icon: '/brand-assets/elivro-asset_personabstract_small-removebg.png',
      iconAlt: 'Abstrakt figur - symbol för mänsklig närvaro'
    }
  ]

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      aria-labelledby="philosophy-title"
      className="w-full bg-sage/30 py-20 md:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle organic shape decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sage/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header - Editorial */}
        <header className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          <h2
            id="philosophy-title"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-700 tracking-tight mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.1s'
            }}
          >
            Vår filosofi
          </h2>

          <p
            className="font-mono text-charcoal-500 text-lg tracking-wide max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.2s'
            }}
          >
            Tre principer som vägleder allt vi bygger
          </p>
        </header>

        {/* Philosophy Pillars - Editorial Vignettes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <article
              key={index}
              className="relative text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.5s ease-out ${0.3 + index * 0.1}s`
              }}
            >
              {/* Organic Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 md:w-28 md:h-28 relative rounded-full" style={{ backgroundColor: '#F5F2ED' }}>
                  <Image
                    src={pillar.icon}
                    alt={pillar.iconAlt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title - Serif */}
              <h3 className="font-serif text-xl md:text-2xl text-charcoal-700 mb-4">
                {pillar.title}
              </h3>

              {/* Description - Sans */}
              <p className="text-charcoal-500 leading-relaxed max-w-sm mx-auto">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
