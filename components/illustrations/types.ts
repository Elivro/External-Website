/**
 * Shared contract for sketchbook illustrations.
 *
 * Promoted from `_exploration/system-language-sketchbook.html` (38 scenes).
 * Each illustration is a small SVG composition built only from the canonical
 * primitive vocabulary (dot, ring, ring-with-dot, listening arc, threshold
 * arch, partial orbit, bracket, hairline, connector, soft underline, caret).
 *
 * Animation contract:
 *  - `animate=false` (default): static, no motion.
 *  - `animate=true`: stroke draw-in on first paint, then a 3.2s breath on
 *    focal elements (`.breathe`). All motion respects
 *    `prefers-reduced-motion` via the cascade in `app/globals.css`.
 *
 * See `ILLUSTRATIONS.md` for the canonical catalog and selection guide.
 */
export interface IllustrationProps {
  /** Trigger draw-in + breath. Default false. */
  animate?: boolean
  /** Optional override for stroke color. Defaults to currentColor (caller controls via CSS). */
  className?: string
  /** Optional aria-label. If absent the SVG is treated as decorative. */
  title?: string
}
