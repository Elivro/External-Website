'use client'

import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0
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
      {words.map((word, index) => (
        <span
          key={index}
          className={`word ${
            index < visibleWords
              ? 'opacity-100'
              : 'opacity-0'
          }`}
          style={{
            transitionDelay: `${index * 0.1}s`,
          }}
        >
          {word}{' '}
        </span>
      ))}
    </div>
  )
}
