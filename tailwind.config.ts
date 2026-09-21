import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#050505",
        surface: "#0D0D0D",
        "surface-elevated": "#141414",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        "surface-border-bright": "rgba(255, 255, 255, 0.16)",
        "warm-light": "#F6F5F2",
        "text-main": "#F5F5F7",
        "text-muted": "#8E8E93",
        "text-subtle": "#48484A",
        sentosa: {
          blue: "#6492b3",
          deep: "#4f7897",
          paper: "#ebeae7",
          charcoal: "#3a3530",
          taupe: "#8d7d6d",
          border: "#bdb8ad",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        display: ["Inter", "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "sans-serif"],
        mono: ["SF Mono", "JetBrains Mono", "ui-monospace", "Menlo", "Courier New", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.035em",
        normal: "0em",
        wide: "0.08em",
        widest: "0.18em",
      },
      lineHeight: {
        display: "0.88",
        tight: "0.95",
        relaxed: "1.6",
      },
      boxShadow: {
        tactile: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        "tactile-hover": "0 30px 60px -15px rgba(0, 0, 0, 0.9)",
        specular: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
        "sentosa-card": "0 8px 30px rgba(58, 53, 48, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
