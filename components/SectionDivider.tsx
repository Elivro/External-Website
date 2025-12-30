'use client'

import Image from 'next/image'

interface SectionDividerProps {
  className?: string
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div
      className={`w-full py-12 sm:py-16 lg:py-20 ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          {/* Left line - gradient fade from center outward */}
          <div className="flex-1 h-px relative">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to left, rgba(61, 61, 61, 0.25), rgba(61, 61, 61, 0.08) 60%, transparent 100%)'
              }}
            />
          </div>

          {/* Center divider image - organic pebble shapes */}
          <div className="flex-shrink-0 w-12 sm:w-14 lg:w-16 opacity-80 hover:opacity-100 transition-opacity duration-400">
            <Image
              src="/brand-assets/elivro-asset_divider.png"
              alt=""
              width={64}
              height={32}
              className="w-full h-auto"
            />
          </div>

          {/* Right line - gradient fade from center outward */}
          <div className="flex-1 h-px relative">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(61, 61, 61, 0.25), rgba(61, 61, 61, 0.08) 60%, transparent 100%)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
