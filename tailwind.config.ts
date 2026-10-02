import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        soft: "#4B5563",
        faint: "#9CA3AF",
        primary: "#8B5CF6",
        accent: "#D946EF",
        sky: "#38BDF8",
        paper: "#FAFAFF",
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
