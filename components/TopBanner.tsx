import Link from 'next/link'

/**
 * Top banner — Uppstartskampanj 2026 strip above the nav.
 *
 * Paper-white on ink hairline, not a colour block. The previous moss-green
 * ribbon introduced a second strong colour into a one-accent system and read
 * as a promo bar rather than a notice. Here the black "NY" pill carries the
 * new-campaign signal and red is spent only on the "Läs mer" link.
 *
 * Whole row is the anchor (tap target >= 44px). Anchors to #startup-offer.
 */
export default function TopBanner() {
  return (
    <Link
      href="#startup-offer"
      className="group block w-full border-b border-ink bg-paper-card text-ink transition-colors duration-fast ease-out hover:bg-n-100"
    >
      <p className="mx-auto flex min-h-[44px] max-w-[1280px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-7 py-2 text-center leading-[1.4]">
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center rounded-full bg-ink px-2.5 py-0.5 font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-paper"
        >
          Ny
        </span>
        <span className="whitespace-nowrap text-[14px] font-semibold tracking-[-0.005em]">
          Uppstartskampanj 2026.
        </span>
        <span className="whitespace-nowrap text-[14px] text-n-700">
          Fyra platser kvar.
        </span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap text-[13.5px] font-medium text-red">
          Läs mer
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-fast ease-out group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </p>
    </Link>
  )
}
