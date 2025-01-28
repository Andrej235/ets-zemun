import { loadEnv, PluginOption } from "vite";
import handleTranslatorHMR from "./vite-plugin-hmr";
import { TranslationResult } from "./translator";
import { getSchemaMap, SchemaMap } from "./schema-map";
import buildStartTranslationPlugin from "./build-start";

export let jsxTranslations: TranslationResult = new Map();
export let jsonTranslations: TranslationResult = new Map();
export let schemaMap: SchemaMap | null = null;
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

export default function (mode: string): PluginOption {
  return {
    name: "vite-plugin-translate",
    async buildStart() {
      const env = loadEnv(mode, process.cwd(), "");
      libreTranslatorLanguageOptions = JSON.parse(
        env.VITE_AVAILABLE_LIBRE_LANGUAGES
      );

      schemaMap = await getSchemaMap();
      [jsxTranslations, jsonTranslations] = await buildStartTranslationPlugin();
    },
    async handleHotUpdate(context) {
      handleTranslatorHMR(context);
    },
  };
}

