'use client'

import { Search, Filter, MoreHorizontal } from 'lucide-react'

interface Card {
  name: string
  role: string
  match: number
  tone: 'green' | 'amber' | 'red'
  days: string
}

const COLUMNS: { title: string; count: number; cards: Card[] }[] = [
  {
    title: 'Inkommen',
    count: 12,
    cards: [
      { name: 'Anna L.', role: 'Sundbyberg', match: 92, tone: 'green', days: '2 dagar sedan' },
      { name: 'Erik H.', role: 'Solna', match: 84, tone: 'green', days: '3 dagar sedan' },
      { name: 'Maja K.', role: 'Kungsholmen', match: 71, tone: 'amber', days: '5 dagar sedan' },
    ],
  },
  {
    title: 'Intervju',
    count: 4,
    cards: [
      { name: 'Sara M.', role: 'Vasastan', match: 96, tone: 'green', days: 'Bokat tor 14:00' },
      { name: 'Johan B.', role: 'Södermalm', match: 88, tone: 'green', days: 'Bokat fre 09:30' },
    ],
  },
  {
    title: 'Erbjudande',
    count: 2,
    cards: [
      { name: 'Linnea S.', role: 'Bromma', match: 94, tone: 'green', days: 'Skickat igår' },
      { name: 'Tobias R.', role: 'Liljeholmen', match: 79, tone: 'amber', days: 'Avvaktar svar' },
    ],
  },
]

const TONE: Record<Card['tone'], { bg: string; fg: string; ring: string }> = {
  green: { bg: 'rgba(122,138,107,0.18)', fg: '#a8b88f', ring: 'rgba(122,138,107,0.45)' },
  amber: { bg: 'rgba(214,168,106,0.18)', fg: '#d6a86a', ring: 'rgba(214,168,106,0.45)' },
  red: { bg: 'rgba(220,77,61,0.18)', fg: '#dc4d3d', ring: 'rgba(220,77,61,0.45)' },
}

export default function KanbanMockup() {
  return (
    <div className="w-full h-full bg-ink-card border border-edge rounded-obs-lg overflow-hidden flex flex-col text-fg shadow-obs-card">
      <div className="flex items-center justify-between px-5 py-3 border-b border-edge bg-ink-lift">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-fg">Rekrytering</span>
          <span className="text-[10px] text-fg-muted">· 18 öppna kandidater</span>
        </div>
        <div className="flex items-center gap-2 text-fg-muted">
          <Search className="w-3.5 h-3.5" strokeWidth={1.4} />
          <Filter className="w-3.5 h-3.5" strokeWidth={1.4} />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-3 p-4 min-h-0">
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] tracking-[0.08em] text-fg-soft font-medium uppercase">
                {col.title}
              </span>
              <span className="text-[10px] text-fg-muted">{col.count}</span>
            </div>
            <div className="flex-1 min-h-0 flex flex-col gap-2">
              {col.cards.map((c) => {
                const t = TONE[c.tone]
                return (
                  <div
                    key={c.name}
                    className="bg-ink-lift border border-edge rounded-md p-2.5"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="text-[11px] font-medium text-fg leading-tight">
                        {c.name}
                      </div>
                      <MoreHorizontal className="w-3 h-3 text-fg-muted" strokeWidth={1.4} />
                    </div>
                    <div className="text-[9px] text-fg-muted leading-tight mb-2">
                      {c.role}
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="px-1.5 py-0.5 rounded-full text-[8.5px] font-medium tabular-nums"
                        style={{
                          background: t.bg,
                          color: t.fg,
                          boxShadow: `inset 0 0 0 0.5px ${t.ring}`,
                        }}
                      >
                        {c.match}% matchning
                      </span>
                      <span className="text-[8.5px] text-fg-muted">{c.days}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
