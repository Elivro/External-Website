'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'
import { NormalBufferAttributes } from 'three'

interface FadeSectionProps {
  children: ReactNode
  className?: string
  fadeIntensity?: 0.8 // 0-1, how strong the fade effect is
}

export default function FadeSection({
  children,
  className = '',
  fadeIntensity = 0.5
}: FadeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(1)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    // Skip fade animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setOpacity(1)
      return
    }

    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate opacity based on scroll position
      // Section starts fading only when bottom is in top 15% of viewport (nearly off-screen)
      if (rect.bottom < windowHeight * 0.15) {
        const fadeZone = windowHeight * 0.3
        const fadeProgress = Math.max(0, (windowHeight * 0.15 - rect.bottom) / fadeZone)
        const newOpacity = Math.max(0, 1 - (fadeProgress * fadeIntensity * 1.5))
        setOpacity(newOpacity)
      } else {
        setOpacity(1)
      }
    }

    // Check on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fadeIntensity, prefersReducedMotion])

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        opacity,
        transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out'
      }}
    >
      {children}
      
      {/* Gradient overlay for fade-to-black effect */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/30 to-black pointer-events-none" />
    </div>
  )
}
