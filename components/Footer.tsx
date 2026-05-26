'use client'

import Image from 'next/image'
import ElivroLogo from './ElivroLogo'
import { scrollToSection } from '@/lib/scroll-utils'

type LinkItem =
  | { label: string; href: string }
  | { label: string; section: string }

const PRODUKT: LinkItem[] = [
  { label: 'System', section: 'features' },
  { label: '2U-fallet', section: 'case-proof' },
  { label: 'Uppstartskampanj', section: 'startup-offer' },
]

const FORETAG: LinkItem[] = [
  { label: 'Team', section: 'about-us' },
  { label: 'Manifest', section: 'manifesto' },
  { label: 'Kontakt', href: 'mailto:jimmy.sodermark@elivro.se' },
]

const REGELEFTERLEVNAD: LinkItem[] = [
  { label: 'EU AI Act', href: '#' },
  { label: 'GDPR', href: '/integritetspolicy' },
  { label: 'Berget AI', href: '#' },
  { label: 'Tillsyns-redo', href: '#' },
]

function FooterColumn({ eyebrow, items }: { eyebrow: string; items: LinkItem[] }) {
  return (
    <div>
      <p className="font-mono text-accent text-[10px] tracking-[0.18em] uppercase mb-5">
        {eyebrow}
      </p>
      <ul className="space-y-3">
        {items.map((item) => {
          const linkClass =
            'text-fg-soft hover:text-fg transition-colors ease-obsidian duration-obs-sm text-[15px] break-words'
          if ('section' in item) {
            return (
              <li key={item.label}>
                <a
                  href={`#${item.section}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.section)
                  }}
                  className={linkClass}
                >
                  {item.label}
                </a>
              </li>
            )
          }
          // Items with an empty "#" href are placeholder labels — render
          // as text so they're not misleading dead-end clicks.
          if (item.href === '#') {
            return (
              <li key={item.label}>
                <span className="text-fg-muted text-[15px] break-words cursor-default">
                  {item.label}
                </span>
              </li>
            )
          }
          return (
            <li key={item.label}>
              <a href={item.href} className={linkClass}>
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="w-full bg-ink border-t border-edge">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pt-20 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-12 mb-16">

          {/* Brand block — small mark, lowercase wordmark, tagline, location. */}
          <div className="col-span-2 md:col-span-4">
            <ElivroLogo className="h-10 w-auto mb-5 text-paper" ariaLabel="Elivro" />
            <p className="text-fg-soft text-[15px] leading-[1.55] max-w-[20rem]">
              Verksamhetssystem för svenska assistansanordnare. Byggt inifrån, med AI-stöd och svensk infrastruktur.
            </p>
          </div>

          {/* Three link columns — each spans 2-3 of 12 on desktop. */}
          <div className="col-span-1 md:col-span-3 md:col-start-6">
            <FooterColumn eyebrow="Produkt" items={PRODUKT} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FooterColumn eyebrow="Företag" items={FORETAG} />
          </div>
          <div className="col-span-2 md:col-span-2">
            <FooterColumn eyebrow="Regelefterlevnad" items={REGELEFTERLEVNAD} />
          </div>
        </div>

        {/* Bottom rail — copyright + axiom + location. */}
        <div className="pt-8 border-t border-edge flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="font-mono text-fg-dim text-[10px] tracking-[0.16em] uppercase">
            © {new Date().getFullYear()} Elivro AB · Västerås · Org.nr 559541-2791
          </div>
          <div className="font-mono text-fg-dim text-[10px] tracking-[0.16em] uppercase">
            Vi tar betalt för utfall, inte för försök
          </div>
        </div>
      </div>
    </footer>
  )
}
