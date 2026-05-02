'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import ScheduleMockup from './product-mockups/ScheduleMockup'
import KanbanMockup from './product-mockups/KanbanMockup'
import TimeReportMockup from './product-mockups/TimeReportMockup'
import QmsMockup from './product-mockups/QmsMockup'

interface Tool {
  key: string
  index: string
  total: string
  heading: React.ReactNode
  body: string
  linkLabel: string
  Mockup: React.ComponentType
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
    linkLabel: 'Läs mer om rekrytering',
    Mockup: KanbanMockup,
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
    linkLabel: 'Läs mer om schemaläggning',
    Mockup: ScheduleMockup,
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
    linkLabel: 'Läs mer om tidredovisning',
    Mockup: TimeReportMockup,
  },
  {
    key: 'kvalitetsledning',
    index: '04',
    total: '04',
    heading: (
      <>
        Compliance som <em className="font-serif italic">följer</em> arbetet.
      </>
    ),
    body:
      'Genomförandeplaner, daganteckningar, Lex Sarah och IVO-granskningsberedskap — kopplat till samma data som schemat och tidrapporten.',
    linkLabel: 'Läs mer om kvalitetsledning',
    Mockup: QmsMockup,
  },
]

const ROTATE_MS = 8000

export default function ProductShowcase() {
  const { ref, isVisible } = useIntersectionObserver(0.1)
  const [activeIndex, setActiveIndex] = useState(0)
  const userInteractedRef = useRef(false)

  useEffect(() => {
    if (!isVisible || userInteractedRef.current) return
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TOOLS.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [isVisible])

  const go = (next: number) => {
    userInteractedRef.current = true
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
        <header className="mx-auto max-w-3xl mb-16 md:mb-20">
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
            className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.05]"
            style={{
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
            Inga moduler, inga extra avgifter. Ersätt fyra system med ett.
          </p>
        </header>

        {/* Editorial split: copy left, mockup right. */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[28rem]"
          aria-roledescription="carousel"
          aria-label="Produktverktyg"
        >
          <div className="lg:col-span-5 relative" aria-live="polite">
            {/* Pager: • 02 / 04 */}
            <div className="flex items-center gap-2.5 mb-8">
              <span aria-hidden="true" className="block w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted">
                {active.index} / {active.total}
              </span>
            </div>

            {/* Crossfade panel for the copy */}
            <div className="relative min-h-[16rem]">
              {TOOLS.map((t, i) => (
                <div
                  key={t.key}
                  aria-hidden={i !== activeIndex}
                  className="absolute inset-0"
                  style={{
                    opacity: i === activeIndex ? 1 : 0,
                    transform:
                      i === activeIndex ? 'translateY(0)' : 'translateY(8px)',
                    transition:
                      'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                    pointerEvents: i === activeIndex ? 'auto' : 'none',
                  }}
                >
                  <h3 className="font-serif text-[clamp(2rem,3.4vw,2.75rem)] font-light text-fg leading-[1.05] mb-6 max-w-md">
                    {t.heading}
                  </h3>
                  <p className="text-fg-soft text-lg leading-[1.55] mb-8 max-w-md">
                    {t.body}
                  </p>
                  <a
                    href="#features"
                    className="group inline-flex items-center gap-2 text-accent hover:text-accent-bright transition-colors ease-obsidian duration-obs-sm text-base"
                  >
                    {t.linkLabel}
                    <ArrowRight
                      className="w-4 h-4 transition-transform ease-obsidian duration-obs-sm group-hover:translate-x-0.5"
                      strokeWidth={1.6}
                    />
                  </a>
                </div>
              ))}
            </div>

            {/* Quiet prev/next nav */}
            <div className="mt-12 flex items-center gap-3">
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

              {/* Tool name strip */}
              <ul className="ml-2 flex items-center gap-1.5 flex-wrap">
                {TOOLS.map((t, i) => (
                  <li key={t.key}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-pressed={i === activeIndex}
                      aria-label={`Visa verktyg ${t.index}`}
                      className={`block h-px transition-all ease-obsidian duration-obs-sm ${
                        i === activeIndex
                          ? 'w-10 bg-accent'
                          : 'w-6 bg-edge-strong hover:bg-fg-muted'
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            {/* Mockup stage with crossfade */}
            <div className="relative aspect-[16/10] w-full">
              {TOOLS.map((t, i) => {
                const M = t.Mockup
                return (
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
                    <M />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
