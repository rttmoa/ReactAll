import MarkdownIt from 'markdown-it'
import { memo, useMemo } from 'react'
import 'github-markdown-css'




const md = new MarkdownIt({
  html: true,
  linkify: true, // 链接字符串转化为链接
})


function b64_to_utf8(str) {
  return decodeURIComponent(escape(atob(str))) // 使用 decodeURIComponent() 对编码后的 URI 进行解码
}

// memo：只要props没有变化，就不需要渲染
export default memo(function MarkdownRenderer({ content, isBase64 }) {
  const markdown = isBase64 ? b64_to_utf8(content) : content;
  const html = useMemo(() => md.render(markdown), [markdown]);    // 依赖是 markdown

  // console.log("MarkdownRenderer 渲染次数") // FIXME: 仅一次
  // console.log("content", content) // 字符编码：IyBEZXNpZ25QYXR0ZXJucwoKSmF2YVNjcmlwdOiuvuiuoeaooeW8jwoKCgogICAg5bel5Y6C5qih5byP77ya5bCB6KOF5Yib5bu65a+56LGh55qE6L+H56iL77yI5bCB6KOF5Liq5oCn5Lit55qE5YWx5oCn77yJCiAgICDmir3osaHlt6Xl
  // console.log("markdown", markdown) // 输出为 markdown 格式
  // console.log("html", html) // 输出为 HTML 标签格式

  
  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
})
