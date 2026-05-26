import Link from 'next/link'

/**
 * Top banner — Uppstartskampanj 2026 ribbon above nav.
 *
 * Whole row is the anchor so the tap target equals the banner height
 * (mobile: ≥44px). Anchors to #startup-offer (StartupOffer.tsx). Moss
 * surface stays; the previous bold "NY" pill becomes a quiet mono
 * eyebrow, and "Uppstartskampanj 2026" carries italic Fraunces
 * emphasis per the Obsidian italic-not-bold rule.
 */
export default function TopBanner() {
  return (
    <Link
      href="#startup-offer"
      className="group block w-full bg-moss text-paper transition-colors duration-obs-sm ease-obsidian hover:bg-[#197049]"
    >
      <div className="container-default flex min-h-[44px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-7 py-2 text-[13px] font-medium leading-[1.45]">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/80">
          Ny
        </span>
        <span
          aria-hidden="true"
          className="hidden h-3 w-px bg-paper/25 sm:inline-block"
        />
        <span className="text-balance">
          <em className="font-serif italic">Uppstartskampanj 2026.</em>{' '}
          Fyra platser kvar.
        </span>
        <span
          aria-hidden="true"
          className="hidden h-3 w-px bg-paper/25 sm:inline-block"
        />
        <span className="inline-flex items-center gap-1 underline decoration-1 underline-offset-2 group-hover:no-underline">
          Läs mer
          <span
            aria-hidden="true"
            className="transition-transform duration-obs-sm ease-obsidian group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  )
}
