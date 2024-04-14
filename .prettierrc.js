// Purely for demonstration! Adjust to your liking.
/** @type {import("prettier").Options} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
};

export default config;
