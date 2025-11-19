/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#8b5cf6',
          500: '#a855f7',
        },
        teal: {
          DEFAULT: '#22d3ee',
          400: '#06b6d4',
        },
        surface: {
          900: '#121216',
        },
      },
      borderRadius: {
        '12': '0.75rem',
        'full': '9999px',
      },
      boxShadow: {
        'glow': '0 10px 30px rgba(139,92,246,.25)',
        'glow-lg': '0 14px 34px rgba(139,92,246,.35)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  safelist: [
    'p-[1px]',
    'bg-[linear-gradient(135deg,#8b5cf6,#22d3ee)]',
    'shadow-[0_10px_30px_rgba(139,92,246,.25)]',
    'group-hover:shadow-[0_14px_34px_rgba(139,92,246,.35)]',
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
