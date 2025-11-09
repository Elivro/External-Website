'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'

interface FadeSectionProps {
  children: ReactNode
  className?: string
  fadeIntensity?: number // 0-1, how strong the fade effect is
}

export default function FadeSection({
  children,
  className = '',
  fadeIntensity = 0.5
}: FadeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate opacity based on scroll position
      // Section starts fading when it's in the bottom 30% of viewport
      if (rect.bottom < windowHeight) {
        const fadeZone = windowHeight * 0.3
        const fadeProgress = Math.max(0, (windowHeight - rect.bottom) / fadeZone)
        const newOpacity = Math.max(0, 1 - (fadeProgress * fadeIntensity * 2))
        setOpacity(newOpacity)
      } else {
        setOpacity(1)
      }
    }

    // Check on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fadeIntensity])

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        opacity,
        transition: 'opacity 0.1s linear'
      }}
    >
      {children}

      {/* Gradient overlay for fade-to-black effect */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/30 to-black pointer-events-none" />
    </div>
  )
}
