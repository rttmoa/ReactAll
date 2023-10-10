import { useRouter } from 'next/router'
import { Title } from '../components/Title'
import { SidebarLayout } from './SidebarLayout'
import { documentationNav } from '../navs/documentation'


// TODO: 文档布局  （Main）
export function DocumentationLayout(props) {
  let router = useRouter()
  // console.log(props) //  { children, layoutProps, navIsOpen, setNavIsOpen }

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
