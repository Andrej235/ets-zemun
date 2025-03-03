import pkg, { type PluginObj } from "@babel/core";
const { types, transformAsync } = pkg;
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

async function getTSXFiles(
  dir: string,
  fileList: { path: string; content: string }[] = []
): Promise<{ path: string; content: string }[]> {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await getTSXFiles(filePath, fileList);
    } else if (file.isFile() && file.name.endsWith(".tsx")) {
      const content = await fs.readFile(filePath, "utf-8");
      fileList.push({ path: filePath, content });
    }
  }

  return fileList;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function run() {
  const filesToSearch = await getTSXFiles(path.resolve(__dirname, "../../src"));
  const searchKeys: object[] = [];

  for (const file of filesToSearch) {
    const result = await transformAsync(file.content, {
      filename: file.path,
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
      plugins: [
        function myCustomPlugin(): PluginObj {
          return {
            visitor: {
              JSXAttribute(path) {
                if (
                  !types.isJSXIdentifier(path.node.name, {
                    name: "searchKey",
                  })
                )
                  return;

                const value = path.node.value;
                if (!types.isJSXExpressionContainer(value))
                  throw new Error("searchKey must be an object");

                const expression = value.expression;
                if (!types.isObjectExpression(expression))
                  throw new Error("searchKey must be an object");

                const obj: { [key: string]: unknown } = {};

                expression.properties.forEach((prop) => {
                  if (
                    types.isObjectProperty(prop) &&
                    types.isIdentifier(prop.key)
                  ) {
                    if (
                      types.isStringLiteral(prop.value) ||
                      types.isNumericLiteral(prop.value)
                    ) {
                      obj[prop.key.name] = prop.value.value;
                    } else if (types.isArrayExpression(prop.value)) {
                      obj[prop.key.name] = mapArrayElements(
                        prop.value.elements
                      );
                    }
                  }
                });

                if (typeof obj.id !== "string") {
                  throw new Error("id must be a string");
                }
                if (typeof obj.url !== "string") {
                  throw new Error("url must be a string");
                }
                if (typeof obj.title !== "string") {
                  throw new Error("title must be a string");
                }
                if (typeof obj.keywords !== "string") {
                  throw new Error("keywords must be a string");
                }

                obj.url += `?searchKey=${obj.id}`;

                searchKeys.push(obj);
              },
            },
          };
        },
      ],
    });

    if (!result?.code) console.error("Failed to transform file", file.path);
  }

  await fs.writeFile(
    path.resolve(__dirname, "../../src/assets/json-data/data/search-map.json"),
    JSON.stringify({
      entries: searchKeys,
    })
  );
}

function mapArrayElements(elements: unknown[]): (string | number)[] {
  return elements.map((el) => {
    if (
      types.isNode(el) &&
      (types.isStringLiteral(el) || types.isNumericLiteral(el))
    ) {
      return el.value;
    }

    throw new Error("Array elements must be string or number literals");
  });
}

run();

