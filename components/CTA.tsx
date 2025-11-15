'use client'

import { useState, useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function CTA() {
  const isVisible = useIntersectionObserver(0.1)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [honeypot, setHoneypot] = useState('') // Anti-bot honeypot field
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const formMountTimeRef = useRef<number>(0)

  // Silent timer - track when form loads for bot detection
  useEffect(() => {
    formMountTimeRef.current = Date.now()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      console.log('Bot detected via honeypot')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          honeypot, // Send to API for server-side validation too
          timestamp: formMountTimeRef.current,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ett fel uppstod')
      }

      // Success
      setIsLoading(false)
      setSubmitted(true)
      setName('')
      setCompany('')
      setEmail('')
      setPhone('')
      setHoneypot('')

      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)

    } catch (error) {
      console.error('Form submission error:', error)
      setIsLoading(false)
      alert(error instanceof Error ? error.message : 'Ett fel uppstod. Försök igen senare.')
    }
  }

  return (
      <section id="cta-section" className="w-full py-18 md:py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
        {/* Enhanced green/emerald radial glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-green-400 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================
            PRICING SECTION - TEMPORARILY REMOVED
            Date: 2025-11-12
            Reason: Shifting focus to demo booking only per user request
            Note: Keep code for potential future use
            ======================================== */}
        {/* PRICING CODE COMMENTED OUT - Lines 62-179
        <div className="mx-auto max-w-7xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Transparent prissättning
          </h2>
          ... [pricing tiers removed for brevity]
        </div>
        */}

        {/* Main CTA Card */}
        <div className="mx-auto max-w-4xl">
          {/* Headline */}
          <div className="text-center mb-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-300 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '0ms',
              }}
            >
              Boka demo
            </h2>
            <p
              className="text-lg text-zinc-300 max-w-2xl mx-auto transition-all duration-300 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '150ms',
              }}
            >
              Vi visar hur Elivro kan hjälpa er med bättre rekrytering, snabbare schemaläggning och enklare rapportering. Kostnadsfritt och utan förpliktelser.
            </p>
          </div>

          {/* Trust Signals */}
          <div
            className="flex items-center justify-center gap-8 mb-8 text-zinc-300 transition-all duration-300 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '300ms',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-lg">✓</span>
              <span className="text-sm">Kostnadsfritt</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-lg">✓</span>
              <span className="text-sm">Svar inom 24h</span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mb-16 transition-all duration-300 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '450ms',
            }}
          >
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="name-input" className="sr-only">
                    Ditt namn
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ditt namn"
                    required
                    aria-label="Ditt namn"
                    className="w-full px-6 py-4 bg-zinc-800/50 border-2 border-zinc-700/50 rounded-xl text-white placeholder-zinc-500
                      focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20
                      transition-all duration-300 text-base backdrop-blur-sm"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone-input" className="sr-only">
                    Telefonnummer
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefonnummer"
                    required
                    aria-label="Telefonnummer för kontakt"
                    className="w-full px-6 py-4 bg-zinc-800/50 border-2 border-zinc-700/50 rounded-xl text-white placeholder-zinc-500
                      focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20
                      transition-all duration-300 text-base backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Row 2: Company and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Input */}
                <div>
                  <label htmlFor="company-input" className="sr-only">
                    Företagsnamn
                  </label>
                  <input
                    id="company-input"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Företagsnamn"
                    required
                    aria-label="Företagsnamn"
                    className="w-full px-6 py-4 bg-zinc-800/50 border-2 border-zinc-700/50 rounded-xl text-white placeholder-zinc-500
                      focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20
                      transition-all duration-300 text-base backdrop-blur-sm"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email-input" className="sr-only">
                    E-postadress
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-post"
                    required
                    aria-label="E-postadress för att boka demo"
                    className="w-full px-6 py-4 bg-zinc-800/50 border-2 border-zinc-700/50 rounded-xl text-white placeholder-zinc-500
                      focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20
                      transition-all duration-300 text-base backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Honeypot field - hidden from humans, visible to bots */}
              <div
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
                aria-hidden="true"
              >
                <label htmlFor="cta-website">Website</label>
                <input
                  id="cta-website"
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full px-8 py-4 font-semibold rounded-xl transition-all duration-300 text-base
                  ${
                    submitted
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/60 hover:scale-[1.02] active:scale-[0.98]'
                  }
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
                  disabled:hover:scale-100
                `}
              >
                {isLoading ? 'Skickar...' : submitted ? '✓ Skickad!' : 'Boka en demo'}
              </button>
            </div>

            {/* Reassurance text */}
            <div className="text-center mt-4 space-y-2">
              <p className="text-zinc-400 text-sm">
                Vi kontaktar dig inom 24 timmar för att boka en personlig demo.
              </p>
              <p className="text-zinc-500 text-xs">
                Genom att skicka formuläret godkänner du vår{' '}
                <a
                  href="/integritetspolicy"
                  className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
                >
                  integritetspolicy
                </a>.
              </p>
            </div>
          </form>

        </div>

      </div>
    </section>
  )
}
