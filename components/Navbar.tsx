'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { scrollToSection as scrollTo, scrollToTop as scrollTop } from '@/lib/scroll-utils'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollTo(id)
    setMobileMenuOpen(false)
  }

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTop()
  }

  const navLinks = [
    { label: 'Filosofi', id: 'philosophy' },
    { label: 'Hur det fungerar', id: 'how-it-works' },
    { label: 'Funktioner', id: 'three-pillars' },
    { label: 'Om oss', id: 'about' },
    { label: 'FAQ', id: 'faq' },
  ]

  return (
    <nav
      data-scrolled={scrolled}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-charcoal/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Masthead - Editorial Logo Lockup */}
          <div className="flex-shrink-0">
            <a
              href="#top"
              onClick={handleScrollToTop}
              className="flex items-center gap-2 group"
            >
              {/* Logo Mark - sized to align with cap height */}
              <Image
                src="/brand-assets/elivro_logo2.png"
                alt="Elivro logo"
                width={44}
                height={44}
                className="w-11 h-11 transition-transform duration-300 group-hover:scale-105"
              />
              {/* Wordmark - Instrument Serif with luxury tracking, hidden on mobile */}
              <span className="hidden sm:inline font-serif text-charcoal-700 text-[1.75rem] font-normal tracking-[0.04em] group-hover:text-terracotta transition-colors duration-200">
                Elivro
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollToSection(e, link.id)}
                className="px-3 py-2 text-sm font-medium font-mono tracking-wide text-charcoal-500 hover:text-charcoal-700 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* CTA Button */}
            <a
              href="#cta-section"
              onClick={(e) => handleScrollToSection(e, 'cta-section')}
              className="ml-4 px-5 py-2 text-sm font-mono font-medium text-cream-50 bg-terracotta hover:bg-terracotta-600 rounded-sm transition-all duration-200 shadow-terracotta"
            >
              Boka demo
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-sm p-2 text-charcoal-500 hover:bg-charcoal/5 hover:text-charcoal-700 transition-colors duration-200"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Öppna meny</span>
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          md:hidden bg-cream/98 backdrop-blur-md border-b border-charcoal/10
          overflow-hidden transition-all duration-300 ease-out
          ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScrollToSection(e, link.id)}
              className="block w-full px-4 py-2.5 text-base font-mono font-medium text-charcoal-500 hover:bg-charcoal/5 hover:text-charcoal-700 rounded-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta-section"
            onClick={(e) => handleScrollToSection(e, 'cta-section')}
            className="block w-full px-4 py-2.5 mt-2 text-base font-mono font-medium text-cream-50 bg-terracotta hover:bg-terracotta-600 rounded-sm text-center transition-all duration-200"
          >
            Boka demo
          </a>
        </div>
      </div>
    </nav>
  )
}
