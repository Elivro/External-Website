import Link from 'next/link'

/**
 * Top banner — Uppstartskampanj 2026 ribbon above nav.
 *
 * Whole row is the anchor (tap target ≥44px). Single Inter register,
 * no italic, no eyebrow, no dividers, no underline — the moss surface
 * carries the campaign signal; the arrow carries the affordance.
 * Anchors to #startup-offer (StartupOffer.tsx).
 */
export default function TopBanner() {
  return (
    <Link
      href="#startup-offer"
      className="group flex w-full min-h-[44px] items-center justify-center bg-moss text-paper transition-colors duration-obs-sm ease-obsidian hover:bg-[#197049]"
    >
      <p className="px-7 py-2 text-center text-[13px] leading-[1.45]">
        <span className="whitespace-nowrap">Uppstartskampanj 2026.</span>{' '}
        <span className="whitespace-nowrap">Fyra platser kvar.</span>
        <span aria-hidden="true" className="mx-2 text-paper/40">
          ·
        </span>
        <span className="whitespace-nowrap">
          Läs mer
          <span
            aria-hidden="true"
            className="ml-1 inline-block transition-transform duration-obs-sm ease-obsidian group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </p>
    </Link>
  )
}
