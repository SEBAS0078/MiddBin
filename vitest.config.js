import path from "node:path";
import react from "@vitejs/plugin-react";

import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react({
      // Add this configuration to force the plugin to process .js files as JSX
      include: /\.(js|jsx|ts|tsx)$/,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true, // catches globals in external files
    environment: "jsdom",
    setupFiles: ["vitest.setup.js"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/src-skeleton/**",
    ],
  },
});
