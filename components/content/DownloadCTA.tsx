'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface DownloadCTAProps {
  title?: string
  description?: string
  fileName: string
  guideName?: string
}

export function DownloadCTA({
  title = 'Ladda ner som PDF',
  description = 'Få guiden som PDF + bonus-checklista för månatlig uppföljning',
  fileName,
  guideName,
}: DownloadCTAProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'guide_download',
          guide: guideName || fileName,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      // Trigger PDF download (you'll need to generate PDFs from the markdown)
      // For now, this is a placeholder
      // window.open(`/downloads/${fileName}`, '_blank')

      setSubmitted(true)
    } catch (err) {
      setError('Något gick fel. Försök igen.')
      console.error('Download CTA error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="my-8 p-8 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl border border-violet-500/20">
        <div className="flex items-start gap-4">
          <div className="text-4xl">✅</div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Tack! Din guide är på väg</h3>
            <p className="text-zinc-300 mb-3">
              Vi har skickat PDF:en till <strong className="text-white">{email}</strong>.
              <br />
              Kolla din inkorg (och skräppost om du inte ser den inom några minuter).
            </p>
            <p className="text-sm text-zinc-400">
              💡 Medan du väntar kan du{' '}
              <a href="#cta-section" className="text-violet-400 hover:underline">
                boka en gratis demo
              </a>{' '}
              av Elivro.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-8 p-8 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl border border-violet-500/20">
      <div className="flex items-start gap-4 mb-6">
        <div className="text-4xl">📥</div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-zinc-300">{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="din@email.se"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition"
          />
          <Button type="submit" disabled={loading} className="sm:w-auto w-full">
            {loading ? 'Skickar...' : 'Ladda ner gratis'}
          </Button>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <p className="text-xs text-zinc-500">
          🔒 Ingen spam. Vi använder din e-post endast för att skicka guiden och relevanta resurser om Elivro.
          <br />
          Du kan avregistrera dig när som helst.
        </p>
      </form>
    </div>
  )
}
