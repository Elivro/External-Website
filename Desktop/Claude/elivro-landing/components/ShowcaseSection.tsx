'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

export default function ShowcaseSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-20 md:py-32 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left - Content */}
          <div
            className="order-2 lg:order-1"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s ease-out 0.2s'
            }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full mb-6">
              <span className="text-violet-400 text-sm font-medium">👥 Rekrytera rätt</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Matchning som bygger relationer
            </h2>

            {/* Description */}
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Elivro använder AI för att matcha på personkemi, inte bara CV.
              Se kandidater, hantera ansökningar och hitta perfekta assistenter – allt i en mobil app.
            </p>

            {/* Features list */}
            <ul className="space-y-4">
              {[
                'AI-driven matchning baserad på personlighet och kemi',
                'Mobil översikt över alla kandidater och processer',
                'Real-time notifikationer för nya ansökningar',
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease-out ${0.4 + i * 0.1}s`
                  }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-zinc-300 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - iPhone Mockup */}
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              transition: 'all 0.8s ease-out 0.4s'
            }}
          >
            <div className="relative">
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-600/20 blur-3xl scale-110"></div>

              {/* iPhone image - 2x larger */}
              <div className="relative w-full max-w-4xl lg:max-w-8xl xl:max-w-10xl">
                <Image
                  src="/iphone-rekrytering.png"
                  alt="Elivro mobilapp - Rekryteringsöversikt"
                  width={600}
                  height={800}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
