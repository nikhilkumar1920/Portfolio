/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#05070d',
          secondary: '#0a0e1a',
          card: '#0f1527',
          elevated: '#151d34',
        },
        surface: {
          glass: 'rgba(15, 21, 39, 0.65)',
          'glass-border': 'rgba(139, 92, 246, 0.18)',
          'glass-hover': 'rgba(21, 29, 52, 0.8)',
        },
        accent: {
          violet: '#8b5cf6',
          'violet-light': '#a78bfa',
          'violet-dark': '#6d28d9',
          cyan: '#06b6d4',
          'cyan-light': '#38bdf8',
          'cyan-dark': '#0891b2',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.08) 35%, transparent 70%)',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      animation: {
        'ticker': 'ticker 35s linear infinite',
        'ticker-reverse': 'ticker-reverse 35s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 12s linear infinite',
        'border-beam': 'border-beam var(--duration) infinite linear',
      },
      keyframes: {
        'border-beam': {
          '100%': {
            offsetDistance: '100%',
          },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ticker-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-composite': '0 0 40px -10px rgba(139, 92, 246, 0.3), 0 0 20px -5px rgba(6, 182, 212, 0.25)',
      },
    },
  },
  plugins: [],
}
