import { useContext } from 'react'
import { useRouter } from 'next/router'
import { SidebarContext } from '@/layouts/SidebarLayout'




/**--- 翻页：上一页/下一页 ---**/
export function usePrevNext() {

  let router = useRouter()
  let { nav } = useContext(SidebarContext)
  let pages = Object.keys(nav).flatMap((category) => nav[category])
  let pageIndex = pages.findIndex((page) => page.href === router.pathname)
  // console.log(pages) //-->  (54) [{title: '概览', href: '/docs/overview'}, title: '数据源', href: '/docs/datasource'},.......]
  // console.log(router.pathname) //-->   /docs/api-metadata  |  /docs/automation
  // console.log(pageIndex) //-->  0 - 53

  // pageIndex当前页  |  prev上一页  |  next下一页
  // console.log("prev", pageIndex > -1 ? pages[pageIndex - 1] : undefined)
  // console.log("next", pageIndex > -1 ? pages[pageIndex + 1] : undefined)

  return {
    prev: pageIndex > -1 ? pages[pageIndex - 1] : undefined,
    next: pageIndex > -1 ? pages[pageIndex + 1] : undefined,
  }
}
