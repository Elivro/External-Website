'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function FounderStory() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="founder-title"
      className="w-full bg-cream py-20 md:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-sage/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-32 h-32 bg-terracotta/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Pull Quote - Editorial Magazine Style */}
        <article className="text-center">
          {/* Decorative quote marks */}
          <div
            className="mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.9)',
              transition: 'all 0.5s ease-out'
            }}
          >
            <span className="font-serif text-8xl md:text-9xl text-terracotta/20 leading-none select-none">
              "
            </span>
          </div>

          {/* Quote text */}
          <blockquote
            className="mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.1s'
            }}
          >
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal-700 leading-snug tracking-tight">
              Vi såg hur administrationen dränerade energi från det viktigaste: mötet mellan assistent och kund. Därför skapade vi Elivro –
              <span className="text-terracotta"> för att frigöra tid till det som verkligen betyder något.</span>
            </p>
          </blockquote>

          {/* Attribution */}
          <footer
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.2s'
            }}
          >
            <cite className="not-italic">
              <span className="font-mono text-sm text-charcoal-500 tracking-wider uppercase">
                Jimmy, Daniel & Filiph
              </span>
              <span className="block font-mono text-xs text-charcoal-400 tracking-wide mt-1">
                Grundare, Elivro
              </span>
            </cite>
          </footer>

          {/* Quiz CTA - Exit Ramp */}
          <div
            className="mt-16 pt-12 border-t border-charcoal/10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.3s'
            }}
          >
            <p className="font-mono text-base text-charcoal-500 mb-4">
              Är Elivro rätt för er?
            </p>
            <Link
              href="/quiz"
              className="group inline-flex items-center gap-2 px-6 py-3 text-base font-mono font-medium text-charcoal bg-sage/20 hover:bg-terracotta hover:text-cream border border-sage/30 hover:border-terracotta rounded-sm transition-all duration-200"
            >
              Gör testet på 2 minuter
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </article>

      </div>
    </section>
  )
}
