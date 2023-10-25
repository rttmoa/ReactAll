import { useState, useEffect, createContext, Fragment, useCallback, useContext } from 'react'
import { ClassTable } from '@/components/ClassTable'
import { useRouter } from 'next/router'
import { usePrevNext } from '@/hooks/usePrevNext'
import Link from 'next/link'
import { SidebarLayout, SidebarContext } from './SidebarLayout'
import { PageHeader } from '../components/PageHeader'
import clsx from 'clsx'
import { Footer } from '@/components/FooterDocs'
import { mdxComponents } from '../components/mdxComponents'
import { MDXProvider } from '@mdx-js/react'

export const ContentsContext = createContext() // 文档 > 内容

import { Heading } from '@/components/Heading'

// TODO: 右侧 内容布局


//========={ 本页内容 }==========
function TableOfContents({ tableOfContents, currentSection }) { // section && section.children && href="#元数据"
  let sidebarContext = useContext(SidebarContext)
  let isMainNav = Boolean(sidebarContext)

  function closeNav() {
    if (isMainNav) {
      sidebarContext.setNavIsOpen(false)
    }
  }

  function isActive(section) {
    if (section.slug === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  let pageHasSubsections = tableOfContents.some((section) => section.children.length > 0)



  // console.log(tableOfContents)
  return (
    <>
      <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
        本页内容
      </h5>
      {/* ===={ 遍历目录 }==== */}
      <ul className="text-slate-700 text-sm leading-6">
        {tableOfContents && tableOfContents.map((section) => (
          // let sectionIsActive = section.slug || section.children.findIndex(({ slug }) => slug === currentSection) > -1;
          <Fragment key={section.slug}>
            <li>
              <a href={`#${section.slug}`} /* href= #触发器执行 */
                onClick={closeNav}
                className={clsx('block py-1', pageHasSubsections ? 'font-medium' : '',
                  isActive(section) ? 'font-medium text-sky-500 dark:text-sky-400' : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                )}
              >
                {section.title}
              </a>
            </li>
            {section.children && section.children.map((subsection) => (
              <li className="ml-4" key={subsection.slug}>
                <a href={`#${subsection.slug}`}
                  onClick={closeNav}
                  className={clsx('group flex items-start py-1',
                    isActive(subsection) ? 'text-sky-500 dark:text-sky-400' : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                  )}
                >
                  <svg
                    width="3"
                    height="24"
                    viewBox="0 -9 3 24"
                    className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
                  >
                    <path
                      d="M0 0L3 3L0 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {subsection.title}
                </a>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
    </>
  )
}

// ========={ 处理右侧导航 }==========
function useTableOfContents(tableOfContents) { // ? 滚动时；哪个导航高亮
  let setInit = tableOfContents[0]?.slug
  let [currentSection, setCurrentSection] = useState(setInit) // 设置初始 slug

  let [headings, setHeadings] = useState([])

  const registerHeading = useCallback((id, top) => { // 这个值 是 Heading 组件中传递过来的
    // console.log('registerHeading', id, top)
    setHeadings((headings) => [...headings.filter((h) => id !== h.id), { id, top }])
  }, [])

  const unregisterHeading = useCallback((id) => {
    // console.log('unregisterHeading', id)
    setHeadings((headings) => headings.filter((h) => id !== h.id))
  }, [])
  // console.log(tableOfContents)
  
  // 软件包； http://localhost:3000/docs/developer/package
  useEffect(() => {
    if (tableOfContents.length === 0 || headings.length === 0) return;
    function onScroll() {
      let style = window.getComputedStyle(document.documentElement)
      let scrollMt = parseFloat(style.getPropertyValue('--scroll-mt').match(/[\d.]+/)?.[0] ?? 0)
      let fontSize = parseFloat(style.fontSize.match(/[\d.]+/)?.[0] ?? 16)
      scrollMt = scrollMt * fontSize

      let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)
      let top = window.pageYOffset + scrollMt + 1
      let current = sortedHeadings[0].id
      for (let i = 0; i < sortedHeadings.length; i++) {
        if (top >= sortedHeadings[i].top) {
          current = sortedHeadings[i].id
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, {capture: true, passive: true})
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll, {capture: true, passive: true}) }
  }, [headings, tableOfContents])

  return { currentSection, registerHeading, unregisterHeading }
}

// !可能未使用此组件哦
export function ContentsLayoutOuter({ children, layoutProps, ...props }) {
  const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(layoutProps.tableOfContents)

  return (
    <SidebarLayout
      sidebar={
        <div className="mb-8">
          <TableOfContents
            tableOfContents={layoutProps.tableOfContents}
            currentSection={currentSection}
          />
        </div>
      }
      {...props}
    >
      <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
        {children}
      </ContentsContext.Provider>
    </SidebarLayout>
  )
}



// TODO: ========={ 内容布局 }==========
export function ContentsLayout({ children, meta, classes, tableOfContents, section }) {
  const router = useRouter()
  const toc = [
    ...(classes ? [{ title: 'Quick reference', slug: 'class-reference', children: [] }] : []),
    ...tableOfContents,
  ];
  const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(toc);

  let { prev, next } = usePrevNext(); // todo 上下翻页


  // return null
  // console.log(toc)
  // console.log(classes)
  // console.log(children)
  // console.log(tableOfContents)
  return (
    <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">

      {/* ========={Header}========== */}
      <PageHeader
        title={meta.title}
        description={meta.description}
        repo={meta.repo || "repo"}
        badge={{ key: 'Tailwind CSS version', value: meta.featureVersion}}
        section={section}
      />

      {/* ========={MarkDown}========== */}
      <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
        {classes ? (
          <>
            <ClassTable {...classes} />
            <div id="content-wrapper" className="relative z-20 prose prose-slate mt-12 dark:prose-dark">
              <MDXProvider components={mdxComponents}>{children}</MDXProvider>
            </div>
          </>
        ) : (
          // TODO: MDXProvider中去渲染 Heading、a、alert组件
          <div id="content-wrapper" className="relative z-20 prose prose-slate mt-8 dark:prose-dark">
            <MDXProvider components={mdxComponents}>{children}</MDXProvider>
          </div>
        )}
      </ContentsContext.Provider>

      {/* ========={ Footer }========== */}
      <Footer previous={prev} next={next}>
        <Link href={`https://github.com/steedos/steedos.com/edit/master/src/pages${router.pathname}.mdx`}>
          <a className="hover:text-slate-900 dark:hover:text-slate-400">在GitHub上编辑此页面</a>
        </Link>
      </Footer>

      {/* ========={本页内容}========== */}
      <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 px-8 overflow-y-auto hidden xl:block">
        {toc.length > 0 && <TableOfContents tableOfContents={toc} currentSection={currentSection} />}
      </div>
    </div>
  )
}
