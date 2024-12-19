function customTrim(str) {
  const trimmed = str.replace(/^\s+/, " ").replace(/\s+$/, " ");
  return trimmed.replace(/\s+/g, " ").trim();
}

export default function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    post(file) {
      if (!this.stringsArray) return;

      const newArray = t.variableDeclaration("const", [
        t.variableDeclarator(
          t.identifier("array"),
          t.arrayExpression(this.stringsArray.map((x) => t.stringLiteral(x)))
        ),
      ]);

      file.ast.program.body = [newArray].concat(file.ast.program.body);
    },
    visitor: {
      JSXText(path) {
        if (!this.stringsArray) this.stringsArray = [];

        const stringValue = customTrim(path.node.value);
        if (stringValue.length < 1) return;

        this.stringsArray.push(stringValue + " test");

        const arrayAccessor = t.memberExpression(
          t.identifier("array"),
          t.numericLiteral(this.stringsArray.length - 1),
          true
        );
        const jsxExpression = t.jsxExpressionContainer(arrayAccessor);

        path.replaceWith(jsxExpression);
        path.skip();
      },
    },
  };
}
