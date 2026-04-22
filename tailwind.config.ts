import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        panel: "var(--panel)",
        panelBorder: "var(--panel-border)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        highlight: "var(--highlight)",
        muted: "var(--muted)",
        danger: "var(--danger)"
      },
      boxShadow: {
        glow: "0 0 0 1px var(--panel-border), 0 30px 60px -40px color-mix(in oklab, var(--primary) 45%, transparent)"
      }
    }
  },
  plugins: []
};

export default config;
