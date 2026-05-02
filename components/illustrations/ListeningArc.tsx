'use client'

import type { IllustrationProps } from './types'

/**
 * Sketchbook #01 · Noticing — "The system noticed."
 * Listening arc above a single focal dot.
 *
 * Use when a section needs to express receptive attention rather than action:
 * the system observing, before it speaks. Hero attestation, listening states.
 */
export default function ListeningArc({
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
      <path className="illust-stroke illust-draw" d="M40,55 A30,30 0 0 1 100,55" />
      <circle className="illust-fill illust-breathe" cx="70" cy="72" r="2.8" />
    </svg>
  )
}
