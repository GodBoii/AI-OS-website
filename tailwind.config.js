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
        paper: "#000000",
        ink: "#f0f0ed",
        muted: "#a1a1a6",
        "neo-bg": "#000000",
        "neo-text": "#f0f0ed",
        white: "#ffffff",
        primary: "#d5f49d",
        "primary-dark": "#b7d87a",
        "primary-light": "#e4ffbb",
        accent: "#d5f49d",
        "accent-light": "#b7d87a",
        surface: "#101012",
        "surface-light": "#1a1a1e",
        "border-color": "#28282c",
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
