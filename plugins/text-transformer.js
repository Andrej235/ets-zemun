function customTrim(str) {
  const trimmed = str.replace(/^\s+/, " ").replace(/\s+$/, " ");
  return trimmed.replace(/\s+/g, " ").trim();
}

export default function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    post(file) {
      if (!this.cyrillicArray) return;

      const newCyrillicArray = t.variableDeclaration("const", [
        t.variableDeclarator(
          t.identifier("cyrillicArray"),
          t.arrayExpression(this.cyrillicArray.map((x) => t.stringLiteral(x)))
        ),
      ]);

      const newLatinArray = t.variableDeclaration("const", [
        t.variableDeclarator(
          t.identifier("latinArray"),
          t.arrayExpression(this.latinArray.map((x) => t.stringLiteral(x)))
        ),
      ]);

      file.ast.program.body = [newCyrillicArray, newLatinArray].concat(
        file.ast.program.body
      );
    },
    visitor: {
      JSXText(path) {
        if (!this.cyrillicArray) this.cyrillicArray = [];
        if (!this.latinArray) this.latinArray = [];

        const stringValue = customTrim(path.node.value);
        if (stringValue.length < 1) return;

        this.cyrillicArray.push(latinToCyrillic(stringValue));
        this.latinArray.push(stringValue);

        const arrayAccessor = t.memberExpression(
          t.identifier("languagePack"),
          t.numericLiteral(this.cyrillicArray.length - 1),
          true
        );
        const jsxExpression = t.jsxExpressionContainer(arrayAccessor);

        path.replaceWith(jsxExpression);
        path.skip();
      },
      Program(path) {
        const children = path.node.body;

        if (
          path.container.comments.some(
            (x) =>
              x.loc.start.line === 1 &&
              x.value.trim() === "@text-transform-ignore"
          )
        )
          path.skip();

        path.node.body = [
          t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier("useLangPack"))],
            t.stringLiteral("@hooks/use-language-pack")
          ),
          ...children,
        ];
      },
      FunctionDeclaration(path) {
        const { node } = path;
        const isPascalCase = /^[A-Z]/.test(node.id.name);

        const hasJSXReturn = node.body.body.some(
          (statement) =>
            (t.isReturnStatement(statement) &&
              t.isJSXElement(statement.argument)) ||
            t.isJSXFragment(statement.argument)
        );

        if (!isPascalCase || !hasJSXReturn) return;

        if (
          path.context.parentPath.hub.file.ast.comments.some(
            (x) =>
              x.loc.start.line === path.node.loc.start.line - 1 &&
              x.value.trim() === "@text-transform-ignore"
          )
        )
          return;

        const langPackDeclaration = t.variableDeclaration("const", [
          t.variableDeclarator(
            t.identifier("languagePack"),
            t.callExpression(t.identifier("useLangPack"), [
              t.identifier("cyrillicArray"),
              t.identifier("latinArray"),
            ])
          ),
        ]);
        node.body.body = [langPackDeclaration, ...node.body.body];
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
