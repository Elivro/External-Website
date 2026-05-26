import Link from 'next/link'

/**
 * Top banner — Uppstartskampanj 2026 ribbon above nav.
 *
 * v4 brand: moss background, ink text, "NY" pill in ink, anchor to #nystart.
 * Replaces the v3 cyan banner described in mockup v2 — moss is the v4
 * secondary accent and carries the AI-i-tjänst / status signal that the
 * Uppstartskampanj announcement fits under.
 */
export default function TopBanner() {
  return (
    <div className="w-full bg-moss text-paper">
      <div className="container-default flex items-center justify-center gap-3 px-7 py-2.5 text-[13px] font-medium">
        <span className="inline-flex items-center rounded-pill bg-ink px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-paper">
          NY
        </span>
        <span>
          <b className="font-semibold">Uppstartskampanj 2026.</b> Fyra platser kvar.
        </span>
        <Link
          href="#nystart"
          className="font-semibold underline decoration-1 underline-offset-2 transition-opacity hover:opacity-80"
        >
          Läs mer →
        </Link>
      </div>
    </div>
  )
}
