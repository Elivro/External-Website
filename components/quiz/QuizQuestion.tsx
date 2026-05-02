'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { QuizState, QuizAnswers } from '@/types/quiz'
import { QUIZ_QUESTIONS } from '@/lib/quiz-utils'

interface QuizQuestionProps {
  currentQuestionIndex: number
  answers: QuizAnswers
  onNext: (updates: Partial<QuizState>) => void
}

export default function QuizQuestion({ currentQuestionIndex, answers, onNext }: QuizQuestionProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const totalQuestions = QUIZ_QUESTIONS.length

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    setMounted(false)
    setSelectedIndex(null)
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [currentQuestionIndex])

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    const selectedOption = currentQuestion.options[index]

    setTimeout(() => {
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: selectedOption.value,
      }

      if (currentQuestionIndex >= totalQuestions - 1) {
        onNext({ currentStep: 'email', answers: updatedAnswers })
      } else {
        onNext({
          currentQuestionIndex: currentQuestionIndex + 1,
          answers: updatedAnswers,
        })
      }
    }, 300)
  }

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen flex items-center bg-ink">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

          <div className="hidden lg:flex lg:col-span-5 items-center justify-end overflow-hidden pr-8">
            <div className="-ml-32 w-full max-w-2xl">
              <Image
                src="/brand-assets/elivro-header-asset_hands.png"
                alt=""
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
            <div className="max-w-2xl w-full">

              <p
                className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent mb-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 300ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                }}
              >
                {currentQuestionIndex + 1} / {totalQuestions}
              </p>

              <h2
                className="font-serif text-[clamp(1.75rem,4.2vw,3rem)] font-light text-fg leading-[1.1] tracking-[-0.021em] mb-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                }}
              >
                {currentQuestion.question}
              </h2>

              {currentQuestion.description && (
                <p
                  className="text-fg-soft text-sm sm:text-base leading-[1.55] mb-8"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transition: prefersReducedMotion ? 'none' : 'opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 100ms',
                  }}
                >
                  {currentQuestion.description}
                </p>
              )}

              <div className="space-y-3" key={currentQuestion.id}>
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedIndex === index
                  return (
                    <button
                      key={`${currentQuestion.id}-${index}`}
                      onClick={() => handleSelect(index)}
                      className={`
                        w-full px-6 py-4 text-left rounded-obs-md
                        font-sans text-sm sm:text-base
                        transition-colors ease-obsidian duration-obs-sm
                        cursor-pointer
                        ${
                          isSelected
                            ? 'bg-ink-card border border-accent text-fg'
                            : 'bg-ink-lift border border-edge text-fg-soft hover:text-fg hover:border-edge-strong'
                        }
                      `}
                      style={{
                        opacity: mounted ? 1 : 0,
                        transition: prefersReducedMotion
                          ? 'none'
                          : `opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) ${150 + index * 50}ms, border-color 200ms cubic-bezier(0.2, 0.7, 0.2, 1), background-color 200ms cubic-bezier(0.2, 0.7, 0.2, 1)`,
                      }}
                    >
                      {option.text}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
