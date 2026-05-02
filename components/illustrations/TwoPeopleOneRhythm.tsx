'use client'

import type { IllustrationProps } from './types'

/**
 * Sketchbook #31 · Relationship — "Two people, one rhythm."
 * Paired dots under a faint breathing arc.
 *
 * Use for any section about pairs or partnership: founder/coordinator,
 * brukare/assistent, builder/operator. Reads as continuity, not connection.
 */
export default function TwoPeopleOneRhythm({
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
      <path
        className="illust-stroke illust-draw illust-faint illust-thin"
        d="M40,55 A30,12 0 0 1 100,55"
      />
      <circle className="illust-fill illust-breathe" cx="40" cy="55" r="3.2" />
      <circle className="illust-fill illust-breathe" cx="100" cy="55" r="3.2" />
    </svg>
  )
}
