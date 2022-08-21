const importModule = require("@babel/helper-module-imports");

const getHubbleTemplate = (nameHint, payload) => {
  const template = [
    `${nameHint}(`,
    JSON.stringify(payload, null, 2),
    ")"
  ].join("");

  return template;
}

const transformComments = (leadingComments) => {
  return leadingComments.reduce((accu, cur, index) => {
    if (index === 0) {
      accu['type'] = cur.value.replace(/\@hubble:(\w+)/, "$1").trim();
    } else {
      const [, key, value] = cur.value.match(/\@param\s(\w+)\s(\w+)/);
      accu[key] = value;
    }
    return accu;
  }, {});
}

module.exports = function (api, options, dirname) {

  return {
    visitor: {
      Program(path, state) {
        state.options = {
          ...options,
          useImport: false,
          identifierName: "",
        };

        path.traverse({
          ExpressionStatement(path) {
            const leadingComments = path.node.leadingComments
            if (leadingComments && /\@hubble:(\w+)/.test(leadingComments[0].value)) {
              // 代码中检测到注释，需要引入模块
              state.options.useImport = true;
              const comments = transformComments(leadingComments);
              const template = getHubbleTemplate(options.nameHint, comments);
              console.log(template)
              path.insertBefore(api.template.statement(template)())
            }
          }
        })

        if (!state.options.useImport) return;

        path.traverse({
          ImportDeclaration(path) {
            const importPath = path.get('source').node.value;

            // 处理模块已被引入
            if (state.options.import === importPath) {
              const specifiers = path.get('specifiers');

              specifiers.forEach((specifier) => {
                if (specifier.isImportSpecifier()) {
                  // 获取导入别名
                  state.options.identifierName = specifier.get('local').toString()
                }
              })
            }
          }
        })

        // 处理模块未被引入
        if (!state.options.identifierName) {
          // 可以使用 path.scope.generateUid(options.nameHint) 生成唯一变量名
          state.options.identifierName = importModule.addNamed(
            path,
            options.named,
            options.import,
            { nameHint: options.nameHint }
          ).name;
          console.log(options.named, options.import, { nameHint: options.nameHint })
        }
      }
    }
  }
}
