import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), netlifyPlugin()],
  server: {
    host: true,
    port: 5174,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@better-router": path.resolve(__dirname, "./src/better-router"),
      "@shared": path.resolve(__dirname, "../shared-frontend"),
      "@styles": path.resolve(__dirname, "../shared-frontend/sass"),
      "@api": path.resolve(__dirname, "../shared-frontend/api-dsl"),
      "@components": path.resolve(__dirname, "src/components"),
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

