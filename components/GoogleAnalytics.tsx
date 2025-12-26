'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = 'G-J9PTC943YB'

// TypeScript types for gtag
type GtagCommand = 'config' | 'event' | 'js' | 'set' | 'consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (command: GtagCommand | string, ...args: unknown[]) => void
  }
}

export default function GoogleAnalytics({
  hasConsent,
  debug = false,
}: {
  hasConsent: boolean
  debug?: boolean
}) {
  const pathname = usePathname()
  const [isLoaded, setIsLoaded] = useState(false)

  // Track page views on route changes (SPA navigation)
  useEffect(() => {
    if (!isLoaded || !pathname || !window.gtag) return

    // Send page view to GA4
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
      debug_mode: debug,
    })

    if (debug) {
      console.log('[GA4] Page view tracked:', pathname)
    }
  }, [pathname, isLoaded, debug])

  const handleScriptLoad = () => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []

    // Correct gtag implementation - must use arguments object, not spread
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }

    // Attach gtag function to window
    window.gtag = gtag as typeof window.gtag

    // Initialize GA4
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, {
      debug_mode: debug,
    })

    setIsLoaded(true)

    if (debug) {
      console.log('[GA4] Script loaded and initialized')
    }
  }

  const handleScriptError = () => {
    console.error('[GA4] Failed to load Google Analytics script')
  }

  // Only render if user has given consent (GDPR compliance)
  if (!hasConsent) {
    return null
  }

  return (
    <Script
      id="google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
      onLoad={handleScriptLoad}
      onError={handleScriptError}
    />
  )
}

// Utility function for tracking custom events
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}
