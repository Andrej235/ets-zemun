export default function (babel) {
  const { types: t, traverse } = babel;

  return {
    visitor: {
      ExportDefaultDeclaration(exportPath, state) {
        const mainPropertyName =
          exportPath.node.declaration.properties[0].key.name;

        traverse(state.file.ast.program, {
          VariableDeclaration(path) {
            const langPacks = traverseObject(
              path,
              path.node.declarations[0].init,
              state
            );

            for (let i = 0; i < langPacks.properties.length; i++) {
              const key = langPacks.properties[i].key.value;
              const value = langPacks.properties[i].value;

              langPacks.properties[i].value = t.objectExpression([
                t.objectProperty(t.identifier(mainPropertyName), value),
              ]);
            }

            exportPath.node.declaration = langPacks;
            path.remove();
          },
        });
      },
    },
  };

  function traverseObject(parentPath, objectNode, state) {
    const omitProperties = state.opts.omitProperties || [];
    const translators = {
      "sr-cyr": latinToCyrillic,
      "sr-lat": (x) => x,
    };
    const langOptions = ["sr-cyr", "sr-lat"];
    const langPacks = t.objectExpression([]);

    langOptions.forEach((currentLang) => {
      const clonedNode = t.cloneNode(objectNode);
      langPacks.properties.push(
        t.ObjectProperty(t.stringLiteral(currentLang), clonedNode)
      );

      traverse(
        clonedNode,
        {
          ObjectProperty(path) {
            const { node } = path;

            if (node.value.type !== "StringLiteral") return;
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

function latinToCyrillic(text) {
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
    const cyrillic = latinToCyrillicMap[digraph];
    const regex = new RegExp(digraph, "g");
    text = text.replace(regex, cyrillic);
  });

  // Convert the rest of the characters
  return text
    .split("")
    .map((char) => latinToCyrillicMap[char] || char)
    .join("");
}
