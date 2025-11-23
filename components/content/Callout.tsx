import { ReactNode } from 'react'
import { AlertTriangle, Info, CheckCircle, Lightbulb, Zap } from 'lucide-react'

type CalloutType = 'warning' | 'info' | 'success' | 'tip' | 'example'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    border: 'border-amber-500/40',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    titleColor: 'text-amber-300',
  },
  info: {
    icon: Info,
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    border: 'border-blue-500/40',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-300',
  },
  success: {
    icon: CheckCircle,
    gradient: 'from-emerald-500/20 via-green-500/20 to-teal-500/20',
    border: 'border-emerald-500/40',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    titleColor: 'text-emerald-300',
  },
  tip: {
    icon: Lightbulb,
    gradient: 'from-violet-500/20 via-purple-500/20 to-pink-500/20',
    border: 'border-violet-500/40',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
    titleColor: 'text-violet-300',
  },
  example: {
    icon: Zap,
    gradient: 'from-pink-500/20 via-rose-500/20 to-red-500/20',
    border: 'border-pink-500/40',
    iconBg: 'bg-pink-500/20',
    iconColor: 'text-pink-400',
    titleColor: 'text-pink-300',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      className={`my-8 p-6 rounded-2xl border backdrop-blur-sm bg-gradient-to-br ${config.gradient} ${config.border} shadow-lg`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${config.iconBg} flex items-center justify-center ${config.iconColor}`}>
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`text-xl font-bold mb-3 ${config.titleColor}`}>
              {title}
            </h4>
          )}
          <div className="text-zinc-200 prose-p:mb-2 prose-ul:mb-2 prose-li:mb-1 last:prose-p:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
