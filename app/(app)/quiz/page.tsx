'use client'

import { useState, useEffect } from 'react'
import { QuizState } from '@/types/quiz'
import QuizProgress from '@/components/quiz/QuizProgress'
import QuizIntro from '@/components/quiz/QuizIntro'
import QuizQuestion from '@/components/quiz/QuizQuestion'
import QuizEmailCapture from '@/components/quiz/QuizEmailCapture'
import QuizComplete from '@/components/quiz/QuizComplete'

const initialState: QuizState = {
  currentStep: 'intro',
  currentQuestionIndex: 0,
  answers: {},
  company: '',
  email: ''
}

export default function QuizPage() {
  const [state, setState] = useState<QuizState>(initialState)

  // Load persisted state from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('elivro-quiz-state')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setState(parsed)
      } catch (err) {
        console.error('Failed to parse quiz state:', err)
      }
    }
  }, [])

  // Persist state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('elivro-quiz-state', JSON.stringify(state))
  }, [state])

  // Handle step navigation
  const handleNext = (updates: Partial<QuizState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }

  return (
    <>
      {/* Progress bar at top */}
      {state.currentStep !== 'intro' && (
        <QuizProgress
          currentStep={state.currentStep}
          currentQuestionIndex={state.currentQuestionIndex}
        />
      )}

      {/* Render current step - components have their own subtle CSS animations */}
      {state.currentStep === 'intro' && (
        <QuizIntro onNext={handleNext} />
      )}

      {state.currentStep === 'questions' && (
        <QuizQuestion
          currentQuestionIndex={state.currentQuestionIndex}
          answers={state.answers}
          onNext={handleNext}
        />
      )}

      {state.currentStep === 'email' && (
        <QuizEmailCapture state={state} onNext={handleNext} />
      )}

      {state.currentStep === 'complete' && (
        <QuizComplete />
      )}
    </>
  )
}
