import Head from 'next/head'
import socialSquare from '@/img/social-square.jpg'
import { Header } from '@/components/Header'

import { useRouter } from 'next/router'
import { Title } from '../components/Title'
import { SidebarLayout } from '@/layouts/SidebarLayout'
import { protocolNav } from '@/navs/protocol'




export function ProtocolLayout(props) { // !可能未使用此组件哦
  let router = useRouter()

  return (
    <>
      <Title suffix={router.pathname === '/' ? undefined : '低代码协议'}>
        {props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}
      </Title>
      <SidebarLayout nav={protocolNav} {...props} />
    </>
  )
}

ProtocolLayout.nav = protocolNav
