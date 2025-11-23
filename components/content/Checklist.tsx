import { ReactNode } from 'react'
import { Check, Square, AlertCircle } from 'lucide-react'

interface ChecklistItemProps {
  children: ReactNode
  status?: 'done' | 'todo' | 'important'
}

export function ChecklistItem({ children, status = 'todo' }: ChecklistItemProps) {
  const statusConfig = {
    done: {
      icon: Check,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20',
      border: 'border-emerald-500/30',
    },
    todo: {
      icon: Square,
      iconColor: 'text-zinc-500',
      iconBg: 'bg-zinc-800/50',
      border: 'border-zinc-700',
    },
    important: {
      icon: AlertCircle,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/20',
      border: 'border-amber-500/30',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${config.border} ${config.iconBg} transition-all`}>
      <div className={`flex-shrink-0 ${config.iconColor}`}>
        <Icon className="w-5 h-5 mt-0.5" strokeWidth={2} />
      </div>
      <div className="flex-1 text-zinc-300">
        {children}
      </div>
    </div>
  )
}

export function Checklist({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="my-8">
      {title && (
        <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
      )}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}
