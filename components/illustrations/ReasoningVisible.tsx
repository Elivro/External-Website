'use client'

import type { IllustrationProps } from './types'

/**
 * Sketchbook #11 · Speaking — "Reasoning made visible."
 * Three dots on a baseline with a faint arch above the focal one.
 *
 * Use for sections about a small set of carefully chosen things —
 * a counted offer, a few open slots, a curated cohort.
 */
export default function ReasoningVisible({
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
      <path className="illust-stroke illust-draw illust-faint illust-thin" d="M30,55 A40,40 0 0 1 110,55" />
      <line className="illust-stroke illust-draw illust-thin" x1="40" y1="75" x2="100" y2="75" />
      <circle className="illust-fill" cx="40" cy="75" r="2.2" />
      <circle className="illust-fill illust-breathe" cx="70" cy="75" r="2.5" />
      <circle className="illust-fill" cx="100" cy="75" r="2.2" />
    </svg>
  )
}
