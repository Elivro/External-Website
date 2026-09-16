import { useRef, useEffect, useState, RefObject, CSSProperties } from 'react'

/**
 * Custom hook for observing element visibility with IntersectionObserver
 * Respects user's prefers-reduced-motion preference for accessibility
 * @param threshold - The percentage of the element that must be visible (0.0 to 1.0)
 * @returns An object containing the ref to attach to the element and the visibility state
 */
export function useIntersectionObserver(threshold: number = 0.1): {
  ref: RefObject<HTMLDivElement | null>
  isVisible: boolean
} {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    // Skip animation entirely if user prefers reduced motion
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Disconnect observer after first trigger for performance
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, prefersReducedMotion])

  return { ref, isVisible }
}

/** Shared reveal treatment for content that enters with its section. */
export function revealStyle(
  isVisible: boolean,
  delay = 0,
  distance = 12,
  duration = 650,
): CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
    transition: `opacity ${duration}ms var(--ease-out) ${delay}ms, transform ${duration}ms var(--ease-out) ${delay}ms`,
  }
}
