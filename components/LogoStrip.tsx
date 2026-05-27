'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * Referens · 2U Assistans — single-customer credibility band.
 *
 * Layout ported from elivro-landing-mockup-v2.html § SUSANNE-TESTIMONIAL:
 * an overlapping visual stack (green 2U tile bottom-left + Susanne portrait
 * top-right, with her name + title overlaid on the photo) beside one short
 * named quote. Runs on a DARK surface — the mockup's own dark variant.
 *
 * All colours inline so the component renders correctly regardless of the
 * data-surface override layer (it sits in data-surface="dark").
 *
 * id `reference-customers` preserved for any deep links.
 */
const WHITE = '#FAFAF7'
const WHITE_70 = 'rgba(255,255,255,0.70)'
const WHITE_65 = 'rgba(255,255,255,0.65)'
const WHITE_18 = 'rgba(255,255,255,0.18)'
const RED = '#DC2626'

export default function LogoStrip() {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section
      id="reference-customers"
      aria-label="Referens — 2U Assistans"
      className="w-full pt-24 pb-20"
    >
      <div className="mx-auto max-w-[1200px] px-7">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[380px_1fr] md:gap-[72px]">

          {/* Visual stack — relative box, two overlapping tiles */}
          <div className="relative mx-auto h-[300px] w-[300px] md:h-[360px] md:w-[360px]">
            {/* Green 2U tile — bottom-left, behind */}
            <div
              className="absolute bottom-0 left-0 overflow-hidden rounded-[18px]"
              style={{ width: '56%', height: '56%', zIndex: 1 }}
            >
              <Image
                src="/brand-assets/2ulogga.jpg"
                alt="2U Assistans"
                fill
                sizes="(min-width: 768px) 200px, 168px"
                quality={95}
                className="object-cover"
              />
            </div>

            {/* Susanne portrait — top-right, overlapping, in front, name overlaid */}
            <div
              className="absolute right-0 top-0 overflow-hidden rounded-[18px]"
              style={{
                width: '67%',
                height: '67%',
                zIndex: 2,
                boxShadow:
                  '0 1px 0 rgba(255,255,255,0.14) inset, 0 28px 56px -20px rgba(0,0,0,0.55), 0 14px 28px -14px rgba(0,0,0,0.35)',
              }}
            >
              {!photoFailed ? (
                <Image
                  src="/susanne_2u.png"
                  alt="Susanne Pettersson, Arbetsmiljöansvarig på 2U Assistans"
                  fill
                  sizes="(min-width: 768px) 480px, 400px"
                  quality={95}
                  className="object-cover"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{ background: '#1c1c1c' }}
                >
                  <span className="font-italic text-[2rem] italic" style={{ color: WHITE }}>
                    Susanne
                  </span>
                </div>
              )}

              {/* Name + title overlay — baked over the lower portion of the photo */}
              <div
                className="absolute inset-x-0 bottom-0 px-4 pb-3.5 pt-12"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 42%, transparent 100%)',
                }}
              >
                <div
                  className="font-display text-[15px] font-bold leading-tight"
                  style={{ color: WHITE }}
                >
                  Susanne Pettersson
                </div>
                <div
                  className="mt-1 font-sans text-[9.5px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: WHITE_70 }}
                >
                  Arbetsmiljöansvarig
                </div>
              </div>
            </div>
          </div>

          {/* Quote + attribution */}
          <div>
            <p
              className="mb-7 font-italic italic text-[clamp(22px,2.2vw,32px)] leading-[1.28] tracking-[-0.012em]"
              style={{ color: WHITE, fontWeight: 300 }}
            >
              &ldquo;Ett modernt system med snabb support och en lösning som{' '}
              <em
                className="font-italic italic"
                style={{ color: RED, fontWeight: 500 }}
              >
                verkligen levererar
              </em>{' '}
              för verksamheten.&rdquo;
            </p>
            <div className="max-w-[420px] border-t pt-5" style={{ borderColor: WHITE_18 }}>
              <div
                className="font-italic not-italic text-[20px] font-semibold tracking-[-0.01em]"
                style={{ color: WHITE }}
              >
                Susanne Pettersson
              </div>
              <div
                className="mt-1.5 font-sans text-[11.5px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: WHITE_65 }}
              >
                Arbetsmiljöansvarig · 2U Assistans
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
