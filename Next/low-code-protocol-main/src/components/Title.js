import Head from 'next/head'





/**--- 标签页 - 标题 ---*/
export function Title({ suffix, children }) {
  let title = children + (suffix ? ` - ${suffix}` : '')
  // console.log(title)
  // 第一次渲染：可视化开发 - Low Code Protocol       第二次渲染：可视化开发 - 低代码 DevOps 平台协议

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
    </Head>
  )
}
