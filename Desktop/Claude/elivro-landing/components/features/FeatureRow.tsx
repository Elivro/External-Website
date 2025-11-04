'use client'

import React from 'react'

export type FeatureRowProps = {
  eyebrow?: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  reverse?: boolean
}

export default function FeatureRow({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt = 'Feature screenshot',
  reverse = false,
}: FeatureRowProps) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
      {/* Text Block */}
      <div className={reverse ? 'md:order-last' : ''}>
        {eyebrow && (
          <p className="text-sm font-semibold text-purple-300 uppercase tracking-widest">
            {eyebrow}
          </p>
        )}
        <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-white leading-tight">
          {title}
        </h3>
        <p className="mt-3 text-white/70 leading-relaxed text-lg">
          {description}
        </p>
      </div>

      {/* Media Block */}
      <div
        className={`
          relative rounded-2xl bg-[#0f1012] ring-1 ring-white/10 p-3 md:p-4
          shadow-[0_20px_60px_rgba(0,0,0,.45)]
          transition-transform duration-300
          hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(0,0,0,.55)]
          motion-reduce:hover:transform-none
          ${reverse ? 'md:order-first' : 'md:order-last'}
        `}
      >
        {imageSrc ? (
          // Real image
          <img
            src={imageSrc}
            alt={imageAlt}
            className="block w-full rounded-xl"
            loading="lazy"
          />
        ) : (
          // Skeleton placeholder
          <div
            role="img"
            aria-label="Screenshot placeholder"
            className="relative aspect-[16/10] rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/80 overflow-hidden"
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] animate-[shimmer_1.6s_linear_infinite] motion-reduce:animate-none"
              style={{ transform: 'translateX(-100%)' }}
            />
            {/* Placeholder content hint */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-zinc-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-xs text-zinc-600 font-medium">Screenshot kommer snart</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
