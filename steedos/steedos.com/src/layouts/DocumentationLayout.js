import Head from 'next/head'
import { Header } from '@/components/Header'
import socialSquare from '@/img/social-square.jpg'


import { useRouter } from 'next/router'
import { Title } from '../components/Title'
import { SidebarLayout } from '@/layouts/SidebarLayout'
import { documentationNav } from '@/navs/documentation'





// TODO: 文档布局
export function DocumentationLayout(props) {
  let router = useRouter()
  // console.log("/layouts DocumentationLayoutjs")
  
  return (
    <>
      <Title suffix={router.pathname === '/' ? undefined : '华炎魔方'}>
        {props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}
      </Title>
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

DocumentationLayout.nav = documentationNav
