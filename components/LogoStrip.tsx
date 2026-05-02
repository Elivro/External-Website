'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

/**
 * Single-customer reference quote. Replaces the prior bare logo strip with a
 * richer credibility band — a quiet portrait tile + one short quote from a
 * named person at 2u Assistans. The system was built with them; one quote
 * said honestly beats five logos suggested falsely.
 *
 * Photo: `/public/susanne_2u.png` (Susanne is at 2u Assistans, not an Elivro
 * founder — kept outside `/public/founders/`). Until the file exists,
 * `<Image onError>` falls back to a typographic 2U mono-tile so the page
 * never breaks at build time.
 *
 * Section id is preserved (`reference-customers`) so the Hero scroll cue and
 * any deep links keep working.
 */
export default function LogoStrip() {
  const { ref, isVisible } = useIntersectionObserver(0.1)
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section
      id="reference-customers"
      ref={ref}
      aria-labelledby="reference-customers-eyebrow"
      className="w-full bg-ink py-16 md:py-20 relative border-y border-edge"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12">
        <div
          className="grid grid-cols-1 sm:grid-cols-12 items-center gap-8 sm:gap-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
            transition:
              'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
        >
          {/* Portrait tile — photo if available, typographic fallback otherwise */}
          <figure className="sm:col-span-4 md:col-span-3">
            <div
              className="relative w-40 sm:w-full aspect-[4/5] rounded-obs-md overflow-hidden border border-edge bg-ink-lift"
              aria-hidden={photoFailed ? 'true' : undefined}
            >
              {!photoFailed && (
                <Image
                  src="/susanne_2u.png"
                  alt="Susanne Pettersson, Arbetsmiljöansvarig på 2u Assistans"
                  fill
                  sizes="(min-width: 768px) 200px, 160px"
                  className="object-cover"
                  onError={() => setPhotoFailed(true)}
                />
              )}

              {photoFailed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-ink-card to-ink-lift">
                  <span className="font-serif italic text-fg-soft text-[2.25rem] leading-[1] tracking-[-0.02em]">
                    Susanne
                  </span>
                  <span className="mt-3 block w-6 h-px bg-accent/60" aria-hidden="true" />
                  <span className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-fg-muted">
                    2u Assistans
                  </span>
                </div>
              )}
            </div>
          </figure>

          <div className="sm:col-span-8 md:col-span-9">
            <p
              id="reference-customers-eyebrow"
              className="font-mono text-[11px] tracking-[0.16em] uppercase text-fg-muted mb-5"
            >
              Referens · 2u Assistans
            </p>

            <blockquote className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light text-fg leading-[1.15] tracking-[-0.018em] max-w-2xl">
              <span aria-hidden="true" className="text-fg-muted mr-2">&mdash;</span>
              Jag tycker det fungerar{' '}
              <em className="font-serif italic text-accent">riktigt bra.</em>
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3 text-fg-soft">
              <Image
                src="/2u.png"
                alt=""
                width={72}
                height={24}
                className="h-5 w-auto opacity-80"
              />
              <span aria-hidden="true" className="block w-px h-4 bg-edge" />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-muted">
                Susanne Pettersson · Arbetsmiljöansvarig
              </span>
            </figcaption>
          </div>
        </div>
      </div>
    </section>
  )
}
