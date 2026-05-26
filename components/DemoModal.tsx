'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

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
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modal: 'demo' }, '')
      const handlePopState = () => onClose()
      window.addEventListener('popstate', handlePopState)
      return () => window.removeEventListener('popstate', handlePopState)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && firstInputRef.current) firstInputRef.current.focus()
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) formOpenTimeRef.current = Date.now()
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, honeypot, timestamp: formOpenTimeRef.current }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Ett fel uppstod')

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
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  const inputClass =
    'w-full px-4 py-3 bg-ink border border-edge-strong rounded-obs-md text-fg placeholder-fg-muted ' +
    'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 ' +
    'font-sans text-sm transition-colors ease-obsidian duration-obs-sm'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        animation: 'obsFadeUp 300ms cubic-bezier(0.2, 0.7, 0.2, 1)',
      }}
    >
      {/* Backdrop — solid ink, no blur per Obsidian anti-pattern */}
      <div className="absolute inset-0 bg-ink/85" />

      {/* Modal — sh-hero class equivalent via shadow-obs-hero */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-md bg-ink-card rounded-obs-lg border border-edge-strong shadow-obs-hero"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-fg-muted hover:text-fg transition-colors ease-obsidian duration-obs-sm p-1.5 hover:bg-ink-lift rounded-obs-md"
          aria-label="Stäng modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 lg:p-10">
          {!submitted ? (
            <>
              <div className="mb-8">
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
                  Boka demo
                </p>
                <h2 id="modal-title" className="font-serif text-2xl font-normal text-fg leading-[1.2] mb-2">
                  Ett kort <em className="font-serif italic">samtal</em>.
                </h2>
                <p className="text-fg-soft text-sm leading-[1.55]">
                  Fyll i, så hör vi av oss inom 24 timmar.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="modal-name" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">Namn</label>
                  <input ref={firstInputRef} id="modal-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} placeholder="Ditt namn" />
                </div>

                <div>
                  <label htmlFor="modal-company" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">Företag</label>
                  <input id="modal-company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} required className={inputClass} placeholder="Företagsnamn" />
                </div>

                <div>
                  <label htmlFor="modal-email" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">E-post</label>
                  <input id="modal-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} placeholder="namn@foretag.se" />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-2">Telefon</label>
                  <input id="modal-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className={inputClass} placeholder="070-123 45 67" />
                </div>

                <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                  <label htmlFor="modal-website">Website</label>
                  <input id="modal-website" type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 px-6 py-3 bg-accent hover:bg-accent-bright active:bg-accent-deep text-ink font-sans text-sm rounded-obs-md transition-colors ease-obsidian duration-obs-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Skickar…' : 'Skicka förfrågan'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
                Skickat
              </p>
              <h3 className="font-serif text-2xl font-normal text-fg mb-3">
                Tack — vi hör av oss <em className="font-serif italic">snart</em>.
              </h3>
              <p className="text-fg-soft text-sm">
                Inom 24 timmar, ofta tidigare.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
