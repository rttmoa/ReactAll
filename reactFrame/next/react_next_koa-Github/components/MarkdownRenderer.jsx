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

// TODO:  详情页面 渲染 Markdown
export default memo(function MarkdownRenderer({ content, isBase64 }) { // memo：只要props没有变化，就不需要渲染
  const markdown = isBase64 ? b64_to_utf8(content) : content;
  const html = useMemo(() => md.render(markdown), [markdown]);    // 依赖是 markdown

  // console.log("MarkdownRenderer 渲染次数") // useMeomo 仅一次
  // console.log("content", content) // 字符编码： 字符串
  // console.log("markdown", markdown) // 输出为 markdown 格式
  // console.log("html", html) // 输出为 HTML 标签格式

  
  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
})
