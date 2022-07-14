const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      white: "#F7F7E8",
      black: "#18181b",
      gray: "#262626",
      blue: "#67e8f9",
      pink: "#f472b6",
      yellow: "#FDE047"
    },
    extend: {
      fontFamily: {
        sans: ["Source Code Pro", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
