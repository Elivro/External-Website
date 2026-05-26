'use client'

import { useState } from 'react'
import DemoModal from './DemoModal'

/**
 * StartupOffer — Uppstartskampanj 2026 (Nystart)
 *
 * Faithful port of elivro-landing-mockup-v2.html § NYSTART:
 *   single centered card on paper bg, red-gradient surface with subtle moss
 *   radial accent, pulse moss-dot in the tag, paper-white CTA button.
 *
 * Sits inside a light section (per the alternating rhythm); the card is the
 * page's loudest red moment. Red discipline maintained — this is one of the
 * five permitted positions for full red surface (BK v4 § 6).
 */
export default function StartupOffer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section
        id="startup-offer"
        aria-labelledby="startup-offer-title"
        className="w-full px-7 pt-12 pb-28"
      >
        <div
          className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[28px] px-7 py-20 text-center text-paper sm:px-14 sm:py-24 md:px-14 md:py-[96px]"
          style={{
            background: `
              radial-gradient(ellipse at 85% 0%, rgba(30, 125, 89, 0.32), transparent 55%),
              radial-gradient(ellipse at 0% 100%, rgba(255, 255, 255, 0.12), transparent 50%),
              linear-gradient(140deg, var(--red) 0%, var(--red-dark) 100%)
            `,
            boxShadow:
              '0 1px 0 rgba(255, 255, 255, 0.18) inset, 0 40px 80px -32px rgba(153, 27, 27, 0.5)',
          }}
        >
          {/* Decorative "01" — quiet ordinal in top-right corner */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-8 top-6 select-none font-display text-[80px] italic leading-none tracking-[-0.04em] text-[rgba(255,255,255,0.10)] sm:right-10 sm:top-8 sm:text-[120px]"
            style={{ fontWeight: 500 }}
          >
            01
          </span>

          <div className="relative">
            {/* Tag pill — moss pulse dot signals "AI in service" / active campaign */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-pill bg-[rgba(250,250,247,0.16)] px-4 py-[7px] font-display text-[12px] font-medium uppercase tracking-[0.14em] text-paper">
              <span
                aria-hidden="true"
                className="elv-pulse h-[7px] w-[7px] rounded-full bg-moss"
              />
              Uppstartskampanj 2026 · Fyra platser kvar
            </div>

            {/* Headline — display, italic accent on "formar systemet" */}
            <h2
              id="startup-offer-title"
              className="mx-auto mb-6 max-w-[820px] font-display text-[clamp(42px,5.6vw,72px)] font-bold leading-[1.03] tracking-[-0.032em] text-balance"
            >
              Bli en av fyra som{' '}
              <em
                className="font-italic font-bold italic"
                style={{ color: '#FAFAF7' }}
              >
                formar systemet
              </em>
              .
            </h2>

            {/* Sub */}
            <p className="mx-auto mb-10 max-w-[580px] text-[17px] text-[rgba(250,250,247,0.88)]">
              Vi söker fyra assistansanordnare som vill vara med och forma
              systemet under 2026. Vi bygger med er, inte åt er.
            </p>

            {/* CTA — white pill on red surface, ink text */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-2.5 rounded-pill bg-paper px-[30px] py-[17px] text-[15px] font-bold text-ink shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)] transition-all duration-fast ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.28)]"
            >
              Boka demo
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-fast ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </button>

            {/* Fineprint */}
            <div className="mt-5 text-[13px] text-[rgba(250,250,247,0.55)]">
              Stänger 2026-09-30 · Pilot 90 dagar med pengarna tillbaka
            </div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
