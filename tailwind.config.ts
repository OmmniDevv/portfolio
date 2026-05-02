import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C8A96E",
        cryo: "#4FC3F7",
        pyro: "#EF9A9A",
        navy: "#0D1B2A",
        parchment: "#F5F0E8",
        electro: "#9B72CF",
        hydro: "#4FC3F7",
        anemo: "#74C69D",
        geo: "#C8A96E",
        dendro: "#A8D5A2",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "star-pattern":
          "radial-gradient(ellipse at 20% 50%, rgba(200,169,110,0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(79,195,247,0.05) 0%, transparent 50%)",
      },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "spin-reverse": { to: { transform: "rotate(-360deg)" } },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 8px rgba(200,169,110,0.4)" },
          "50%": { boxShadow: "0 0 24px rgba(200,169,110,0.9)" },
        },
        "ink-draw": {
          from: { strokeDashoffset: "100%" },
          to: { strokeDashoffset: "0%" },
        },
        "burst-ring": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "wish-flash": {
          "0%": { opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 8s linear infinite",
        "spin-reverse": "spin-reverse 12s linear infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "burst-ring": "burst-ring 0.6s ease-out forwards",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "wish-flash": "wish-flash 3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
