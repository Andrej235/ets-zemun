import { traverse, types } from "@babel/core";
import fs from "fs/promises";
import parser from "@babel/parser";
import { getPropertyNamesToOmit, SchemaMap } from "./schema-map";

export async function collectStringsFromJSXFile(
  filePath: string,
  set: Set<string>,
  omitProps: string[]
) {
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
            omitProps.includes(
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

export async function collectStringsFromJSONFile(
  filePath: string,
  set: Set<string>,
  schemaMap: SchemaMap | null
) {
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

