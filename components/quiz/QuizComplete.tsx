'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function QuizComplete() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Clear quiz state from sessionStorage
    sessionStorage.removeItem('elivro-quiz-state')

    // Redirect to landing page after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/')
    }, 3000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="text-center max-w-md">

        {/* Success checkmark with spring animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.1
          }}
          className="w-20 h-20 bg-sage-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check className="w-10 h-10 text-sage-500" strokeWidth={2.5} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="font-serif text-4xl sm:text-5xl text-charcoal-700 mb-4"
        >
          Tack!
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="font-mono text-base sm:text-lg text-charcoal-500 tracking-wide mb-8"
        >
          Kolla din inkorg om ett ögonblick.
        </motion.p>

        {/* Redirect notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="font-mono text-sm text-charcoal-400 tracking-wide"
        >
          Du omdirigeras till startsidan...
        </motion.p>

      </div>
    </div>
  )
}
