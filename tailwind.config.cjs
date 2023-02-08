const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      white: "#F8F8F2",
      primary: "#282A36",
      yellow: "#f4f99d",
      purple: "#C9A8EE",
      red: "#FF98A2"
    },
    extend: {
      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
        mono: ["JetBbrains Mono", ...defaultTheme.fontFamily.mono]
      },
      boxShadow: {
        terminal: "0 5px 30px 0 rgb(0 0 0 / 0.85)"
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
}
