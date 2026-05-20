module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter-tight)', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'neo-bg': '#050505',
        'neo-text': '#ededed',
        'white': '#ffffff',
        'primary': '#0a0a0a',
        'surface': '#111111',
        'surface-light': '#1a1a1a',
        'border-color': '#262626',
        'accent-violet': '#8b5cf6',
        'accent-cyan': 'rgba(34, 211, 238, 0.2)',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(34, 211, 238, 0.3)',
        'glow-violet': '0 0 30px -5px rgba(139, 92, 246, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}