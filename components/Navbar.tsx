'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ElivroLogo from './ElivroLogo'
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
    { label: 'System', id: 'features' },
    { label: 'Team', id: 'about-us' },
    { label: 'Manifest', id: 'manifesto' },
    { label: 'Bevis', id: 'case-proof' },
  ]

  return (
    <nav
      data-scrolled={scrolled}
      className={`sticky top-0 inset-x-0 z-50 transition-colors duration-fast ease-out ${
        scrolled
          ? 'bg-paper/92 border-b border-line backdrop-blur-md'
          : 'bg-paper/70 border-b border-transparent backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Mark + wordmark */}
          <a
            href="#top"
            onClick={handleScrollToTop}
            className="flex items-center gap-3 group"
          >
            <ElivroLogo className="h-9 w-auto text-ink" ariaLabel="Elivro" />
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollToSection(e, link.id)}
                className="px-3 py-2 text-sm font-sans text-n-700 hover:text-ink transition-colors duration-fast ease-out"
              >
                {link.label}
              </a>
            ))}

            <a
              href="https://login.elivro.se"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center px-3 py-2 text-sm font-sans text-n-700 hover:text-ink transition-colors duration-fast ease-out"
            >
              Logga in
            </a>

            <a
              href="#startup-offer"
              onClick={(e) => handleScrollToSection(e, 'startup-offer')}
              className="ml-2 inline-flex items-center px-5 py-2 text-sm font-sans font-semibold bg-ink hover:bg-n-900 rounded-pill transition-colors duration-fast ease-out shadow-cta"
              style={{ color: '#FAFAF7' }}
            >
              Boka demo
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-n-700 hover:text-ink hover:bg-paper-soft transition-colors duration-fast ease-out"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Öppna meny</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-paper-card border-b border-line overflow-hidden transition-all ease-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100 duration-base' : 'max-h-0 opacity-0 duration-fast'
        }`}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScrollToSection(e, link.id)}
              className="block w-full px-4 py-2.5 text-base font-sans text-n-700 hover:bg-paper-soft hover:text-ink rounded-md transition-colors duration-fast ease-out"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://login.elivro.se"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-2.5 text-base font-sans text-n-700 hover:bg-paper-soft hover:text-ink rounded-md transition-colors duration-fast ease-out"
          >
            Logga in
          </a>
          <a
            href="#startup-offer"
            onClick={(e) => handleScrollToSection(e, 'startup-offer')}
            className="block w-full px-4 py-2.5 mt-2 text-base font-sans font-semibold bg-ink hover:bg-n-900 rounded-pill text-center transition-colors duration-fast ease-out"
            style={{ color: '#FAFAF7' }}
          >
            Boka demo
          </a>
        </div>
      </div>
    </nav>
  )
}
