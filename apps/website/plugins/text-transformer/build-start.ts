import {
  omitJSXProps,
  libreTranslatorLanguageOptions,
  schemaMap,
} from "./translator-plugin";
import fs from "fs/promises";
import path from "path";
import {
  collectStringsFromJSXFile,
  collectStringsFromJSONFile,
} from "./collect-strings-from-files";
import translate, { translateUsingLibre } from "./translator";

export default async function buildStartTranslationPlugin() {
  const stringsFromJSX: Set<string> = new Set();
  const stringsFromJSON: Set<string> = new Set();
  let jsxTranslations = new Map();
  let jsonTranslations = new Map();

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
      path.resolve(__dirname, "../../src/components"),
      (x) => x.endsWith(".tsx"),
      (x) => collectStringsFromJSXFile(x, stringsFromJSX, omitJSXProps)
    ),
    processDirectory(
      path.resolve(__dirname, "../../src/assets/json-data/data"),
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

  return [jsxTranslations, jsonTranslations];
}

