import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createFilter } from "@rollup/pluginutils";
import { transformAsync } from "@babel/core";
import fs from "fs/promises";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["./plugins/text-transformer.js"],
      },
    }),
    jsonPlugin(),
  ],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "public/sass"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@data": path.resolve(__dirname, "src/assets/json-data/data"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
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

function jsonPlugin() {
  const filter = createFilter(["**/*.json"]);

  return {
    name: "json-text-transformer",
    async transform(code: string, id: unknown) {
      if (!filter(id)) {
        return null;
      }

      try {
        const result = await transformAsync(code, {
          filename: id as string,
          plugins: ["./plugins/json-text-transformer"],
        });

        if (result && result.code) {
          return {
            code: result.code,
            map: result.map || null,
          };
        }
      } catch (err) {
        console.error(err);
      }

      return null;
    },
    async load(id: unknown) {
      if (!filter(id)) {
        return null;
      }

      try {
        const content = await fs.readFile(id as string, "utf-8");
        return content;
      } catch (err) {
        console.error(err);
      }

      return null;
    },
  };
}
