import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        signature: ['"Caveat"', 'cursive'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        warm: {
          50: "rgb(var(--warm-50) / <alpha-value>)",
          100: "rgb(var(--warm-100) / <alpha-value>)",
          200: "rgb(var(--warm-200) / <alpha-value>)",
          300: "rgb(var(--warm-300) / <alpha-value>)",
          400: "rgb(var(--warm-400) / <alpha-value>)",
          500: "rgb(var(--warm-500) / <alpha-value>)",
          600: "rgb(var(--warm-600) / <alpha-value>)",
          700: "rgb(var(--warm-700) / <alpha-value>)",
          800: "rgb(var(--warm-800) / <alpha-value>)",
          900: "rgb(var(--warm-900) / <alpha-value>)",
          950: "rgb(var(--warm-950) / <alpha-value>)",
        },
        emerald: {
          300: "rgb(var(--accent-300) / <alpha-value>)",
          400: "rgb(var(--accent-400) / <alpha-value>)",
          500: "rgb(var(--accent-500) / <alpha-value>)",
          600: "rgb(var(--accent-600) / <alpha-value>)",
          700: "#b02d0b",
          800: "#7a1e06",
          900: "#421003",
        },
        border: "hsl(0 0% 14.9%)",
        input: "hsl(0 0% 14.9%)",
        ring: "hsl(12 96% 58%)",
        primary: {
          DEFAULT: "hsl(12 96% 58%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 9%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 15%)",
          foreground: "hsl(0 0% 64%)",
        },
        accent: {
          DEFAULT: "hsl(0 0% 15%)",
          foreground: "hsl(0 0% 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0 62% 30%)",
          foreground: "hsl(0 0% 98%)",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      borderWidth: {
        "1.5": "1.5px",
        "1.75": "1.75px",
      },
      boxShadow: {
        'button-emerald': '0 4px 14px 0 rgba(251, 84, 43, 0.35)',
        'contact-card': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'multi-gradient': 'linear-gradient(to right, #3b82f6, #8b5cf6, #fb542b)',
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blink": "blink 1.8s steps(1) infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;

export default config;
