'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-config'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import JourneyCurve from './ui/DelicateCurve'

interface Step {
  number: string
  title: string
  description: string
}

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  // Refs for GSAP targeting (desktop only)
  const sectionRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const headerRef = useRef<HTMLElement>(null)
  const curveRef = useRef<SVGSVGElement>(null)

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

  // Mobile detection - runs once on mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // GSAP Animations - DESKTOP ONLY
  useGSAP(() => {
    // Wait until we know the device type
    if (isMobile === null || isMobile === true) return

    // Skip animations for reduced motion
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

    // Set initial card states - use immediateRender to avoid jump
    cards.forEach((card, index) => {
      if (index === 0) {
        // First card already visible via CSS, just ensure GSAP knows
        gsap.set(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          visibility: 'visible',
          clearProps: 'transform' // Clear any previous transforms
        })
      } else {
        gsap.set(card, {
          opacity: 0,
          y: '15%',
          scale: 0.98,
          visibility: 'hidden'
        })
      }
    })

    // Header entrance (simple, separate trigger)
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
          toggleActions: 'play none none none'
        }
      })
    }

    // SINGLE unified ScrollTrigger for everything
    // No snap - just smooth scrubbing
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
        // Clean exit: ensure last card is perfectly positioned with no transforms
        const lastCard = cards[totalCards - 1]
        if (lastCard) {
          gsap.set(lastCard, {
            opacity: 1,
            scale: 1,
            y: 0,
            visibility: 'visible',
            clearProps: 'transform,force3D'
          })
        }
      },
      onEnterBack: () => {
        // Re-enable animation when scrolling back
        const lastCard = cards[totalCards - 1]
        if (lastCard) {
          gsap.set(lastCard, {
            opacity: 1,
            scale: 1,
            y: 0,
            visibility: 'visible',
            force3D: true
          })
        }
      },
      onUpdate: (self) => {
        const progress = self.progress

        // Calculate which card should be active (0, 1, or 2)
        // Each card gets equal scroll distance
        const segmentSize = 1 / (totalCards - 1) // 0.5 for 3 cards
        const currentSegment = progress * (totalCards - 1) // 0 to 2
        const activeIndex = Math.min(Math.floor(currentSegment), totalCards - 1)
        const segmentProgress = currentSegment - activeIndex // 0 to 1 within segment

        cards.forEach((card, index) => {
          if (index < activeIndex) {
            // Already passed - fully hidden
            gsap.set(card, {
              opacity: 0,
              scale: 0.96,
              y: 0,
              visibility: 'hidden'
            })
          } else if (index === activeIndex) {
            // Current active card
            if (index === totalCards - 1) {
              // Last card stays fully visible
              gsap.set(card, {
                opacity: 1,
                scale: 1,
                y: 0,
                visibility: 'visible',
                force3D: true
              })
            } else {
              // Sequential fade: this card fades out in first half (0 to 0.5)
              // Stays visible 0-0.35, fades 0.35-0.5
              const fadeOutProgress = gsap.utils.clamp(0, 1, (segmentProgress - 0.35) / 0.15)
              const opacity = 1 - fadeOutProgress
              gsap.set(card, {
                opacity: opacity,
                scale: 1 - (fadeOutProgress * 0.04),
                y: `${fadeOutProgress * -5}%`,
                visibility: opacity > 0.01 ? 'visible' : 'hidden',
                force3D: true
              })
            }
          } else if (index === activeIndex + 1) {
            // Next card fades in during second half (0.5 to 1)
            // Fades in 0.5-0.65, stays visible 0.65-1
            const fadeInProgress = gsap.utils.clamp(0, 1, (segmentProgress - 0.5) / 0.15)
            gsap.set(card, {
              opacity: fadeInProgress,
              scale: 0.96 + (fadeInProgress * 0.04),
              y: `${(1 - fadeInProgress) * 5}%`,
              visibility: fadeInProgress > 0.01 ? 'visible' : 'hidden',
              force3D: true
            })
          } else {
            // Future cards - hidden
            gsap.set(card, {
              opacity: 0,
              scale: 0.96,
              y: '10%',
              visibility: 'hidden'
            })
          }
        })

        // Animate curves
        if (curveRef.current) {
          const primaryPath = curveRef.current.querySelector('.journey-path') as SVGPathElement
          const secondaryPath = curveRef.current.querySelector('.journey-path-secondary') as SVGPathElement

          if (primaryPath) {
            const length = primaryPath.getTotalLength()
            gsap.set(primaryPath, {
              strokeDasharray: length,
              strokeDashoffset: length * (1 - progress)
            })
          }

          if (secondaryPath) {
            const length = secondaryPath.getTotalLength()
            const delayedProgress = gsap.utils.clamp(0, 1, progress * 1.1 - 0.1)
            gsap.set(secondaryPath, {
              strokeDasharray: length,
              strokeDashoffset: length * (1 - delayedProgress)
            })
          }
        }
      }
    })

  }, { scope: sectionRef, dependencies: [prefersReducedMotion, isMobile] })

  // Desktop Layout
  const renderDesktopLayout = () => (
    <div className="py-20 lg:py-28">
      <header
        ref={headerRef}
        className="text-center mb-16 lg:mb-20 px-6"
        style={{ opacity: prefersReducedMotion ? 1 : undefined }}
      >
        <p className="font-mono text-charcoal-light text-sm tracking-wider uppercase mb-4">
          Hur det fungerar
        </p>
        <h2
          id="how-it-works-title"
          className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-charcoal-dark tracking-tight leading-[1.1]"
        >
          Vägen till värdigt arbete
        </h2>
        <p className="font-mono text-charcoal/55 text-sm tracking-wide mt-4">
          En omtänksam process som tar 2–4 veckor
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
              // Set initial visibility via inline style to prevent jump before GSAP
              opacity: index === 0 ? 1 : 0,
              visibility: index === 0 ? 'visible' : 'hidden'
            }}
          >
            <div className="h-full w-full flex items-center justify-center px-6">
              <div className="flex items-start gap-8 lg:gap-14">
                <div className="flex-shrink-0">
                  <span
                    className="font-serif text-[6rem] lg:text-[8rem] text-sage/50 leading-none tracking-tighter block"
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    {step.number}
                  </span>
                  <div className="h-1 w-12 bg-terracotta/40 mt-2 ml-1 rounded-full" />
                </div>
                <div className="w-px h-24 lg:h-28 bg-gradient-to-b from-transparent via-charcoal/12 to-transparent flex-shrink-0 self-center" />
                <div className="flex-1 pt-2 max-w-md lg:max-w-lg">
                  <h3 className="font-serif text-2xl lg:text-[2.25rem] text-charcoal-dark mb-3 tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-charcoal/60 text-base lg:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}

        <JourneyCurve
          ref={curveRef}
          className="absolute inset-x-0 h-24 pointer-events-none z-0"
          style={{ bottom: '50px' }}
        />
      </div>
    </div>
  )

  // Mobile Layout - Pure CSS, no GSAP
  const renderMobileLayout = () => (
    <div className="py-16 px-5">
      <header className="text-center mb-12">
        <p className="font-mono text-charcoal-light text-xs tracking-wider uppercase mb-3">
          Hur det fungerar
        </p>
        <h2
          id="how-it-works-title-mobile"
          className="font-serif text-3xl sm:text-4xl text-charcoal-dark tracking-tight leading-tight mb-3"
        >
          Vägen till värdigt arbete
        </h2>
        <p className="font-mono text-charcoal/55 text-sm tracking-wide">
          En omtänksam process som tar 2–4 veckor
        </p>
      </header>

      <div className="space-y-10 max-w-md mx-auto">
        {steps.map((step, index) => (
          <article key={index} className="relative">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0">
                <span className="font-serif text-5xl text-sage/70 leading-none tracking-tight block">
                  {step.number}
                </span>
                <div className="h-[2px] w-8 bg-terracotta/50 mt-2 rounded-full" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal-dark mb-2 tracking-tight leading-tight">
                  {step.title}
                </h3>
                <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed">
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
      className="relative w-full bg-cream"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-sage/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-terracotta/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Content - CSS media queries for layout */}
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
