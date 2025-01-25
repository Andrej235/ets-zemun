import { HmrContext } from "vite";
import {
  omitJSXProps,
  jsxTranslations,
  libreTranslatorLanguageOptions,
  jsonTranslations,
  schemaMap,
} from "../vite.config";
import {
  collectStringsFromJSXFile,
  collectStringsFromJSONFile,
} from "./collect-strings-from-files";
import {
  translateSingeValueUsingLocal as translateSingleValueUsingLocal,
  translateUsingLibre,
} from "./translator";

export default async function handleTranslatorHMR (context: HmrContext) {
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
}

