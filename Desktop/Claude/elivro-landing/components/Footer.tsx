'use client'

import { scrollToSection } from '@/lib/scroll-utils'

export default function Footer() {

  return (
    <footer className="w-full bg-black border-t border-emerald-500/10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <div
              className="text-zinc-300 text-2xl font-bold tracking-wide mb-4"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              ELIVRO
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              God assistans handlar om relationer. Därför bygger vi teknik som stärker det mänskliga, inte ersätter det.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigering</h3>
            <nav className="space-y-3">
              <button
                onClick={() => scrollToSection('three-pillars')}
                className="block text-zinc-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                Funktioner
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block text-zinc-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                Hur det fungerar
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block text-zinc-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('cta-section')}
                className="block text-zinc-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                Boka demo
              </button>
            </nav>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Juridiskt</h3>
            <nav className="space-y-3">
              <a
                href="/privacy"
                className="block text-zinc-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                Integritetspolicy
              </a>
              <a
                href="/terms"
                className="block text-zinc-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                Användarvillkor
              </a>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:daniel@elivro.se"
                className="block text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
              >
                daniel@elivro.se
              </a>
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-emerald-400">✓</span>
                  <span>GDPR-compliant</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-emerald-400">✓</span>
                  <span>Servrar i Sverige</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-400 text-sm">
              © {new Date().getFullYear()} Elivro. Få tid till kvalitet.
            </div>
            <div className="text-zinc-400 text-sm">
              Byggd med omtanke för assistansbranschen
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
