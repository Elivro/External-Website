'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register GSAP plugins once at app level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Configure GSAP for optimal performance
  gsap.config({
    force3D: true, // Force GPU acceleration
  })

  // ScrollTrigger configuration
  ScrollTrigger.config({
    ignoreMobileResize: true, // Prevent refresh on mobile address bar changes
  })
}

export { gsap, ScrollTrigger, useGSAP }
