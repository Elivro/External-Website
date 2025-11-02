'use client'

import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  return (
    <section className="w-full py-40 sm:py-56 bg-zinc-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-48 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Main CTA Card */}
          <div className="glass rounded-2xl p-10 sm:p-16 lg:p-20 text-center border border-slate-800 shadow-md">
          <div className="mb-16 animate-slide-in-up flex flex-col items-center justify-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-8">
              Boka din personliga demo idag
            </h2>
            <div className="w-full flex justify-center">
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mb-8 leading-relaxed text-center">
                Se hur Elivro kan transformera din rekryteringsprocess. Vår team visar
                hur du kan spara tid och hitta bättre kandidater.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 animate-slide-in-up mb-16 sm:mb-20" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Din e-postadress"
                required
                className="flex-1 px-6 py-4 bg-zinc-800 border border-slate-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors duration-300 text-base"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 sm:px-12 py-4 font-semibold rounded-lg transition-all duration-300 whitespace-nowrap text-base
                  ${
                    submitted
                      ? 'bg-green-500 text-white'
                      : 'bg-violet-500 hover:bg-violet-600 text-white hover:shadow-lg hover:scale-105'
                  }
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? 'Skickar...' : submitted ? '✓ Skickad!' : 'Boka demo'}
              </button>
            </div>
            <p className="text-zinc-500 text-sm text-center">
              Ingen kreditkort krävs. Vi kontaktar dig inom 24 timmar.
            </p>
          </form>

          {/* Benefits */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-16 sm:pt-20 border-t border-slate-800">
            <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-violet-500 mb-3">24h</div>
              <p className="text-zinc-400 text-base">Personligt möte inom en dag</p>
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-bold text-violet-500 mb-3">100%</div>
              <p className="text-zinc-400 text-base">Kostnadsfri provperiod</p>
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-4xl font-bold text-violet-500 mb-3">∞</div>
              <p className="text-zinc-400 text-base">Ingen långsiktig avtalsperiod</p>
            </div>
          </div>
        </div>

          {/* Footer note */}
          <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-zinc-500 text-sm">
              Elivro - Det bästa rekryteringsverktyget i assistansbranschen
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
