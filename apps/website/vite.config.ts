import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import searchMapTransformer from "./plugins/search-map/search-map-transformer";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

export default defineConfig({
  base: "/",
  preview: {
    port: 3000,
    strictPort: true,
  },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [searchMapTransformer()],
      },
    }),
    tsconfigPaths(),
    netlifyPlugin(),
  ],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "./sass"),
      "@": path.resolve(__dirname, "./src"),
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          const match = /node_modules\/((?:@[^/]+\/)?[^/]+)/.exec(id);
          const packageName = match?.[1];
          if (!packageName) return;

          if (packageName.includes("motion")) return "vendor-motion";

          return "vendor";
        },
      },
    },
  },
});
