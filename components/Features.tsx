'use client'

import { useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Group {
  index: string
  title: string
  bullets: string[]
}

const CATEGORIES = [
  'Annonsering',
  'Rekrytering',
  'Schemaläggning',
  'Tidrapportering',
  'FK-räkning',
  'Avvikelsehantering',
  'Lön',
  'Ledningssystem',
]

const GROUPS: Group[] = [
  {
    index: '01',
    title: 'Rekrytering & Anställning',
    bullets: [
      'AI-genererade jobbannonser',
      'Publik jobbsida',
      'Arbetsförmedlingen-integration',
      'AI-matchning mellan kandidat och jobb',
      'Intuitivt rekryteringsflöde',
      'Anställningsavtal med BankID-signering',
    ],
  },
  {
    index: '02',
    title: 'Schema & Bemanning',
    bullets: [
      'Schemaläggning (kalender och lista)',
      'Grundschema',
      'Automatiskt grundschema (baserat på budget och anställningsgrad)',
      'Identifiering av dubbelassistans',
      'Pass-byten med godkännande',
      'Budgetprognoser per period',
    ],
  },
  {
    index: '03',
    title: 'Tid, Lön & FK',
    bullets: [
      'Tidrapportering med attestering',
      'Frånvarohantering',
      'E-RÄK (FK-räkning)',
      'Lönefil-export',
      'Kostnadsavstämning',
    ],
  },
  {
    index: '04',
    title: 'Kunder',
    bullets: [
      'Delaktighet i rekrytering',
      'Kundregister med detaljvy',
      'LSS-beslut och vårdplan',
      'Kontaktpersoner och team',
      'Daganteckningar',
      'Journal med röst-till-text',
      'Specifika kompetenskrav per kund',
    ],
  },
  {
    index: '05',
    title: 'Kvalitet & Compliance',
    bullets: [
      'Rutiner med AI-stöd',
      'Regelverk (SOSFS, AFS, Lex Sarah, IVO)',
      'Riskbedömningar enligt SAM (AFS 2023:1)',
      'Tillbud',
      'Egenkontroller och KPI:er',
      'IVO-export och -simulering',
      'Auto-genererad kvalitetsberättelse',
    ],
  },
  {
    index: '06',
    title: 'Avvikelser & Förbättring',
    bullets: [
      'Avvikelser med utredning',
      'Lex Sarah-anmälan',
      'Klagomål och synpunkter',
      'Publik synpunktsform',
      'Förbättringsåtgärder',
      'Handlingsplaner med PDF-export',
    ],
  },
  {
    index: '07',
    title: 'Processer & Årshjul',
    bullets: [
      'Processkarta och process-editor',
      'Process-tavla (kanban)',
      'Process-mallar',
      'Årshjul för återkommande uppgifter',
      'Uppgifts-feed per användare',
      'Bilagor till processer',
    ],
  },
  {
    index: '08',
    title: 'Kompetens & Delegationer',
    bullets: [
      'Kompetensprofiler per roll',
      'Kompetensgap-analys',
      'Certifieringar',
      'Medicineringsdelegationer',
      'Kvittering av rutiner och policyer',
      'Automatiska påminnelser',
    ],
  },
  {
    index: '09',
    title: 'AI-assistent',
    bullets: [
      'Chat mot er egna kunskapsbas',
      'AI-granskning av rutiner och policyer',
      'Källhänvisning i alla AI-svar',
      'Egna prompts, skills och agenter',
      'AI-genererade rapport-utkast',
      'Svensk hosting via Berget AI',
    ],
  },
  {
    index: '10',
    title: 'Säkerhet & Plattform',
    bullets: [
      'BankID-inloggning',
      'Granskningslogg per användare',
      'GDPR-säker datahantering',
      'Push, e-post och SMS',
      'Egna färger och tema',
      'Roller och behörigheter',
    ],
  },
]

export default function Features() {
  const { ref, isVisible } = useIntersectionObserver(0.05)
  // Mobile-only accordion: which groups are expanded. First open by default
  // so the disclosure pattern is obvious. State is ignored ≥lg (CSS forces
  // every panel open and hides the toggle chevron).
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(['01']))
  const toggleGroup = (index: string) =>
    setOpenGroups((prev) => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })

  return (
    <section
      id="features"
      ref={ref}
      aria-labelledby="features-title"
      className="w-full bg-ink-lift py-20 md:py-24 relative"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Header — claim first, then the work that earns it. */}
        <header className="mx-auto max-w-3xl mb-12 md:mb-16 text-center">
          <p
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Allt ingår
          </p>
          <h2
            id="features-title"
            className="font-serif text-fg tracking-[-0.021em] leading-[1.05] mb-5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition:
                'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 80ms',
            }}
          >
            Ett levande företag kräver ett{' '}
            <em className="font-serif italic">levande verksamhetssystem.</em>
          </h2>
          <p
            className="text-fg-soft text-lg leading-[1.55] max-w-xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition:
                'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 160ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 160ms',
            }}
          >
            Vi andas assistans och vet vad som krävs. Glöm moduler, krångel
            och extra avgifter.
          </p>
        </header>

        {/* Category bar — scope at a glance, before the catalog. */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 max-w-5xl mx-auto mb-12 md:mb-16 py-5 border-y border-edge"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 240ms',
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <span key={cat} className="inline-flex items-center gap-x-5">
              <span className="font-serif text-[clamp(0.95rem,1.4vw,1.1rem)] font-light text-fg tracking-[-0.005em]">
                {cat}
              </span>
              {i < CATEGORIES.length - 1 && (
                <span aria-hidden="true" className="block w-1 h-1 rounded-full bg-accent/70" />
              )}
            </span>
          ))}
        </div>

        {/* Catalog: 5-col grid on desktop; collapsible accordion below lg so
            the ten groups don't become an endless mobile scroll. */}
        <ul
          className="feat-catalog grid grid-cols-1 lg:grid-cols-5 gap-px bg-edge rounded-obs-lg overflow-hidden border border-edge"
          aria-label="Funktionskatalog"
        >
          {GROUPS.map((group, gi) => {
            const isOpen = openGroups.has(group.index)
            return (
              <li
                key={group.index}
                className="feat-group bg-ink-card flex flex-col"
                data-open={isOpen ? 'true' : 'false'}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${120 + gi * 40}ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${120 + gi * 40}ms`,
                }}
              >
                <button
                  type="button"
                  className="feat-head p-6 md:p-7"
                  aria-expanded={isOpen}
                  onClick={() => toggleGroup(group.index)}
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                    {group.index}
                  </span>

                  <h3
                    className="feat-title font-serif text-fg"
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      lineHeight: 1.25,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {group.title}
                  </h3>

                  <span className="feat-chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div className="feat-panel">
                  <div className="feat-panel-inner">
                    <ul className="feat-bullets space-y-px">
                      {group.bullets.map((bullet, bi) => (
                        <li
                          key={bullet}
                          className={`text-fg-soft text-[0.8125rem] leading-[1.5] py-2 pl-4 relative ${bi === 0 ? '' : 'border-t border-edge/60'}`}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[0.85em] w-1 h-1 rounded-full bg-fg-muted"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

      </div>
    </section>
  )
}
