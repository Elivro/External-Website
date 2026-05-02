'use client'

import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  /**
   * Optional word to wrap in <em> for italic emphasis.
   * Replaces the legacy purple-gradient highlight which is forbidden
   * per Obsidian anti-patterns (DESIGN.md § Don'ts).
   */
  emphasisWord?: string
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  emphasisWord,
}: AnimatedTextProps) {
  const words = text.split(' ')
  const [visibleWords, setVisibleWords] = useState<number>(0)

  useEffect(() => {
    if (visibleWords >= words.length) return

    const timer = setTimeout(() => {
      setVisibleWords((prev) => prev + 1)
    }, delay + visibleWords * 100)

    return () => clearTimeout(timer)
  }, [visibleWords, words.length, delay])

  return (
    <div className={className}>
      {words.map((word, index) => {
        const isEmphasis = emphasisWord && word.toLowerCase() === emphasisWord.toLowerCase()
        const visible = index < visibleWords

        return (
          <span
            key={index}
            className="word"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            {isEmphasis ? <em className="font-serif italic">{word}</em> : word}{' '}
          </span>
        )
      })}
    </div>
  )
}
