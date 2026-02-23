import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F14",
        glass: "rgba(255,255,255,0.08)",
        "glass-border": "rgba(255,255,255,0.18)",
        gold: "#C6A75E",
        "gold-hover": "#B8954D",
        "text-primary": "#F5F5F5",
        "text-muted": "#B8B8B8"
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        "gold-soft": "0 0 0 1px rgba(198, 167, 94, 0.3), 0 14px 42px rgba(198, 167, 94, 0.22)",
        "glass-glow": "0 0 0 1px rgba(255,255,255,0.16), 0 24px 72px rgba(0,0,0,0.48)"
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      spacing: {
        "section-sm": "3rem",
        "section-md": "5rem",
        "section-lg": "7.5rem"
      },
      keyframes: {
        "scale-fade-in": {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        "scale-fade-in": "scale-fade-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards"
      }
    }
  },
  plugins: []
};

export default config;
