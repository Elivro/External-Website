'use client'

import { forwardRef } from 'react'

interface FlowingCurvesProps {
  className?: string
}

/**
 * Organic flowing curves SVG decoration
 * Inspired by hand-drawn, tactile aesthetic
 * Colors use CSS variables from the design system
 */
const FlowingCurves = forwardRef<SVGSVGElement, FlowingCurvesProps>(
  ({ className }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 1400 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Primary flowing curve - Sage green, most prominent */}
        <path
          className="curve-primary"
          d="M-50 350
             C 100 150, 250 550, 450 350
             S 650 100, 850 300
             S 1050 500, 1250 350
             S 1350 200, 1450 280"
          stroke="var(--sage)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Secondary curve - Terracotta accent, offset rhythm */}
        <path
          className="curve-secondary"
          d="M-100 420
             C 150 600, 350 200, 550 400
             S 750 650, 950 420
             S 1150 180, 1350 380
             S 1450 500, 1500 450"
          stroke="var(--terracotta)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />

        {/* Tertiary curve - Charcoal, subtle background texture */}
        <path
          className="curve-tertiary"
          d="M0 280
             C 200 80, 400 480, 600 280
             S 800 50, 1000 250
             S 1200 450, 1400 280"
          stroke="var(--charcoal-light)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
        />

        {/* Fourth curve - Sage light, creates depth */}
        <path
          className="curve-fourth"
          d="M-80 500
             C 120 300, 320 700, 520 480
             S 720 250, 920 450
             S 1120 650, 1320 500
             S 1420 350, 1500 400"
          stroke="var(--sage-light)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.25"
        />

        {/* Fifth curve - Terracotta light, adds warmth */}
        <path
          className="curve-fifth"
          d="M50 200
             C 250 400, 450 50, 650 220
             S 850 450, 1050 250
             S 1250 50, 1400 180"
          stroke="var(--terracotta-light)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.2"
        />
      </svg>
    )
  }
)

FlowingCurves.displayName = 'FlowingCurves'

export default FlowingCurves
