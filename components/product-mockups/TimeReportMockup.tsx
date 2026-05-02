'use client'

import { Check, Play } from 'lucide-react'

interface Entry {
  date: string
  who: string
  hours: string
  status: 'signed' | 'pending'
}

const HISTORY: Entry[] = [
  { date: 'Tor 23 apr', who: 'Bengt B.', hours: '08:00–16:00', status: 'signed' },
  { date: 'Ons 22 apr', who: 'Bengt B.', hours: '08:00–16:00', status: 'signed' },
  { date: 'Tis 21 apr', who: 'Bengt B.', hours: '08:00–16:00', status: 'signed' },
]

export default function TimeReportMockup() {
  return (
    <div className="w-full h-full bg-ink-lift border border-edge rounded-obs-lg overflow-hidden flex items-center justify-center p-6 shadow-obs-card relative">
      {/* Soft halo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 70% 50%, rgba(220,77,61,0.10), transparent 70%)',
        }}
      />

      <div className="relative grid grid-cols-12 gap-6 w-full max-w-3xl">
        {/* Left — phone */}
        <div className="col-span-5 flex justify-center">
          <div
            className="w-[180px] aspect-[9/19] bg-ink-card border border-edge-strong rounded-[28px] flex flex-col p-3 shadow-obs-card relative overflow-hidden"
          >
            {/* Notch */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-ink rounded-full" />
            {/* Status bar */}
            <div className="flex items-center justify-between text-[8px] text-fg-muted px-1 mt-2.5 mb-2">
              <span>09:42</span>
              <span>•••</span>
            </div>

            <div className="flex-1 flex flex-col gap-2.5">
              <div>
                <div className="text-[9px] text-fg-muted">Pågår · Bengt B.</div>
                <div className="text-fg text-sm font-medium leading-tight mt-0.5">
                  Tidrapport
                </div>
              </div>

              <div className="bg-ink rounded-lg p-3 border border-edge">
                <div className="text-[8px] text-fg-muted mb-1">Pass startat</div>
                <div className="font-mono text-fg text-base tabular-nums">08:00</div>
              </div>

              <div className="bg-ink rounded-lg p-3 border border-edge text-center">
                <div className="text-[8px] text-fg-muted mb-1">Tid passerad</div>
                <div className="font-mono text-fg text-xl tabular-nums">04:38</div>
              </div>

              <div className="mt-auto space-y-1.5">
                <div className="bg-accent text-ink rounded-lg py-2 text-[10px] font-medium text-center inline-flex items-center justify-center gap-1.5 w-full">
                  <Play className="w-2.5 h-2.5" strokeWidth={2} />
                  Avsluta pass
                </div>
                <div className="border border-edge rounded-lg py-2 text-[9px] text-fg-soft text-center w-full">
                  Signera med BankID
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — recent reports list */}
        <div className="col-span-7 bg-ink-card border border-edge rounded-obs-md p-4 shadow-obs-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] text-fg-muted">Senaste rapporter</div>
              <div className="text-fg text-sm font-medium mt-0.5">Bengt B.</div>
            </div>
            <span
              className="text-[9px] px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(122,138,107,0.18)', color: '#a8b88f' }}
            >
              3 av 3 signerade
            </span>
          </div>

          <ul className="space-y-1.5">
            {HISTORY.map((e, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 px-3 py-2 bg-ink-lift border border-edge rounded-md"
              >
                <div className="min-w-0">
                  <div className="text-[11px] text-fg leading-tight">{e.date}</div>
                  <div className="text-[9px] text-fg-muted">
                    {e.who} · {e.hours}
                  </div>
                </div>
                <span
                  className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(122,138,107,0.18)', color: '#a8b88f' }}
                >
                  <Check className="w-2.5 h-2.5" strokeWidth={2.2} />
                  BankID
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 pt-3 border-t border-edge text-[9px] text-fg-muted flex items-center justify-between">
            <span>Närvarointyg automatiskt</span>
            <span className="font-mono">→ FK · ELT</span>
          </div>
        </div>
      </div>
    </div>
  )
}
