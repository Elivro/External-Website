'use client'

import { useState, useEffect, useRef } from 'react'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ett fel uppstod')
      }

      // Success
      setIsSubmitting(false)
      setSubmitted(true)

      // Reset form and close modal after showing success message
      setTimeout(() => {
        setName('')
        setCompany('')
        setEmail('')
        setSubmitted(false)
        onClose()
      }, 3000)

    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
      alert(error instanceof Error ? error.message : 'Ett fel uppstod. Försök igen senare.')
    }
  }

  // Click outside to close
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl shadow-violet-500/10 animate-slide-in-up"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/5 rounded-lg"
          aria-label="Stäng modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 id="modal-title" className="text-2xl font-bold text-white mb-2">
                  Boka en demo
                </h2>
                <p className="text-zinc-400 text-sm">
                  Fyll i dina uppgifter så kontaktar vi dig inom 24 timmar.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="modal-name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Namn
                  </label>
                  <input
                    ref={firstInputRef}
                    id="modal-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-zinc-800/50 border-2 border-zinc-700/50 rounded-xl text-white placeholder-zinc-500
                      focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20
                      transition-all duration-300 text-base"
                    placeholder="Ditt namn"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="modal-company" className="block text-sm font-medium text-zinc-300 mb-2">
                    Företagsnamn
                  </label>
                  <input
                    id="modal-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-zinc-800/50 border-2 border-zinc-700/50 rounded-xl text-white placeholder-zinc-500
                      focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20
                      transition-all duration-300 text-base"
                    placeholder="Ditt företag"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium text-zinc-300 mb-2">
                    E-postadress
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-zinc-800/50 border-2 border-zinc-700/50 rounded-xl text-white placeholder-zinc-500
                      focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20
                      transition-all duration-300 text-base"
                    placeholder="E-post"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl
                    shadow-lg shadow-violet-500/40 hover:shadow-xl hover:shadow-violet-500/60
                    transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka förfrågan'}
                </button>
              </form>
            </>
          ) : (
            /* Success message */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Tack!</h3>
              <p className="text-zinc-400">Vi hör av oss snart.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
