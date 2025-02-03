import { NodePath, PluginObj, types } from "@babel/core";

export default function searchMapTransformer(): PluginObj {
  return {
    visitor: {
      JSXOpeningElement(path: NodePath<types.JSXOpeningElement>) {
        const attributes = path.node.attributes;
        const searchKeyAttribute = attributes.find(
          (attr) =>
            types.isJSXAttribute(attr) &&
            types.isJSXIdentifier(attr.name, { name: "searchKey" })
        );

        if (!searchKeyAttribute || !types.isJSXAttribute(searchKeyAttribute))
          return;

        if (
          !types.isJSXExpressionContainer(searchKeyAttribute.value) ||
          !types.isObjectExpression(searchKeyAttribute.value.expression)
        )
          throw new Error("searchKey must be an object");

        const props = searchKeyAttribute.value.expression.properties;
        const idProp = props.find(
          (x) =>
            types.isObjectProperty(x) &&
            types.isIdentifier(x.key) &&
            x.key.name === "id"
        ) as types.ObjectProperty;

        if (!idProp) throw new Error("searchKey must have an id");

        if (!types.isStringLiteral(idProp.value))
          throw new Error("id must be a string");

        if (
          types.isJSXIdentifier(path.node.name) &&
          path.node.name.name.startsWith(path.node.name.name[0].toUpperCase())
        ) {
          //? Custom React component
          const parentPath = path.parentPath;
          if (types.isJSXElement(parentPath.node)) {
            const jsxElement = parentPath.node;
            const divElement = types.jsxElement(
              types.jsxOpeningElement(types.jsxIdentifier("div"), [
                types.jsxAttribute(
                  types.jsxIdentifier("data-search-id"),
                  idProp.value
                ),
              ]),
              types.jsxClosingElement(types.jsxIdentifier("div")),
              [jsxElement]
            );
            path.node.attributes = attributes.filter(
              (attr) => attr !== searchKeyAttribute
            );
            parentPath.replaceWith(divElement);
            parentPath.skip();
          }
        } else {
          //? HTML React component
          searchKeyAttribute.name = types.jsxIdentifier("data-search-id");
          searchKeyAttribute.value = types.jsxExpressionContainer(idProp.value);
        }
      },
    },
  };
}

