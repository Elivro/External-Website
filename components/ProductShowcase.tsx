'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Tool {
  key: string
  index: string
  total: string
  heading: React.ReactNode
  body: string
  image: { src: string; alt: string; width: number; height: number }
}

const TOOLS: Tool[] = [
  {
    key: 'rekrytering',
    index: '01',
    total: '04',
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
    index: '02',
    total: '04',
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
    index: '03',
    total: '04',
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
    index: '04',
    total: '04',
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
          {/* Pager + per-tool heading band above the screenshot */}
          <div className="flex items-center gap-2.5 mb-5">
            <span aria-hidden="true" className="block w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted">
              {active.index} / {active.total}
            </span>
          </div>

          <div className="relative mb-5 md:mb-6" aria-live="polite">
            {TOOLS.map((t, i) => (
              <h3
                key={t.key}
                aria-hidden={i !== activeIndex}
                className={`${i === 0 ? 'relative' : 'absolute inset-0'} font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-fg leading-[1.1] max-w-3xl`}
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
                {t.heading}
              </h3>
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

          {/* Caption row — body below the screenshot */}
          <div className="relative mt-8 md:mt-10">
            {TOOLS.map((t, i) => (
              <p
                key={t.key}
                aria-hidden={i !== activeIndex}
                className={`${i === 0 ? 'relative' : 'absolute inset-0'} text-fg-soft text-lg leading-[1.55] max-w-3xl`}
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
                {t.body}
              </p>
            ))}
          </div>

          {/* Controls — chevrons + tool name strip at the bottom */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-edge flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => go(activeIndex - 1)}
              aria-label="Föregående verktyg"
              className="inline-flex items-center justify-center w-10 h-10 rounded-obs-md border border-edge text-fg-muted hover:text-fg hover:border-edge-strong transition-colors ease-obsidian duration-obs-sm"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={() => go(activeIndex + 1)}
              aria-label="Nästa verktyg"
              className="inline-flex items-center justify-center w-10 h-10 rounded-obs-md border border-edge text-fg-muted hover:text-fg hover:border-edge-strong transition-colors ease-obsidian duration-obs-sm"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.4} />
            </button>

            <ul className="ml-2 flex items-center gap-1.5 flex-wrap">
              {TOOLS.map((t, i) => {
                const isActive = i === activeIndex
                return (
                  <li key={t.key}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-pressed={isActive}
                      aria-label={`Visa verktyg ${t.index}`}
                      className={`relative block overflow-hidden transition-all ease-obsidian duration-obs-sm ${
                        isActive
                          ? 'w-14 h-[2px] bg-edge-strong'
                          : 'w-7 h-px bg-edge-strong hover:bg-fg-muted hover:h-[2px]'
                      }`}
                    >
                      {isActive && (
                        <span
                          key={`${activeIndex}-${userInteracted}`}
                          aria-hidden="true"
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
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
