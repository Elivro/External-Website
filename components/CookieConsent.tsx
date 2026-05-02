'use client'

import { useEffect, useState } from 'react'
import GoogleAnalytics from './GoogleAnalytics'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1000)
    } else if (consent === 'accepted') {
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
      <GoogleAnalytics
        hasConsent={hasConsent}
        debug={process.env.NODE_ENV === 'development'}
      />

      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 sm:max-w-sm">
          <div className="bg-ink-card border border-edge-strong rounded-obs-lg shadow-obs-card p-5">
            <p className="text-fg-soft text-sm leading-[1.55] mb-4">
              Vi använder cookies för att förbättra upplevelsen.{' '}
              <a
                href="/integritetspolicy"
                className="text-fg hover:text-accent underline underline-offset-2 transition-colors ease-obsidian duration-obs-sm"
              >
                Läs mer
              </a>
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2 font-sans text-sm text-ink bg-accent hover:bg-accent-bright active:bg-accent-deep rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
              >
                Acceptera
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 px-4 py-2 font-sans text-sm text-fg-soft bg-ink-lift hover:bg-ink hover:text-fg rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
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
