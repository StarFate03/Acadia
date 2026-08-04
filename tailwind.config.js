/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────
//  BRANDING — single accent color, easy to swap.
//  Currently: electric blue. To rebrand (e.g. to amber), change
//  the `accent` scale below; nothing else in the app hard-codes it.
// ─────────────────────────────────────────────────────────────
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Near-black / charcoal surfaces (darkest → lightest)
        ink: {
          950: '#0a0a0d',
          900: '#0e0e12', // page background
          800: '#15151c', // raised surface / cards
          700: '#1d1d27', // hover surface
          600: '#282833', // borders / dividers
          500: '#3a3a48',
        },
        // Single accent color used for buttons, highlights, focus.
        accent: {
          300: '#7db3ff',
          400: '#4c9aff',
          500: '#2f81f7', // primary accent
          600: '#1f6ae0',
          700: '#1856b8',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.4)',
        'card-hover': '0 12px 30px -8px rgba(0,0,0,0.7)',
        glow: '0 0 0 1px rgba(47,129,247,0.5), 0 8px 30px -6px rgba(47,129,247,0.35)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease both',
        'fade-up': 'fade-up 0.5s ease both',
      },
    },
  },
  plugins: [],
}
