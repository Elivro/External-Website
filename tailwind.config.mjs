/**
 * @type {import('tailwindcss').Config}
 *
 * Design system: ELIVRO — OBSIDIAN
 * Source of truth: ../elivro-business/DESIGN.md
 * Operational mapping: ./DESIGN_RULES.md
 *
 * The legacy Tactile Humanist tokens (terracotta / sage / cream / charcoal)
 * have been retired. All components consume Obsidian tokens.
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
        // Wired through next/font CSS variables. The display font is
        // switchable via ?font= URL param in dev (DESIGN_RULES § Font swap).
        serif: ['var(--t-display)',          'Georgia',   'serif'],
        sans:  ['var(--font-inter)',         'system-ui', 'sans-serif'],
        mono:  ['var(--font-jetbrains-mono)', 'Consolas', 'monospace'],
      },
      colors: {
        // Brand accent — the ember.
        accent: {
          DEFAULT: 'var(--accent)',
          bright:  'var(--accent-bright)',
          deep:    'var(--accent-deep)',
        },

        // Liv — the alive signal. Strictly scoped to three positions
        // (DESIGN.md § Colors / Liv).
        liv: '#7a8a6b',

        // Surfaces (dark canonical).
        ink:             'var(--bg)',
        'ink-lift':      'var(--bg-lift)',
        'ink-card':      'var(--bg-card)',
        'ink-card-soft': 'var(--bg-card-soft)',

        // Foreground / text on dark.
        bone:       'var(--fg)',
        fg:         'var(--fg)',
        'fg-soft':  'var(--fg-soft)',
        'fg-muted': 'var(--fg-muted)',
        'fg-dim':   'var(--fg-dim)',

        // Hairline borders.
        edge:          'var(--border)',
        'edge-strong': 'var(--border-strong)',
        'edge-accent': 'var(--accent-glow)',
      },
      borderRadius: {
        // Obsidian — DESIGN.md § Shapes.
        // The five working radii: sm 8 · md 10 · lg 14 · xl 20 · pill 50.
        // Standard Tailwind keys overwritten so `rounded-md` produces 10px.
        'none':    '0',
        'sm':      '8px',
        'DEFAULT': '10px',
        'md':      '10px',
        'lg':      '14px',
        'xl':      '20px',
        'pill':    '50px',

        // Explicit obs-* aliases — used by components for clarity.
        'obs-sm':   '8px',
        'obs-md':  '10px',
        'obs-lg':  '14px',
        'obs-xl':  '20px',
        'obs-pill': '50px',
      },
      boxShadow: {
        // Obsidian — soft, long, ember-tinted. Drives off CSS variables.
        'sm':       'var(--shadow-chip)',
        'DEFAULT':  'var(--shadow-card)',
        'md':       'var(--shadow-card)',
        'lg':       'var(--shadow-cta)',
        'xl':       'var(--shadow-cta-hover)',
        '2xl':      'var(--shadow-hero)',

        // Explicit obs-* aliases.
        'obs-rim':       'var(--shadow-focus)',
        'obs-cta':       'var(--shadow-cta)',
        'obs-cta-hover': 'var(--shadow-cta-hover)',
        'obs-card':      'var(--shadow-card)',
        'obs-chip':      'var(--shadow-chip)',
        'obs-hero':      'var(--shadow-hero)',
        'obs-glow-dot':  'var(--shadow-glow-dot)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      letterSpacing: {
        'tighter':     '-0.03em',
        'tight':       '-0.02em',
        'editorial':   '-0.01em',
        'normal':      '0',
        'wide':        '0.01em',
        'wider':       '0.02em',
        'mono':        '0.04em',
        'obs-display': '-0.028em',
        'obs-h1':      '-0.021em',
        'obs-mono':    '0.12em',
      },
      lineHeight: {
        'editorial':   '1.15',
        'relaxed':     '1.55',
        'obs-display': '0.94',
        'obs-tight':   '1.05',
        'obs-body':    '1.55',
      },
      transitionDuration: {
        // Obsidian — DESIGN.md § Motion.
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '600': '600ms',
        '800': '800ms',

        // Explicit obs-* aliases.
        'obs-xs':  '100ms',
        'obs-sm':  '200ms',
        'obs-md':  '300ms',
        'obs-lg':  '600ms',
        'obs-xl':  '800ms',
      },
      transitionTimingFunction: {
        // The single Obsidian easing. Mixing curves is a system-break.
        // Documented exceptions (mark rotation, Liv breath) are inline
        // in their respective component CSS.
        obsidian: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
