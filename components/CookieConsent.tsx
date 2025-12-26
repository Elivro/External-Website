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
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl p-4 backdrop-blur-sm">
            <p className="text-sm text-zinc-300 mb-3">
              Vi använder cookies för att förbättra din upplevelse.{' '}
              <a
                href="/integritetspolicy"
                className="text-white hover:text-zinc-300 underline transition-colors"
              >
                Läs mer
              </a>
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-all duration-200"
              >
                Acceptera
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 px-4 py-2 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors duration-200"
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
