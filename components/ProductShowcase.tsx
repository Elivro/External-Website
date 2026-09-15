'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Tool {
  key: string
  category: string
  verb: string
  heading: React.ReactNode
  body: string
  image: { src: string; alt: string; width: number; height: number }
  annotations: Annotation[]
}

interface Annotation {
  label: string
  labelPosition: [number, number]
  elbow: [number, number]
  to: [number, number]
  align?: 'center' | 'right'
}

const ROTATE_MS = 8000

const TOOLS: Tool[] = [
  {
    key: 'rekrytering',
    category: 'Rekrytering',
    verb: 'Matchar',
    heading: (
      <>
        AI hjälper dig hitta rätt <em className="font-serif italic">kandidater.</em>
      </>
    ),
    body: 'Förslagen syns direkt i ert vanliga rekryteringsflöde.',
    image: {
      src: '/marketing-screenshots/desktop-candidates.webp',
      alt: 'Elivros rekryteringsvy med Kanban och kandidater sorterade i ett flöde',
      width: 1664,
      height: 936,
    },
    annotations: [
      { label: 'AI föreslår bästa matchningarna', labelPosition: [32, 8], elbow: [32, 22], to: [30, 37] },
      { label: 'Du väljer vem du kontaktar', labelPosition: [19, 81], elbow: [24, 67], to: [29, 60] },
    ],
  },
  {
    key: 'schemalaggning',
    category: 'Schema & Bemanning',
    verb: 'Fyller luckor',
    heading: (
      <>
        AI hittar luckor innan de <em className="font-serif italic">blir problem.</em>
      </>
    ),
    body: 'Få ett förslag när schema, vila eller budget inte går ihop.',
    image: {
      src: '/marketing-screenshots/desktop-schedule-ai-color.webp',
      alt: 'Elivros färgkodade schema med ett ghostat AI-förslag på ett pass',
      width: 1664,
      height: 936,
    },
    annotations: [
      { label: 'AI föreslår ett pass som fyller luckan', labelPosition: [98, 10], elbow: [71, 24], to: [60, 50], align: 'right' },
    ],
  },
  {
    key: 'tidredovisning',
    category: 'Tid, Lön & FK',
    verb: 'Samlar',
    heading: (
      <>
        Tid, lön och FK som <em className="font-serif italic">hänger ihop.</em>
      </>
    ),
    body: 'Attestering, E-RÄK och löneexport i samma flöde.',
    image: {
      src: '/marketing-screenshots/desktop-tidredovisning.webp',
      alt: 'Elivros tidredovisningsvy med attestering och FK-räkning i samma flöde',
      width: 1302,
      height: 976,
    },
    annotations: [
      { label: 'Tid, attest och FK-räkning i samma flöde', labelPosition: [98, 8], elbow: [61, 13], to: [54, 15], align: 'right' },
    ],
  },
  {
    key: 'kvalitetsledning',
    category: 'Kvalitet',
    verb: 'Påminner',
    heading: (
      <>
        AI föreslår nästa <em className="font-serif italic">uppföljning.</em>
      </>
    ),
    body: 'Fånga saknad dokumentation och håll rutinerna på rätt plats.',
    image: {
      src: '/marketing-screenshots/desktop-qms.webp',
      alt: 'Elivros kvalitetsledningsvy med avvikelser och uppföljningsdatum',
      width: 1295,
      height: 670,
    },
    annotations: [
      { label: 'AI läser era rutiner och föreslår nästa uppföljning', labelPosition: [98, 76], elbow: [83, 65], to: [78, 57], align: 'right' },
    ],
  },
]

