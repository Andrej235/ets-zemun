import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createFilter } from "@rollup/pluginutils";
import { transformAsync, traverse, types } from "@babel/core";
import fs from "fs/promises";
import micromatch from "micromatch";
import tsconfigPaths from "vite-tsconfig-paths";
import parser from "@babel/parser";
import babelTextTransformer from "./plugins/babel-text-transformer";
import translate, {
  translateSingeValueUsingLocal as translateSingleValueUsingLocal,
  translateUsingLibre,
} from "./plugins/translator";

const localTranslatorLanguageOptions = ["sr-lat", "sr-cyr"] as const;
let libreTranslatorLanguageOptions = [] as const;
function getLanguageOptions() {
  return [...localTranslatorLanguageOptions, ...libreTranslatorLanguageOptions];
}

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

export type TranslationResult = Map<string, { [key: string]: string }>;
type SchemaMap = {
  fileMatch: string[];
  url: string;
  omitFromTranslation?: string[];
}[];

let jsxTranslations: TranslationResult = new Map();
let jsonTranslations: TranslationResult = new Map();
let schemaMap: SchemaMap | null = null;

async function collectStringsFromJSXFile(filePath: string, set: Set<string>) {
  const code = await fs.readFile(filePath, "utf-8");
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const comments = ast.comments ?? [];
  const ignoreFile = comments.some(
    (x: types.Comment) =>
      x.loc?.start.line === 1 && x.value.trim() === "@text-transform-ignore"
  );

  traverse(ast, {
    FunctionDeclaration(path) {
      const isIgnored =
        ignoreFile ||
        comments.some(
          (x: types.Comment) =>
            path.node.loc &&
            x.loc?.start.line === path.node.loc.start.line - 1 &&
            x.value.trim() === "@text-transform-ignore"
        );

      const { node } = path;
      const isPascalCase = /^[A-Z]/.test(node.id?.name ?? "");

      const hasJSXReturn = node.body.body.some(
        (statement) =>
          types.isReturnStatement(statement) &&
          (types.isJSXElement(statement.argument) ||
            types.isJSXFragment(statement.argument))
      );

      const isReactComponent = isPascalCase && hasJSXReturn;
      if (!isReactComponent) return;

      path.traverse({
        JSXText(path) {
          const text = path.node.value.trim();
          if (text) set.add(text);
        },
        JSXAttribute(path) {
          if (
            isIgnored ||
            !types.isStringLiteral(path.node.value) ||
            omitJSXProps.includes(
              typeof path.node.name.name === "string"
                ? path.node.name.name
                : path.node.name.name.name
            )
          )
            return;

          const text = path.node.value.value.trim();
          if (text) set.add(text);
        },
      });
    },
  });
}

async function collectStringsFromJSONFile(filePath: string, set: Set<string>) {
  if (!schemaMap) throw new Error("SchemaMap is not initialized");

  const omit = await getPropertyNamesToOmit(filePath, schemaMap);

  const code = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(code);
  traverseJSON(json);

  function traverseJSON(node: unknown) {
    if (typeof node === "string") {
      set.add(node);
    } else if (Array.isArray(node)) {
      node.forEach(traverseJSON);
    } else if (typeof node === "object") {
      for (const key in node) {
        if (omit.includes(key)) continue;
        traverseJSON(node[key as keyof typeof node]);
      }
    }
  }
}

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
            (x) => collectStringsFromJSXFile(x, stringsFromJSX)
          ),
          processDirectory(
            path.resolve(__dirname, "src/assets/json-data/data"),
            (x) => x.endsWith(".json"),
            (x) => collectStringsFromJSONFile(x, stringsFromJSON)
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
          await collectStringsFromJSXFile(context.file, set);

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
          await collectStringsFromJSONFile(context.file, set);

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
    tsconfigPaths(), //TODO: Check if this is needed, while fixing netlify I added this as one of the potential solutions
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
                languageOptions: getLanguageOptions(),
                omitJSXProps,
              };
            },
            visitor: babelTextTransformer(),
          },
        ],
      },
    }),
    jsonPlugin(),
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

function jsonPlugin() {
  const filter = createFilter("**/*.json");

  return {
    name: "babel-json-plugin",
    async transform(code: string, id: string) {
      if (!filter(id)) return null;

      try {
        const result = await transformAsync(code, {
          filename: id,
          plugins: [
            [
              "./plugins/json-text-transformer",
              {
                omitProperties: await getPropertyNamesToOmit(id),
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
    },
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

  async function getPropertyNamesToOmit(jsonFilePath: string) {
    if (!schemaMap) throw new Error("SchemaMap is not initialized");

    for (const mapping of schemaMap) {
      if (micromatch.isMatch(jsonFilePath, "**/" + mapping.fileMatch)) {
        return mapping.omitFromTranslation ?? [];
      }
    }

    return [];
  }
}

async function getPropertyNamesToOmit(
  jsonFilePath: string,
  schemaMap: SchemaMap
): Promise<string[]> {
  for (const mapping of schemaMap)
    if (micromatch.isMatch(jsonFilePath, "**/" + mapping.fileMatch))
      return mapping.omitFromTranslation ?? [];

  return [];
}

async function getSchemaMap(): Promise<SchemaMap> {
  return JSON.parse(
    await fs.readFile(
      path.resolve(__dirname, "src/assets/json-data/data-to-schema-map.json"),
      "utf-8"
    )
  );
}

