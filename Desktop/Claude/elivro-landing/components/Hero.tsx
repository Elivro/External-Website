'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Users, Calendar, FileText } from 'lucide-react'
import DemoModal from './DemoModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const scrollToFeatures = () => {
    const element = document.getElementById('three-pillars')
    if (element) {
      const navbarHeight = 64
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight - 20
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <>
    <section className="relative w-full min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
      {/* Vibrant Gradient Background - From Git Repo */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient 8s ease infinite'
          }}
        ></div>
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent"></div>

        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
      </div>

      {/* Content - Two Column Grid */}
      <div className="relative z-30 min-h-[70vh] lg:min-h-[80vh] flex items-center pointer-events-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

            {/* LEFT COLUMN - Content */}
            <div className="lg:col-span-3">

              {/* Eyebrow Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
                style={{
                  opacity: 0,
                  animation: 'fadeSlideIn 0.8s ease-out 0.1s forwards'
                }}
              >
                <span className="text-white text-sm font-medium">Assistansplanering</span>
              </div>

              {/* Main Headline - H1 */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-white mb-6"
                style={{
                  opacity: 0,
                  animation: 'fadeSlideIn 0.8s ease-out 0.2s forwards',
                  letterSpacing: '-0.02em'
                }}
              >
                Allt-i-ett bemanningsverktyg för assistansföretag
              </h1>

              {/* Subheading - Three Pillars with Lucide Icons */}
              <div
                className="mb-6"
                style={{
                  opacity: 0,
                  animation: 'fadeSlideIn 0.8s ease-out 0.4s forwards'
                }}
              >
                <ul className="space-y-2 text-lg sm:text-xl text-white/90">
                  <li className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-violet-300 flex-shrink-0" />
                    <span>Rekrytera rätt</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-violet-300 flex-shrink-0" />
                    <span>Schemalägg smart</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-violet-300 flex-shrink-0" />
                    <span>Rapportera enkelt</span>
                  </li>
                </ul>
              </div>

              {/* Body Text - Quality Promise */}
              <p
                className="text-base sm:text-lg text-white/80 mb-8 max-w-xl leading-relaxed"
                style={{
                  opacity: 0,
                  animation: 'fadeSlideIn 0.8s ease-out 0.6s forwards'
                }}
              >
                För kvalitet som förändrar liv - inte bara administrerar dem.
              </p>

              {/* Dual CTAs */}
              <div
                className="flex flex-col sm:flex-row gap-4"
                style={{
                  opacity: 0,
                  animation: 'fadeSlideIn 0.8s ease-out 0.8s forwards'
                }}
              >
                {/* Primary CTA - Kom igång */}
                <button
                  onClick={scrollToFeatures}
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-violet-600 bg-white hover:bg-violet-50 transition-all duration-300 shadow-2xl hover:shadow-white/30 hover:scale-105"
                >
                  Kom igång
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Secondary CTA - Boka demo */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300"
                >
                  Boka demo
                </button>
              </div>

              {/* Reassurance Text - Fixed Typo */}
              <p
                className="text-sm text-white/60 mt-4"
                style={{
                  opacity: 0,
                  animation: 'fadeSlideIn 0.8s ease-out 1s forwards'
                }}
              >
                Inget kreditkort krävs
              </p>

            </div>

            {/* RIGHT COLUMN - Product Visual (2x Larger) */}
            <div
              className="lg:col-span-2 relative"
              style={{
                opacity: 0,
                animation: 'fadeSlideIn 0.8s ease-out 0.4s forwards'
              }}
            >
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-purple-600/30 blur-3xl scale-110 animate-pulse-slow"></div>

                {/* iPhone Image with floating animation - 2x Larger */}
                <div
                  className="relative max-w-2xl lg:max-w-4xl mx-auto"
                  style={{
                    animation: 'float 6s ease-in-out infinite'
                  }}
                >
                  <Image
                    src="/iphone-rekrytering.png"
                    alt="Elivro mobilapp - Rekryteringsöversikt"
                    width={800}
                    height={1600}
                    className="w-full h-auto drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Subtle fade at bottom - reduced from h-48 to h-24 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/60 pointer-events-none z-40" />
    </section>

    {/* Demo Modal */}
    <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    {/* Keyframe animations */}
    <style jsx>{`
      @keyframes fadeSlideIn {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes gradient {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      @keyframes pulse-slow {
        0%, 100% {
          opacity: 0.3;
        }
        50% {
          opacity: 0.5;
        }
      }

      /* Accessibility: Respect user motion preferences */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
    </>
  )
}
