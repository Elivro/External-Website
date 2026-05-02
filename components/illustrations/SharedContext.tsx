'use client'

import type { IllustrationProps } from './types'

/**
 * Sketchbook #35 · Relationship — "Shared context."
 * Three overlapping rings around a common breathing center.
 *
 * Use when the section is about co-built work: us with a customer,
 * developer with operator, system with verksamhet. The implication is
 * triangulated trust, not a venn-diagram-of-features.
 */
export default function SharedContext({
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
      <circle className="illust-stroke illust-draw" cx="55" cy="55" r="16" fill="none" />
      <circle className="illust-stroke illust-draw" cx="85" cy="55" r="16" fill="none" />
      <circle className="illust-stroke illust-draw" cx="70" cy="33" r="16" fill="none" />
      <circle className="illust-fill illust-breathe" cx="70" cy="48" r="2" />
    </svg>
  )
}
