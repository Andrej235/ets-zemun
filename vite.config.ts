import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createFilter } from "@rollup/pluginutils";
import { transformAsync, traverse, types } from "@babel/core";
import fs from "fs/promises";
import micromatch from "micromatch";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          "./plugins/text-transformer.js",
          {
            visitor: {
              Program(path) {
                const children = path.node.body;
                if (
                  !children.some(
                    (x) =>
                      types.isImportDeclaration(x) &&
                      (x as types.ImportDeclaration).source.value.endsWith(
                        ".json"
                      )
                  )
                )
                  return;
                path.node.body = [
                  types.importDeclaration(
                    [types.importDefaultSpecifier(types.identifier("useLang"))],
                    types.stringLiteral("@hooks/use-language")
                  ),
                  ...children,
                ];
                path.traverse({
                  FunctionDeclaration(path) {
                    const langPackDeclaration = types.variableDeclaration(
                      "const",
                      [
                        types.variableDeclarator(
                          types.identifier("lang"),
                          types.callExpression(types.identifier("useLang"), [])
                        ),
                      ]
                    );

                    path.node.body.body = [
                      langPackDeclaration,
                      ...path.node.body.body,
                    ];
                  },
                });
              },
              ImportDefaultSpecifier(path, state) {
                const importDeclaration =
                  path.parent as types.ImportDeclaration;
                if (importDeclaration.source.value.endsWith(".json")) {
                  const jsonDataName = path.node.local.name;
                  traverse(state.file.ast.program, {
                    MemberExpression(path) {
                      const node = path.node;
                      if (
                        types.isIdentifier(node.object) &&
                        node.object.name === jsonDataName
                      ) {
                        node.object = types.memberExpression(
                          types.identifier(jsonDataName),
                          types.identifier("lang"),
                          true
                        );
                        path.skip();
                      }
                    },
                  });
                }
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
  const filter = createFilter(["**/*.json"]);

  let schemaMap: {
    fileMatch: string[];
    url: string;
    omitFromTranslation?: string[];
  }[] = [];

  return {
    name: "babel-json-plugin",
    async transform(code: string, id: string) {
      if (!filter(id)) {
        return null;
      }

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

        const omit = await getPropertyNamesToOmit(id);
        if (!omit) {
          console.error(`No schema found for JSON file: ${id}`);
          return null;
        }

        const result = await transformAsync(code, {
          filename: id,
          plugins: [
            [
              "./plugins/json-text-transformer",
              { omitProperties: omit, translators },
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
      if (!filter(id)) {
        return null;
      }

      try {
        const content = await fs.readFile(id, "utf-8");
        return content;
      } catch (err) {
        console.error(`Failed to transform JSON file: ${id}`, err);
      }

      return null;
    },
  };

  //Implement properties which works for arrays which will include values in all languages
  async function getPropertyNamesToOmit(jsonFilePath: string) {
    for (const mapping of schemaMap) {
      if (micromatch.isMatch(jsonFilePath, "**/" + mapping.fileMatch)) {
        return mapping.omitFromTranslation ?? [];
      }
    }
    return null;
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
