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
          primary: "#8B5CF6",    // رائع بنفسجي
          secondary: "#EC4899",  // وردي جميل
          accent: "#06B6D4",     // سماوي منعش
          background: "#F0F4F8", // رمادي فاتح مريح للعين
          foreground: "#1E293B", // كحلي غامق للنصوص
          muted: "#64748B",      // رمادي متوسط للنصوص الثانوية
          border: "#E2E8F0",     // رمادي فاتح جداً للحدود
        },
        dark: {
          primary: "#8B5CF6",    // نفس البنفسجي
          secondary: "#EC4899",  // نفس الوردي
          accent: "#06B6D4",     // نفس السماوي
          background: "#0F172A", // كحلي غامق
          foreground: "#F8FAFC", // أبيض مائل للرمادي
          muted: "#94A3B8",      // رمادي فاتح
          border: "#1E293B",     // كحلي متوسط
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