'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Check } from 'lucide-react'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const formOpenTimeRef = useRef<number>(0)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      formOpenTimeRef.current = Date.now()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (honeypot) {
      console.log('Bot detected via honeypot')
      return
    }

    setIsSubmitting(true)

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
          timestamp: formOpenTimeRef.current,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ett fel uppstod')
      }

      setIsSubmitting(false)
      setSubmitted(true)

      setTimeout(() => {
        setName('')
        setCompany('')
        setEmail('')
        setPhone('')
        setHoneypot('')
        setSubmitted(false)
        onClose()
      }, 3000)

    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
      alert(error instanceof Error ? error.message : 'Ett fel uppstod. Försök igen senare.')
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-md bg-cream-50 rounded-sm border border-charcoal/10 shadow-2xl animate-slide-up"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700 transition-colors duration-200 p-1.5 hover:bg-charcoal/5 rounded-sm"
          aria-label="Stäng modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 lg:p-10">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="w-12 h-0.5 bg-terracotta mb-6" />
                <h2 id="modal-title" className="font-serif text-2xl text-charcoal-700 mb-2">
                  Boka demo
                </h2>
                <p className="font-mono text-sm text-charcoal-500 tracking-wide">
                  Fyll i dina uppgifter så kontaktar vi dig.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="modal-name" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    Namn
                  </label>
                  <input
                    ref={firstInputRef}
                    id="modal-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-300 rounded-sm text-charcoal placeholder-charcoal-400
                      focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10
                      font-mono text-sm transition-all duration-200"
                    placeholder="Ditt namn"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="modal-company" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    Företag
                  </label>
                  <input
                    id="modal-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-300 rounded-sm text-charcoal placeholder-charcoal-400
                      focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10
                      font-mono text-sm transition-all duration-200"
                    placeholder="Företagsnamn"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="modal-email" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    E-post
                  </label>
                  <input
                    id="modal-email"
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

                {/* Phone */}
                <div>
                  <label htmlFor="modal-phone" className="block font-mono text-sm text-charcoal-500 tracking-wide mb-2">
                    Telefon
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-300 rounded-sm text-charcoal placeholder-charcoal-400
                      focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10
                      font-mono text-sm transition-all duration-200"
                    placeholder="070-123 45 67"
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
                  <label htmlFor="modal-website">Website</label>
                  <input
                    id="modal-website"
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 px-6 py-4 bg-terracotta hover:bg-terracotta-600 text-cream-50 font-mono font-medium rounded-sm
                    shadow-terracotta hover:shadow-terracotta-lg
                    transition-all duration-200
                    disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka förfrågan'}
                </button>
              </form>
            </>
          ) : (
            /* Success message */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-sage-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-sage-500" strokeWidth={2.5} />
              </div>
              <h3 className="font-serif text-2xl text-charcoal-700 mb-2">Tack!</h3>
              <p className="font-mono text-sm text-charcoal-500 tracking-wide">Vi hör av oss snart.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
