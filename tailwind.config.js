module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'neo-bg': '#ffffff',
        'neo-text': '#000000',
        'neo-yellow': '#FBbf24', // Standard yellow for now, or maybe sharper
        'neo-lime': '#DBFF00',
        'neo-mint': '#00FFA3',
        'neo-blue': '#4D79FF',
        'neo-pink': '#FF4D9B',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-sm': '2px 2px 0px 0px #000000',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
} 