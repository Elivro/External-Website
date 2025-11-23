'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

  const closeMobileMenu = () => setMobileMenuOpen(false)

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
            <Link
              href="/funktioner"
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              Funktioner
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>

            <Link
              href="/priser"
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              Priser
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>

            <Link
              href="/hur-det-fungerar"
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              Hur det fungerar
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>

            <Link
              href="/om-oss"
              className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 relative group py-1"
            >
              Om oss
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>

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
          ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          <Link
            href="/funktioner"
            onClick={closeMobileMenu}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            Funktioner
          </Link>
          <Link
            href="/priser"
            onClick={closeMobileMenu}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            Priser
          </Link>
          <Link
            href="/hur-det-fungerar"
            onClick={closeMobileMenu}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            Hur det fungerar
          </Link>
          <Link
            href="/om-oss"
            onClick={closeMobileMenu}
            className="block w-full px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors duration-300"
          >
            Om oss
          </Link>
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
