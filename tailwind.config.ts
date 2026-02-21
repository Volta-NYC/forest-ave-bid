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
        // Evergreen brand palette
        evergreen: {
          50:  "var(--evergreen-50)",
          100: "var(--evergreen-100)",
          200: "var(--evergreen-200)",
          400: "var(--evergreen-400)",
          500: "var(--evergreen-500)",
          700: "var(--evergreen-700)",
          900: "var(--evergreen-900)",
        },
        // Wood / warm neutral palette
        wood: {
          50:  "var(--wood-50)",
          100: "var(--wood-100)",
          200: "var(--wood-200)",
          300: "var(--wood-300)",
          500: "var(--wood-500)",
          700: "var(--wood-700)",
          900: "var(--wood-900)",
        },
        paper:  "var(--paper)",
        ink:    "var(--ink)",
        // Legacy compat
        "brand-primary":   "var(--brand-primary)",
        "brand-secondary": "var(--brand-secondary)",
        "brand-accent":    "var(--brand-accent)",
        "brand-bg":        "var(--bg)",
        "brand-text":      "var(--text)",
        "brand-muted":     "var(--muted)",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "sans-serif"],
        body:     ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        "wood-sm": "0 2px 8px rgba(92,61,30,0.10)",
        "wood-md": "0 4px 20px rgba(92,61,30,0.14)",
        "wood-lg": "0 10px 40px rgba(92,61,30,0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
