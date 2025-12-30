/**
 * Quiz TypeScript Interfaces
 *
 * 6-question qualification quiz that demonstrates deep understanding
 * of assistans care organizations before asking for contact info
 */

export type QuizStep = 'intro' | 'questions' | 'email' | 'complete'

export interface QuizQuestion {
  id: string
  question: string
  description?: string
  options: QuizOption[]
}

export interface QuizOption {
  text: string
  value: string
}

export interface QuizAnswers {
  q1_scale?: string           // How many assistants do you coordinate?
  q2_tools?: string           // How do you handle scheduling today?
  q3_recruitment?: string     // What's hardest when recruiting assistants?
  q4_quality?: string         // How should quality be measured?
  q5_decision?: string        // Who needs to be in the conversation?
  q6_timeline?: string        // When do you hope to improve?
}

export interface QuizState {
  currentStep: QuizStep
  currentQuestionIndex: number
  answers: QuizAnswers
  company: string
  email: string
}

export interface QuizSubmission {
  answers: QuizAnswers
  company: string
  email: string
  honeypot?: string
  timestamp?: number
}

export interface QuizEmailData {
  answers: QuizAnswers
  company: string
  email: string
  timestamp: string
}
