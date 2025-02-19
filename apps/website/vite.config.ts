import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
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
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared-frontend"),
      "@styles": path.resolve(__dirname, "../shared-frontend/sass"),
      "@api": path.resolve(__dirname, "../shared-frontend/api-dsl"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@data": path.resolve(__dirname, "src/assets/json-data/data"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utility": path.resolve(__dirname, "src/utility"),
      "@better-router": path.resolve(__dirname, "src/better-router"),
      "@i18n": path.resolve(__dirname, "src/i18n.ts"),
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

          if (packageName.includes("three")) return "vendor-three";

          return "vendor";
        },
      },
    },
  },
});

