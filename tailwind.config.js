module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'neo-bg': '#050505',
        'neo-text': '#E2E8F0',
        'primary': '#faf9f6', // cream white
        'primary-dark': '#e8e6e1',
        'accent': '#a855f7', // subtle purple
        'yellow-accent': '#eab308',
        'surface': '#111111',
        'surface-light': '#1a1a1a',
        'border-color': '#262626',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(250, 249, 246, 0.3)',
        'glow-lg': '0 0 30px -5px rgba(250, 249, 246, 0.4)',
        'glow-accent': '0 0 20px -5px rgba(168, 85, 247, 0.4)',
        'glow-yellow': '0 0 20px -5px rgba(234, 179, 8, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}