export default function (babel) {
  const { types: t, traverse } = babel;

  return {
    visitor: {
      VariableDeclaration(path, state) {
        if (t.isObjectExpression(path.node.declarations[0].init)) {
          path.node.declarations[0].init = traverseObject(
            path,
            path.node.declarations[0].init,
            state
          );
        } else if (t.isArrayExpression(path.node.declarations[0].init)) {
          const elements = path.node.declarations[0].init.elements;
          for (let i = 0; i < elements.length; i++) {
            if (t.isObjectExpression(elements[i])) {
              const current = elements[i];
              elements[i] = traverseObject(path, elements[i], state);
            }
          }
        }
      },
    },
  };

  function traverseObject(parentPath, objectNode, state) {
    const omitProperties = state.opts.omitProperties || [];
    const translators = state.opts.translators;
    const langOptions = Object.keys(translators);
    const langPacks = t.objectExpression([]);

    langOptions.forEach((currentLang) => {
      const clonedNode = t.cloneNode(objectNode);
      langPacks.properties.push(
        t.ObjectProperty(t.stringLiteral(currentLang), clonedNode)
      );

      traverse(
        clonedNode,
        {
          ObjectProperty({ node }) {
            if (!t.isStringLiteral(node.value)) return;
            if (omitProperties.includes(node.key.name)) return;

            node.value.value = translators[currentLang](node.value.value);
          },
        },
        parentPath.scope,
        parentPath.parent
      );
    });

    parentPath.stop();
    return langPacks;
  }
}
