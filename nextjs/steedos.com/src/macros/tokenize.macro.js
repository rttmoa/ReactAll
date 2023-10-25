const { createMacro } = require('babel-plugin-macros')
const Prism = require('prismjs')
const { parseExpression } = require('@babel/parser')
const generate = require('@babel/generator').default

module.exports = createMacro(tokenizeMacro)




// ? Prism 代码高亮工具

function simplify(token) {
  if (typeof token === 'string') return token
  return [token.type, Array.isArray(token.content) ? token.content.map(simplify) : token.content]
}

function tokenizeMacro({ references, babel: { types: t } }) {
  if (references.default) {
    references.default.forEach(createTransform('tokens'))
  }
  if (references.tokenizeWithLines) {
    references.tokenizeWithLines.forEach(createTransform('lines'))
  }

  function createTransform(type) {
    return (path) => {
      const lang = path.parentPath.node.property.name

      const codeNode = path.parentPath.parentPath.node.arguments[0]
      const originalCode = t.isTemplateLiteral(codeNode)
        ? codeNode.quasis[0].value.cooked
        : codeNode.value

      const returnCodeNode = path.parentPath.parentPath.node.arguments[1]
      const returnCode = returnCodeNode && returnCodeNode.value

      const argsNode = path.parentPath.parentPath.node.arguments[3]
      let args = {}
      if (argsNode) {
        eval('args = ' + generate(argsNode).code)
      }

      const codeTransformerNode = path.parentPath.parentPath.node.arguments[2]
      let code = originalCode
      if (codeTransformerNode) {
        const codeTransformer = eval(generate(codeTransformerNode).code)
        code = codeTransformer(code, args)
      }

      const tokens = Prism.tokenize(code, Prism.languages[lang])

      path.parentPath.parentPath.replaceWith(
        parseExpression(
          JSON.stringify({
            ...(type === 'tokens' ? { tokens: tokens.map(simplify) } : {}),
            ...(type === 'lines' ? { lines: normalizeTokens(tokens) } : {}),
            ...(returnCode ? { code: returnCode === 'original' ? originalCode : code } : {}),
            ...args,
          })
        )
      )
    }
  }
}

// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/utils/normalizeTokens.js

const newlineRe = /\r\n|\r|\n/

// 空行需要包含一个空标记，用 {empty: true } 表示
function normalizeEmptyLines(line) {
  if (line.length === 0) {
    line.push({
      types: ['plain'],
      content: '',
      empty: true,
    })
  } else if (line.length === 1 && line[0].content === '') {
    line[0].empty = true
  }
}

function appendTypes(types, add) {
  const typesSize = types.length
  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types
  }
  return types.concat(add)
}

// 获取一系列 Prism 的标记并按行对它们进行分组，变成普通的字符串也转换为标记。
// 在某些情况下，令牌可能会递归，这意味着它们的类型是串联的。但是纯字符串标记始终是“plain”类型。
// 这不是递归的，以避免超出调用堆栈限制，因为尚不清楚 
// Prism 的令牌可以如何嵌套
function normalizeTokens(tokens) { 
  const typeArrStack = [[]]
  const tokenArrStack = [tokens]
  const tokenArrIndexStack = [0]
  const tokenArrSizeStack = [tokens.length]

  let i = 0
  let stackIndex = 0
  let currentLine = []

  const acc = [currentLine]

  while (stackIndex > -1) {
    while ((i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]) {
      let content
      let types = typeArrStack[stackIndex]

      const tokenArr = tokenArrStack[stackIndex]
      const token = tokenArr[i]

      // 确定内容并在必要时将类型附加到类型
      if (typeof token === 'string') {
        types = stackIndex > 0 ? types : ['plain']
        content = token
      } else {
        types = appendTypes(types, token.type)
        if (token.alias) {
          types = appendTypes(types, token.alias)
        }
        content = token.content
      }

      // ? 如果 token.content 是一个数组，则增加堆栈深度并重复此 while 循环
      if (typeof content !== 'string') {
        stackIndex++
        typeArrStack.push(types)
        tokenArrStack.push(content)
        tokenArrIndexStack.push(0)
        tokenArrSizeStack.push(content.length)
        continue
      }

      // 按换行符分割
      const splitByNewlines = content.split(newlineRe)
      const newlineCount = splitByNewlines.length

      currentLine.push({ types, content: splitByNewlines[0] })

      // 为新行上的每个字符串创建一个新行
      for (let i = 1; i < newlineCount; i++) {
        normalizeEmptyLines(currentLine)
        acc.push((currentLine = []))
        currentLine.push({ types, content: splitByNewlines[i] })
      }
    }

    // 减少堆栈深度
    stackIndex--
    typeArrStack.pop()
    tokenArrStack.pop()
    tokenArrIndexStack.pop()
    tokenArrSizeStack.pop()
  }

  normalizeEmptyLines(currentLine)
  return acc
}
