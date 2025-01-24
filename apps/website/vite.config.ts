import { defineConfig, loadEnv, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs/promises";
import babelTextTransformer from "./plugins/babel-text-transformer";
import translate, {
  translateSingeValueUsingLocal as translateSingleValueUsingLocal,
  translateUsingLibre,
  TranslationResult,
} from "./plugins/translator";
import {
  collectStringsFromJSONFile,
  collectStringsFromJSXFile,
} from "./plugins/collect-strings-from-files";
import { getSchemaMap, SchemaMap } from "./plugins/schema-map";
import getLanguageOptions from "./plugins/languages";
import jsonPlugin, { jsonPluginTransform } from "./plugins/json-plugin";

let libreTranslatorLanguageOptions: string[] = [];

const omitJSXProps = [
  "className",
  "id",
  "key",
  "name",
  "src",
  "d",
  "icon",
  "image",
  "to",
  "layout",
  "viewBox",
];

let jsxTranslations: TranslationResult = new Map();
let jsonTranslations: TranslationResult = new Map();
let schemaMap: SchemaMap | null = null;

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
    {
      name: "vite-plugin-translate",
      async buildStart() {
        const env = loadEnv(mode, process.cwd(), "");
        libreTranslatorLanguageOptions = JSON.parse(
          env.VITE_AVAILABLE_LIBRE_LANGUAGES
        );

        schemaMap = await getSchemaMap();

        const stringsFromJSX: Set<string> = new Set();
        const stringsFromJSON: Set<string> = new Set();
        jsxTranslations = new Map();
        jsonTranslations = new Map();

        async function processDirectory(
          dir: string,
          filter: (filePath: string) => boolean,
          foundCallback: (filePath: string) => Promise<void>
        ) {
          const files = await fs.readdir(dir);
          for (const file of files) {
            const fullPath = path.join(dir, file);

            if ((await fs.stat(fullPath)).isDirectory())
              await processDirectory(fullPath, filter, foundCallback);
            else if (filter(fullPath)) await foundCallback(fullPath);
          }
        }

        await Promise.all([
          processDirectory(
            path.resolve(__dirname, "src/components"),
            (x) => x.endsWith(".tsx"),
            (x) => collectStringsFromJSXFile(x, stringsFromJSX, omitJSXProps)
          ),
          processDirectory(
            path.resolve(__dirname, "src/assets/json-data/data"),
            (x) => x.endsWith(".json"),
            (x) => collectStringsFromJSONFile(x, stringsFromJSON, schemaMap)
          ),
        ]);

        await Promise.all([
          translate(stringsFromJSX).then((x) => (jsxTranslations = x)),
          translate(stringsFromJSON).then((x) => (jsonTranslations = x)),
        ]);

        const allValues = [
          ...Array.from(stringsFromJSX),
          ...Array.from(stringsFromJSON),
        ];

        for (const lang of libreTranslatorLanguageOptions) {
          await translateUsingLibre(
            allValues,
            lang,
            stringsFromJSX.size,
            jsxTranslations,
            jsonTranslations
          );
        }
      },
      async handleHotUpdate(context) {
        if (context.file.endsWith(".tsx")) {
          const set: Set<string> = new Set();
          await collectStringsFromJSXFile(context.file, set, omitJSXProps);

          const localTranslationPromises = Array.from(set).map(
            async (originalValue) => {
              const old = jsxTranslations.get(originalValue);
              if (!old)
                jsxTranslations.set(
                  originalValue,
                  await translateSingleValueUsingLocal(originalValue)
                );
              else set.delete(originalValue);
            }
          );

          await Promise.all(localTranslationPromises);

          if (set.size > 0) {
            const allValues = Array.from(set);

            for (const lang of libreTranslatorLanguageOptions)
              await translateUsingLibre(
                allValues,
                lang,
                allValues.length,
                jsxTranslations,
                jsonTranslations
              );
          }
        } else if (context.file.endsWith(".json")) {
          const set: Set<string> = new Set();
          await collectStringsFromJSONFile(context.file, set, schemaMap);

          const localTranslationPromises = Array.from(set).map(
            async (originalValue) => {
              const old = jsonTranslations.get(originalValue);
              if (!old)
                jsonTranslations.set(
                  originalValue,
                  await translateSingleValueUsingLocal(originalValue)
                );
              else set.delete(originalValue);
            }
          );

          await Promise.all(localTranslationPromises);

          if (set.size > 0) {
            const allValues = Array.from(set);

            for (const lang of libreTranslatorLanguageOptions)
              await translateUsingLibre(
                allValues,
                lang,
                0,
                jsxTranslations,
                jsonTranslations
              );
          }
        }
      },
    },
    viteJsonPlugin(),
    react({
      babel: {
        plugins: [
          {
            name: "text-transformer",
            manipulateOptions(options: object) {
              if (!("plugins" in options) || !Array.isArray(options.plugins))
                return;

              const mainPlugin = options.plugins.find(
                (x: object) => "key" in x && x.key === "text-transformer"
              );

              mainPlugin.options = {
                translations: jsxTranslations,
                languageOptions: getLanguageOptions(
                  libreTranslatorLanguageOptions
                ),
                omitJSXProps,
              };
            },
            visitor: babelTextTransformer(),
          },
        ],
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

function viteJsonPlugin(): PluginOption {
  const { load, name } = jsonPlugin()!;

  return {
    name,
    async transform(code: string, id: string) {
      return jsonPluginTransform(code, id, jsonTranslations, schemaMap);
    },
    load,
  };
}

