'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { scrollToSection } from '@/lib/scroll-utils'
import DemoModal from './DemoModal'
import { SparklesCore } from './ui/sparkles'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToFeatures = () => scrollToSection('three-pillars')

  return (
    <>
    <section className="relative w-full min-h-[75vh] lg:min-h-[95vh] overflow-hidden">
      {/* Animated Particles Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500 rounded-full blur-3xl"></div>
        </div>

        {/* Sparkles Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <SparklesCore
            id="hero-particles"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={120}
            className="w-full h-full"
            particleColor="#8b5cf6"
            speed={0.5}
          />
        </div>
      </div>

      {/* Content - Two Column Grid */}
      <div className="relative z-30 min-h-[75vh] lg:min-h-[95vh] flex items-center pointer-events-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-16 lg:py-20">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start lg:items-center">

            {/* LEFT COLUMN - Content */}
            <div className="lg:col-span-3">

              {/* Eyebrow Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out 0.1s, transform 0.3s ease-out 0.1s'
                }}
              >
                <span className="text-white text-sm font-medium">Assistansplanering</span>
              </div>

              {/* Main Headline - H1 */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-white mb-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out 0.2s, transform 0.3s ease-out 0.2s',
                  letterSpacing: '-0.02em'
                }}
              >
                <span className="text-white">
                  Kvalitet eller budget?<br />
                  Nu kan du få{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                    båda
                  </span>
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out 0.3s, transform 0.3s ease-out 0.3s'
                }}
              >
                Rekrytering, schema, och rapporter gjort enkelt med AI — för det effektiva assistansbolaget
              </p>

              {/* Subheading - Three Pillars with Lucide Icons */}
              <div
                className="mb-6"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out 0.5s, transform 0.3s ease-out 0.5s'
                }}
              >
                <ul className="space-y-2 text-lg sm:text-xl text-white">
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-violet-300 flex-shrink-0" />
                    <span>Lättare rekrytering</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-violet-300 flex-shrink-0" />
                    <span>Snabbare schemaläggning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-violet-300 flex-shrink-0" />
                    <span>Enklare rapportering</span>
                  </li>
                </ul>
              </div>

              {/* Subheader - Value Proposition */}
              <p
                className="text-base sm:text-lg text-white/80 mb-8 max-w-xl leading-relaxed"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out 0.7s, transform 0.3s ease-out 0.7s'
                }}
              >
                God assistans handlar om relationer. Därför bygger vi teknik som stärker det mänskliga, inte ersätter det.
              </p>

              {/* Single Primary CTA */}
              <div
                className="flex flex-col sm:flex-row gap-4 mb-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out 0.9s, transform 0.3s ease-out 0.9s'
                }}
              >
                {/* Primary CTA - Boka demo */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-violet-600 bg-white hover:bg-violet-50 transition-all duration-300 shadow-2xl hover:shadow-white/30 hover:scale-105"
                >
                  Boka gratis demo
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Secondary CTA - See how it works */}
                <button
                  onClick={scrollToFeatures}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300"
                >
                  Se hur det fungerar
                </button>
              </div>

              {/* Reassurance text */}
              <p
                className="text-sm text-white/60"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out 1.1s, transform 0.3s ease-out 1.1s'
                }}
              >
                Inget kreditkort krävs
              </p>

            </div>

            {/* RIGHT COLUMN - Product Visual */}
            <div
              className="hidden lg:block lg:col-span-2 relative lg:mt-16"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out 0.4s, transform 0.3s ease-out 0.4s'
              }}
            >
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-purple-600/30 blur-3xl scale-110 animate-pulse-slow"></div>

                {/* iPhone Image with floating animation - Reduced by ~33% */}
                <div
                  className="relative max-w-[280px] lg:max-w-[300px] mx-auto"
                  style={{
                    animation: 'float 6s ease-in-out infinite'
                  }}
                >
                  <Image
                    src="/iphone-rekrytering.png"
                    alt="Elivro mobilapp - Rekryteringsöversikt"
                    width={600}
                    height={1200}
                    className="w-full h-auto drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Subtle fade at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none z-40" />
    </section>

    {/* Demo Modal */}
    <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
