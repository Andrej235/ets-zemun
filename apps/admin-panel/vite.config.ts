import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5174,
    watch: {
      usePolling: true,
    },
    allowedHosts: ["admin.localhost.com"],
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
});

