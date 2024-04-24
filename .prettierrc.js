module.exports = {
  singleQuote: true,
  semi: true,
  printWidth: 120,
  tabWidth: 2,
  trailingComma: 'none',
  endOfLine: 'auto',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  quoteProps: 'as-needed',
  overrides: [
    {
      files: '*.css',
      options: {
        parser: 'css'
      }
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    }
  ],
  importOrderSeparation: true,
  plugins: ['prettier-plugin-tailwindcss']
};
