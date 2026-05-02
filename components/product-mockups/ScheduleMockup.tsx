'use client'

import { Bell, ChevronDown, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'

interface Shift {
  who: string
  time: string
  variant: 'green' | 'purple'
  rowSpan?: number
}

// Calendar layout — abstracted: 7 days × 5 weeks of April 2026.
// Shifts only on a few cells; rest are empty to keep visual restraint.
const SHIFTS: Record<string, Shift[]> = {
  // key: "weekIdx-dayIdx" (0-indexed, 0=mon)
  '1-0': [{ who: 'Lina P.', time: '09:00–17:00', variant: 'green' }],
  '1-3': [
    { who: 'Lina P.', time: '09:00–17:00', variant: 'green' },
    { who: 'Niklas S.', time: '12:00–17:00', variant: 'purple' },
  ],
  '2-0': [
    { who: 'Lina P.', time: '09:00–17:00', variant: 'green' },
    { who: 'Niklas S.', time: '12:00–17:00', variant: 'purple' },
  ],
  '2-1': [
    { who: 'Lina P.', time: '09:00–17:00', variant: 'green' },
    { who: 'Niklas S.', time: '12:00–17:00', variant: 'purple' },
  ],
  '2-2': [
    { who: 'Lina P.', time: '09:00–17:00', variant: 'green' },
    { who: 'Niklas S.', time: '12:00–17:00', variant: 'purple' },
  ],
  '2-4': [
    { who: 'Lina P.', time: '09:00–17:00', variant: 'green' },
    { who: 'Niklas S.', time: '12:00–17:00', variant: 'purple' },
  ],
}

const DAYS = ['MÅN', 'TIS', 'ONS', 'TOR', 'FRE', 'LÖR', 'SÖN']
const WEEK_NUMS = [14, 15, 16, 17, 18]
// Day numbers for April 2026 starting on a Monday-grid; week 14 begins Mon 30 Mar.
const DAY_GRID: number[][] = [
  [30, 31, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 1, 2, 3],
]

const ASSISTANTS = [
  { name: 'Hanna W.', sub: '0h/vecka av 40h', delta: '−40h', tone: 'red', color: '#dc4d3d' },
  { name: 'Julia E.', sub: '0h/vecka av 40h', delta: '−40h', tone: 'red', color: '#dc4d3d' },
  { name: 'Lina P.', sub: '9,3h/vecka av 40h', delta: '−30,7h', tone: 'green', color: '#7a8a6b' },
  { name: 'Niklas S.', sub: '9,3h/vecka av 40h', delta: '−30,7h', tone: 'purple', color: '#9b7bc4' },
  { name: 'Sofia N.', sub: '0h/vecka av 28h', delta: '−29,1h', tone: 'amber', color: '#d6a86a' },
]

export default function ScheduleMockup() {
  return (
    <div className="w-full h-full bg-ink-card border border-edge rounded-obs-lg overflow-hidden flex flex-col text-fg shadow-obs-card">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-edge bg-ink-lift">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-fg-muted">Schema för:</span>
            <span className="font-medium text-fg">Bengt Berg</span>
            <ChevronDown className="w-3.5 h-3.5 text-fg-muted" strokeWidth={1.4} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="relative">
            <Bell className="w-4 h-4 text-fg-muted" strokeWidth={1.4} />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent text-[8px] text-ink flex items-center justify-center font-medium">
              1
            </span>
          </span>
          <span className="inline-flex items-center gap-2 pl-2 border-l border-edge">
            <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40" />
            <span className="text-xs text-fg-soft">Alice Anderson</span>
            <ChevronDown className="w-3 h-3 text-fg-muted" strokeWidth={1.4} />
          </span>
        </div>
      </div>

      {/* Tab strip */}
      <div className="px-5 py-2 border-b border-edge flex items-center gap-5 text-xs">
        <span className="text-fg pb-1.5 border-b-[1.5px] border-accent -mb-[1px]">
          Schema
        </span>
        <span className="text-fg-muted pb-1.5">Grundschema</span>
      </div>

      {/* Body: sidebar + calendar */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <aside className="w-44 border-r border-edge p-3 flex flex-col gap-3 bg-ink-card overflow-hidden">
          <div className="space-y-1">
            <div className="text-[10px] text-fg-muted">Budgetöversikt</div>
            <div className="text-fg font-serif text-lg leading-none">
              80h <span className="text-fg-muted text-[10px] font-sans">/ 1820h</span>
            </div>
            <div className="text-[9px] text-accent">4% (kontr.) använt</div>
            <div className="h-1 bg-ink rounded-full overflow-hidden mt-1">
              <div className="h-full w-[4%] bg-accent" />
            </div>
            <div className="text-[10px] text-fg-muted pt-1">Tidsfördelning</div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] text-fg-muted">Veckoöversikt</div>
            <div className="grid grid-cols-7 gap-[3px]">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="block w-full aspect-square rounded-full"
                  style={{ background: i % 5 === 4 ? '#dc4d3d' : '#d6a86a', opacity: 0.85 }}
                />
              ))}
            </div>
          </div>

          <button className="mt-1 inline-flex items-center justify-between w-full px-2 py-1.5 rounded-md bg-ink-lift border border-accent/30 text-xs text-fg">
            <span className="inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-accent" strokeWidth={1.6} />
              Konflikter
            </span>
            <span className="text-[10px] px-1.5 rounded-full bg-accent text-ink font-medium">
              2
            </span>
          </button>

          <div className="pt-1">
            <div className="text-[10px] text-fg-muted mb-1.5">Assistenter</div>
            <ul className="space-y-1.5">
              {ASSISTANTS.map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-2 text-[10px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="block w-0.5 h-5 rounded-full flex-shrink-0"
                      style={{ background: a.color }}
                    />
                    <div className="min-w-0">
                      <div className="text-fg truncate">{a.name}</div>
                      <div className="text-fg-muted text-[8px] truncate">{a.sub}</div>
                    </div>
                  </div>
                  <span className="text-fg-soft tabular-nums" style={{ color: a.color }}>
                    {a.delta}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Calendar */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Calendar header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-edge bg-ink-lift">
            <div className="flex items-center gap-1.5 text-fg text-xs">
              <button className="w-5 h-5 inline-flex items-center justify-center text-fg-muted hover:text-fg">
                <ChevronLeft className="w-3 h-3" strokeWidth={1.6} />
              </button>
              <span className="font-medium">April 2026</span>
              <button className="w-5 h-5 inline-flex items-center justify-center text-fg-muted hover:text-fg">
                <ChevronRight className="w-3 h-3" strokeWidth={1.6} />
              </button>
              <span className="ml-2 px-2 py-0.5 rounded-md bg-ink border border-edge text-[10px] text-fg-soft">
                Idag
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="px-2 py-0.5 rounded-md text-fg-soft">Vecka</span>
              <span className="px-2 py-0.5 rounded-md bg-ink border border-edge text-fg">
                Månad
              </span>
              <span className="px-2 py-0.5 rounded-md text-fg-soft">Publicera</span>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-[24px_repeat(7,1fr)] border-b border-edge bg-ink-lift">
            <div />
            {DAYS.map((d) => (
              <div
                key={d}
                className="px-2 py-1 text-[9px] tracking-[0.08em] text-fg-muted border-l border-edge"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 grid grid-rows-5 min-h-0">
            {DAY_GRID.map((week, wi) => (
              <div
                key={wi}
                className="grid grid-cols-[24px_repeat(7,1fr)] border-b border-edge last:border-b-0 min-h-0"
              >
                <div className="text-[9px] text-fg-muted px-1 py-1 border-r border-edge">
                  {WEEK_NUMS[wi]}
                </div>
                {week.map((dayNum, di) => {
                  const key = `${wi}-${di}`
                  const cellShifts = SHIFTS[key] ?? []
                  const isOff = (wi === 0 && di < 2) || (wi === 4 && di > 3)
                  return (
                    <div
                      key={di}
                      className={`relative border-l border-edge px-1 pt-1 pb-1 flex flex-col gap-0.5 min-h-0 overflow-hidden ${
                        isOff ? 'bg-ink/40' : ''
                      }`}
                    >
                      <div className={`text-[9px] ${isOff ? 'text-fg-muted/60' : 'text-fg-soft'}`}>
                        {dayNum}
                      </div>
                      {cellShifts.map((s, si) => (
                        <div
                          key={si}
                          className="rounded-sm px-1 py-0.5 text-[7px] leading-tight flex flex-col"
                          style={{
                            background:
                              s.variant === 'green'
                                ? 'rgba(122, 138, 107, 0.20)'
                                : 'rgba(155, 123, 196, 0.18)',
                            color:
                              s.variant === 'green'
                                ? '#a8b88f'
                                : '#b59edd',
                            borderLeft: `1.5px solid ${s.variant === 'green' ? '#7a8a6b' : '#9b7bc4'}`,
                          }}
                        >
                          <span className="text-[6.5px] opacity-90">{s.time}</span>
                          <span>{s.who}</span>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
