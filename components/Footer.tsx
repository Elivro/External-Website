'use client'

import Image from 'next/image'
import { scrollToSection } from '@/lib/scroll-utils'
import { Check } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-cream-200 border-t border-charcoal/10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div className="md:col-span-1">
            {/* Masthead - Editorial Logo Lockup */}
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/brand-assets/elivro_logo2.png"
                alt="Elivro logo"
                width={44}
                height={44}
                className="w-11 h-11"
              />
              <span className="font-serif text-charcoal-700 text-[1.75rem] font-normal tracking-[0.04em]" style={{ marginTop: '3px' }}>
                Elivro
              </span>
            </div>
            <p className="text-charcoal-500 text-sm leading-relaxed">
              För assistans som förändrar liv
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-mono text-charcoal-700 font-medium text-sm tracking-wide uppercase mb-4">Navigering</h3>
            <nav className="space-y-2.5">
              <a
                href="#three-pillars"
                onClick={(e) => { e.preventDefault(); scrollToSection('three-pillars') }}
                className="block text-charcoal-500 hover:text-terracotta transition-colors duration-200 text-sm"
              >
                Funktioner
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works') }}
                className="block text-charcoal-500 hover:text-terracotta transition-colors duration-200 text-sm"
              >
                Hur det fungerar
              </a>
              <a
                href="#faq"
                onClick={(e) => { e.preventDefault(); scrollToSection('faq') }}
                className="block text-charcoal-500 hover:text-terracotta transition-colors duration-200 text-sm"
              >
                FAQ
              </a>
              <a
                href="#cta-section"
                onClick={(e) => { e.preventDefault(); scrollToSection('cta-section') }}
                className="block text-charcoal-500 hover:text-terracotta transition-colors duration-200 text-sm"
              >
                Boka demo
              </a>
            </nav>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-mono text-charcoal-700 font-medium text-sm tracking-wide uppercase mb-4">Juridiskt</h3>
            <nav className="space-y-2.5">
              <a
                href="/integritetspolicy"
                className="block text-charcoal-500 hover:text-terracotta transition-colors duration-200 text-sm"
              >
                Integritetspolicy
              </a>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-mono text-charcoal-700 font-medium text-sm tracking-wide uppercase mb-4">Kontakt</h3>
            <div className="space-y-2.5 text-sm">
              <a
                href="mailto:daniel@elivro.se"
                className="block text-charcoal-500 hover:text-terracotta transition-colors duration-200"
              >
                daniel@elivro.se
              </a>
              <div className="pt-3">
                <div className="flex items-center gap-2 text-charcoal-500">
                  <div className="w-4 h-4 rounded-full bg-sage-500/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-sage-500" strokeWidth={3} />
                  </div>
                  <span>GDPR-compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-charcoal-400 text-sm tracking-wide">
              © {new Date().getFullYear()} Elivro
            </div>
            <div className="font-mono text-charcoal-400 text-sm tracking-wide">
              Systemet som förstärker din förmåga att ge exceptionell assistans
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
