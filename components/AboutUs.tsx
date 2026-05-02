'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import TwoPeopleOneRhythm from './illustrations/TwoPeopleOneRhythm'

interface Founder {
  slug: 'jimmy' | 'filiph' | 'daniel'
  number: string
  name: string
  shortName: string
  role: string
  bio: React.ReactNode
  quote: string
  photo: string
  alt: string
}

const FOUNDERS: Founder[] = [
  {
    slug: 'jimmy',
    number: '01',
    name: 'Jimmy Södermark',
    shortName: 'Jimmy',
    role: 'Sälj · Personlig assistent',
    bio: (
      <>
        Ex-säljchef. Jobbar idag som personlig assistent.{' '}
        <span aria-hidden>✊</span>
      </>
    ),
    quote:
      'På min första arbetsdag fick jag använda verksamhetssystemet hos arbetsgivaren — och fick en chock. Det kändes som att ingen på väldigt länge hade tänkt på hur en assistent faktiskt vill använda ett system.',
    photo: '/founders/jimmy.jpg',
    alt: 'Jimmy Södermark',
  },
  {
    slug: 'filiph',
    number: '02',
    name: 'Filiph Arverot-Falk',
    shortName: 'Filiph',
    role: 'Teknik · Fullstack',
    bio: (
      <>
        10 år som fullstack-utvecklare. Fråga mig gärna vad som helst om
        systemets design <span aria-hidden>👋</span>
      </>
    ),
    quote:
      'När man bygger något som tusentals ska använda är tillgänglighet och säkerhet A och O.',
    photo: '/founders/filiph.png',
    alt: 'Filiph Arverot-Falk',
  },
  {
    slug: 'daniel',
    number: '03',
    name: 'Daniel Nakhost',
    shortName: 'Daniel',
    role: 'Kundservice · Datavetenskap',
    bio: <>Många år som SOS-operatör. Datavetenskap i ryggen.</>,
    quote:
      'Vi vet alla hur det känns när en hemsida möter en med förvirring för att den är krångligt upplagd. Mitt mål med Elivro är, precis som namnet säger, att på något vis ge ro i era liv. 😌',
    photo: '/founders/daniel.png',
    alt: 'Daniel Nakhost',
  },
]

/**
 * AboutUs — editorial gallery spread. The group portrait runs at its native
 * 4:5 aspect (instead of being cropped to 21:9) and is framed like an
 * exhibition placard with mono caption strips above and below. Below it,
 * three founder cards with floating serif numerals (01/02/03) that break
 * the card outline, and a quiet ember rule that draws in on hover/focus.
 */
