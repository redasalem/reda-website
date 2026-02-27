import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#F97316",    // Orange 500
          secondary: "#64748B",  // Slate 500
          accent: "#EA580C",     // Deep Orange 600
          background: "#F8FAFC", // Slate 50
          foreground: "#334155", // Slate 700
          muted: "#94A3B8",      // Slate 400
          border: "#E2E8F0",     // Slate 300
        },
        dark: {
          primary: "#FB923C",    // Orange 400
          secondary: "#94A3B8",  // Slate 400
          accent: "#FB923C",     // Orange 400
          background: "#020617", // Slate 950
          foreground: "#F8FAFC", // Slate 50
          muted: "#1E293B",      // Slate 800
          border: "#1E293B",     // Slate 800
        }
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blink: {
          "from, to": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
}

export default config