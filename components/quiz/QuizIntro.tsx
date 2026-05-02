'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { QuizState } from '@/types/quiz'

interface QuizIntroProps {
  onNext: (updates: Partial<QuizState>) => void
}

export default function QuizIntro({ onNext }: QuizIntroProps) {
  const [mounted, setMounted] = useState(false)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStart = () => {
    onNext({ currentStep: 'questions', currentQuestionIndex: 0 })
  }

  return (
    <div className="min-h-screen flex items-center bg-ink">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

          {/* Illustration column — bleeds left, dark-treated */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-end overflow-hidden pr-8">
            <div className="-ml-32 w-full max-w-2xl">
              <Image
                src="/brand-assets/elivro-header-asset_hands.png"
                alt="Sammanflätade händer"
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
              <p
                className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-6"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                }}
              >
                2 minuter att svara
              </p>

              <h1
                className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-light text-fg leading-[1.05] tracking-[-0.021em] mb-6"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 100ms',
                }}
              >
                Är Elivro <em className="font-serif italic">rätt</em> för er?
              </h1>

              <p
                className="text-fg-soft text-base sm:text-lg leading-[1.55] mb-10"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms',
                }}
              >
                Sex frågor om er verksamhet. Vi visar konkret om — och hur — Elivro kan hjälpa.
              </p>

              <div
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 300ms',
                }}
              >
                <button
                  onClick={handleStart}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-bright active:bg-accent-deep text-ink font-sans text-sm rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
                >
                  Börja
                </button>
              </div>

              <p
                className="text-fg-muted text-xs leading-[1.55] mt-8"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 350ms',
                }}
              >
                Vi behandlar dina uppgifter med respekt.{' '}
                <a href="/integritetspolicy" className="text-fg-soft hover:text-accent underline underline-offset-2 transition-colors ease-obsidian duration-obs-sm">
                  Läs vår integritetspolicy
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
