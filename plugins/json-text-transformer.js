export default function (babel) {
  const { types: t, traverse } = babel;

  function translate(node, translator, omitProperties = []) {
    if (t.isObjectProperty(node) && !omitProperties.includes(node.key.value)) {
      translate(node.value, translator, omitProperties);
      return;
    }

    if (t.isStringLiteral(node)) {
      node.value = translator(node.value);
      return;
    }

    if (t.isObjectExpression(node)) {
      node.properties.forEach((x) => translate(x, translator, omitProperties));
      return;
    }

    if (t.isArrayExpression(node)) {
      node.elements.forEach((x) => translate(x, translator, omitProperties));
      return;
    }
  }

  return {
    name: "json-text-transformer",
    visitor: {
      ExportDefaultDeclaration(path, state) {
        const omitProperties = state.opts.omitProperties || [];
        const translators = state.opts.translators;

        const langOptions = Object.keys(translators);

        const defaultDeclaration = path.node.declaration;
        defaultDeclaration.properties = [];
        langOptions.forEach((lang) => {
          defaultDeclaration.properties.push(
            t.objectProperty(t.stringLiteral(lang), t.objectExpression([]))
          );
        });

        traverse(state.file.ast.program, {
          ExportNamedDeclaration(path) {
            const declaration = path.node.declaration.declarations[0];
            const id = declaration.id;
            const value = declaration.init;

            langOptions.forEach((lang, i) => {
              defaultDeclaration.properties[i].value.properties.push(
                t.objectProperty(t.cloneNode(id), t.cloneNode(value))
              );
              const translator = translators[lang];

              const currentVal =
                defaultDeclaration.properties[i].value.properties[
                  defaultDeclaration.properties[i].value.properties.length - 1
                ].value;

              if (!omitProperties.includes(id.name))
                translate(currentVal, translator, omitProperties);
            });

            path.remove();
          },
        });
      },
    },
  };
}
