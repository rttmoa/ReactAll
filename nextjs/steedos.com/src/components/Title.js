import Head from 'next/head'
import socialSquare from '@/img/social-square.jpg'



// ? 标题 & 每一个模块都使用 <Title />  快速向导、Docker部署、参数配置....
// http://localhost:3000/docs/deploy/steedos-config
export function Title({ suffix, children }) {
  let title = children + (suffix ? ` - ${suffix}` : '')
  // console.log(title)
  
  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="twitter:card" name="twitter:card" content="summary" />
      <meta key="twitter:image" name="twitter:image" content={`https://tailwindcss.com${socialSquare}`}/>
    </Head>
  )
}
