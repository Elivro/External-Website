'use client'

import type { IllustrationProps } from './types'

/**
 * Sketchbook #23 · Acting — "Action propagates."
 * Filled dot · halo · connector · empty ring.
 *
 * Use when the section is about a single decision moving through the system —
 * one tool causing a downstream effect in another. Good as a quiet divider
 * inside multi-tool layouts (e.g. ProductShowcase).
 */
export default function ActionPropagates({
  animate = false,
  className,
  title,
}: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 140 100"
      className={`illust ${animate ? 'illust--animate' : ''} ${className ?? ''}`}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle className="illust-fill" cx="25" cy="50" r="3" />
      <circle className="illust-stroke illust-draw illust-faint" cx="25" cy="50" r="7" fill="none" />
      <line className="illust-stroke illust-draw illust-thin illust-breathe" x1="34" y1="50" x2="106" y2="50" />
      <circle className="illust-stroke illust-draw" cx="115" cy="50" r="6" fill="none" />
    </svg>
  )
}
