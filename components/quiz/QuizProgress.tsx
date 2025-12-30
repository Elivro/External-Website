'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { QuizStep } from '@/types/quiz'

interface QuizProgressProps {
  currentStep: QuizStep
  currentQuestionIndex?: number
}

export default function QuizProgress({ currentStep, currentQuestionIndex = 0 }: QuizProgressProps) {
  const router = useRouter()

  // Total: 6 questions + 1 email capture = 7 total steps (excluding intro)
  const TOTAL_QUESTIONS = 6

  let progress = 0

  if (currentStep === 'intro') {
    progress = 0
  } else if (currentStep === 'questions') {
    // Progress through questions
    progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 85
  } else if (currentStep === 'email') {
    progress = 90
  } else if (currentStep === 'complete') {
    progress = 100
  }

  const handleClose = () => {
    // Clear quiz state and go back to home
    sessionStorage.removeItem('elivro-quiz-state')
    router.push('/')
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Empty space for left column (illustration) */}
        <div className="hidden lg:block lg:col-span-5" />

        {/* Progress bar aligned with content column - matches content padding */}
        <div className="lg:col-span-7 flex justify-center p-6 sm:p-12 pb-0 sm:pb-0">
          <div className="max-w-2xl w-full flex items-center gap-4">
            {/* Progress bar */}
            <div className="flex-1 h-1 bg-charcoal-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-terracotta rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{
                  type: 'tween',
                  ease: 'easeOut',
                  duration: 0.6
                }}
              />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="p-2 -mr-2 text-charcoal-400 hover:text-charcoal-600 transition-colors"
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
