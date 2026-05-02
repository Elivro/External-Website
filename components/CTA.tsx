'use client'

import { useState, useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

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
        headers: { 'Content-Type': 'application/json' },
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

  const inputClass =
    'w-full px-4 py-3 bg-ink border border-edge-strong rounded-obs-md text-fg placeholder-fg-muted ' +
    'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 ' +
    'font-sans text-sm transition-colors ease-obsidian duration-obs-sm'

  return (
    <section
      id="cta-section"
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-ink relative"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <div>
            <p
              className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              }}
            >
              Boka en demo
            </p>
            <h2
              className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.05] mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms',
              }}
            >
              Låt oss börja <em className="font-serif italic">samtalet</em>.
            </h2>

            <p
              className="text-fg-soft text-lg leading-[1.55] mb-10 max-w-md"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 160ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 160ms',
              }}
            >
              Ett samtal om er verksamhet, era utmaningar, och hur Elivro skulle se ut hos er. Inget säljmanus — bara dialog.
            </p>

            <ul
              className="space-y-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 240ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 240ms',
              }}
            >
              {[
                'Ingen kostnad, ingen bindningstid',
                'Vi hör av oss inom 24 timmar',
                '30 dagars test om vi blir överens',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-fg-soft text-sm">
                  <span aria-hidden="true" className="mt-[0.6em] w-3 h-px bg-accent flex-shrink-0" />
                  <span className="leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="bg-ink-lift border border-edge rounded-obs-lg p-8 lg:p-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name-input" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">
                    Namn
                  </label>
                  <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ditt namn" required className={inputClass} />
                </div>

                <div>
                  <label htmlFor="company-input" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">
                    Företag
                  </label>
                  <input id="company-input" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Företagsnamn" required className={inputClass} />
                </div>

                <div>
                  <label htmlFor="email-input" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">
                    E-post
                  </label>
                  <input id="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="namn@foretag.se" required className={inputClass} />
                </div>

                <div>
                  <label htmlFor="phone-input" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">
                    Telefon
                  </label>
                  <input id="phone-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="070-123 45 67" required className={inputClass} />
                </div>

                <div
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                  aria-hidden="true"
                >
                  <label htmlFor="cta-website">Website</label>
                  <input id="cta-website" type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-6 py-3 font-sans text-sm rounded-obs-md transition-colors ease-obsidian duration-obs-sm ${
                    submitted
                      ? 'bg-ink-card text-fg border border-accent'
                      : 'bg-accent text-ink hover:bg-accent-bright active:bg-accent-deep'
                  } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Skickar…' : submitted ? 'Skickat — vi hör av oss inom 24 timmar' : 'Boka en demo'}
                </button>
              </div>

              <p className="text-center mt-4 text-fg-muted text-xs leading-[1.55]">
                Vi behandlar dina uppgifter med respekt.{' '}
                <a href="/integritetspolicy" className="text-fg-soft hover:text-accent underline underline-offset-2 transition-colors ease-obsidian duration-obs-sm">
                  Integritetspolicy
                </a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
