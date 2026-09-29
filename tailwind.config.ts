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
        base: "#060606",
        surface: "#0D0D0E",
        "surface-elevated": "#151517",
        "surface-border": "rgba(231, 224, 210, 0.10)",
        "surface-border-bright": "rgba(231, 224, 210, 0.22)",
        "warm-light": "#F5F3EE",
        "text-main": "#F5F3EE",
        "text-muted": "#A89F91",
        "text-subtle": "#5A5349",
        beige: {
          DEFAULT: "#E7E0D2",
          light: "#F5F3EE",
          warm: "#DFD7C7",
          muted: "#A89F91",
          dark: "#2A2722",
          border: "rgba(231, 224, 210, 0.12)",
          "border-hover": "rgba(231, 224, 210, 0.28)",
        },
        sentosa: {
          blue: "#8C8275",
          deep: "#6D6459",
          paper: "#F5F3EE",
          charcoal: "#2A2722",
          taupe: "#8C8275",
          border: "rgba(231, 224, 210, 0.18)",
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
        specular: "inset 0 1px 1px 0 rgba(231, 224, 210, 0.15)",
        "sentosa-card": "0 8px 30px rgba(42, 39, 34, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
