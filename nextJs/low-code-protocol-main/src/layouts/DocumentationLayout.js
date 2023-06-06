import Head from 'next/head';
import { useRouter } from 'next/router';
// import socialSquare from '@/img/social-square.jpg'
import { Title } from '@/components/Title';      //-->   引入标题
import { documentationNav } from '@/navs/documentation';    //-->   引入侧边栏快速向导数组
import { SidebarLayout } from '@/layouts/SidebarLayout';  //-->  引入侧边栏组件




/**--- TODO: 总 - 文档布局(侧边栏及内容区域) ---**/
export function DocumentationLayout(props) {
  let router = useRouter()
  // console.log('router', router.pathname) // url
  // console.log(props)



  return (
    <>
      <Title suffix={router.pathname === '/' ? undefined : '低代码 DevOps 平台协议'}>
        {props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}
      </Title>
      <Head></Head>

      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

DocumentationLayout.nav = documentationNav;
