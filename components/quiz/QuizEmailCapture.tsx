'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { QuizState } from '@/types/quiz'

interface QuizEmailCaptureProps {
  state: QuizState
  onNext: (updates: Partial<QuizState>) => void
}

export default function QuizEmailCapture({ state, onNext }: QuizEmailCaptureProps) {
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const firstInputRef = useRef<HTMLInputElement>(null)
  const formOpenTimeRef = useRef<number>(0)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    setMounted(true)
    formOpenTimeRef.current = Date.now()
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Honeypot check
    if (honeypot) {
      console.log('Bot detected via honeypot')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: state.answers,
          company,
          email,
          honeypot,
          timestamp: formOpenTimeRef.current,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ett fel uppstod')
      }

      // Success - move to completion screen
      onNext({
        currentStep: 'complete',
        company,
        email
      })

    } catch (err) {
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'Ett fel uppstod. Försök igen senare.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center bg-cream">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

          {/* LEFT COLUMN - Illustration (40%) */}
          <div className="hidden lg:flex lg:col-span-5 bg-cream-200/30 items-center justify-center p-8">
            <div className="max-w-lg w-full">
              {/* Reuse the hands illustration */}
              <Image
                src="/brand-assets/elivro-header-asset_hands.png"
                alt="Illustration av sammanflätade händer"
                width={600}
                height={600}
                className="w-full h-auto opacity-60"
                priority
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Content (60%) */}
          <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
            <div className="max-w-xl w-full">

              {/* Headline */}
              <h2
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-700 leading-tight mb-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.4s ease-out, transform 0.4s ease-out'
                }}
              >
                Vi skickar er en personlig bedömning
              </h2>

              {/* Subtext */}
              <p
                className="font-mono text-base sm:text-lg text-charcoal-500 tracking-wide leading-relaxed mb-8"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s'
                }}
              >
                Baserat på er utmaning får ni konkreta förslag på hur Elivro kan hjälpa er.
              </p>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s'
                }}
              >
                {/* Company Name */}
                <div>
                  <label htmlFor="company" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    Företagsnamn
                  </label>
                  <input
                    ref={firstInputRef}
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    minLength={2}
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-300 rounded-sm text-charcoal placeholder-charcoal-400
                      focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10
                      font-mono text-sm transition-all duration-200"
                    placeholder="Ert företagsnamn"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    E-post
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-300 rounded-sm text-charcoal placeholder-charcoal-400
                      focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10
                      font-mono text-sm transition-all duration-200"
                    placeholder="namn@foretag.se"
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
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-sm">
                    <p className="font-mono text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-terracotta hover:bg-terracotta-600 text-cream-50 font-mono font-medium rounded-sm
                    shadow-terracotta hover:shadow-terracotta-lg
                    transition-all duration-200
                    disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Skickar...' : 'Få min bedömning'}
                </button>

                {/* Footer */}
                <p className="font-mono text-xs text-charcoal-400 tracking-wide text-center">
                  Vi behandlar dina uppgifter med respekt. Läs vår{' '}
                  <Link href="/integritetspolicy" className="underline hover:text-terracotta transition-colors">
                    integritetspolicy
                  </Link>
                  .
                </p>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
