import { ReactNode } from 'react'
import { Info, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react'

type InfoCardType = 'info' | 'warning' | 'success' | 'tip'

interface InfoCardProps {
  type?: InfoCardType
  title?: string
  children: ReactNode
}

const typeConfig = {
  info: {
    icon: Info,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-300',
  },
  warning: {
    icon: AlertCircle,
    gradient: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    titleColor: 'text-amber-300',
  },
  success: {
    icon: CheckCircle,
    gradient: 'from-emerald-500/20 to-green-500/20',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    titleColor: 'text-emerald-300',
  },
  tip: {
    icon: Lightbulb,
    gradient: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-400',
    titleColor: 'text-violet-300',
  },
}

export function InfoCard({ type = 'info', title, children }: InfoCardProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      className={`my-8 p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br ${config.gradient} ${config.border}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`text-lg font-semibold mb-2 ${config.titleColor}`}>
              {title}
            </h4>
          )}
          <div className="text-zinc-300 prose-p:mb-3 last:prose-p:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
