'use client'

import { useState, useEffect } from 'react'
import Button from './ui/Button'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav
      data-scrolled={scrolled}
      className="fixed top-0 inset-x-0 z-50 bg-zinc-900/80 backdrop-blur-xl transition-[background,box-shadow] supports-[backdrop-filter]:bg-zinc-900/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-violet-500 text-xl font-semibold tracking-widest hover:text-violet-400 transition-colors duration-300"
            >
              ELIVRO
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <button
              onClick={() => scrollToSection('features-title')}
              className="nav-link text-white/80 hover:text-white text-sm font-medium transition-colors duration-300 relative group"
            >
              Varför välja Elivro?
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
            </button>

            <button
              onClick={() => scrollToSection('cta-section')}
              className="nav-link text-white/80 hover:text-white text-sm font-medium transition-colors duration-300 relative group"
            >
              Kontakta oss
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
            </button>

            <Button variant="primary" size="sm" href="#cta-section">
              Boka en demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-md">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <button
              onClick={() => scrollToSection('features-title')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
            >
              Varför välja Elivro?
            </button>
            <button
              onClick={() => scrollToSection('cta-section')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
            >
              Kontakta oss
            </button>
            <div className="pt-2">
              <Button variant="primary" size="sm" href="#cta-section" className="w-full justify-center">
                Boka en demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
