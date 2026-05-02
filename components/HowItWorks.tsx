'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-config'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Step {
  number: string
  title: string
  description: string
}

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const headerRef = useRef<HTMLElement>(null)

  const steps: Step[] = [
    {
      number: '01',
      title: 'Ett samtal',
      description:
        'Vi lyssnar på er verksamhets rytm och behov. Inga säljpitcher, inga demos från en mall — vi visar bara hur Elivro kan stödja det ni redan gör.',
    },
    {
      number: '02',
      title: 'Vi formar systemet efter er',
      description:
        'Vi anpassar Elivro till era processer, importerar er data, och bygger en grund som känns naturlig. Ni märker inte att tekniken är där — ni märker att tiden räcker till.',
    },
    {
      number: '03',
      title: 'Ni testar i 30 dagar',
      description:
        'Utbildning som ger trygghet. Aktivering utan stress. 30 dagar att uppleva skillnaden — utan bindningstid, utan risk.',
    },
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useGSAP(() => {
    if (isMobile === null || isMobile === true) return

    if (prefersReducedMotion) {
      gsap.set([headerRef.current], { opacity: 1, y: 0 })
      cardRefs.current.forEach(card => {
        if (card) gsap.set(card, { opacity: 1, y: 0 })
      })
      return
    }

    const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
    const totalCards = cards.length
    if (totalCards === 0 || !cardsContainerRef.current) return

    const scrollDistance = window.innerHeight * (totalCards - 1) * 1.4

    cards.forEach((card, index) => {
      if (index === 0) {
        gsap.set(card, { opacity: 1, y: 0, scale: 1, visibility: 'visible', clearProps: 'transform' })
      } else {
        gsap.set(card, { opacity: 0, y: '15%', scale: 0.98, visibility: 'hidden' })
      }
    })

    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 1, y: 0 })
      gsap.from(headerRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }

    ScrollTrigger.create({
      trigger: cardsContainerRef.current,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: true,
      anticipatePin: 1,
      pinSpacing: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      onLeave: () => {
        const lastCard = cards[totalCards - 1]
        if (lastCard) {
          gsap.set(lastCard, { opacity: 1, scale: 1, y: 0, visibility: 'visible', clearProps: 'transform,force3D' })
        }
      },
      onEnterBack: () => {
        const lastCard = cards[totalCards - 1]
        if (lastCard) {
          gsap.set(lastCard, { opacity: 1, scale: 1, y: 0, visibility: 'visible', force3D: true })
        }
      },
      onUpdate: (self) => {
        const progress = self.progress
        const currentSegment = progress * (totalCards - 1)
        const activeIndex = Math.min(Math.floor(currentSegment), totalCards - 1)
        const segmentProgress = currentSegment - activeIndex

        cards.forEach((card, index) => {
          if (index < activeIndex) {
            gsap.set(card, { opacity: 0, scale: 0.96, y: 0, visibility: 'hidden' })
          } else if (index === activeIndex) {
            if (index === totalCards - 1) {
              gsap.set(card, { opacity: 1, scale: 1, y: 0, visibility: 'visible', force3D: true })
            } else {
              const fadeOutProgress = gsap.utils.clamp(0, 1, (segmentProgress - 0.35) / 0.15)
              const opacity = 1 - fadeOutProgress
              gsap.set(card, {
                opacity,
                scale: 1 - fadeOutProgress * 0.04,
                y: `${fadeOutProgress * -5}%`,
                visibility: opacity > 0.01 ? 'visible' : 'hidden',
                force3D: true,
              })
            }
          } else if (index === activeIndex + 1) {
            const fadeInProgress = gsap.utils.clamp(0, 1, (segmentProgress - 0.5) / 0.15)
            gsap.set(card, {
              opacity: fadeInProgress,
              scale: 0.96 + fadeInProgress * 0.04,
              y: `${(1 - fadeInProgress) * 5}%`,
              visibility: fadeInProgress > 0.01 ? 'visible' : 'hidden',
              force3D: true,
            })
          } else {
            gsap.set(card, { opacity: 0, scale: 0.96, y: '10%', visibility: 'hidden' })
          }
        })
      },
    })
  }, { scope: sectionRef, dependencies: [prefersReducedMotion, isMobile] })

  const renderDesktopLayout = () => (
    <div className="py-24 lg:py-32">
      <header
        ref={headerRef}
        className="text-center mb-16 lg:mb-20 px-6"
        style={{ opacity: prefersReducedMotion ? 1 : undefined }}
      >
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
          Hur det fungerar
        </p>
        <h2
          id="how-it-works-title"
          className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.05]"
        >
          Vägen till ett <em className="font-serif italic">levande</em> system.
        </h2>
        <p className="text-fg-soft text-base mt-4">
          En lugn process som tar 2–4 veckor.
        </p>
      </header>

      <div
        ref={cardsContainerRef}
        className="relative h-[70vh] min-h-[500px] w-full flex flex-col items-center justify-center"
      >
        {steps.map((step, index) => (
          <article
            key={index}
            ref={(el) => { cardRefs.current[index] = el }}
            className="absolute inset-0 will-change-transform"
            style={{
              zIndex: steps.length - index,
              opacity: index === 0 ? 1 : 0,
              visibility: index === 0 ? 'visible' : 'hidden',
            }}
          >
            <div className="h-full w-full flex items-center justify-center px-6">
              <div className="flex items-start gap-8 lg:gap-14 max-w-4xl">
                <div className="flex-shrink-0">
                  <span
                    className="font-serif text-[clamp(4rem,9vw,8rem)] font-light text-fg-dim leading-none tracking-[-0.028em] block"
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    {step.number}
                  </span>
                  <div className="h-px w-12 bg-accent mt-3 ml-1" />
                </div>
                <div className="w-px h-24 lg:h-28 bg-edge-strong flex-shrink-0 self-center" />
                <div className="flex-1 pt-2 max-w-md lg:max-w-lg">
                  <h3 className="font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] font-normal text-fg mb-4 tracking-[-0.018em] leading-[1.15]">
                    {step.title}
                  </h3>
                  <p className="text-fg-soft text-base lg:text-lg leading-[1.55]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )

  const renderMobileLayout = () => (
    <div className="py-20 px-5">
      <header className="text-center mb-12">
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
          Hur det fungerar
        </p>
        <h2
          id="how-it-works-title-mobile"
          className="font-serif text-[clamp(1.75rem,6vw,2.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.1] mb-3"
        >
          Vägen till ett <em className="font-serif italic">levande</em> system.
        </h2>
        <p className="text-fg-soft text-sm">
          En lugn process som tar 2–4 veckor.
        </p>
      </header>

      <div className="space-y-12 max-w-md mx-auto">
        {steps.map((step, index) => (
          <article key={index} className="relative">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0">
                <span className="font-serif text-5xl font-light text-fg-dim leading-none block">
                  {step.number}
                </span>
                <div className="h-px w-8 bg-accent mt-2" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-serif text-xl sm:text-2xl text-fg mb-2 tracking-[-0.018em] leading-[1.2]">
                  {step.title}
                </h3>
                <p className="text-fg-soft text-sm sm:text-base leading-[1.55]">
                  {step.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="how-it-works-title"
      className="relative w-full bg-ink-lift"
    >
      <div className="relative z-10">
        <div className="hidden lg:block">
          {renderDesktopLayout()}
        </div>
        <div className="block lg:hidden">
          {renderMobileLayout()}
        </div>
      </div>
    </section>
  )
}
