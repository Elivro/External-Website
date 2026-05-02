'use client'

import Image from 'next/image'
import { scrollToSection } from '@/lib/scroll-utils'

export default function Footer() {
  return (
    <footer className="w-full bg-ink-lift border-t border-edge py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/brand-assets/elivro_logo2.png"
                alt="Elivro"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="font-serif text-fg text-[1.25rem] font-light tracking-[0.02em]">
                Elivro
              </span>
            </div>
            <p className="text-fg-soft text-sm leading-relaxed">
              Operativsystemet för svenska assistansbolag.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-fg-muted text-[11px] tracking-[0.12em] uppercase mb-4">Navigering</h3>
            <nav className="space-y-2.5">
              <a href="#product" onClick={(e) => { e.preventDefault(); scrollToSection('product') }} className="block text-fg-soft hover:text-accent transition-colors ease-obsidian duration-obs-sm text-sm">Produkten</a>
              <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }} className="block text-fg-soft hover:text-accent transition-colors ease-obsidian duration-obs-sm text-sm">Funktioner</a>
              <a href="#about-us" onClick={(e) => { e.preventDefault(); scrollToSection('about-us') }} className="block text-fg-soft hover:text-accent transition-colors ease-obsidian duration-obs-sm text-sm">Om oss</a>
              <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq') }} className="block text-fg-soft hover:text-accent transition-colors ease-obsidian duration-obs-sm text-sm">FAQ</a>
              <a href="#cta-section" onClick={(e) => { e.preventDefault(); scrollToSection('cta-section') }} className="block text-fg-soft hover:text-accent transition-colors ease-obsidian duration-obs-sm text-sm">Boka demo</a>
            </nav>
          </div>

          <div>
            <h3 className="font-mono text-fg-muted text-[11px] tracking-[0.12em] uppercase mb-4">Juridiskt</h3>
            <nav className="space-y-2.5">
              <a href="/integritetspolicy" className="block text-fg-soft hover:text-accent transition-colors ease-obsidian duration-obs-sm text-sm">
                Integritetspolicy
              </a>
            </nav>
          </div>

          <div>
            <h3 className="font-mono text-fg-muted text-[11px] tracking-[0.12em] uppercase mb-4">Kontakt</h3>
            <div className="space-y-2.5 text-sm">
              <a href="mailto:daniel@elivro.se" className="block text-fg-soft hover:text-accent transition-colors ease-obsidian duration-obs-sm">
                daniel@elivro.se
              </a>
              <p className="pt-3 text-fg-muted text-sm">
                GDPR-kompatibel. Data inom EU.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-edge">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-fg-dim text-[11px] tracking-[0.12em] uppercase">
              © {new Date().getFullYear()} Elivro
            </div>
            <div className="font-mono text-fg-dim text-[11px] tracking-[0.12em] uppercase">
              Levande system för levande verksamheter
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
