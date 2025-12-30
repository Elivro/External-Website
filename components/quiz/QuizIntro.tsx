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
    <div className="min-h-screen flex items-center bg-cream">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

          {/* LEFT COLUMN - Illustration bleeds left only */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-end overflow-hidden pr-8">
            <div className="-ml-32 w-full max-w-2xl">
              <Image
                src="/brand-assets/elivro-header-asset_hands.png"
                alt="Illustration av sammanflätade händer som symboliserar omsorg"
                width={700}
                height={700}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Content (60%) */}
          <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
            <div className="max-w-xl w-full">

              {/* Eyebrow */}
              <p
                className="font-mono text-xs sm:text-sm text-charcoal-500 tracking-wider uppercase mb-6"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease'
                }}
              >
                2 minuter att svara
              </p>

              {/* Headline */}
              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-700 leading-tight mb-6"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease 0.1s'
                }}
              >
                Är Elivro rätt för er?
              </h1>

              {/* Subtext */}
              <p
                className="font-mono text-base sm:text-lg text-charcoal-500 tracking-wide leading-relaxed mb-10"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease 0.2s'
                }}
              >
                Upptäck om Elivro passar er verksamhet.
              </p>

              {/* CTA Button */}
              <div
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease 0.3s'
                }}
              >
                <button
                  onClick={handleStart}
                  className="w-full sm:w-auto px-12 py-4 bg-terracotta hover:bg-terracotta-600 text-cream-50 font-mono font-medium rounded-sm shadow-terracotta hover:shadow-terracotta-lg transition-all duration-200"
                >
                  Börja
                </button>
              </div>

              {/* Privacy policy link */}
              <p
                className="font-mono text-xs sm:text-sm text-charcoal-400 tracking-wide mt-8"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease 0.35s'
                }}
              >
                Vi behandlar dina uppgifter med respekt.{' '}
                <a href="/integritetspolicy" className="underline hover:text-terracotta transition-colors">
                  Läs vår integritetspolicy
                </a>
                .
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
