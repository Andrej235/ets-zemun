import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import babelTextTransformerWrapper from "./plugins/babel-text-transformer-wrapper";
import jsonTranslatorPlugin from "./plugins/json-plugin";
import translatorPlugin from "./plugins/translator-plugin";

export default defineConfig(({ mode }) => ({
  base: "/",
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    allowedHosts: ["localhost.com"],
  },
  plugins: [
    translatorPlugin(mode),
    jsonTranslatorPlugin(),
    react({
      babel: {
        plugins: [babelTextTransformerWrapper()],
      },
    }),
  ],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/assets/sass"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@data": path.resolve(__dirname, "src/assets/json-data/data"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utility": path.resolve(__dirname, "src/utility"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `
           @use "@styles/_palette.scss" as *;\n
           @use "@styles/_mixins.scss" as *;\n
           `,
      },
    },
  },
}));

