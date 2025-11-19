'use client'

import { Button } from '@/components/ui/Button'

interface DemoCTAProps {
  variant?: 'inline' | 'full'
  headline?: string
  message?: string
  showSecondaryButton?: boolean
}

export function DemoCTA({
  variant = 'inline',
  headline = 'Redo att testa Elivro?',
  message = 'Boka en gratis demo och se hur Elivro kan förenkla er assistansverksamhet',
  showSecondaryButton = false,
}: DemoCTAProps) {
  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('cta-section')
    if (element) {
      const navbarHeight = 64
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight - 20
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  if (variant === 'inline') {
    return (
      <div className="my-6 p-6 bg-zinc-800/30 border-l-4 border-violet-500 rounded-r-lg">
        <p className="text-white font-medium mb-3">{message}</p>
        <Button onClick={scrollToDemo} variant="secondary">
          Boka demo
        </Button>
      </div>
    )
  }

  return (
    <div className="my-12 p-12 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30 text-center">
      <h3 className="text-3xl font-bold text-white mb-4">{headline}</h3>
      <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">{message}</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button onClick={scrollToDemo} variant="primary" size="lg">
          Boka gratis demo
        </Button>
        {showSecondaryButton && (
          <Button href="/gratis-testversion" variant="secondary" size="lg">
            Starta 30-dagars testversion
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-6 justify-center mt-6 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>30 dagars pengarna-tillbaka</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Ingen bindningstid</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Inget kreditkort krävs</span>
        </div>
      </div>
    </div>
  )
}
