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
    // Reset mounted to trigger subtle animation on question change
    setMounted(false)
    setSelectedIndex(null)

    // Small delay then re-mount for animation
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [currentQuestionIndex])

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    const selectedOption = currentQuestion.options[index]

    // Small delay for visual feedback
    setTimeout(() => {
      // Update answers with new selection
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: selectedOption.value
      }

      // If this is the last question, go to email capture
      // Otherwise, go to next question
      if (currentQuestionIndex >= totalQuestions - 1) {
        onNext({
          currentStep: 'email',
          answers: updatedAnswers
        })
      } else {
        onNext({
          currentQuestionIndex: currentQuestionIndex + 1,
          answers: updatedAnswers
        })
      }
    }, 300)
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center bg-cream">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

          {/* LEFT COLUMN - Illustration (40%) */}
          <div className="hidden lg:flex lg:col-span-5 bg-cream-200/30 items-center justify-center p-8">
            <div className="max-w-lg w-full">
              {/* Reuse the hands illustration */}
              <Image
                src="/brand-assets/elivro-header-asset_hands.png"
                alt="Illustration av sammanflätade händer"
                width={600}
                height={600}
                className="w-full h-auto opacity-60"
                priority
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Content (60%) */}
          <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
            <div className="max-w-2xl w-full">

              {/* Question counter */}
              <p
                className="font-mono text-xs sm:text-sm text-charcoal-400 tracking-wide mb-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out'
                }}
              >
                Fråga {currentQuestionIndex + 1} av {totalQuestions}
              </p>

              {/* Question Headline */}
              <h2
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-700 leading-tight mb-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease'
                }}
              >
                {currentQuestion.question}
              </h2>

              {/* Description */}
              {currentQuestion.description && (
                <p
                  className="font-mono text-sm sm:text-base text-charcoal-500 tracking-wide mb-8"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease 0.1s'
                  }}
                >
                  {currentQuestion.description}
                </p>
              )}

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedIndex === index

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      className={`
                        w-full px-6 py-4 sm:px-6 sm:py-5
                        bg-cream-50 border-2 border-charcoal-300
                        hover:border-terracotta focus:border-terracotta
                        hover:shadow-terracotta
                        rounded-sm text-left
                        font-mono text-sm sm:text-base text-charcoal
                        transition-all duration-200
                        cursor-pointer
                        ${isSelected ? 'bg-cream-200 border-terracotta' : ''}
                      `}
                      style={{
                        opacity: mounted ? 1 : 0,
                        transition: prefersReducedMotion
                          ? 'none'
                          : `opacity 0.5s ease ${0.15 + index * 0.05}s, border-color 0.2s, background-color 0.2s, box-shadow 0.2s`
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
