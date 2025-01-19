import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createFilter } from "@rollup/pluginutils";
import { transformAsync, traverse, types } from "@babel/core";
import fs from "fs/promises";
import micromatch from "micromatch";
import tsconfigPaths from "vite-tsconfig-paths";
import parser from "@babel/parser";

const localTranslatorLanguageOptions = ["sr-lat", "sr-cyr"] as const;
let libreTranslatorLanguageOptions = [] as const;
function getLanguageOptions() {
  return [...localTranslatorLanguageOptions, ...libreTranslatorLanguageOptions];
}

type LocalLanguage = (typeof localTranslatorLanguageOptions)[number];
type LibreLanguage = string;

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

type TranslationResult = Map<string, { [key: string]: string }>;
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

async function translateSingeValueUsingLocal(originalValue: string) {
  const newTranslations: { [key: string]: string } = {};

  await Promise.all(
    localTranslatorLanguageOptions.map(async (key) => {
      const translator = translators[key];
      newTranslations[key] = await translator(originalValue);
    })
  );

  return newTranslations;
}

async function translateUsingLibre(
  values: string[],
  lang: LibreLanguage,
  jsxCount: number
) {
  const translations = await getLibreTranslation(values, "sr", lang);

  for (let i = 0; i < jsxCount; i++) {
    const value = values[i];
    const translation = translations[i];

    const current = jsxTranslations.get(value);
    jsxTranslations.set(value, { ...current, [lang]: translation });
  }

  for (let i = jsxCount; i < values.length; i++) {
    const value = values[i];
    const translation = translations[i];

    const current = jsonTranslations.get(value);
    jsonTranslations.set(value, { ...current, [lang]: translation });
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

        async function translate(
          toTranslate: Set<string>
        ): Promise<TranslationResult> {
          const translations: TranslationResult = new Map();

          const translationPromises = Array.from(toTranslate).map(
            async (originalValue) => {
              translations.set(
                originalValue,
                await translateSingeValueUsingLocal(originalValue)
              );
            }
          );

          await Promise.all(translationPromises);
          return translations;
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
          await translateUsingLibre(allValues, lang, stringsFromJSX.size);
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
                  await translateSingeValueUsingLocal(originalValue)
                );
              else set.delete(originalValue);
            }
          );

          await Promise.all(localTranslationPromises);

          if (set.size > 0) {
            const allValues = Array.from(set);

            for (const lang of libreTranslatorLanguageOptions)
              await translateUsingLibre(allValues, lang, allValues.length);
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
                  await translateSingeValueUsingLocal(originalValue)
                );
              else set.delete(originalValue);
            }
          );

          await Promise.all(localTranslationPromises);

          if (set.size > 0) {
            const allValues = Array.from(set);

            for (const lang of libreTranslatorLanguageOptions)
              await translateUsingLibre(allValues, lang, 0);
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
            visitor: {
              Program(path, state) {
                const languageOptions: string[] = state.opts.languageOptions;
                const allTranslations: TranslationResult =
                  state.opts.translations;
                const reactHooksWithDependencies = [
                  "useMemo",
                  "useCallback",
                  "useEffect",
                ];

                const omitJSXProps: string[] = state.opts.omitJSXProps;
                const comments = state.file.ast.comments;

                const children = path.node.body;
                const jsonImports = children
                  .filter(
                    (x) =>
                      types.isImportDeclaration(x) &&
                      x.source.value.endsWith(".json")
                  )
                  .flatMap((x) =>
                    (x as types.ImportDeclaration).specifiers.map(
                      (x) => x.local.name
                    )
                  );

                const hasJSONData = jsonImports.length > 0;

                const ignoreFile = comments.some(
                  (x: types.Comment) =>
                    x.loc?.start.line === 1 &&
                    x.value.trim() === "@text-transform-ignore"
                );

                //useMemo hook
                const hasUseMemo =
                  ignoreFile || //This will ensure that useMemo is not imported if the file is ignored
                  children.some(
                    (x) =>
                      types.isImportDeclaration(x) &&
                      x.source.value === "react" &&
                      x.specifiers.some(
                        (x) =>
                          types.isImportSpecifier(x) &&
                          (x.local as types.Identifier).name === "useMemo"
                      )
                  );

                const useMemoImport = hasUseMemo
                  ? types.emptyStatement()
                  : types.importDeclaration(
                      [
                        types.importSpecifier(
                          types.identifier("useMemo"),
                          types.identifier("useMemo")
                        ),
                      ],
                      types.stringLiteral("react")
                    );

                path.node.body = [
                  types.importDeclaration(
                    [types.importDefaultSpecifier(types.identifier("useLang"))],
                    types.stringLiteral("@hooks/use-language")
                  ),
                  useMemoImport,
                  ...children,
                ];

                path.traverse({
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

                    if (!isReactComponent && !hasJSONData) return;

                    const langPackDeclaration = types.variableDeclaration(
                      "const",
                      [
                        types.variableDeclarator(
                          types.identifier("lang"),
                          isReactComponent
                            ? types.callExpression(
                                types.identifier("useLang"),
                                []
                              )
                            : types.callExpression(
                                types.memberExpression(
                                  types.identifier("localStorage"),
                                  types.identifier("getItem")
                                ),
                                [types.stringLiteral("language")]
                              )
                        ),
                      ]
                    );

                    const extractedTextTranslationsObject =
                      isReactComponent &&
                      !isIgnored &&
                      types.objectExpression([]);

                    const extractedTextTranslations =
                      !isReactComponent || isIgnored
                        ? types.emptyStatement()
                        : types.variableDeclaration("const", [
                            types.variableDeclarator(
                              types.identifier("extractedTextTranslations"),
                              types.callExpression(
                                types.identifier("useMemo"),
                                [
                                  types.arrowFunctionExpression(
                                    [],
                                    types.blockStatement([
                                      types.returnStatement(
                                        extractedTextTranslationsObject || null
                                      ),
                                    ])
                                  ),
                                  types.arrayExpression([]),
                                ]
                              )
                            ),
                          ]);

                    const selectedTextTranslations =
                      !isReactComponent || isIgnored
                        ? types.emptyStatement()
                        : types.variableDeclaration("const", [
                            types.variableDeclarator(
                              types.identifier("selectedTextTranslations"),
                              types.memberExpression(
                                types.identifier("extractedTextTranslations"),
                                types.identifier("lang"),
                                true
                              )
                            ),
                          ]);

                    //extractedTextTranslationsObject is false if isReactComponent is false
                    if (extractedTextTranslationsObject) {
                      languageOptions.forEach((language) => {
                        extractedTextTranslationsObject.properties.push(
                          types.objectProperty(
                            types.stringLiteral(language),
                            types.arrayExpression([])
                          )
                        );
                      });

                      path.traverse({
                        JSXText(path) {
                          const text = path.node.value.trim();
                          if (!text) return;
                          const currentTranslations = allTranslations.get(text);

                          for (let i = 0; i < languageOptions.length; i++) {
                            const prop = (
                              extractedTextTranslationsObject.properties[
                                i
                              ] as types.ObjectProperty
                            ).value as types.ArrayExpression;

                            prop.elements.push(
                              types.stringLiteral(
                                currentTranslations?.[languageOptions[i]] ??
                                  "error"
                              )
                            );
                          }

                          path.replaceWith(
                            types.jsxExpressionContainer(
                              types.memberExpression(
                                types.identifier("selectedTextTranslations"),
                                types.numericLiteral(
                                  (
                                    (
                                      extractedTextTranslationsObject
                                        .properties[0] as types.ObjectProperty
                                    ).value as types.ArrayExpression
                                  ).elements.length - 1
                                ),
                                true
                              )
                            )
                          );
                          path.skip();
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
                          if (!text) return;
                          const currentTranslations = allTranslations.get(text);

                          for (let i = 0; i < languageOptions.length; i++) {
                            const prop = (
                              extractedTextTranslationsObject.properties[
                                i
                              ] as types.ObjectProperty
                            ).value as types.ArrayExpression;

                            prop.elements.push(
                              types.stringLiteral(
                                currentTranslations?.[languageOptions[i]] ??
                                  "error"
                              )
                            );
                          }

                          path.node.value = types.jsxExpressionContainer(
                            types.memberExpression(
                              types.identifier("selectedTextTranslations"),
                              types.numericLiteral(
                                (
                                  (
                                    extractedTextTranslationsObject
                                      .properties[0] as types.ObjectProperty
                                  ).value as types.ArrayExpression
                                ).elements.length - 1
                              ),
                              true
                            )
                          );
                        },
                        ...(hasJSONData && {
                          CallExpression(path) {
                            if (
                              types.isIdentifier(path.node.callee) &&
                              reactHooksWithDependencies.includes(
                                path.node.callee.name
                              ) &&
                              path.node.arguments.length === 2 &&
                              types.isArrowFunctionExpression(
                                path.node.arguments[0]
                              ) &&
                              types.isArrayExpression(path.node.arguments[1])
                            ) {
                              let hookUsesJSONData = false;

                              path.traverse({
                                Identifier(path) {
                                  if (jsonImports.includes(path.node.name))
                                    hookUsesJSONData = true;
                                },
                              });

                              if (hookUsesJSONData)
                                path.node.arguments[1].elements.push(
                                  types.identifier("lang")
                                );
                            }
                          },
                        }),
                      });
                    }

                    path.node.body.body = [
                      langPackDeclaration,
                      extractedTextTranslations,
                      selectedTextTranslations,
                      ...path.node.body.body,
                    ];
                  },

                  //Use lang in place of every identifier that is imported from a JSON file
                  ...(hasJSONData && {
                    Identifier(path) {
                      if (
                        !jsonImports.includes(path.node.name) ||
                        types.isImportDefaultSpecifier(path.parent) ||
                        types.isImportSpecifier(path.parent)
                      )
                        return;

                      path.replaceWith(
                        types.memberExpression(
                          path.node,
                          types.identifier("lang"),
                          true
                        )
                      );
                      path.skip();
                    },
                  }),
                });
              },
            },
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

