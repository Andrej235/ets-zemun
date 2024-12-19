import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import * as babel from "@babel/core";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["./plugins/text-transformer.js"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "public/sass"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@data": path.resolve(__dirname, "src/assets/json-data/data"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
           @use "@styles/_palette.scss" as *;\n
           @use "@styles/_mixins.scss" as *;\n
           `,
      },
    },
  },
});
