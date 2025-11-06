'use client'

import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  gradientWord?: string
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  gradientWord
}: AnimatedTextProps) {
  const words = text.split(' ')
  const [visibleWords, setVisibleWords] = useState<number>(0)

  useEffect(() => {
    if (visibleWords >= words.length) return

    const timer = setTimeout(() => {
      setVisibleWords(prev => prev + 1)
    }, delay + visibleWords * 100)

    return () => clearTimeout(timer)
  }, [visibleWords, words.length, delay])

  return (
    <div className={className}>
      {words.map((word, index) => {
        const isGradientWord = gradientWord && word.toLowerCase() === gradientWord.toLowerCase()

        return (
          <span
            key={index}
            className={`word ${
              index < visibleWords
                ? 'opacity-100'
                : 'opacity-0'
            } ${
              isGradientWord
                ? 'bg-gradient-to-r from-[#a78bfa] via-[#c084fc] to-[#60a5fa] bg-clip-text text-transparent [text-shadow:none]'
                : ''
            }`}
            style={{
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            {word}{' '}
          </span>
        )
      })}
    </div>
  )
}
