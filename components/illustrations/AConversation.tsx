'use client'

import type { IllustrationProps } from './types'

/**
 * Sketchbook #37 · Relationship — "A conversation."
 * Two facing arcs with a single breathing dot between them.
 *
 * Use when the next step is dialogue, not commitment: "30 sekunder", quick
 * intake, an exchange before anything else. Lower visual weight than CTAs
 * that ask for a meeting.
 */
export default function AConversation({
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
      <path className="illust-stroke illust-draw" d="M50,30 A20,20 0 0 0 50,70" />
      <path className="illust-stroke illust-draw" d="M90,30 A20,20 0 0 1 90,70" />
      <circle className="illust-fill illust-breathe" cx="70" cy="50" r="2.5" />
    </svg>
  )
}
