import '../css/fonts.css'
import '../css/main.css'
import 'focus-visible'
import { useState, useEffect, Fragment } from 'react'
import { Header } from '@/components/Header'
import { Title } from '@/components/Title'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import Head from 'next/head'
import socialCardLarge from '@/img/social-card-large.jpg'
import { ResizeObserver } from '@juggle/resize-observer'
import 'intersection-observer'
import { SearchProvider } from '@/components/Search'


// console.log(typeof window)
if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver
}
const progress = new ProgressBar({
  size: 2,
  color: '#38bdf8',
  className: 'bar-of-progress',
  delay: 100,
})
// 这修复了 safari 跳转到页面底部的问题
// 使用 `esc` 键关闭搜索模式时
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}
Router.events.on('routeChangeStart', () => progress.start())
Router.events.on('routeChangeComplete', () => progress.finish())
Router.events.on('routeChangeError', () => progress.finish())





export default function App({ Component, pageProps, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false);

  useEffect(() => {
    if (!navIsOpen) return
    function handleRouteChange() {
      setNavIsOpen(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [navIsOpen])

  const Layout = Component.layoutProps?.Layout || Fragment;
  const layoutProps = Component.layoutProps?.Layout ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen } : {};
  const showHeader = router.pathname !== '/';
  const meta = Component.layoutProps?.meta || {};
  const description = meta.metaDescription || meta.description || 'Documentation for the Tailwind CSS framework.';

  let section = meta.section || Object.entries(Component.layoutProps?.Layout?.nav ?? {}).find(([, items]) =>
      items.find(({ href }) => href === router.pathname)
  )?.[0];


  // console.log(meta)
  // console.log(router)



  return (
    <>
      <Title suffix="Low Code Protocol">{meta.metaTitle || meta.title}</Title>
      <Head>
        <meta charSet="utf-8"/>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@tailwindcss" />
        <meta key="twitter:description" name="twitter:description" content={description} />
        <meta key="twitter:image" name="twitter:image" content={`https://tailwindcss.com${socialCardLarge}` || null} />
        <meta key="twitter:creator" name="twitter:creator" content="@tailwindcss" />
        <meta key="og:url" property="og:url" content={`https://low-code-protocol.com${router.pathname}`} />
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:description" property="og:description" content={description} />
        <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feeds/feed.xml" />
        <link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="/feeds/atom.xml" />
        <link rel="alternate" type="application/json" title="JSON Feed" href="/feeds/feed.json" />
      </Head>

      {/* TODO: 封装的组件 */}
      <SearchProvider>
        {/* 头部 -  左侧：低代码 DevOps 平台协议  右侧：亮度/Github图标 */}
        {showHeader && (
          // TODO: 页面缩小后 可以使用 另外一套功能！
          <Header
            hasNav={Boolean(Component.layoutProps?.Layout?.nav)}
            navIsOpen={navIsOpen}
            onNavToggle={(isOpen) => {setNavIsOpen(isOpen); console.log("Nav状态")}}
            title={meta.title}
            section={section}
          />
        )}
        {/* 渲染内容 */}
        <Layout {...layoutProps}>
          <Component section={section} {...pageProps} />
        </Layout>
      </SearchProvider>
    </>
  )
}
