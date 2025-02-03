import { NodePath, PluginObj } from "@babel/core";
import * as t from "@babel/types";

interface BabelPluginOptions {
  types: typeof t;
}

export default function renameSearchKeyPlugin({
  types,
}: BabelPluginOptions): PluginObj {
  return {
    visitor: {
      JSXAttribute(path: NodePath<t.JSXAttribute>) {
        if (!types.isJSXIdentifier(path.node.name, { name: "searchKey" }))
          return;

        if (
          !types.isJSXExpressionContainer(path.node.value) ||
          !types.isObjectExpression(path.node.value.expression)
        )
          throw new Error("searchKey must be an object");

        const props = path.node.value.expression.properties;
        const idProp = props.find(
          (x) =>
            types.isObjectProperty(x) &&
            types.isIdentifier(x.key) &&
            x.key.name === "id"
        ) as t.ObjectProperty;

        if (!idProp) throw new Error("searchKey must have an id");

        if (!types.isStringLiteral(idProp.value))
          throw new Error("id must be a string");

        path.node.name = types.jsxIdentifier("data-search-id");
        path.node.value = types.jsxExpressionContainer(idProp.value);
      },
    },
  };
}

