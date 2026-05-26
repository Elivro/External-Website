import Link from 'next/link'

/**
 * Top banner — Uppstartskampanj 2026 ribbon above nav.
 *
 * Whole row is the anchor (tap target ≥44px). Single Inter register.
 * Two specific brand moves carry the "alive campaign" signal without
 * stacking typographic noise:
 *
 *   1. A slow-breathing paper dot at the leading edge (3.2s pulse, much
 *      calmer than the 1.6s system-event pulse used in dashboards).
 *   2. A 1px paper/15 hairline at the bottom that defines the banner
 *      as its own layer above the navbar (Obsidian "hairline" vocab).
 *
 * No italic, no eyebrow, no underline. The moss surface + the pulse
 * carry the campaign feel; the arrow carries the affordance.
 * Anchors to #startup-offer.
 */
export default function TopBanner() {
  return (
    <Link
      href="#startup-offer"
      className="group block w-full border-b border-paper/15 bg-moss text-paper transition-colors duration-obs-sm ease-obsidian hover:bg-[#197049]"
    >
      <p className="mx-auto flex min-h-[44px] max-w-[1280px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-7 py-2 text-center text-[13px] leading-[1.45]">
        <span
          aria-hidden="true"
          className="elv-pulse inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-paper/85"
          style={{ animationDuration: '3.2s' }}
        />
        <span className="whitespace-nowrap">Uppstartskampanj 2026.</span>
        <span className="whitespace-nowrap">Fyra platser kvar.</span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
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
