import Head from 'next/head'
import socialSquare from '@/img/social-square.jpg'




export function Title({ suffix, children }) {
  let title = children + (suffix ? ` - ${suffix}` : '')

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
