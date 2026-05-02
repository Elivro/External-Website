'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function QuizComplete() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    sessionStorage.removeItem('elivro-quiz-state')

    const timeout = setTimeout(() => router.push('/'), 3000)
    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="text-center max-w-md">

        <p
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent mb-8"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 400ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
        >
          Skickat
        </p>

        <h2
          className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-fg leading-[1.05] tracking-[-0.021em] mb-4"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 100ms, transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 100ms',
          }}
        >
          <em className="font-serif italic">Tack.</em>
        </h2>

        <p
          className="text-fg-soft text-base sm:text-lg leading-[1.55] mb-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms, transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
          }}
        >
          Bedömningen ligger i er inkorg om ett ögonblick.
        </p>

        <p
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 400ms cubic-bezier(0.2, 0.7, 0.2, 1) 300ms',
          }}
        >
          Du omdirigeras till startsidan…
        </p>
      </div>
    </div>
  )
}
