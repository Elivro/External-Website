import Link from 'next/link'

/**
 * Top banner — one remaining customer slot above the nav.
 *
 * Dark announcement strip at the top of the new hero. Red is reserved for
 * the status pill and the action link so the message reads as one unit.
 *
 * Whole row is the anchor (tap target >= 44px). Anchors to #startup-offer.
 */
export default function TopBanner() {
  return (
    <Link
      href="#startup-offer"
      className="hero-banner group relative block w-full overflow-hidden border-b border-white/10 bg-ink transition-colors duration-fast ease-out"
    >
      <p className="relative z-10 mx-auto flex min-h-[44px] max-w-[1280px] flex-nowrap items-center justify-center gap-x-2 px-4 py-1.5 text-center leading-[1.2] sm:flex-wrap sm:gap-x-3 sm:gap-y-1 sm:px-7 sm:py-2 sm:leading-[1.4]">
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center rounded-full bg-red px-3 py-1 font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-paper"
        >
          1 plats
        </span>
        <span className="whitespace-nowrap text-[12.5px] font-semibold tracking-[-0.005em] sm:text-[14px]">
          <span className="sm:hidden">En kundplats kvar</span>
          <span className="hidden sm:inline">En kundplats kvar för 2026.</span>
        </span>
        <span className="hidden max-w-[280px] text-center text-[12px] leading-[1.2] text-paper/70 sm:inline sm:max-w-none sm:whitespace-nowrap sm:text-[14px] sm:leading-normal">
          Vi tar in ett assistansbolag till just nu.
        </span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap text-[13.5px] font-medium text-red">
          Boka demo
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
