'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import AConversation from './illustrations/AConversation'

/**
 * Lightweight CTA pointing to the matchning quiz at /quiz.
 * Lower visual weight than the main CTA — this is dialogue, not commitment.
 * The `AConversation` illustration sits as the visual anchor: two arcs
 * facing each other with a single breathing dot between them.
 */
export default function QuizCTA() {
  const { ref, isVisible } = useIntersectionObserver(0.1)

  return (
    <section
      id="quiz-cta"
      ref={ref}
      aria-labelledby="quiz-cta-title"
      className="w-full bg-ink py-20 md:py-24 relative"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">
        <div
          className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition:
              'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
        >
          <div
            className="w-24 md:w-28 text-fg-muted flex-shrink-0"
            aria-hidden="true"
          >
            <AConversation animate={isVisible} />
          </div>

          <div className="flex-1">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-3">
              30 sekunder
            </p>
            <h2
              id="quiz-cta-title"
              className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-light text-fg leading-[1.15] mb-4"
            >
              Skulle vi vara en bra <em className="font-serif italic">matchning</em>?
            </h2>
            <p className="text-fg-soft text-base leading-[1.55] max-w-xl">
              Fyll i några snabba frågor så ser vi om Elivro passar er
              verksamhet — innan ni bokar något samtal.
            </p>
          </div>

          <Link
            href="/quiz"
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-sans text-fg bg-ink-lift border border-edge hover:border-accent/60 hover:text-fg rounded-obs-md transition-colors ease-obsidian duration-obs-sm flex-shrink-0"
          >
            Starta quiz
            <ArrowRight className="w-4 h-4 transition-transform ease-obsidian duration-obs-sm group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
