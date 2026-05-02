'use client'

interface SectionDividerProps {
  className?: string
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div
      className={`w-full py-16 sm:py-20 lg:py-24 ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="h-px bg-edge" />
      </div>
    </div>
  )
}
