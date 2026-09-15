'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import ElivroLogo from './ElivroLogo'
import DemoModal from './DemoModal'
import { scrollToSection as scrollTo, scrollToTop as scrollTop } from '@/lib/scroll-utils'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  /**
   * The nav links point at sections of the landing page. On any other route
   * those elements do not exist, so scrollToSection found nothing and did
   * nothing — while preventDefault had already killed the anchor. Every nav
   * link, and the logo, was inert on /kunskap, /integritetspolicy and every
   * future sub-page.
   *
   * Off the homepage they become real links to /#section instead.
   */
  const pathname = usePathname()
  const onHome = pathname === '/'
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  const openDemo = () => {
    setIsDemoOpen(true)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Dismiss the mobile menu on an outside tap or Escape. Listeners are only
  // bound while it is open. `pointerdown` rather than `click` so the menu
  // closes on touch-down like a native sheet, and so a tap that lands on a
  // link still runs that link's own handler.
  useEffect(() => {
    if (!mobileMenuOpen) return

    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMobileMenuOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileMenuOpen])

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMobileMenuOpen(false)
    if (!onHome) return // let the browser follow /#id to the landing page
    e.preventDefault()
    scrollTo(id)
  }

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onHome) return // let the browser follow / home
    e.preventDefault()
    scrollTop()
  }

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  const navLinks = [
    { label: 'Produkt', id: 'product' },
    { label: 'Funktioner', id: 'features' },
    { label: 'Om oss', id: 'about-us' },
  ]

  return (
    <>
    <nav
      ref={navRef}
      data-scrolled={scrolled}
      className={`sticky top-0 inset-x-0 z-50 transition-colors duration-fast ease-out ${
        scrolled ? 'bg-paper/92 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex h-20 items-center lg:h-[84px]">
          {/* LEFT — Mark + wordmark */}
          <div className="flex flex-1 justify-start">
            <a
              href={onHome ? '#top' : '/'}
              onClick={handleScrollToTop}
              className="flex items-center gap-3 group"
            >
              <ElivroLogo className="h-10 w-auto text-ink lg:h-11" ariaLabel="Elivro" />
            </a>
          </div>

          {/* CENTER — primary nav links, geometrically centered */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={sectionHref(link.id)}
                onClick={(e) => handleScrollToSection(e, link.id)}
                className="px-3 py-2 font-display text-[16px] font-medium text-n-700 hover:text-ink transition-colors duration-fast ease-out"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* RIGHT — Logga in + Boka demo */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-1">
            <a
              href="https://login.elivro.se"
              target="_blank"
              rel="noopener noreferrer"
              className="group/login inline-flex items-center gap-2.5 rounded-pill border border-line-strong bg-paper-card/45 px-5 py-3 font-display text-[16px] font-medium text-ink hover:bg-paper-card hover:border-ink transition-colors duration-fast ease-out"
            >
              Logga in
              <span aria-hidden="true" className="text-[16px] leading-none transition-transform duration-fast ease-out group-hover/login:translate-x-0.5">↗</span>
            </a>

            <button
              type="button"
              onClick={openDemo}
              className="group/header-demo ml-2 inline-flex items-center gap-3 rounded-pill bg-ink px-8 py-3.5 text-[16px] font-sans font-semibold transition-colors duration-fast ease-out shadow-[0_8px_24px_-8px_rgba(220,38,38,0.55)] hover:bg-n-900"
              style={{ color: '#FAFAF7' }}
            >
              <span>Boka demo</span>
              <span aria-hidden="true" className="inline-block transition-transform duration-fast ease-out group-hover/header-demo:translate-x-1">
                →
              </span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              type="button"
              ref={triggerRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md p-2 text-n-700 hover:text-ink hover:bg-paper-soft transition-colors duration-fast ease-out"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
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
        id="mobile-menu"
        inert={!mobileMenuOpen}
        className={`md:hidden bg-paper-card border-b border-line overflow-hidden transition-all ease-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100 duration-base' : 'max-h-0 opacity-0 duration-fast'
        }`}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={sectionHref(link.id)}
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
          <button
            type="button"
            onClick={openDemo}
            className="mt-2 flex w-full items-center justify-center gap-3 rounded-pill bg-ink px-5 py-3 text-base font-sans font-semibold text-center transition-colors duration-fast ease-out hover:bg-n-900"
            style={{ color: '#FAFAF7' }}
          >
            <span>Boka demo</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

    </nav>
    <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}
