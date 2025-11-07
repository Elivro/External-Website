'use client'

import { useState } from 'react'

export default function CTA() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)

    } catch (error) {
      console.error('Form submission error:', error)
      setIsLoading(false)
      alert(error instanceof Error ? error.message : 'Ett fel uppstod. Försök igen senare.')
    }
  }

  return (
    <section id="cta-section" className="w-full py-24 md:py-32 bg-zinc-900 relative overflow-hidden">
      {/* Enhanced purple radial glow - matching hero */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card */}
        <div className="mx-auto max-w-4xl">
          {/* Headline & Subcopy */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Boka din personliga demo idag
            </h2>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Se hur Elivro kan transformera din rekryteringsprocess. Spara tid, hitta bättre kandidater, och automatisera det som tar längst tid.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mb-16 animate-slide-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Name and Company Name - Two columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20
                      transition-all duration-300 text-base backdrop-blur-sm"
                  />
                </div>

                {/* Company Name Input */}
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
                      focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20
                      transition-all duration-300 text-base backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Email and Submit Button */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Email Input with accessible label */}
                <div className="flex-1">
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
                      focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20
                      transition-all duration-300 text-base backdrop-blur-sm"
                  />
                </div>

                {/* Submit Button with purple glow */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    px-8 py-4 font-semibold rounded-xl transition-all duration-300 whitespace-nowrap text-base
                    ${
                      submitted
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                        : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/40 hover:shadow-xl hover:shadow-violet-500/60 hover:scale-[1.02] active:scale-[0.98]'
                    }
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
                    disabled:hover:scale-100
                  `}
                >
                  {isLoading ? 'Skickar...' : submitted ? '✓ Skickad!' : 'Boka en demo'}
                </button>
              </div>
            </div>

            {/* Reassurance text */}
            <p className="text-zinc-400 text-sm text-center mt-4">
              Vi kontaktar dig inom 24 timmar.
            </p>
          </form>

          {/* Stats/Proof section with icons */}
          <div className="flex justify-center pt-12 border-t border-zinc-800/50 max-w-3xl mx-auto">
            {/* Stat 1 - Clock icon */}
            <div className="text-center animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-5xl font-bold text-violet-400 mb-2">24h</div>
              <p className="text-zinc-400 text-sm leading-relaxed">Personligt möte inom en dag</p>
            </div>
          </div>
        </div>

        {/* Footer tagline */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-zinc-500 text-sm">
            Elivro - Det bästa rekryteringsverktyget i assistansbranschen
          </p>
        </div>
      </div>
    </section>
  )
}