const translators: {
  [key in LocalLanguage]: (value: string) => Promise<string>;
} = {
  "sr-lat": (value) => Promise.resolve(value),
  "sr-cyr": (value) =>
    new Promise((resolve) => {
      const latinToCyrillicMap = {
        A: "А",
        B: "Б",
        V: "В",
        G: "Г",
        D: "Д",
        Đ: "Ђ",
        E: "Е",
        Ž: "Ж",
        Z: "З",
        I: "И",
        J: "Ј",
        K: "К",
        L: "Л",
        Lj: "Љ",
        M: "М",
        N: "Н",
        Nj: "Њ",
        O: "О",
        P: "П",
        R: "Р",
        S: "С",
        T: "Т",
        Ć: "Ћ",
        U: "У",
        F: "Ф",
        H: "Х",
        C: "Ц",
        Č: "Ч",
        Dž: "Џ",
        Š: "Ш",
        a: "а",
        b: "б",
        v: "в",
        g: "г",
        d: "д",
        đ: "ђ",
        e: "е",
        ž: "ж",
        z: "з",
        i: "и",
        j: "ј",
        k: "к",
        l: "л",
        lj: "љ",
        m: "м",
        n: "н",
        nj: "њ",
        o: "о",
        p: "п",
        r: "р",
        s: "с",
        t: "т",
        ć: "ћ",
        u: "у",
        f: "ф",
        h: "х",
        c: "ц",
        č: "ч",
        dž: "џ",
        š: "ш",
        LJ: "Љ",
        NJ: "Њ",
        DŽ: "Џ",
      };

      // Handle special cases for digraphs first
      const digraphs = ["Lj", "lj", "Nj", "nj", "Dž", "dž", "LJ", "NJ", "DŽ"];
      digraphs.forEach((digraph) => {
        const cyrillic =
          latinToCyrillicMap[digraph as keyof typeof latinToCyrillicMap];
        const regex = new RegExp(digraph, "g");
        value = value.replace(regex, cyrillic);
      });

      // Convert the rest of the characters
      resolve(
        value
          .split("")
          .map(
            (char) =>
              latinToCyrillicMap[char as keyof typeof latinToCyrillicMap] ||
              char
          )
          .join("")
      );
    }),
  // en: (x) => getLibreTranslation(x, "sr", "en"),
  // it: (x) => getLibreTranslation(x, "sr", "it"),
  // et: (x) => getLibreTranslation(x, "sr", "et"),
  // zt: (x) => getLibreTranslation(x, "sr", "zt"),
};

async function getLibreTranslation<T extends string | string[]>(
  value: T,
  source: string,
  target: string
): Promise<T> {
  try {
    const response = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: value,
        source,
        target,
      }),
    });

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error(`HTTP request failed for ${source}->${target}`, error);
    return value;
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

