import { transformAsync } from "@babel/core";
import fs from "fs/promises";
import { createFilter, Plugin } from "vite";
import { getPropertyNamesToOmit, SchemaMap } from "./schema-map";
import getLanguageOptions from "./languages";
import { TranslationResult } from "./translator";

export default function jsonPlugin(): Plugin | null {
  const filter = createFilter("**/*.json");

  return {
    name: "babel-json-plugin",
    async load(id: string) {
      if (!filter(id)) return null;

      try {
        return await fs.readFile(id, "utf-8");
      } catch (err) {
        console.error(`Failed to transform JSON file: ${id}`, err);
      }

      return null;
    },
  };
}

export async function jsonPluginTransform(
  code: string,
  id: string,
  jsonTranslations: TranslationResult,
  schemaMap: SchemaMap | null
) {
  const filter = createFilter("**/*.json");
  if (!filter(id)) return null;

  try {
    const result = await transformAsync(code, {
      filename: id,
      plugins: [
        [
          "./plugins/json-text-transformer",
          {
            omitProperties: await getPropertyNamesToOmit(id, schemaMap),
            translations: jsonTranslations,
            langOptions: getLanguageOptions(),
          },
        ],
      ],
    });

    if (result?.code) {
      return {
        code: result.code,
        map: result.map || null,
      };
    }
  } catch (err) {
    console.error(`Failed to transform JSON file: ${id}`, err);
  }

  return null;
}

