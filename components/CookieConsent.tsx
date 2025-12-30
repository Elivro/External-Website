'use client'

import { useEffect, useState } from 'react'
import GoogleAnalytics from './GoogleAnalytics'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay before showing banner to not interrupt initial page load
      setTimeout(() => setShowBanner(true), 1000)
    } else if (consent === 'accepted') {
      // If previously accepted, enable GA
      setHasConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
    setHasConsent(true)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
    setHasConsent(false)
  }

  return (
    <>
      {/* Google Analytics - only loads after consent */}
      <GoogleAnalytics
        hasConsent={hasConsent}
        debug={process.env.NODE_ENV === 'development'}
      />

      {/* Cookie consent banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 sm:max-w-sm">
          <div className="bg-cream border border-charcoal-200 rounded-sm shadow-lg p-4 mx-auto sm:mx-0">
            <p className="font-sans text-sm text-charcoal-500 mb-3">
              Vi använder cookies för att förbättra din upplevelse.{' '}
              <a
                href="/integritetspolicy"
                className="text-charcoal hover:text-terracotta underline underline-offset-2 transition-colors duration-200"
              >
                Läs mer
              </a>
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2.5 font-mono text-sm font-medium text-cream-50 bg-terracotta hover:bg-terracotta-600 rounded-sm transition-all duration-200 shadow-terracotta"
              >
                Acceptera
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 px-4 py-2.5 font-mono text-sm font-medium text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream rounded-sm transition-all duration-200"
              >
                Avvisa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
