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

        this.stringsArray.push(latinToCyrillic(stringValue));

        const arrayAccessor = t.memberExpression(
          t.identifier("array"),
          t.numericLiteral(this.stringsArray.length - 1),
          true
        );
        const jsxExpression = t.jsxExpressionContainer(arrayAccessor);

        path.replaceWith(jsxExpression);
        path.skip();
      },
      Program(path) {
        const children = path.node.body;
        let foundReactImports = false;
        let foundLangContextImport = false;

        for (let i = 0; i < children.length; i++) {
          if (children[i].type !== "ImportDeclaration") break;

          if (children[i].source.value === "react") {
            foundReactImports = true;

            if (
              !children[i].specifiers.some(
                (x) =>
                  x.type === "ImportSpecifier" &&
                  x.imported.name === "useContext"
              )
            ) {
              children[i].specifiers.push(
                t.importSpecifier(
                  t.identifier("useContext"),
                  t.identifier("useContext")
                )
              );
            }
          } else if (
            children[i].source.value === "@contexts/language-context"
          ) {
            foundLangContextImport = true;
          }
        }

        path.node.body = [
          !foundReactImports &&
            t.ImportDeclaration(
              [
                t.importSpecifier(
                  t.identifier("useContext"),
                  t.identifier("useContext")
                ),
              ],
              t.stringLiteral("react")
            ),
          !foundLangContextImport &&
            t.ImportDeclaration(
              [t.importDefaultSpecifier(t.identifier("languageContext"))],
              t.stringLiteral("@contexts/language-context")
            ),
          ...children,
        ];
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
