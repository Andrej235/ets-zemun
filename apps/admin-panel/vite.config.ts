import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    allowedHosts: ["admin.localhost.com"],
  },
  resolve: {
    alias: {
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

