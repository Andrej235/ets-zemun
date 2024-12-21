export default function (babel) {
  const { types: t, traverse } = babel;

  return {
    visitor: {
      VariableDeclaration(path, state) {
        const omitProperties = state.opts.omitProperties || [];
        const translators = state.opts.translators;
        const langOptions = Object.keys(translators);
        const langPacks = t.objectExpression([]);

        langOptions.forEach((currentLang) => {
          const clonedNode = t.cloneNode(path.node);
          clonedNode.declarations[0].id.name = currentLang;
          langPacks.properties.push(
            t.ObjectProperty(
              t.stringLiteral(currentLang),
              clonedNode.declarations[0].init
            )
          );

          traverse(
            clonedNode,
            {
              ObjectProperty(path) {
                const { node } = path;

                if (node.value.type !== "StringLiteral") return;
                if (omitProperties.includes(node.key.name)) return;

                node.value.value = latinToCyrillic(node.value.value);
              },
            },
            path.scope,
            path.parent
          );
        });

        path.stop();
        path.node.declarations[0].init = langPacks;
      },
    },
  };
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
