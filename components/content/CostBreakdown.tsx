import { ReactNode } from 'react'
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'

interface CostItemProps {
  label: string
  amount: string
  trend?: 'up' | 'down' | 'neutral'
  description?: string
}

export function CostItem({ label, amount, trend = 'neutral', description }: CostItemProps) {
  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-red-400', bg: 'bg-red-500/10' },
    down: { icon: TrendingDown, color: 'text-green-400', bg: 'bg-green-500/10' },
    neutral: { icon: DollarSign, color: 'text-zinc-400', bg: 'bg-zinc-800/50' },
  }

  const config = trendConfig[trend]
  const Icon = config.icon

  return (
    <div className="p-5 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-violet-500/50 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-sm text-zinc-400 mb-1">{label}</div>
          <div className="text-2xl font-bold text-white">{amount}</div>
          {description && (
            <div className="text-xs text-zinc-500 mt-1">{description}</div>
          )}
        </div>
        <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center ${config.color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

export function CostBreakdown({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 p-6 rounded-2xl border border-zinc-700 bg-zinc-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <h4 className="text-xl font-bold text-white">Kostnadsanalys</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}