export default function AboutUs() {
  const { ref, isVisible } = useIntersectionObserver(0.05)

  return (
    <section
      id="about-us"
      ref={ref}
      aria-labelledby="about-title"
      className="w-full bg-ink py-24 md:py-32 relative overflow-hidden"
    >
      {/* Soft warm halo, offset to the left so it pairs with the centered photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 760px 540px at 22% 30%, rgba(210,88,68,0.05), transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* === HEADER === */}
        <header className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-5 mb-5">
            <div className="w-14 text-fg-muted" aria-hidden="true">
              <TwoPeopleOneRhythm animate={isVisible} />
            </div>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-muted">
              Tre grundare
            </p>
          </div>
          <h2
            id="about-title"
            className="font-serif text-fg tracking-[-0.022em] leading-[1.05] mb-6"
            style={{
              fontSize: 'clamp(2rem, 4.8vw, 3.75rem)',
              fontWeight: 300,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition:
                'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms',
            }}
          >
            Vi byggde det vi själva{' '}
            <em className="font-serif italic">saknade.</em>
          </h2>
          <p
            className="text-fg-soft text-lg leading-[1.55] max-w-2xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition:
                'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
            }}
          >
            Jimmy är fortfarande personlig assistent. Filiph har tio år som
            fullstack-utvecklare. Daniel kommer från SOS Alarm. Tre olika
            bakgrunder, samma frustration över systemen vi själva använt.
          </p>
        </header>

        {/* === EDITORIAL PORTRAIT === */}
        <div className="mb-20 md:mb-28 max-w-md mx-auto">
          {/* Caption strip above — exhibition placard */}
          <div
            className="flex items-center mb-5"
            style={{
              opacity: isVisible ? 1 : 0,
              transition:
                'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 280ms',
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-muted">
              Frame 01
            </span>
            <span aria-hidden="true" className="flex-1 h-px bg-edge mx-4" />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-muted">
              Västerås · 2026
            </span>
          </div>

          {/* Portrait — photo at native 4:5, hairline corner brackets on the outside */}
          <figure
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition:
                'opacity 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 360ms, transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 360ms',
            }}
          >
            {/* Corner brackets — sketchbook primitive */}
            <span
              aria-hidden="true"
              className="absolute -top-2 -left-2 w-5 h-5 border-l border-t border-accent/70"
            />
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-2 w-5 h-5 border-r border-t border-accent/70"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -left-2 w-5 h-5 border-l border-b border-accent/70"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 w-5 h-5 border-r border-b border-accent/70"
            />

            <div className="relative aspect-[4/5] w-full overflow-hidden border border-edge bg-ink-lift">
              <Image
                src="/founders/group.png"
                alt="Jimmy, Filiph och Daniel — Elivros tre grundare, Västerås 2026"
                fill
                sizes="(min-width: 768px) 448px, 100vw"
                className="object-cover"
                priority
              />
              {/* Subtle vignette so edges read as a printed plate, not a screenshot */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 60%, rgba(10,8,6,0.4) 100%)',
                }}
              />
            </div>

            {/* Caption below — the three names, ember interpuncts */}
            <figcaption className="mt-5 text-center">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-fg-muted leading-[1.6]">
                Jimmy{' '}
                <span className="text-accent" aria-hidden>
                  ·
                </span>{' '}
                Filiph{' '}
                <span className="text-accent" aria-hidden>
                  ·
                </span>{' '}
                Daniel
              </p>
            </figcaption>
          </figure>
        </div>

        {/* === FOUNDER TRIPTYCH === */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 md:gap-y-0">
          {FOUNDERS.map((f, i) => (
            <li
              key={f.slug}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1) ${500 + i * 130}ms, transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1) ${500 + i * 130}ms`,
              }}
            >
              <article
                tabIndex={0}
                aria-label={`${f.name} — ${f.role}`}
                className="group relative h-full bg-ink-card border border-edge rounded-obs-lg p-7 lg:p-8 flex flex-col transition-colors ease-obsidian duration-obs-md hover:border-accent/40 focus-visible:border-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
              >
                {/* Floating numeral — breaks the top-left of the card outline */}
                <span
                  aria-hidden="true"
                  className="absolute -top-[0.95rem] left-7 font-serif text-accent leading-none bg-ink px-2"
                  style={{ fontSize: '1.5rem', fontWeight: 300 }}
                >
                  {f.number}
                </span>

                {/* Vertical accent rule on the left — draws in on hover/focus */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-10 bottom-10 w-px bg-accent origin-top scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform ease-obsidian duration-obs-md"
                />

                <div className="flex items-center gap-4 mb-6 mt-3">
                  <span className="relative w-12 h-12 rounded-full overflow-hidden border border-edge bg-ink-lift flex-shrink-0">
                    <Image
                      src={f.photo}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3
                      className="font-serif text-fg leading-[1.15] tracking-[-0.012em] truncate"
                      style={{ fontSize: '1.25rem', fontWeight: 400 }}
                    >
                      {f.name}
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-muted mt-1.5 truncate">
                      {f.role}
                    </p>
                  </div>
                </div>

                <p className="text-fg-soft text-[0.9375rem] leading-[1.55] mb-6">
                  {f.bio}
                </p>

                <hr className="border-0 border-t border-edge mb-6" />

                <blockquote
                  className="font-serif italic text-fg-soft text-[0.9375rem] leading-[1.55] flex-1"
                  style={{ fontWeight: 400 }}
                >
                  &ldquo;{f.quote}&rdquo;
                </blockquote>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