export default function ProductShowcase() {
  const { ref, isVisible } = useIntersectionObserver(0.1)
  const [activeIndex, setActiveIndex] = useState(0)
  const [userInteracted, setUserInteracted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isVisible || userInteracted || reducedMotion) return
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % TOOLS.length)
    }, ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [isVisible, reducedMotion, userInteracted])

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
      className="relative w-full bg-ink py-24 md:py-32"
    >
      <div className="site-container-wide relative z-10">
        <header className="mb-12 max-w-4xl md:mb-14">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted">Produkten</p>
          <h2 id="product-title" className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.021em] text-fg">
            Se vad AI kan <em className="font-serif italic">avlasta.</em>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-[1.55] text-fg-soft">
            AI:n föreslår. Du avgör.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12" aria-label="Produktverktyg">
          <nav aria-label="Produktområden" className="lg:pt-1">
            <div className="grid grid-cols-2 border-y border-edge lg:block lg:border-y-0">
              {TOOLS.map((tool, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={tool.key}
                    type="button"
                    onClick={() => go(index)}
                    aria-pressed={isActive}
                    className={`group relative block w-full min-w-0 border-edge px-0 py-4 text-left transition-colors duration-300 ease-[var(--ease-out)] lg:border-b lg:py-7 ${
                      index < 2 ? 'border-b' : ''
                    } ${index % 2 === 0 ? 'border-r pr-5 lg:border-r-0 lg:pr-0' : 'pl-5 lg:pl-0'} ${
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <span className="block font-mono text-[11px] tracking-[0.16em] text-red transition-colors duration-300 ease-[var(--ease-out)] lg:text-[12px]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-2 block font-sans text-[15px] font-medium leading-[1.15] sm:text-[17px] lg:text-[20px]">{tool.category}</span>
                    <span className="mt-1 block font-sans text-[13px] leading-[1.15] text-fg-muted lg:text-[14px]">{tool.verb}</span>
                    <span aria-hidden="true" className={`absolute bottom-0 left-0 h-[2px] bg-red transition-all duration-300 ease-[var(--ease-out)] lg:bottom-[-1px] ${isActive ? 'w-full' : 'w-0 group-hover:w-8'}`} />
                  </button>
                )
              })}
            </div>
          </nav>

          <div className="min-w-0" aria-live="polite">
            <div className="mb-5 max-w-3xl md:mb-6">
              <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-muted">{active.category}</p>
              <h3 className="font-serif text-[clamp(1.6rem,2.8vw,2.25rem)] font-bold leading-[1.1] text-fg">{active.heading}</h3>
              <p className="mt-3 text-base leading-[1.45] text-fg-soft">{active.body}</p>
            </div>

            <div className="relative aspect-[16/10] w-full">
              {TOOLS.map((tool, index) => (
                <div
                  key={tool.key}
                  aria-hidden={index !== activeIndex}
                  className="absolute inset-0"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    visibility: index === activeIndex ? 'visible' : 'hidden',
                    transform: index === activeIndex ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 700ms var(--ease-out), transform 700ms var(--ease-out)',
                    pointerEvents: index === activeIndex ? 'auto' : 'none',
                  }}
                >
                  <Image
                    src={tool.image.src}
                    alt={tool.image.alt}
                    fill
                    quality={92}
                    sizes="(min-width: 1280px) 1016px, (min-width: 1024px) 72vw, 100vw"
                    className="object-contain"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                      WebkitMaskComposite: 'source-in',
                      maskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                      maskComposite: 'intersect',
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {tool.annotations.map((annotation) => (
                        <path
                          key={`${tool.key}-${annotation.label}`}
                          d={`M ${annotation.labelPosition[0]} ${annotation.labelPosition[1]} L ${annotation.elbow[0]} ${annotation.elbow[1]} L ${annotation.to[0]} ${annotation.to[1]}`}
                          stroke="var(--red)"
                          strokeWidth="1.05"
                          vectorEffect="non-scaling-stroke"
                          fill="none"
                        />
                      ))}
                    </svg>
                    {tool.annotations.map((annotation) => (
                      <span key={`${tool.key}-annotation-${annotation.label}`}>
                        <span
                          className="absolute h-[clamp(7px,0.55vw,9px)] w-[clamp(7px,0.55vw,9px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red shadow-[0_0_0_2px_rgba(220,38,38,0.12)]"
                          style={{ left: `${annotation.to[0]}%`, top: `${annotation.to[1]}%` }}
                          aria-hidden="true"
                        >
                          <span
                            className="elv-pulse absolute -inset-[4px] rounded-full border border-red/80"
                            aria-hidden="true"
                          />
                        </span>
                        <span
                          className="absolute w-max max-w-[min(260px,46vw)] rounded-[3px] bg-red px-3 py-2 font-sans text-[clamp(10px,1vw,14px)] font-medium leading-[1.2] tracking-[-0.01em] text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
                          style={{
                            left: `${annotation.labelPosition[0]}%`,
                            top: `${annotation.labelPosition[1]}%`,
                            transform: annotation.align === 'right' ? 'translate(-100%, -50%)' : 'translate(-50%, -50%)',
                          }}
                        >
                          {annotation.label}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <ul className="mt-6 flex items-center gap-2 md:mt-8" aria-label="Förlopp">
              {TOOLS.map((tool, index) => {
                const isActive = index === activeIndex
                const isPast = index < activeIndex
                return (
                  <li key={`progress-${tool.key}`} className="flex-1">
                    <button
                      type="button"
                      onClick={() => go(index)}
                      aria-label={`Hoppa till ${tool.category}`}
                      aria-current={isActive ? 'true' : undefined}
                      className="group relative block h-[3px] w-full overflow-hidden rounded-full bg-edge transition-all duration-300 ease-[var(--ease-out)] hover:h-[5px]"
                    >
                      {(isActive || isPast) && (
                        <span
                          key={`progress-fill-${activeIndex}-${userInteracted}-${index}`}
                          aria-hidden="true"
                          className="absolute inset-0 origin-left bg-red"
                          style={{
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
      </div>
    </section>
  )
}
