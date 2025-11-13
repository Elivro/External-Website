'use client'

import { useEffect, useState } from 'react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay before showing banner to not interrupt initial page load
      setTimeout(() => setShowBanner(true), 1000)
    } else if (consent === 'accepted') {
      // If previously accepted, load GA
      loadGoogleAnalytics()
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
    loadGoogleAnalytics()
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  const loadGoogleAnalytics = () => {
    // Only load if not already loaded
    if (typeof window.gtag !== 'undefined') return

    // Load gtag.js script
    const script1 = document.createElement('script')
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-J9PTC943YB'
    script1.async = true
    document.head.appendChild(script1)

    // Initialize gtag
    script1.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      window.gtag = gtag
      gtag('js', new Date())
      gtag('config', 'G-J9PTC943YB')
    }
  }

  if (!showBanner) return null

  return (
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
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
