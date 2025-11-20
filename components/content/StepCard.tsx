import { ReactNode } from 'react'

interface StepCardProps {
  step: number
  title: string
  children: ReactNode
  totalSteps?: number
}

export function StepCard({ step, title, children, totalSteps }: StepCardProps) {
  return (
    <div className="relative my-8 pl-16">
      {/* Step Number Circle */}
      <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-lg">
        {step}
      </div>

      {/* Connecting Line (if not last step) */}
      {totalSteps && step < totalSteps && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/50 to-transparent" />
      )}

      {/* Content */}
      <div className="pb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          {title}
        </h3>
        <div className="text-zinc-300 space-y-3">
          {children}
        </div>
      </div>
    </div>
  )
}

export function StepContainer({ children, totalSteps }: { children: ReactNode; totalSteps: number }) {
  return (
    <div className="my-12">
      {children}
    </div>
  )
}
