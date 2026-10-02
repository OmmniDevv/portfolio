import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        soft: "var(--soft)",
        faint: "var(--faint)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        sky: "var(--sky)",
        paper: "var(--bg)",
      },
      fontFamily: {
        display: ["var(--font-sans)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
