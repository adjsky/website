const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      white: "#F4F4F6",
      black: "#2F323A",
      gray: "#40444F",
      blue: "#8EBCE1",
      pink: "#E1ACC1",
      accent: "#DEBAC0"
    },
    extend: {
      fontFamily: {
        sans: ["Source Code Pro", ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
      fontSize: {
        "4.5xl": ["2.875rem", "3.125rem"]
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
}
