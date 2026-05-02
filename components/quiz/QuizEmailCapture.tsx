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
  const [consent, setConsent] = useState(false)
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
    if (firstInputRef.current) firstInputRef.current.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (honeypot) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: state.answers,
          company,
          email,
          honeypot,
          timestamp: formOpenTimeRef.current,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Ett fel uppstod')

      onNext({ currentStep: 'complete', company, email })
    } catch (err) {
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'Ett fel uppstod. Försök igen senare.')
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 bg-ink border border-edge-strong rounded-obs-md text-fg placeholder-fg-muted ' +
    'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 ' +
    'font-sans text-sm transition-colors ease-obsidian duration-obs-sm'

  return (
    <div className="min-h-screen flex items-center bg-ink">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

          <div className="hidden lg:flex lg:col-span-5 items-center justify-end overflow-hidden pr-8">
            <div className="-ml-32 w-full max-w-2xl">
              <Image
                src="/brand-assets/elivro-header-asset_hands.png"
                alt=""
                width={700}
                height={700}
                className="w-full h-auto"
                style={{
                  filter: 'brightness(0.85) sepia(0.15) hue-rotate(-10deg)',
                  mixBlendMode: 'lighten',
                  opacity: 0.78,
                }}
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
            <div className="max-w-xl w-full">
              <h2
                className="font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-light text-fg leading-[1.1] tracking-[-0.021em] mb-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 400ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                }}
              >
                Vi skickar er en <em className="font-serif italic">personlig</em> bedömning.
              </h2>

              <p
                className="text-fg-soft text-base sm:text-lg leading-[1.55] mb-8"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 400ms cubic-bezier(0.2, 0.7, 0.2, 1) 100ms, transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1) 100ms',
                }}
              >
                Baserat på era svar får ni konkreta förslag på hur Elivro kan hjälpa er.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                  transition: prefersReducedMotion ? 'none' : 'opacity 400ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms, transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
                }}
              >
                <div>
                  <label htmlFor="company" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">
                    Företagsnamn
                  </label>
                  <input ref={firstInputRef} id="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} required minLength={2} className={inputClass} placeholder="Ert företagsnamn" />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">
                    E-post
                  </label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} placeholder="namn@foretag.se" />
                </div>

                <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 rounded-obs-sm border-edge-strong bg-ink text-accent focus:ring-accent/20 cursor-pointer"
                  />
                  <span className="text-fg-soft text-sm leading-[1.55]">
                    Jag godkänner att Elivro sparar mina uppgifter för att skicka en personlig bedömning och eventuellt kontakta mig.{' '}
                    <Link href="/integritetspolicy" className="text-fg hover:text-accent underline underline-offset-2 transition-colors ease-obsidian duration-obs-sm">
                      Läs vår integritetspolicy
                    </Link>
                  </span>
                </label>

                {error && (
                  <div className="p-4 bg-ink-lift border border-accent rounded-obs-md">
                    <p className="text-fg-soft text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !consent}
                  className="w-full px-6 py-3 bg-accent hover:bg-accent-bright active:bg-accent-deep text-ink font-sans text-sm rounded-obs-md transition-colors ease-obsidian duration-obs-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Skickar…' : 'Få min bedömning'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
