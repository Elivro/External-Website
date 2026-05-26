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
      <p className="mx-auto flex min-h-[52px] max-w-[1280px] flex-wrap items-center justify-center gap-x-5 gap-y-1 px-7 py-2.5 text-center leading-[1.25]">
        <span
          aria-hidden="true"
          className="elv-pulse inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-paper/85"
          style={{ animationDuration: '3.2s' }}
        />
        <span className="font-display text-[15.5px] font-bold tracking-[-0.022em] whitespace-nowrap">
          Uppstartskampanj 2026.
        </span>
        <span aria-hidden="true" className="hidden sm:inline-block h-3.5 w-px shrink-0 bg-paper/25" />
        <span className="text-[13.5px] whitespace-nowrap text-paper/90">
          Fyra platser{' '}
          <em className="font-serif italic">kvar</em>.
        </span>
        <span aria-hidden="true" className="hidden sm:inline-block h-3.5 w-px shrink-0 bg-paper/25" />
        <span className="inline-flex items-center gap-1 whitespace-nowrap text-[13px]">
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
