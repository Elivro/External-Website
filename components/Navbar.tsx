'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { scrollToSection as scrollTo, scrollToTop as scrollTop } from '@/lib/scroll-utils'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false)
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

  return (
    <nav
      data-scrolled={scrolled}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-in-out ${
        scrolled
          ? 'bg-zinc-900/60 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#top"
              onClick={handleScrollToTop}
              className="text-zinc-300 text-xl font-bold tracking-widest hover:text-zinc-200 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              ELIVRO
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#problem"
              onClick={(e) => handleScrollToSection(e, 'problem')}
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              Utmaningar
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>

            <a
              href="#how-it-works"
              onClick={(e) => handleScrollToSection(e, 'how-it-works')}
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              Hur det fungerar
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>

            <a
              href="#three-pillars"
              onClick={(e) => handleScrollToSection(e, 'three-pillars')}
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              Funktioner
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <button
                className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1 flex items-center gap-1"
              >
                Resurser
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 w-56 rounded-lg bg-zinc-900/95 backdrop-blur-md border border-zinc-800 shadow-lg transition-all duration-200 ${
                  resourcesDropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="py-2">
                  <Link
                    href="/resurser"
                    className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📚</span>
                      <div>
                        <div className="font-medium">Guider</div>
                        <div className="text-xs text-zinc-500">FK, GDPR, Lex Sarah, IVO</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/blogg"
                    className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✍️</span>
                      <div>
                        <div className="font-medium">Blogg</div>
                        <div className="text-xs text-zinc-500">Tips och nyheter</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/jamfor"
                    className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚖️</span>
                      <div>
                        <div className="font-medium">Jämför system</div>
                        <div className="text-xs text-zinc-500">AIAI, Tidvis, Primass</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <a
              href="#about"
              onClick={(e) => handleScrollToSection(e, 'about')}
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              Om oss
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>

            <a
              href="#faq"
              onClick={(e) => handleScrollToSection(e, 'faq')}
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              FAQ
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>

            <a
              href="#cta-section"
              onClick={(e) => handleScrollToSection(e, 'cta-section')}
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              Boka demo
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
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
      <div
        className={`
          md:hidden bg-zinc-900/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-out
          ${mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          <a
            href="#problem"
            onClick={(e) => handleScrollToSection(e, 'problem')}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            Utmaningar
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleScrollToSection(e, 'how-it-works')}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            Hur det fungerar
          </a>
          <a
            href="#three-pillars"
            onClick={(e) => handleScrollToSection(e, 'three-pillars')}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            Funktioner
          </a>

          {/* Mobile Resources Section */}
          <div className="px-4 py-2">
            <div className="text-sm font-semibold text-zinc-400 mb-2">Resurser</div>
            <div className="space-y-1 pl-2">
              <Link
                href="/resurser"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors"
              >
                📚 Guider
              </Link>
              <Link
                href="/blogg"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors"
              >
                ✍️ Blogg
              </Link>
              <Link
                href="/jamfor"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors"
              >
                ⚖️ Jämför system
              </Link>
            </div>
          </div>

          <a
            href="#about"
            onClick={(e) => handleScrollToSection(e, 'about')}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            Om oss
          </a>
          <a
            href="#faq"
            onClick={(e) => handleScrollToSection(e, 'faq')}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            FAQ
          </a>
          <a
            href="#cta-section"
            onClick={(e) => handleScrollToSection(e, 'cta-section')}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            Boka demo
          </a>
        </div>
      </div>
    </nav>
  )
}
