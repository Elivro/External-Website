'use client'

import { useState, useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Check } from 'lucide-react'

export default function CTA() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const formMountTimeRef = useRef<number>(0)

  useEffect(() => {
    formMountTimeRef.current = Date.now()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
          honeypot,
          timestamp: formMountTimeRef.current,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ett fel uppstod')
      }

      setIsLoading(false)
      setSubmitted(true)
      setName('')
      setCompany('')
      setEmail('')
      setPhone('')
      setHoneypot('')

      setTimeout(() => setSubmitted(false), 5000)

    } catch (error) {
      console.error('Form submission error:', error)
      setIsLoading(false)
      alert(error instanceof Error ? error.message : 'Ett fel uppstod. Försök igen senare.')
    }
  }

  return (
    <section
      id="cta-section"
      ref={sectionRef}
      className="w-full py-20 md:py-28 lg:py-32 bg-sage/20 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Editorial Text */}
          <div>
            {/* Accent line */}
            <div
              className="w-16 h-0.5 bg-terracotta mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'all 0.5s ease-out'
              }}
            />

            <h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-700 tracking-tight mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.5s ease-out 0.1s'
              }}
            >
              Låt oss börja samtalet
            </h2>

            <p
              className="text-charcoal-500 text-lg leading-relaxed mb-8 max-w-md"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.5s ease-out 0.2s'
              }}
            >
              Ett samtal om er verksamhet, era utmaningar, och hur omsorg kan organiseras vackrare. Ingen demo-mall – bara äkta dialog.
            </p>

            {/* Trust Signals */}
            <div
              className="space-y-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.5s ease-out 0.3s'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-sage-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-sage-500" strokeWidth={3} />
                </div>
                <span className="font-mono text-sm text-charcoal-500 tracking-wide">Ingen kostnad, ingen stress</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-sage-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-sage-500" strokeWidth={3} />
                </div>
                <span className="font-mono text-sm text-charcoal-500 tracking-wide">Vi hör av oss inom 24 timmar</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-sage-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-sage-500" strokeWidth={3} />
                </div>
                <span className="font-mono text-sm text-charcoal-500 tracking-wide">30 dagar att upptäcka skillnaden</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className="bg-cream-50 border border-charcoal/10 rounded-sm p-8 lg:p-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.2s'
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name-input" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    Namn
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ditt namn"
                    required
                    aria-label="Ditt namn"
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-300 rounded-sm text-charcoal placeholder-charcoal-400
                      focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10
                      font-mono text-sm transition-all duration-200"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company-input" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    Företag
                  </label>
                  <input
                    id="company-input"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Företagsnamn"
                    required
                    aria-label="Företagsnamn"
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-300 rounded-sm text-charcoal placeholder-charcoal-400
                      focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10
                      font-mono text-sm transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email-input" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    E-post
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="namn@foretag.se"
                    required
                    aria-label="E-postadress"
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-300 rounded-sm text-charcoal placeholder-charcoal-400
                      focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10
                      font-mono text-sm transition-all duration-200"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone-input" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    Telefon
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="070-123 45 67"
                    required
                    aria-label="Telefonnummer"
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-300 rounded-sm text-charcoal placeholder-charcoal-400
                      focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10
                      font-mono text-sm transition-all duration-200"
                  />
                </div>

                {/* Honeypot */}
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
                    w-full px-6 py-4 font-mono font-medium rounded-sm transition-all duration-200 text-base
                    ${
                      submitted
                        ? 'bg-sage-500 text-cream-50'
                        : 'bg-terracotta hover:bg-terracotta-600 text-cream-50 shadow-terracotta hover:shadow-terracotta-lg'
                    }
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {isLoading ? 'Skickar...' : submitted ? 'Skickat!' : 'Boka en demo'}
                </button>
              </div>

              {/* Privacy notice */}
              <p className="text-center mt-4 font-mono text-xs text-charcoal-400 tracking-wide">
                Vi behandlar dina uppgifter med respekt. Läs vår{' '}
                <a
                  href="/integritetspolicy"
                  className="text-terracotta hover:text-terracotta-600 underline transition-colors"
                >
                  integritetspolicy
                </a>.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
