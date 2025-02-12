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
      "@styles": path.resolve(__dirname, "../shared-frontend/sass"),
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

