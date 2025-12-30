'use client'

import { motion } from 'framer-motion'
import { QuizStep } from '@/types/quiz'

interface QuizProgressProps {
  currentStep: QuizStep
  currentQuestionIndex?: number
}

export default function QuizProgress({ currentStep, currentQuestionIndex = 0 }: QuizProgressProps) {
  // Total: 6 questions + 1 email capture = 7 total steps (excluding intro)
  const TOTAL_QUESTIONS = 6
  const TOTAL_STEPS = TOTAL_QUESTIONS + 1 // +1 for email capture

  let progress = 0

  if (currentStep === 'intro') {
    progress = 0
  } else if (currentStep === 'questions') {
    // Progress through questions: 0-85% (distribute 85% across 6 questions)
    // Each question = ~14.2% progress
    progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 85
  } else if (currentStep === 'email') {
    progress = 90
  } else if (currentStep === 'complete') {
    progress = 100
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1.5 bg-cream-200/50 overflow-hidden">
        <motion.div
          className="h-full bg-terracotta"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.6
          }}
        />
      </div>
    </div>
  )
}
