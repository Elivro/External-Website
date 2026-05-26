/**
 * @type {import('tailwindcss').Config}
 *
 * Design system: ELIVRO — Brand Kit v4 (post-pivot)
 * Source of truth: elivro-design plugin
 *   - tokens.json + primitives.css (canonical token values)
 *   - brand-guidelines.md (visual rules)
 *
 * Token values live in app/globals.css `@theme` block; this config
 * references them via Tailwind utility-class aliases for ergonomic
 * use in JSX (`bg-paper`, `text-ink`, `border-line-strong`).
 * Never re-declare hex values here — point at CSS variables.
 */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        sans:    ['var(--font-inter)',   'system-ui', 'sans-serif'],
        italic:  ['var(--font-italic)',  'Fraunces',  'serif'],
        mono:    ['var(--font-jetbrains-mono)', 'Consolas', 'monospace'],
        // Legacy compat: `font-serif` is heavily used by old sections for
        // headings. Per mockup-v2 hero treatment (Inter weight 700 for the
        // load-bearing display moment), we route font-serif → Inter so old
        // section headlines pick up the new heading voice automatically.
        // Components that explicitly want the Fraunces italic accent should
        // use `<em>` (CSS-styled globally) or `font-italic`.
        serif:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ===== V4 PALETTE =====
        // Surfaces
        paper:      'var(--paper)',
        'paper-soft': 'var(--paper-soft)',
        'paper-card': 'var(--paper-card)',
        'hero-bg':  'var(--hero-bg)',

        // Ink + brand accents
        ink:        'var(--ink)',
        red:        'var(--red)',
        'red-dark': 'var(--red-dark)',
        moss:       'var(--moss)',
        warm:       'var(--warm)',

        // Neutrals
        'n-900':    'var(--n-900)',
        'n-700':    'var(--n-700)',
        'n-600':    'var(--n-600)',
        'n-400':    'var(--n-400)',
        'n-200':    'var(--n-200)',
        'n-100':    'var(--n-100)',

        // Function
        success:    'var(--success)',
        warning:    'var(--warning)',

        // Lines
        line:           'var(--line)',
        'line-strong':  'var(--line-strong)',

        // ===== OBSIDIAN LEGACY COMPAT (delete as sections migrate) =====
        accent: {
          DEFAULT: 'var(--accent)',
          bright:  'var(--accent-bright)',
          deep:    'var(--accent-deep)',
        },
        liv:             '#7a8a6b',
        'ink-lift':      'var(--bg-lift)',
        'ink-card':      'var(--bg-card)',
        'ink-card-soft': 'var(--bg-card-soft)',
        bone:       'var(--bone, #f5efe3)',
        fg:         'var(--fg, #f5efe3)',
        'fg-soft':  'var(--fg-soft, #bdb5a6)',
        'fg-muted': 'var(--fg-muted, #8a8275)',
        'fg-dim':   'var(--fg-dim, #5c5649)',
        edge:          'var(--border)',
        'edge-strong': 'var(--border-strong)',
        'edge-accent': 'var(--accent-glow)',
      },
      borderRadius: {
        'none':    '0',
        'sm':      '8px',
        'DEFAULT': '14px',
        'md':      '14px',
        'lg':      '20px',
        'pill':    '999px',
        // ===== Obsidian compat =====
        'obs-sm':   '8px',
        'obs-md':  '10px',
        'obs-lg':  '14px',
        'obs-xl':  '20px',
        'obs-pill': '50px',
      },
      boxShadow: {
        'lift':  'var(--shadow-lift)',
        'hover': 'var(--shadow-hover)',
        'cta':   'var(--shadow-cta)',
      },
      letterSpacing: {
        'display':  '-0.025em',
        'tight':    '-0.018em',
        'body':     '0',
        'kicker':   '0.16em',
        'eyebrow':  '0.18em',
      },
      lineHeight: {
        'display':  '1.06',
        'tight':    '1.04',
        'h1':       '1.08',
        'h3':       '1.10',
        'h4':       '1.18',
        'body':     '1.55',
      },
      transitionDuration: {
        'fast': '200ms',
        'base': '250ms',
        'slow': '800ms',
        // ===== Obsidian compat =====
        'obs-xs': '100ms',
        'obs-sm': '200ms',
        'obs-md': '300ms',
        'obs-lg': '600ms',
        'obs-xl': '800ms',
      },
      transitionTimingFunction: {
        // Single canonical curve family. Documented exceptions (hero float,
        // AI pulse) use ease-in-out and are scoped to their components.
        DEFAULT: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        'out':   'cubic-bezier(0.2, 0.8, 0.2, 1)',
        // ===== Obsidian compat =====
        obsidian: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
      maxWidth: {
        'container':        'var(--container)',
        'container-narrow': 'var(--container-narrow)',
      },
    },
  },
  plugins: [],
}
