'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DemoModal from './DemoModal'

/** The first fold: one clear promise, one product object, one next step. */
const rise = (ms: number, extra?: Record<string, string>) =>
  ({ ...(ms ? { '--reveal-delay': `${ms}ms` } : null), ...extra }) as React.CSSProperties

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section
        id="top"
        className="relative isolate -mt-20 flex min-h-0 flex-col overflow-hidden bg-hero-bg pt-20 lg:-mt-[84px] lg:min-h-[calc(100svh-124px)] lg:pt-[84px]"
      >
        {/* The supplied illustration carries the light, red-tinted atmosphere and
            leaves the left side intentionally quiet for the message. */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block" aria-hidden="true">
          <div className="hero-illustration-frame absolute inset-y-0 right-0 w-full max-w-[1536px] overflow-hidden">
            <Image
              src="/brand-assets/hero-illustration.jpg"
              alt=""
              fill
              priority
              quality={95}
              unoptimized
              sizes="1536px"
              className="hero-illustration-drift object-cover object-center"
            />
          </div>
          <div className="hero-illustration-wash absolute inset-0 bg-gradient-to-r from-hero-bg/80 via-hero-bg/10 to-transparent lg:from-hero-bg/55" />
        </div>

        <div className="hero-shell relative z-10 flex flex-1 items-start pb-16 pt-6 lg:items-center lg:pb-20 lg:pt-16">
          <div className="w-full max-w-[780px]">
            <h1 className="relative z-10 hero-title mb-6 max-w-none text-ink lg:mb-7 lg:max-w-[10.5ch]">
              <span style={rise(0, { '--rise-blur': '12px', '--rise-y': '14px' })} className="elv-line elv-rise">
                Framtidens
              </span>
              <span style={rise(70, { '--rise-blur': '12px', '--rise-y': '14px' })} className="elv-line elv-rise">
                assistansbolag
              </span>
              <span style={rise(140, { '--rise-blur': '12px', '--rise-y': '14px' })} className="elv-line elv-rise hero-title-gradient">
                byggs med AI.
              </span>
            </h1>

            <p
              style={rise(220)}
              className="relative z-10 hero-copy elv-rise mb-0 max-w-[600px] text-[clamp(18px,1.7vw,24px)] leading-[1.4] tracking-[-0.012em] text-n-700 lg:mb-8"
            >
              <span className="hidden md:inline">
                Elivro samlar schema, rekrytering, kvalitet och uppföljning, och driver verksamheten framåt med AI.
                Mindre administration, högre kvalitet och mer tid för det som verkligen räknas.
              </span>
              <span className="md:hidden">
                Ett verksamhetssystem för rekrytering, schema, kvalitet och uppföljning, byggt med AI från grunden.
              </span>
            </p>

            <div
              style={rise(300)}
              className="hero-mobile-art relative z-0 elv-rise md:hidden"
              aria-hidden="true"
            >
              <Image
                src="/brand-assets/hero-mobile-illustration.jpg"
                alt=""
                fill
                unoptimized
                sizes="100vw"
                className="hero-mobile-art-image object-contain"
              />
            </div>

            <div
              style={rise(390)}
              className="hero-cta-row relative z-10 elv-rise flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="hero-cta cta-hover-sweep group w-full justify-center sm:w-auto md:justify-start"
              >
                <span className="relative z-[1]">Boka demo</span>
                <span aria-hidden="true" className="relative z-[1] inline-block transition-transform duration-fast ease-out group-hover:translate-x-1">
                  →
                </span>
              </button>
              <Link href="#features" className="hero-secondary group w-full justify-center sm:w-auto md:justify-start">
                Upptäck elivro
              </Link>
            </div>

            <div style={rise(470)} className="relative z-10 hero-proof-list elv-rise mt-8 grid max-w-[900px] grid-cols-1 gap-4 text-[17px] leading-[1.35] text-n-700 sm:mt-9 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
              <ProofItem text="Snabbt att komma igång" />
              <ProofItem text="Säkert och GDPR-anpassat" />
              <ProofItem text="Byggt för assistansbolag" />
            </div>
          </div>
        </div>

        <a
          href="#features"
          className="hero-scroll-cue relative z-10 mx-auto mb-5 flex flex-col items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-n-700 transition-colors hover:text-ink"
        >
          <span className="hero-scroll-line" aria-hidden="true">
            <span className="hero-scroll-line-glow" />
          </span>
          Utforska mer
          <span aria-hidden="true" className="hero-scroll-chevron" />
        </a>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

function ProofItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap">
      <span aria-hidden="true" className="text-[20px] font-medium leading-none text-red">✓</span>
      <span>{text}</span>
    </div>
  )
}
