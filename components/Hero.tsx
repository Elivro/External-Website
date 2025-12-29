'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { scrollToSection } from '@/lib/scroll-utils'
import DemoModal from './DemoModal'

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
      <section className="relative w-full min-h-screen overflow-hidden bg-cream">
        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

              {/* LEFT COLUMN - Editorial Content (7 cols) */}
              <div className="lg:col-span-7 order-2 lg:order-1">

                {/* Eyebrow Label */}
                <p
                  className="font-mono text-sm text-charcoal-500 tracking-wider uppercase mb-6"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out, transform 0.5s ease-out'
                  }}
                >
                  Assistansplanering
                </p>

                {/* Main Headline - Editorial Serif */}
                <h1
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal-700 leading-[1.1] tracking-tight mb-8"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s'
                  }}
                >
                  Låt människorna vara den komplexa delen.{' '}
                  <span className="text-terracotta">Inte systemet.</span>
                </h1>

                {/* Subheadline - Monospace */}
                <p
                  className="font-mono text-lg sm:text-xl text-charcoal-500 tracking-wide leading-relaxed mb-6 max-w-xl"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s'
                  }}
                >
                  System för rekrytering, kvalitetsledning och schemaläggning i personlig assistans. Designat för de som ser omsorg som ett hantverk.
                </p>

                {/* Three Pillars - Visible Checkmarks */}
                <ul
                  className="space-y-2 mb-10 max-w-xl"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out 0.25s, transform 0.5s ease-out 0.25s'
                  }}
                >
                  <li className="flex items-center gap-3 text-charcoal-500 text-base">
                    <span className="text-sage-500 flex-shrink-0">✓</span>
                    <span>Rekrytering med personkemi</span>
                  </li>
                  <li className="flex items-center gap-3 text-charcoal-500 text-base">
                    <span className="text-sage-500 flex-shrink-0">✓</span>
                    <span>Kvalitetsledning som stödjer</span>
                  </li>
                  <li className="flex items-center gap-3 text-charcoal-500 text-base">
                    <span className="text-sage-500 flex-shrink-0">✓</span>
                    <span>Schemaläggning med budget i realtid</span>
                  </li>
                </ul>

                {/* CTAs */}
                <div
                  className="flex flex-col sm:flex-row gap-4 mb-6"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s'
                  }}
                >
                  {/* Primary CTA - Terracotta */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-mono font-medium text-cream-50 bg-terracotta hover:bg-terracotta-600 rounded-sm transition-all duration-200 shadow-terracotta hover:shadow-terracotta-lg"
                  >
                    Boka en demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>

                  {/* Secondary CTA */}
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-mono font-medium text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream rounded-sm transition-all duration-200"
                  >
                    Se hur det fungerar
                  </button>
                </div>

                {/* Reassurance - Subtle */}
                <p
                  className="font-mono text-sm text-charcoal-400 tracking-wide"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out 0.35s, transform 0.5s ease-out 0.35s'
                  }}
                >
                  30 dagar att uppleva skillnaden
                </p>

              </div>

              {/* RIGHT COLUMN - Editorial Illustration (5 cols) */}
              <div
                className="lg:col-span-5 relative order-1 lg:order-2"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'scale(1)' : 'scale(0.96)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s'
                }}
              >
                <div className="relative max-w-md mx-auto lg:max-w-none rounded-sm" style={{ backgroundColor: '#F5F2ED' }}>
                  {/* Hand Illustration - Organic, Editorial */}
                  <Image
                    src="/brand-assets/elivro-header-asset_hands.png"
                    alt="Illustration av sammanflätade händer som symboliserar omsorg och samarbete"
                    width={600}
                    height={600}
                    className="relative w-full h-auto"
                    priority
                  />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Subtle bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-cream-200/50 pointer-events-none" />
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
