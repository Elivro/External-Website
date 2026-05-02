'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { QuizStep } from '@/types/quiz'

interface QuizProgressProps {
  currentStep: QuizStep
  currentQuestionIndex?: number
}

export default function QuizProgress({ currentStep, currentQuestionIndex = 0 }: QuizProgressProps) {
  const router = useRouter()
  const TOTAL_QUESTIONS = 6

  let progress = 0
  if (currentStep === 'intro') progress = 0
  else if (currentStep === 'questions') progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 85
  else if (currentStep === 'email') progress = 90
  else if (currentStep === 'complete') progress = 100

  const handleClose = () => {
    sessionStorage.removeItem('elivro-quiz-state')
    router.push('/')
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="hidden lg:block lg:col-span-5" />

        <div className="lg:col-span-7 flex justify-center p-6 sm:p-12 pb-0 sm:pb-0">
          <div className="max-w-2xl w-full flex items-center gap-4">
            <div className="flex-1 h-px bg-edge relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-accent transition-[width] ease-obsidian"
                style={{
                  width: `${progress}%`,
                  transitionDuration: '600ms',
                }}
              />
            </div>

            <button
              onClick={handleClose}
              className="p-2 -mr-2 text-fg-muted hover:text-fg transition-colors ease-obsidian duration-obs-sm"
              aria-label="Stäng quiz"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
