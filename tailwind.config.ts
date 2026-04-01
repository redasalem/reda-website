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
        'brand-mint': {
          50: "#F0FFF9",
          100: "#CCFFE6",
          200: "#99FFCC",
          300: "#66FFB3",
          400: "#33FF99",
          500: "#00FF9F", // Neon Base
          600: "#00D1B2", // Secondary/Accent
          700: "#00A389",
          800: "#007562",
          900: "#00473B",
          950: "#00241D",
        },
        light: {
          primary: "#00D1B2",    // Neo-Mint 600
          secondary: "#64748B",  // Slate 500
          accent: "#0D9488",     // Darker Mint
          background: "#F8FAFC", // Slate 50
          foreground: "#334155", // Slate 700
          muted: "#94A3B8",      // Slate 400
          border: "#E2E8F0",     // Slate 300
        },
        dark: {
          primary: "#00FF9F",    // Neo-Mint 500 (Neon)
          secondary: "#94A3B8",  // Slate 400
          accent: "#00FF9F",     // Neo-Mint 500
          background: "#020617", // Slate 950
          foreground: "#F8FAFC", // Slate 50
          muted: "#1E293B",      // Slate 800
          border: "#1E293B",     // Slate 800
        }
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite 0.5s",
        "float-slower": "float 10s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "gradient": "gradient 3s ease infinite",
        "pulse-slow": "pulseSlow 6s ease-in-out infinite",
        "pulse-slow-delay": "pulseSlow 5s ease-in-out 1s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        blink: {
          "from, to": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.15" },
          "50%": { transform: "scale(1.35)", opacity: "0.25" },
        },
      },
    },
  },
  plugins: [],
}

export default config