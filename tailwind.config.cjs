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
      cyan: "#9AEDFE",
      pink: "#ff92d0"
    },
    extend: {
      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
        mono: ["JetBbrains Mono", ...defaultTheme.fontFamily.mono]
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
}
