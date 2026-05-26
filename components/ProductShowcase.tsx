'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Tool {
  key: string
  category: string
  heading: React.ReactNode
  body: string
  image: { src: string; alt: string; width: number; height: number }
}

const TOOLS: Tool[] = [
  {
    key: 'rekrytering',
    category: 'Rekrytering',
    heading: (
      <>
        Matchning som <em className="font-serif italic">lär sig</em> vad som funkar.
      </>
    ),
    body:
      'Personlighet, värderingar, kompetens och kontinuitet — vägt över tid. Modellen lär sig av era egna utfall, inte av branschsnitt.',
    image: {
      src: '/marketing-screenshots/desktop-candidates.png',
      alt: 'Elivros rekryteringsvy — kandidater rangordnade efter matchning mot kund',
      width: 1300,
      height: 1020,
    },
  },
  {
    key: 'schemalaggning',
    category: 'Schema & Bemanning',
    heading: (
      <>
        Budget och ATL i <em className="font-serif italic">realtid</em>.
      </>
    ),
    body:
      'Se konflikter innan de uppstår. Anställningsgrader, vila och kundfördelning — allt i en vy som känns naturlig.',
    image: {
      src: '/marketing-screenshots/desktop-schedule.png',
      alt: 'Elivros schemaläggningsvy — budget och ATL i realtid',
      width: 1273,
      height: 943,
    },
  },
  {
    key: 'tidredovisning',
    category: 'Tid, Lön & FK',
    heading: (
      <>
        Tre swipes från start till <em className="font-serif italic">lön</em>.
      </>
    ),
    body:
      'Mobil tidrapport, BankID-attesterad. Närvarointyg, attestering och FK-fakturering följer av sig själv.',
    image: {
      src: '/marketing-screenshots/desktop-tidredovisning.png',
      alt: 'Elivros tidredovisningsvy — BankID-attesterad mobil tidrapport',
      width: 1302,
      height: 976,
    },
  },
  {
    key: 'kvalitetsledning',
    category: 'Kvalitet & Compliance',
    heading: (
      <>
        Regelefterlevnad som <em className="font-serif italic">följer</em> arbetet.
      </>
    ),
    body:
      'Genomförandeplaner, daganteckningar, Lex Sarah och IVO-granskningsberedskap — kopplat till samma data som schemat och tidrapporten.',
    image: {
      src: '/marketing-screenshots/desktop-qms.png',
      alt: 'Elivros kvalitetsledningsvy — genomförandeplaner och IVO-beredskap',
      width: 1295,
      height: 670,
    },
  },
]

const ROTATE_MS = 8000

