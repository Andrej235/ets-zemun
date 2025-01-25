import {
  jsxTranslations,
  libreTranslatorLanguageOptions,
  omitJSXProps,
} from "../vite.config";
import babelTextTransformer from "./babel-text-transformer";
import getLanguageOptions from "./languages";

export default function () {
  return {
    name: "text-transformer",
    manipulateOptions(options: object) {
      if (!("plugins" in options) || !Array.isArray(options.plugins)) return;

      const mainPlugin = options.plugins.find(
        (x: object) => "key" in x && x.key === "text-transformer"
      );

      mainPlugin.options = {
        translations: jsxTranslations,
        languageOptions: getLanguageOptions(libreTranslatorLanguageOptions),
        omitJSXProps,
      };
    },
    visitor: babelTextTransformer(),
  };
}

