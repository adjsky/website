module.exports = {
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  tabWidth: 2,
  useTabs: false,
  trailingComma: "none",
  semi: false,
  printWidth: 80,
  htmlWhitespaceSensitivity: "ignore"
};