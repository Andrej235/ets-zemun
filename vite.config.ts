import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createFilter } from "@rollup/pluginutils";
import { transformAsync } from "@babel/core";
import fs from "fs/promises";
import { PathLike } from "fs";
import micromatch from "micromatch";

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
        api: "modern-compiler",
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

  let schemaMap: {
    fileMatch: string[];
    url: string;
    omitFromTranslation?: string[];
  }[] = [];

  return {
    name: "babel-json-plugin",
    async transform(code: string, id: string) {
      if (!filter(id)) {
        return null;
      }

      try {
        schemaMap = JSON.parse(
          await fs.readFile(
            path.resolve(
              __dirname,
              "src/assets/json-data/data-to-schema-map.json"
            ),
            "utf-8"
          )
        );

        const omit = await getPropertyNamesToOmit(id);
        if (!omit) {
          console.error(`No schema found for JSON file: ${id}`);
          return null;
        }

        const result = await transformAsync(code, {
          filename: id,
          plugins: [
            ["./plugins/json-text-transformer", { omitProperties: omit }],
          ],
        });

        if (result && result.code) {
          return {
            code: result.code,
            map: result.map || null,
          };
        }
      } catch (err) {
        console.error(`Failed to transform JSON file: ${id}`, err);
      }

      return null;
    },
    async load(id: string) {
      if (!filter(id)) {
        return null;
      }

      try {
        const content = await fs.readFile(id, "utf-8");
        return content;
      } catch (err) {
        console.error(`Failed to transform JSON file: ${id}`, err);
      }

      return null;
    },
  };

  async function getPropertyNamesToOmit(jsonFilePath: string) {
    for (const mapping of schemaMap) {
      if (micromatch.isMatch(jsonFilePath, "**/" + mapping.fileMatch)) {
        return mapping.omitFromTranslation ?? [];
      }
    }
    return null;
  }
}
