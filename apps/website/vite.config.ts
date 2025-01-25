import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TranslationResult } from "./plugins/translator";
import { getSchemaMap, SchemaMap } from "./plugins/schema-map";
import buildStartTranslationPlugin from "./plugins/build-start";
import babelTextTransformerWrapper from "./plugins/babel-text-transformer-wrapper";
import jsonTranslatorPlugin from "./plugins/json-plugin";
import handleTranslatorHMR from "./plugins/vite-plugin-hmr";

export let libreTranslatorLanguageOptions: string[] = [];

export const omitJSXProps = [
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

export let jsxTranslations: TranslationResult = new Map();
export let jsonTranslations: TranslationResult = new Map();
export let schemaMap: SchemaMap | null = null;

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
        [jsxTranslations, jsonTranslations] =
          await buildStartTranslationPlugin();
      },
      async handleHotUpdate(context) {
        handleTranslatorHMR(context);
      },
    },
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

