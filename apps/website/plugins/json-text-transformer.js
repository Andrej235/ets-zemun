export default function (babel) {
  const { types: t, traverse } = babel;

  return {
    name: "json-text-transformer",
    visitor: {
      ExportDefaultDeclaration(path, state) {
        const omitProperties = state.opts.omitProperties || [];
        const translations = state.opts.translations;
        const langOptions = state.opts.langOptions;

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

              const currentVal =
                defaultDeclaration.properties[i].value.properties[
                  defaultDeclaration.properties[i].value.properties.length - 1
                ].value;

              if (!omitProperties.includes(id.name))
                translate(currentVal, omitProperties, lang);
            });

            path.remove();
          },
        });

        function translate(node, omitProperties, lang) {
          if (
            t.isObjectProperty(node) &&
            !omitProperties.includes(node.key.name || node.key.value)
          ) {
            translate(node.value, omitProperties, lang);
            return;
          }

          if (t.isStringLiteral(node)) {
            node.value = translations.get(node.value)[lang];
            return;
          }

          if (t.isObjectExpression(node)) {
            node.properties.forEach((x) => translate(x, omitProperties, lang));
            return;
          }

          if (t.isArrayExpression(node)) {
            node.elements.forEach((x) => translate(x, omitProperties, lang));
          }
        }
      },
    },
  };
}

