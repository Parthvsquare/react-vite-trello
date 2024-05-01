// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  doubleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
