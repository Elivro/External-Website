'use client'

import { useEffect, useState } from 'react'

const OPTIONS = [
  { key: 'fraunces',   label: 'Fraunces' },
  { key: 'instrument', label: 'Instrument' },
  { key: 'newsreader', label: 'Newsreader' },
  { key: 'bodoni',     label: 'Bodoni Moda' },
] as const

type Key = (typeof OPTIONS)[number]['key']

export default function DisplayFontSwitcher() {
  const [active, setActive] = useState<Key>('fraunces')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get('font') as Key | null
    if (fromUrl && OPTIONS.some(o => o.key === fromUrl)) {
      apply(fromUrl)
      return
    }
    const fromStorage = window.localStorage.getItem('elivro:display-font') as Key | null
    if (fromStorage && OPTIONS.some(o => o.key === fromStorage)) apply(fromStorage)
  }, [])

  function apply(key: Key) {
    document.documentElement.dataset.display = key
    window.localStorage.setItem('elivro:display-font', key)
    setActive(key)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 12,
        right: 12,
        zIndex: 9999,
        display: 'flex',
        gap: 4,
        padding: 4,
        background: 'rgba(10, 8, 6, 0.92)',
        border: '1px solid rgba(255, 240, 220, 0.14)',
        borderRadius: 50,
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: 10,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
      aria-label="Display font switcher (dev only)"
    >
      {OPTIONS.map(o => (
        <button
          key={o.key}
          onClick={() => apply(o.key)}
          style={{
            padding: '6px 10px',
            borderRadius: 50,
            border: 'none',
            cursor: 'pointer',
            background: active === o.key ? '#ff7a45' : 'transparent',
            color: active === o.key ? '#0a0806' : '#bdb5a6',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            letterSpacing: 'inherit',
            textTransform: 'inherit',
            transition: 'background 200ms cubic-bezier(0.2, 0.7, 0.2, 1), color 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
