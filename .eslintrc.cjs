module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["react-app", "eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    react: { version: "18.2" },
    tailwindcss: {
      config: "tailwind.config.js",
      cssFiles: ["**/*.css", "!**/node_modules", "!**/.*", "!**/dist", "!**/build"],
      removeDuplicates: true,
      skipClassAttribute: false,
      tags: [],
      classRegex: "^class(Name)?$",
    },
  },
  plugins: ["react-refresh", "import", "eslint-plugin-tailwindcss"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
