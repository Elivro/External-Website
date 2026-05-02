'use client'

import { Check, FileText, AlertCircle, ShieldCheck } from 'lucide-react'

interface NavItem {
  label: string
  count?: string
  active?: boolean
}

const NAV: NavItem[] = [
  { label: 'Genomförandeplaner', count: '12' },
  { label: 'Daganteckningar', count: '38', active: true },
  { label: 'Avvikelser', count: '2' },
  { label: 'Lex Sarah', count: '0' },
  { label: 'IVO-beredskap', count: '—' },
]

interface Note {
  who: string
  when: string
  body: string
  tag?: { label: string; tone: 'green' | 'amber' }
}

const NOTES: Note[] = [
  {
    who: 'Lina P.',
    when: 'Idag · 14:32',
    body:
      'Bengt önskade kortare promenad idag, gick istället till parken. Goda samtal, mår bra.',
    tag: { label: 'Genomförandeplan', tone: 'green' },
  },
  {
    who: 'Niklas S.',
    when: 'Igår · 09:08',
    body:
      'Mediciner givna enligt lista. Bengt vaknade i god form, frukost gick bra.',
    tag: { label: 'Mål 03', tone: 'green' },
  },
  {
    who: 'Lina P.',
    when: 'Igår · 17:45',
    body:
      'Mindre fall vid övergång till sängen. Inga skador. Avvikelse registrerad.',
    tag: { label: 'Avvikelse', tone: 'amber' },
  },
]

const TAG: Record<NonNullable<Note['tag']>['tone'], { bg: string; fg: string }> = {
  green: { bg: 'rgba(122,138,107,0.18)', fg: '#a8b88f' },
  amber: { bg: 'rgba(214,168,106,0.18)', fg: '#d6a86a' },
}

export default function QmsMockup() {
  return (
    <div className="w-full h-full bg-ink-card border border-edge rounded-obs-lg overflow-hidden flex flex-col text-fg shadow-obs-card">
      <div className="flex items-center justify-between px-5 py-3 border-b border-edge bg-ink-lift">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-accent" strokeWidth={1.4} />
          <span className="text-sm font-medium text-fg">Kvalitetsledning</span>
          <span className="text-[10px] text-fg-muted">· Bengt Berg</span>
        </div>
        <span
          className="text-[9px] px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(122,138,107,0.18)', color: '#a8b88f' }}
        >
          IVO-redo
        </span>
      </div>

      <div className="flex-1 flex min-h-0">
        <aside className="w-44 border-r border-edge p-3 flex flex-col gap-1 bg-ink-card">
          {NAV.map((n) => (
            <div
              key={n.label}
              className={`flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] ${
                n.active
                  ? 'bg-ink-lift text-fg border border-edge'
                  : 'text-fg-soft'
              }`}
            >
              <div className="inline-flex items-center gap-2 min-w-0">
                <FileText className="w-3 h-3 text-fg-muted flex-shrink-0" strokeWidth={1.4} />
                <span className="truncate">{n.label}</span>
              </div>
              {n.count && (
                <span className="text-[9px] text-fg-muted tabular-nums">{n.count}</span>
              )}
            </div>
          ))}

          <div className="mt-3 pt-3 border-t border-edge text-[9px] text-fg-muted">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Check className="w-3 h-3 text-accent" strokeWidth={2} />
              Beslut · GFP synkat
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-accent" strokeWidth={2} />
              Tidrapport kopplad
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col p-4 gap-3 overflow-hidden">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-fg font-serif text-base">Daganteckningar</div>
              <div className="text-[10px] text-fg-muted mt-0.5">
                Kopplade till genomförandeplan och schema
              </div>
            </div>
            <button className="text-[10px] text-fg-soft px-2 py-1 rounded-md border border-edge bg-ink-lift">
              Ny anteckning
            </button>
          </div>

          <ul className="flex-1 space-y-2 overflow-hidden">
            {NOTES.map((n, i) => (
              <li
                key={i}
                className="border border-edge rounded-md p-3 bg-ink-lift"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-[10px] text-fg-soft">
                    <span className="text-fg font-medium">{n.who}</span>
                    <span className="text-fg-muted"> · {n.when}</span>
                  </div>
                  {n.tag && (
                    <span
                      className="text-[8.5px] px-1.5 py-0.5 rounded-full inline-flex items-center gap-1"
                      style={{ background: TAG[n.tag.tone].bg, color: TAG[n.tag.tone].fg }}
                    >
                      {n.tag.tone === 'amber' && (
                        <AlertCircle className="w-2.5 h-2.5" strokeWidth={1.6} />
                      )}
                      {n.tag.label}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-fg-soft leading-[1.45]">{n.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
