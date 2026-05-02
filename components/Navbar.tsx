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
    { label: 'Produkten', id: 'product' },
    { label: 'Funktioner', id: 'features' },
    { label: 'Om oss', id: 'about-us' },
    { label: 'FAQ', id: 'faq' },
  ]

  return (
    <nav
      data-scrolled={scrolled}
      className={`fixed top-0 inset-x-0 z-50 transition-colors ease-obsidian duration-obs-sm ${
        scrolled
          ? 'bg-ink/92 border-b border-edge'
          : 'bg-ink/70 border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Mark + wordmark + Liv heartbeat */}
          <a
            href="#top"
            onClick={handleScrollToTop}
            className="flex items-center gap-3 group"
          >
            <Image
              src="/brand-assets/elivro_logo2.png"
              alt="Elivro"
              width={28}
              height={28}
              className="w-7 h-7"
              priority
            />
            <span className="font-serif text-fg text-[1.25rem] font-light tracking-[0.02em]">
              Elivro
            </span>
            <span
              aria-hidden="true"
              className="liv-dot ml-1"
              title="System aktivt"
            />
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollToSection(e, link.id)}
                className="px-3 py-2 text-sm font-sans text-fg-soft hover:text-fg transition-colors ease-obsidian duration-obs-sm"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#cta-section"
              onClick={(e) => handleScrollToSection(e, 'cta-section')}
              className="ml-4 inline-flex items-center px-5 py-2 text-sm font-sans text-ink bg-accent hover:bg-accent-bright active:bg-accent-deep rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
            >
              Boka demo
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-obs-md p-2 text-fg-soft hover:text-fg hover:bg-ink-lift transition-colors ease-obsidian duration-obs-sm"
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
        className={`md:hidden bg-ink-lift border-b border-edge overflow-hidden transition-all ease-obsidian ${
          mobileMenuOpen ? 'max-h-96 opacity-100 duration-obs-md' : 'max-h-0 opacity-0 duration-obs-sm'
        }`}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScrollToSection(e, link.id)}
              className="block w-full px-4 py-2.5 text-base font-sans text-fg-soft hover:bg-ink-card hover:text-fg rounded-obs-md transition-colors ease-obsidian duration-obs-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta-section"
            onClick={(e) => handleScrollToSection(e, 'cta-section')}
            className="block w-full px-4 py-2.5 mt-2 text-base font-sans font-medium text-ink bg-accent hover:bg-accent-bright rounded-obs-md text-center transition-colors ease-obsidian duration-obs-sm"
          >
            Boka demo
          </a>
        </div>
      </div>
    </nav>
  )
}
