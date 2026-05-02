'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import SharedContext from './illustrations/SharedContext'

/**
 * "Varför oss" — co-built positioning. The argument: the system was built
 * with the largest assistansanordnare in Västerås (2u Assistans), which is
 * what gives it the right to claim completeness. The SharedContext
 * illustration carries that semantic — three rings around a common center.
 */
export default function WhyPickUs() {
  const { ref, isVisible } = useIntersectionObserver(0.1)

  return (
    <section
      id="why-us"
      ref={ref}
      aria-labelledby="why-title"
      className="w-full bg-ink-lift py-24 md:py-32 relative"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div
              className="w-full max-w-md mx-auto text-accent"
              style={{
                opacity: isVisible ? 1 : 0,
                transition:
                  'opacity 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
              }}
              aria-hidden="true"
            >
              <SharedContext animate={isVisible} />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <p
              className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              }}
            >
              Varför oss
            </p>

            <h2
              id="why-title"
              className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.05] mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition:
                  'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms',
              }}
            >
              Glöm moduler, krångel och <em className="font-serif italic">extra avgifter</em>.
            </h2>

            <div
              className="space-y-5 text-fg-soft text-lg leading-[1.55] max-w-2xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition:
                  'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
              }}
            >
              <p>
                Det viktigaste när man bygger ett verksamhetssystem är inte att
                kunna allt. Det viktigaste är att våga fråga om hjälp där det
                behövs.
              </p>
              <p>
                Därför har vi, tillsammans med den största assistansanordnaren i
                Västerås — <span className="text-fg">2u Assistans</span> — byggt
                ett system som har alla funktioner som en assistansanordnare
                behöver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
