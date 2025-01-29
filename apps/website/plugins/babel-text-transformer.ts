/* eslint-disable @typescript-eslint/no-explicit-any */
import { types, Visitor } from "@babel/core";
import { TranslationResult } from "./translator";

export default function babelTextTransformer(): Visitor<any> {
  return {
    Program(path, state) {
      const languageOptions: string[] = state.opts.languageOptions;
      const allTranslations: TranslationResult = state.opts.translations;
      const reactHooksWithDependencies = [
        "useMemo",
        "useCallback",
        "useEffect",
      ];

      const omitJSXProps: string[] = state.opts.omitJSXProps;
      const comments = state.file.ast.comments;

      const children = path.node.body;
      const jsonImports = children
        .filter(
          (x) =>
            types.isImportDeclaration(x) && x.source.value.endsWith(".json")
        )
        .flatMap((x) =>
          (x as types.ImportDeclaration).specifiers.map((x) => x.local.name)
        );

      const hasJSONData = jsonImports.length > 0;

      const ignoreFile = comments.some(
        (x: types.Comment) =>
          x.loc?.start.line === 1 && x.value.trim() === "@text-transform-ignore"
      );

      //useMemo hook
      const hasUseMemo =
        ignoreFile || //This will ensure that useMemo is not imported if the file is ignored
        children.some(
          (x) =>
            types.isImportDeclaration(x) &&
            x.source.value === "react" &&
            x.specifiers.some(
              (x) => types.isImportSpecifier(x) && x.local.name === "useMemo"
            )
        );

      const useMemoImport = hasUseMemo
        ? types.emptyStatement()
        : types.importDeclaration(
            [
              types.importSpecifier(
                types.identifier("useMemo"),
                types.identifier("useMemo")
              ),
            ],
            types.stringLiteral("react")
          );

      path.node.body = [
        types.importDeclaration(
          [types.importDefaultSpecifier(types.identifier("useLang"))],
          types.stringLiteral("@hooks/use-language")
        ),
        useMemoImport,
        ...children,
      ];

      path.traverse({
        FunctionDeclaration(path) {
          const isIgnored =
            ignoreFile ||
            comments.some(
              (x: types.Comment) =>
                path.node.loc &&
                x.loc?.start.line === path.node.loc.start.line - 1 &&
                x.value.trim() === "@text-transform-ignore"
            );

          const { node } = path;
          const isPascalCase = /^[A-Z]/.test(node.id?.name ?? "");

          const hasJSXReturn = node.body.body.some(
            (statement) =>
              types.isReturnStatement(statement) &&
              (types.isJSXElement(statement.argument) ||
                types.isJSXFragment(statement.argument))
          );

          const isReactComponent = isPascalCase && hasJSXReturn;

          if (!isReactComponent && !hasJSONData) return;

          const langPackDeclaration = types.variableDeclaration("const", [
            types.variableDeclarator(
              types.identifier("lang"),
              isReactComponent
                ? types.callExpression(types.identifier("useLang"), [])
                : types.callExpression(
                    types.memberExpression(
                      types.identifier("localStorage"),
                      types.identifier("getItem")
                    ),
                    [types.stringLiteral("language")]
                  )
            ),
          ]);

          const extractedTextTranslationsObject =
            isReactComponent && !isIgnored && types.objectExpression([]);

          const extractedTextTranslations =
            !isReactComponent || isIgnored
              ? types.emptyStatement()
              : types.variableDeclaration("const", [
                  types.variableDeclarator(
                    types.identifier("extractedTextTranslations"),
                    types.callExpression(types.identifier("useMemo"), [
                      types.arrowFunctionExpression(
                        [],
                        types.blockStatement([
                          types.returnStatement(
                            extractedTextTranslationsObject || null
                          ),
                        ])
                      ),
                      types.arrayExpression([]),
                    ])
                  ),
                ]);

          const selectedTextTranslations =
            !isReactComponent || isIgnored
              ? types.emptyStatement()
              : types.variableDeclaration("const", [
                  types.variableDeclarator(
                    types.identifier("selectedTextTranslations"),
                    types.memberExpression(
                      types.identifier("extractedTextTranslations"),
                      types.identifier("lang"),
                      true
                    )
                  ),
                ]);

          //extractedTextTranslationsObject is false if isReactComponent is false
          if (extractedTextTranslationsObject) {
            languageOptions.forEach((language) => {
              extractedTextTranslationsObject.properties.push(
                types.objectProperty(
                  types.stringLiteral(language),
                  types.arrayExpression([])
                )
              );
            });

            path.traverse({
              JSXText(path) {
                const text = path.node.value.trim();
                if (!text) return;
                const currentTranslations = allTranslations.get(text);

                for (let i = 0; i < languageOptions.length; i++) {
                  const prop = (
                    extractedTextTranslationsObject.properties[
                      i
                    ] as types.ObjectProperty
                  ).value as types.ArrayExpression;

                  prop.elements.push(
                    types.stringLiteral(
                      currentTranslations?.[languageOptions[i]] ?? "error"
                    )
                  );
                }

                path.replaceWith(
                  types.jsxExpressionContainer(
                    types.memberExpression(
                      types.identifier("selectedTextTranslations"),
                      types.numericLiteral(
                        (
                          (
                            extractedTextTranslationsObject
                              .properties[0] as types.ObjectProperty
                          ).value as types.ArrayExpression
                        ).elements.length - 1
                      ),
                      true
                    )
                  )
                );
                path.skip();
              },
              JSXAttribute(path) {
                if (
                  isIgnored ||
                  !types.isStringLiteral(path.node.value) ||
                  omitJSXProps.includes(
                    typeof path.node.name.name === "string"
                      ? path.node.name.name
                      : path.node.name.name.name
                  )
                )
                  return;

                const text = path.node.value.value.trim();
                if (!text) return;
                const currentTranslations = allTranslations.get(text);

                for (let i = 0; i < languageOptions.length; i++) {
                  const prop = (
                    extractedTextTranslationsObject.properties[
                      i
                    ] as types.ObjectProperty
                  ).value as types.ArrayExpression;

                  prop.elements.push(
                    types.stringLiteral(
                      currentTranslations?.[languageOptions[i]] ?? "error"
                    )
                  );
                }

                path.node.value = types.jsxExpressionContainer(
                  types.memberExpression(
                    types.identifier("selectedTextTranslations"),
                    types.numericLiteral(
                      (
                        (
                          extractedTextTranslationsObject
                            .properties[0] as types.ObjectProperty
                        ).value as types.ArrayExpression
                      ).elements.length - 1
                    ),
                    true
                  )
                );
              },
              ...(hasJSONData && {
                CallExpression(path) {
                  if (
                    types.isIdentifier(path.node.callee) &&
                    reactHooksWithDependencies.includes(
                      path.node.callee.name
                    ) &&
                    path.node.arguments.length === 2 &&
                    types.isArrowFunctionExpression(path.node.arguments[0]) &&
                    types.isArrayExpression(path.node.arguments[1])
                  ) {
                    let hookUsesJSONData = false;

                    path.traverse({
                      Identifier(path) {
                        if (jsonImports.includes(path.node.name))
                          hookUsesJSONData = true;
                      },
                    });

                    if (hookUsesJSONData)
                      path.node.arguments[1].elements.push(
                        types.identifier("lang")
                      );
                  }
                },
              }),
            });
          }

          path.node.body.body = [
            langPackDeclaration,
            extractedTextTranslations,
            selectedTextTranslations,
            ...path.node.body.body,
          ];
        },

        //Use lang in place of every identifier that is imported from a JSON file
        ...(hasJSONData && {
          Identifier(path) {
            if (
              !jsonImports.includes(path.node.name) ||
              types.isImportDefaultSpecifier(path.parent) ||
              types.isImportSpecifier(path.parent)
            )
              return;

            path.replaceWith(
              types.memberExpression(path.node, types.identifier("lang"), true)
            );
            path.skip();
          },
        }),
      });
    },
  };
}

