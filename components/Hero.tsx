'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { scrollToSection } from '@/lib/scroll-utils'
import DemoModal from './DemoModal'
import HeroAtmosphere from './HeroAtmosphere'
import HeroLiveFeed from './HeroLiveFeed'

// Tiled film grain SVG, warm-tinted to match Obsidian's "warm grain" token.
// Static (no animation) so it costs nothing at runtime once decoded.
const GRAIN_BG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1   0 0 0 0 0.55  0 0 0 0 0.35  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>\")"

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <section className="relative w-full min-h-fit lg:min-h-screen overflow-hidden bg-ink">
        {/* Atmospheric WebGL shader (drifting warm-noise field). Replaces the
            old static radial halo with organic, breathing depth. */}
        <HeroAtmosphere />

        {/* Faint static gradient as fallback for browsers without WebGL. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 800px 600px at 30% 35%, rgba(220,77,61,0.04), transparent 72%)',
            zIndex: 0,
          }}
        />

        {/* Warm film grain — sits between atmosphere and content, gives the
            dark surface tactile presence per DESIGN.md "warm grain" rule. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: GRAIN_BG,
            backgroundSize: '240px 240px',
            backgroundRepeat: 'repeat',
            opacity: 0.07,
            mixBlendMode: 'overlay',
            zIndex: 1,
          }}
        />

        <div className="relative z-10 min-h-fit lg:min-h-screen flex items-start lg:items-center">

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* LEFT — editorial content */}
          <div className="lg:col-span-6 relative z-10 self-center">

          {/* Eyebrow — co-built attribution above the fold */}
          <p
          className="font-mono text-[11px] tracking-[0.16em] uppercase text-fg-muted mb-6"
          style={{
          opacity: mounted ? 1 : 0,
          transition: prefersReducedMotion ? 'none' : 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
          >
          Byggt tillsammans med Västerås största assistansanordnare
          </p>

          {/* Headline — italic emphasis on the load-bearing clause */}
          <h1
          className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-light text-fg leading-[1.02] tracking-[-0.025em] mb-8"
          style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: prefersReducedMotion ? 'none' : 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms',
          }}
          >
          Verksamhetssystemet som sänker er{' '}
          <em className="font-serif italic text-fg">lönekostnad.</em>
          </h1>

          {/* Subhead — body Inter, not mono. Mono is system-voice only. */}
          <p
          className="text-fg-soft text-lg sm:text-xl leading-[1.55] max-w-2xl mb-10"
          style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: prefersReducedMotion ? 'none' : 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 160ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 160ms',
          }}
          >
          87% av er ersättning går till löner. Vi sänker den genom bättre
          rekrytering — AI-matchning tränad på svensk assistans, kopplad till
          schema, lön och kvalitet.
          </p>

          {/* CTAs — single primary, single secondary */}
          <div
          className="flex flex-col sm:flex-row gap-3"
          style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: prefersReducedMotion ? 'none' : 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 240ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 240ms',
          }}
          >
          <button
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-sans text-ink bg-accent hover:bg-accent-bright active:bg-accent-deep rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
          >
          Boka en demo
          <ArrowRight className="w-4 h-4 transition-transform ease-obsidian duration-obs-sm group-hover:translate-x-0.5" />
          </button>

          <button
          onClick={() => scrollToSection('product')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-sans text-fg bg-ink-lift hover:text-fg hover:bg-ink-card rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
          >
          Se produkten
          </button>
          </div>

          {/* Specific risk-reducer — quantified, not abstract */}
          <p
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mt-6"
          style={{
          opacity: mounted ? 1 : 0,
          transition: prefersReducedMotion ? 'none' : 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 320ms',
          }}
          >
          30 dagars test · Ingen bindningstid
          </p>
          </div>

          {/* RIGHT — live system feed (Canvas2D, auto-cycling through three
              domains: schemaläggning, rekrytering, ledningssystem). */}
          <div
          className="hidden lg:block lg:col-span-6 relative aspect-[4/5] max-h-[820px] self-center"
          style={{
          opacity: mounted ? 1 : 0,
          transition: prefersReducedMotion ? 'none' : 'opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms',
          }}
          >
          <HeroLiveFeed />
          </div>

          </div>
          </div>

          {/* Scroll cue — Obsidian-style "Scrolla" label (body sans 16px
              regular, fg-muted) over a vertical hairline with an accent
              segment dropping down on a 2.4s loop. */}
          <button
            type="button"
            onClick={() => scrollToSection('reference-customers')}
            aria-label="Scrolla nedåt"
            className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-fg-muted hover:text-fg transition-colors ease-obsidian duration-obs-sm"
            style={{
              opacity: mounted ? 1 : 0,
              transition: prefersReducedMotion
                ? 'none'
                : 'opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 600ms',
            }}
          >
            <span className="text-base font-normal">Scrolla</span>
            <span
              aria-hidden="true"
              className="relative block w-px h-12 bg-edge-strong overflow-hidden"
            >
              <span
                className="absolute left-0 right-0 top-0 h-3 bg-accent rounded-full"
                style={{
                  animation: prefersReducedMotion
                    ? 'none'
                    : 'scrollCueDrop 2.4s cubic-bezier(0.2, 0.7, 0.2, 1) infinite',
                }}
              />
            </span>
          </button>

        </div>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