export default function ProductShowcase() {
  const { ref, isVisible } = useIntersectionObserver(0.1)
  const [activeIndex, setActiveIndex] = useState(0)
  const [userInteracted, setUserInteracted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!isVisible || userInteracted || reducedMotion) return
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TOOLS.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [isVisible, userInteracted, reducedMotion])

  const go = (next: number) => {
    setUserInteracted(true)
    setActiveIndex((next + TOOLS.length) % TOOLS.length)
  }

  const active = TOOLS[activeIndex]

  return (
    <section
      id="product"
      ref={ref}
      aria-labelledby="product-title"
      className="w-full bg-ink py-24 md:py-32 relative"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <header className="max-w-3xl mb-14 md:mb-16">
          <p
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Produkten
          </p>
          <h2
            id="product-title"
            className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-fg tracking-[-0.021em] leading-[1.05]"
            style={{
              fontWeight: 700,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition:
                'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms',
            }}
          >
            Fyra verktyg. <em className="font-serif italic">Ett</em> operativsystem.
          </h2>
          <p
            className="text-fg-soft text-lg leading-[1.55] mt-6 max-w-2xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition:
                'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 160ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 160ms',
            }}
          >
            Inga separata funktioner att köpa till, inga extra avgifter. Ersätt fyra system med ett.
          </p>
        </header>

        <div
          className="relative"
          aria-roledescription="carousel"
          aria-label="Produktverktyg"
        >
          {/* Tab nav — category tabs + chevrons, all visible above the
              content. Active tab gets the ember underline that fills
              across the 8s rotate interval. */}
          <div className="flex border-y border-edge mb-10 md:mb-12">
            <div className="flex-1 flex overflow-x-auto">
              {TOOLS.map((t, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => go(i)}
                    aria-pressed={isActive}
                    aria-label={`Visa ${t.category}`}
                    className={`group relative flex-1 min-w-[150px] sm:min-w-0 px-4 py-4 md:py-5 text-left transition-colors ease-obsidian duration-obs-sm ${
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg-soft'
                    }`}
                  >
                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-muted mb-1.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="block font-sans text-[14px] md:text-[15px] font-medium leading-tight whitespace-nowrap">
                      {t.category}
                    </span>
                    {/* Bottom ember bar — visible on active, with the
                        progress sweep matching the auto-rotate interval. */}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-px left-0 right-0 h-[2px] overflow-hidden"
                      style={{ opacity: isActive ? 1 : 0 }}
                    >
                      {isActive && (
                        <span
                          key={`${activeIndex}-${userInteracted}`}
                          className="absolute inset-0 origin-left"
                          style={{
                            background:
                              'linear-gradient(to right, var(--accent-deep) 0%, var(--accent) 60%, var(--accent-bright) 100%)',
                            boxShadow: '0 0 6px rgba(210, 88, 68, 0.55)',
                            transform:
                              userInteracted || reducedMotion ? 'scaleX(1)' : undefined,
                            animation:
                              userInteracted || reducedMotion
                                ? undefined
                                : `progressSweep ${ROTATE_MS}ms linear forwards`,
                          }}
                        />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Chevrons — separated from tabs by a hairline. Always visible
                (don't scroll with the tab strip on narrow viewports). */}
            <div className="flex items-stretch border-l border-edge shrink-0">
              <button
                type="button"
                onClick={() => go(activeIndex - 1)}
                aria-label="Föregående verktyg"
                className="flex items-center justify-center w-12 md:w-14 text-fg-muted hover:text-fg transition-colors ease-obsidian duration-obs-sm"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={() => go(activeIndex + 1)}
                aria-label="Nästa verktyg"
                className="flex items-center justify-center w-12 md:w-14 border-l border-edge text-fg-muted hover:text-fg transition-colors ease-obsidian duration-obs-sm"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.4} />
              </button>
            </div>
          </div>

          {/* Per-tool heading + body, together as a unit above the image */}
          <div className="relative mb-10 md:mb-12" aria-live="polite">
            {TOOLS.map((t, i) => (
              <div
                key={t.key}
                aria-hidden={i !== activeIndex}
                className={`${i === 0 ? 'relative' : 'absolute inset-0'} max-w-3xl`}
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  visibility: i === 0 && i !== activeIndex ? 'hidden' : 'visible',
                  transform:
                    i === activeIndex ? 'translateY(0)' : 'translateY(6px)',
                  transition:
                    'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                  pointerEvents: i === activeIndex ? 'auto' : 'none',
                }}
              >
                <h3 className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-fg leading-[1.1]">
                  {t.heading}
                </h3>
                <p className="text-fg-soft text-lg leading-[1.55] mt-5 md:mt-6">
                  {t.body}
                </p>
              </div>
            ))}
          </div>

          {/* Screenshot stage — full container width */}
          <div className="relative aspect-[16/10] w-full">
            {TOOLS.map((t, i) => (
              <div
                key={t.key}
                aria-hidden={i !== activeIndex}
                className="absolute inset-0"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transform:
                    i === activeIndex ? 'translateY(0)' : 'translateY(6px)',
                  transition:
                    'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                  pointerEvents: i === activeIndex ? 'auto' : 'none',
                }}
              >
                <Image
                  src={t.image.src}
                  alt={t.image.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1280px) 1216px, (min-width: 1024px) 92vw, 100vw"
                  className="object-contain"
                  style={{
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent 0%, #000 13%, #000 87%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 18%, #000 89%, transparent 100%)',
                    WebkitMaskComposite: 'source-in',
                    maskImage:
                      'linear-gradient(to right, transparent 0%, #000 13%, #000 87%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 18%, #000 89%, transparent 100%)',
                    maskComposite: 'intersect',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
