import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // plugins: [eslint()],
  server: {
    port: 3000,
    open: "/",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      ...(process.env.NODE_ENV !== "development"
        ? {
            "./runtimeConfig": "./runtimeConfig.browser", //fix production build
          }
        : {}),
    },
  },
});
