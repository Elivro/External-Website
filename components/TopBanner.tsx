import Link from 'next/link'

/**
 * Top banner — Uppstartskampanj 2026 ribbon above nav.
 *
 * Whole row is the anchor (tap target ≥44px). Black "NY" pill carries
 * the new-campaign signal; "Uppstartskampanj 2026." bold + "Fyra platser
 * kvar." regular; "Läs mer →" at the end with arrow translate on hover.
 * Anchors to #startup-offer.
 */
export default function TopBanner() {
  return (
    <Link
      href="#startup-offer"
      className="group block w-full border-b border-paper/15 bg-moss text-paper transition-colors duration-obs-sm ease-obsidian hover:bg-[#197049]"
    >
      <p className="mx-auto flex min-h-[44px] max-w-[1280px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-7 py-2 text-center leading-[1.4]">
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center rounded-full bg-ink px-2.5 py-0.5 font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-paper"
        >
          Ny
        </span>
        <span className="whitespace-nowrap text-[14px] font-semibold">
          Uppstartskampanj 2026.
        </span>
        <span className="whitespace-nowrap text-[14px] text-paper/90">
          Fyra platser kvar.
        </span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] text-paper/80">
          Läs mer
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-obs-sm ease-obsidian group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </p>
    </Link>
  )
}
