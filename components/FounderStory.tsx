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
      className="w-full bg-ink py-24 md:py-32 relative"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        <article className="text-center">
          <p
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Grundarna
          </p>

          <blockquote
            className="mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms',
            }}
          >
            <p
              id="founder-title"
              className="font-serif text-[clamp(1.75rem,3.6vw,3rem)] font-light text-fg leading-[1.15] tracking-[-0.018em]"
            >
              En av oss står på golvet. Två andra bygger AI-system som faktiskt fungerar.
              Tillsammans bygger vi det vi själva alltid <em className="font-serif italic">saknat</em>.
            </p>
          </blockquote>

          <footer
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
            }}
          >
            <cite className="not-italic block">
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-soft block">
                Jimmy · Daniel · Filiph
              </span>
              <span className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mt-1">
                Grundare, Elivro
              </span>
            </cite>
          </footer>

          {/* Quiz CTA — exit ramp */}
          <div
            className="mt-16 pt-12 border-t border-edge"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 280ms',
            }}
          >
            <p className="text-fg-soft text-base mb-5">
              Är Elivro rätt för er verksamhet?
            </p>
            <Link
              href="/quiz"
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-sans text-fg bg-ink-lift hover:bg-ink-card rounded-obs-md border border-edge transition-colors ease-obsidian duration-obs-sm"
            >
              Gör testet på 2 minuter
              <ArrowRight className="w-4 h-4 transition-transform ease-obsidian duration-obs-sm group-hover:translate-x-0.5" />
            </Link>
          </div>
        </article>

      </div>
    </section>
  )
}
