'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const isNavigatingBack = useRef(false)

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

  // Handle native back button - go back through quiz steps
  useEffect(() => {
    // Push initial history state
    if (!isNavigatingBack.current) {
      window.history.pushState({ quiz: true, step: state.currentStep, questionIndex: state.currentQuestionIndex }, '')
    }
    isNavigatingBack.current = false

    const handlePopState = () => {
      isNavigatingBack.current = true

      // If on intro, navigate back to home (outside of setState to avoid React warning)
      if (state.currentStep === 'intro') {
        router.push('/')
        return
      }

      setState(prev => {
        // If on email step, go back to last question
        if (prev.currentStep === 'email') {
          return {
            ...prev,
            currentStep: 'questions',
            currentQuestionIndex: 5 // Last question (0-indexed)
          }
        }

        // If on questions and not first question, go to previous question
        if (prev.currentStep === 'questions' && prev.currentQuestionIndex > 0) {
          return {
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex - 1
          }
        }

        // If on first question, go back to intro
        if (prev.currentStep === 'questions' && prev.currentQuestionIndex === 0) {
          return {
            ...prev,
            currentStep: 'intro'
          }
        }

        // If on complete, go back to email
        if (prev.currentStep === 'complete') {
          return {
            ...prev,
            currentStep: 'email'
          }
        }

        return prev
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [state.currentStep, state.currentQuestionIndex, router])

  // Handle forward navigation
  const handleNext = (updates: Partial<QuizState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }

  return (
    <>
      {/* Progress bar with close button - shown on all steps except intro and complete */}
      {state.currentStep !== 'intro' && state.currentStep !== 'complete' && (
        <QuizProgress
          currentStep={state.currentStep}
          currentQuestionIndex={state.currentQuestionIndex}
        />
      )}

      {/* Render current step */}
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
