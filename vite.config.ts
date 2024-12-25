import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createFilter } from "@rollup/pluginutils";
import { transformAsync, traverse, types } from "@babel/core";
import fs from "fs/promises";
import micromatch from "micromatch";
import tsconfigPaths from "vite-tsconfig-paths";
import parser from "@babel/parser";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "vite-plugin-translate",
      async buildStart() {
        //TODO:
        //1st step: Use babel to search through all files as asts and gather all strings which need to be translated. Put them all inside a file (json?)
        //2nd step: Use an asynchronous method to go through that file and translate every string into every language and put them all inside a new file (or overwrite the old one?)
        //3rd step: Run the babel plugin which will replace the strings with the translated ones in a similar way that it does now (using context, etc.)
        return new Promise(async (resolve) => {
          const strings = new Set<string>();

          async function collectStrings(filePath: string) {
            const code = await fs.readFile(filePath, "utf-8");
            const ast = parser.parse(code, {
              sourceType: "module",
              plugins: ["jsx", "typescript"],
            });

            traverse(ast, {
              StringLiteral(path) {
                strings.add(path.node.value);
              },
            });
          }

          async function processDirectory(dir: string) {
            const files = await fs.readdir(dir);
            for (const file of files) {
              const fullPath = path.join(dir, file);

              if ((await fs.stat(fullPath)).isDirectory()) {
                processDirectory(fullPath);
              } else if (
                fullPath.endsWith(".ts") ||
                fullPath.endsWith(".tsx")
              ) {
                await collectStrings(fullPath);
              }
            }
          }

          await processDirectory(path.resolve(__dirname, "src"));
          resolve();
        });
      },
    },
    tsconfigPaths(),
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
                translators,
                omitJSXProps: [
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
                ],
              };
            },
            visitor: {
              Program(path, state) {
                const translators = state.opts.translators;
                const omitJSXProps = state.opts.omitJSXProps;
                const languageOptions = Object.keys(translators);
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

                          for (let i = 0; i < languageOptions.length; i++) {
                            const translator = translators[languageOptions[i]];

                            const prop = (
                              extractedTextTranslationsObject.properties[
                                i
                              ] as types.ObjectProperty
                            ).value as types.ArrayExpression;

                            prop.elements.push(
                              types.stringLiteral(translator(text))
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
                            omitJSXProps.includes(path.node.name.name)
                          )
                            return;

                          const text = path.node.value.value.trim();
                          if (!text) return;

                          for (let i = 0; i < languageOptions.length; i++) {
                            const translator = translators[languageOptions[i]];

                            const prop = (
                              extractedTextTranslationsObject.properties[
                                i
                              ] as types.ObjectProperty
                            ).value as types.ArrayExpression;

                            prop.elements.push(
                              types.stringLiteral(translator(text))
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
  const filter = createFilter("**/*.json");

  let schemaMap: {
    fileMatch: string[];
    url: string;
    omitFromTranslation?: string[];
  }[] = [];

  return {
    name: "babel-json-plugin",
    async transform(code: string, id: string) {
      if (!filter(id)) return null;

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

        const result = await transformAsync(code, {
          filename: id,
          plugins: [
            [
              "./plugins/json-text-transformer",
              { omitProperties: await getPropertyNamesToOmit(id), translators },
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
    for (const mapping of schemaMap) {
      if (micromatch.isMatch(jsonFilePath, "**/" + mapping.fileMatch)) {
        return mapping.omitFromTranslation ?? [];
      }
    }

    return [];
  }
}

const translators: {
  [key: string]: (value: string) => string;
} = {
  "sr-lat": (value) => value,
  "sr-cyr": (value) => {
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
    return value
      .split("")
      .map(
        (char) =>
          latinToCyrillicMap[char as keyof typeof latinToCyrillicMap] || char
      )
      .join("");
  },
};
