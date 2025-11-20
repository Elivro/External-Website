import { ReactNode } from 'react'
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react'

interface StatCardProps {
  number: string
  label: string
  icon?: 'trend' | 'money' | 'users' | 'clock'
  subtitle?: string
}

const icons = {
  trend: TrendingUp,
  money: DollarSign,
  users: Users,
  clock: Clock,
}

export function StatCard({ number, label, icon = 'trend', subtitle }: StatCardProps) {
  const Icon = icons[icon]

  return (
    <div className="my-6 p-6 rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-600/10 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
            {number}
          </div>
          <div className="text-lg font-semibold text-white mb-1">
            {label}
          </div>
          {subtitle && (
            <div className="text-sm text-zinc-400">
              {subtitle}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {children}
    </div>
  )
}
