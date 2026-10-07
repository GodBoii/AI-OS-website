module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        paper: "#f5f4ef",
        ink: "#242620",
        muted: "#62665a",
        "neo-bg": "#f5f4ef",
        "neo-text": "#242620",
        white: "#ffffff",
        primary: "#ee512c",
        "primary-dark": "#cc3d1b",
        "primary-light": "#b63316",
        accent: "#516549",
        "accent-light": "#354d2d",
        surface: "#e9ece1",
        "surface-light": "#eef0e7",
        "border-color": "#d6d9ce",
        "accent-violet": "#a7361b",
        "accent-cyan": "rgba(81, 101, 73, 0.2)",
      },
      boxShadow: {
        "glow-cyan": "0 0 30px -5px rgba(34, 211, 238, 0.3)",
        "glow-violet": "0 0 30px -5px rgba(139, 92, 246, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
