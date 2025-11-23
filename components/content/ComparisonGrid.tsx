import { ReactNode } from 'react'
import { X, Check } from 'lucide-react'

interface ComparisonCardProps {
  title: string
  items: Array<{ text: string; available: boolean }>
  type: 'before' | 'after'
}

export function ComparisonCard({ title, items, type }: ComparisonCardProps) {
  const isAfter = type === 'after'

  return (
    <div
      className={`p-6 rounded-xl border ${
        isAfter
          ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-green-500/10'
          : 'border-zinc-700 bg-zinc-800/50'
      }`}
    >
      <h4
        className={`text-xl font-bold mb-6 ${
          isAfter ? 'text-emerald-300' : 'text-zinc-300'
        }`}
      >
        {title}
      </h4>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 mt-0.5 ${
                item.available ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {item.available ? (
                <Check className="w-5 h-5" strokeWidth={2} />
              ) : (
                <X className="w-5 h-5" strokeWidth={2} />
              )}
            </div>
            <span className="text-zinc-300">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ComparisonGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 grid md:grid-cols-2 gap-6">
      {children}
    </div>
  )
}
