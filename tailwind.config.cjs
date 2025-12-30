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
      fontFamily: {
        // Editorial serif for headlines - dignity and warmth
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        // Technical monospace for UI labels and subheads
        mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
        // Body text - cohesive with headline font
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
        // Legacy aliases for compatibility
        display: ['Instrument Serif', 'Georgia', 'serif'],
        body: ['Instrument Sans', 'system-ui', 'sans-serif'],
        // Logo font
        logo: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ===================================
        // TACTILE HUMANIST COLOR PALETTE
        // ===================================

        // Primary - Deep Terracotta (warmth, humanity, grounded)
        terracotta: {
          50: '#FAF5F2',
          100: '#F0E4DD',
          200: '#E5CFC3',
          300: '#D4AE9A',
          400: '#C98A70',
          DEFAULT: '#B86B4C',
          500: '#B86B4C',
          600: '#9A5A3F',
          700: '#7A4732',
          800: '#5A3425',
          900: '#3D231A',
        },

        // Secondary - Muted Sage Green (organic, calm, growth)
        sage: {
          50: '#F5F7F3',
          100: '#E8EDE4',
          200: '#D4DEC9',
          300: '#B5C5A9',
          400: '#9BAF8C',
          DEFAULT: '#9BAF8C',
          500: '#7D9A6C',
          600: '#648057',
          700: '#4F6545',
          800: '#3B4B34',
          900: '#283223',
        },

        // Background - Off-white/Cream (paper-like, not harsh)
        cream: {
          50: '#FFFDF9',
          100: '#F5F2ED',
          DEFAULT: '#F5F2ED',
          200: '#E8E3DB',
          300: '#D9D2C7',
          400: '#C7BFB1',
          500: '#B5AA99',
        },

        // Text - Warm Charcoal (not harsh black)
        charcoal: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#5A5A5A',
          DEFAULT: '#3D3D3D',
          600: '#3D3D3D',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#0D0D0D',
        },

        // ===================================
        // LEGACY COLORS (for gradual migration)
        // ===================================
        surface: {
          base: '#F5F2ED',      // cream
          elevated: '#FFFDF9',  // cream-50
          card: '#E8E3DB',      // cream-200
        },
        border: {
          subtle: 'rgba(61, 61, 61, 0.1)',
          DEFAULT: 'rgba(61, 61, 61, 0.2)',
        },
        status: {
          success: '#7D9A6C',   // sage-500
          warning: '#C98A70',   // terracotta-400
          risk: '#B86B4C',      // terracotta
          urgent: '#9A5A3F',    // terracotta-600
        },
        accent: {
          DEFAULT: '#B86B4C',   // terracotta
          hover: '#9A5A3F',     // terracotta-600
          light: '#C98A70',     // terracotta-400
        },
      },
      borderRadius: {
        // Editorial - minimal rounding
        'none': '0',
        'sm': '2px',
        'DEFAULT': '3px',
        'md': '4px',
        'lg': '6px',
      },
      boxShadow: {
        // Editorial shadows - subtle and charcoal-based
        'sm': '0 2px 8px rgba(61, 61, 61, 0.06)',
        'DEFAULT': '0 4px 16px rgba(61, 61, 61, 0.08)',
        'md': '0 6px 24px rgba(61, 61, 61, 0.1)',
        'lg': '0 12px 40px rgba(61, 61, 61, 0.12)',
        // Terracotta accent shadows
        'terracotta': '0 4px 16px rgba(184, 107, 76, 0.15)',
        'terracotta-lg': '0 8px 32px rgba(184, 107, 76, 0.2)',
        // Sage accent shadows
        'sage': '0 4px 16px rgba(155, 175, 140, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      letterSpacing: {
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'editorial': '-0.01em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
        'mono': '0.03em',
      },
      lineHeight: {
        'editorial': '1.15',
        'relaxed': '1.7',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
