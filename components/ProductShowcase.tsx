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
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">Produkten</p>
          <h2 id="product-title" className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-fg tracking-[-0.021em] leading-[1.05]">
            Fyra verktyg. <em className="font-serif italic">Ett</em> operativsystem.
          </h2>
          <p className="text-fg-soft text-lg leading-[1.55] mt-6 max-w-2xl">
            Inga separata funktioner att köpa till, inga extra avgifter. Ersätt fyra system med ett.
          </p>
        </header>

        <div className="relative" aria-roledescription="carousel" aria-label="Produktverktyg">
          {/* Sticky tab nav — stays at top of viewport while scrolling
              through the section. top-16 accounts for the sticky navbar. */}
          <div className="sticky top-16 z-20 flex border-y border-edge bg-ink mb-10 md:mb-12">
            <div className="flex-1 flex min-w-0">
              {TOOLS.map((t, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => go(i)}
                    aria-pressed={isActive}
                    className={`group relative flex-1 min-w-0 px-2 sm:px-4 py-4 md:py-5 text-left transition-colors duration-obs-md ease-obsidian hover:bg-paper/[0.03] ${
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-muted mb-1.5 transition-colors duration-obs-md ease-obsidian group-hover:text-fg-soft">{String(i + 1).padStart(2, '0')}</span>
                    <span className="block font-sans text-[13px] sm:text-[14px] md:text-[15px] font-medium leading-tight truncate">{t.category}</span>
                    {/* Hover preview underline (when not active) — short ember hint that anticipates the click */}
                    {!isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-px left-1/2 -translate-x-1/2 h-[2px] w-0 bg-accent/50 transition-all duration-obs-md ease-obsidian group-hover:w-8"
                      />
                    )}
                    {/* Active underline — ember sweep matching the rotate interval */}
                    <span aria-hidden="true" className="absolute -bottom-px left-0 right-0 h-[2px] overflow-hidden" style={{ opacity: isActive ? 1 : 0 }}>
                      {isActive && (
                        <span
                          key={`tab-${activeIndex}-${userInteracted}`}
                          className="absolute inset-0 origin-left"
                          style={{
                            background: 'linear-gradient(to right, var(--accent-deep) 0%, var(--accent) 60%, var(--accent-bright) 100%)',
                            boxShadow: '0 0 6px rgba(210, 88, 68, 0.55)',
                            transform: userInteracted || reducedMotion ? 'scaleX(1)' : undefined,
                            animation: userInteracted || reducedMotion ? undefined : `progressSweep ${ROTATE_MS}ms linear forwards`,
                          }}
                        />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="flex items-stretch border-l border-edge shrink-0">
              <button type="button" onClick={() => go(activeIndex - 1)} aria-label="Föregående" className="group flex items-center justify-center w-12 md:w-14 text-fg-muted hover:text-fg hover:bg-paper/[0.03] transition-colors duration-obs-md ease-obsidian">
                <ChevronLeft className="w-4 h-4 transition-transform duration-obs-md ease-obsidian group-hover:-translate-x-0.5" strokeWidth={1.4} />
              </button>
              <button type="button" onClick={() => go(activeIndex + 1)} aria-label="Nästa" className="group flex items-center justify-center w-12 md:w-14 border-l border-edge text-fg-muted hover:text-fg hover:bg-paper/[0.03] transition-colors duration-obs-md ease-obsidian">
                <ChevronRight className="w-4 h-4 transition-transform duration-obs-md ease-obsidian group-hover:translate-x-0.5" strokeWidth={1.4} />
              </button>
            </div>
          </div>

          <div className="relative mb-10 md:mb-12" aria-live="polite">
            {TOOLS.map((t, i) => (
              <div key={t.key} aria-hidden={i !== activeIndex} className={`${i === 0 ? 'relative' : 'absolute inset-0'} max-w-3xl`} style={{ opacity: i === activeIndex ? 1 : 0, visibility: i === 0 && i !== activeIndex ? 'hidden' : 'visible', transform: i === activeIndex ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)', pointerEvents: i === activeIndex ? 'auto' : 'none' }}>
                <h3 className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-fg leading-[1.1]">{t.heading}</h3>
                <p className="text-fg-soft text-lg leading-[1.55] mt-5 md:mt-6">{t.body}</p>
              </div>
            ))}
          </div>

          <div className="relative aspect-[16/10] w-full">
            {TOOLS.map((t, i) => (
              <div key={t.key} aria-hidden={i !== activeIndex} className="absolute inset-0" style={{ opacity: i === activeIndex ? 1 : 0, transform: i === activeIndex ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)', pointerEvents: i === activeIndex ? 'auto' : 'none' }}>
                <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 1280px) 1216px, (min-width: 1024px) 92vw, 100vw" className="object-contain" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 13%, #000 87%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 18%, #000 89%, transparent 100%)', WebkitMaskComposite: 'source-in', maskImage: 'linear-gradient(to right, transparent 0%, #000 13%, #000 87%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 18%, #000 89%, transparent 100%)', maskComposite: 'intersect' }} />
              </div>
            ))}
          </div>

          {/* Progress strip below image — four segments, one per tool. The
              active segment fills with ember over the 8s rotate interval;
              past segments stay full, future segments are empty. Click to
              jump. Doubles as a clear "where am I / how long" indicator
              for someone whose eyes are on the screenshot, not the tabs. */}
          <ul className="mt-8 md:mt-10 flex items-center gap-2" aria-label="Förlopp">
            {TOOLS.map((t, i) => {
              const isActive = i === activeIndex
              const isPast = i < activeIndex
              return (
                <li key={`progress-${t.key}`} className="flex-1">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Hoppa till ${t.category}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="group relative block w-full h-[3px] rounded-full bg-edge overflow-hidden hover:h-[5px] transition-all duration-obs-md ease-obsidian"
                  >
                    {(isActive || isPast) && (
                      <span
                        key={`progress-fill-${activeIndex}-${userInteracted}-${i}`}
                        aria-hidden="true"
                        className="absolute inset-0 origin-left"
                        style={{
                          background: 'linear-gradient(to right, var(--accent-deep) 0%, var(--accent) 60%, var(--accent-bright) 100%)',
                          boxShadow: isActive ? '0 0 6px rgba(210, 88, 68, 0.55)' : undefined,
                          transform: isPast || userInteracted || reducedMotion ? 'scaleX(1)' : undefined,
                          animation: isActive && !userInteracted && !reducedMotion ? `progressSweep ${ROTATE_MS}ms linear forwards` : undefined,
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
    </section>
  )
}
