'use client'

import { forwardRef, CSSProperties } from 'react'

interface JourneyCurveProps {
  className?: string
  style?: CSSProperties
}

/**
 * Organic flowing curve for the HowItWorks section
 * Inspired by the Elivro brand swirly lines asset
 * Draws progressively as user scrolls through steps
 * Uses stroke-dashoffset animation with GSAP ScrollTrigger
 */
const JourneyCurve = forwardRef<SVGSVGElement, JourneyCurveProps>(
  ({ className, style }, ref) => {
    // Approximate path length for the organic curve (increased for longer paths)
    const pathLength = 2400

    return (
      <svg
        ref={ref}
        viewBox="0 0 2200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {/* Primary flowing curve - terracotta - spans full width and beyond */}
        <path
          className="journey-path"
          d="M-100 80
             C 150 20, 280 100, 450 60
             S 650 30, 850 70
             S 1100 100, 1300 50
             S 1550 20, 1750 70
             S 1920 40, 2100 60"
          stroke="var(--terracotta)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
          }}
        />
        {/* Secondary subtle curve - sage, offset - spans full width and beyond */}
        <path
          className="journey-path-secondary"
          d="M-150 50
             C 100 90, 250 30, 450 70
             S 700 100, 900 45
             S 1150 25, 1350 75
             S 1600 95, 1820 40
             S 1980 60, 2150 50"
          stroke="var(--sage)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.25"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
          }}
        />
      </svg>
    )
  }
)

JourneyCurve.displayName = 'JourneyCurve'

export default JourneyCurve
