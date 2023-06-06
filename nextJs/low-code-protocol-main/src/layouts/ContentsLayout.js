import { useState, useEffect, createContext, Fragment, useCallback, useContext } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { usePrevNext } from '@/hooks/usePrevNext'

import { SidebarLayout, SidebarContext } from '@/layouts/SidebarLayout'

import { ClassTable } from '@/components/ClassTable'
import { PageHeader } from '@/components/PageHeader'
import { Footer } from '@/components/Footer'
import { Heading } from '@/components/Heading'

export const ContentsContext = createContext();






/**--- 渲染右侧 内容 -> 本页内容 数据  (树结构) ---**/
function TableOfContents({ tableOfContents, currentSection }) {
  let sidebarContext = useContext(SidebarContext);
  // let isMainNav = Boolean(sidebarContext)
  let isMainNav = !!sidebarContext
  // console.log(sidebarContext)
  // console.log(isMainNav)

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

  return (
    <>
      <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
        本页内容
      </h5>
      <ul className="text-slate-700 text-sm leading-6">
        {tableOfContents.map((section) => (
          <Fragment key={section.slug}>
            <li>
              <a
                href={`#${section.slug}`}
                onClick={closeNav}
                className={clsx(
                  'block py-1',
                  pageHasSubsections ? 'font-medium' : '',
                  isActive(section) ? 'font-medium text-sky-500 dark:text-sky-400'
                    : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                )}
              >
                {section.title}
              </a>
            </li>
            {section.children.map((subsection) => (
              <li className="ml-4" key={subsection.slug}>
                <a
                  href={`#${subsection.slug}`}
                  onClick={closeNav}
                  className={clsx(
                    'group flex items-start py-1',
                    isActive(subsection)
                      ? 'text-sky-500 dark:text-sky-400'
                      : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
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

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.slug)
  let [headings, setHeadings] = useState([])

  const registerHeading = useCallback((id, top) => {
    setHeadings((headings) => [...headings.filter((h) => id !== h.id), { id, top }])
  }, [])

  const unregisterHeading = useCallback((id) => {
    setHeadings((headings) => headings.filter((h) => id !== h.id))
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0 || headings.length === 0) return
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
    window.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll, {
        capture: true,
        passive: true,
      })
    }
  }, [headings, tableOfContents])

  return { currentSection, registerHeading, unregisterHeading }
}




export function ContentsLayoutOuter({ children, layoutProps, ...props }) {
  const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(layoutProps.tableOfContents);
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







/**--- TODO: 总 - 内容部分 ---**/
// FIXME: 重点
export function ContentsLayout({ children, meta, classes, tableOfContents, section }) {
  const router = useRouter();
  const toc = [
    ...(classes ? [{ title: 'Quick reference', slug: 'class-reference', children: [] }] : []),
    ...tableOfContents,
  ];

  const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(toc);
  let { prev, next } = usePrevNext()  // --- 翻页：上一页/下一页 ---
  // console.log(router)
  // console.log(toc)     // 本页内容的树结构
  // console.log(currentSection) // 当前滚动到的children[]中的内容
  // debugger

  // TODO: 渲染右侧内容：md && 本页内容 && Footer
  return (
    <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">

      {/* TODO: 内容 -> 头部 -> 一级标题 & 二级标题 & 描述 */}
      <PageHeader
        title={meta.title}
        description={meta.description}
        repo={meta.repo}
        badge={{ key: 'Tailwind CSS version', value: meta.featureVersion }}
        section={section}
      />

      {/* TODO: 内容 -> 内容 xdm 文档 */}
      <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
        {classes ? (
          <>
            <ClassTable {...classes} />
            <div id="content-wrapper" className="relative z-20 prose prose-slate mt-12 dark:prose-dark">
              <MDXProvider components={{ Heading }}>{children}</MDXProvider>
            </div>
          </>
        ) : (
          <div id="content-wrapper" className="relative z-20 prose prose-slate mt-8 dark:prose-dark">
            <MDXProvider components={{ Heading }}>{children}</MDXProvider>
          </div>
        )}
      </ContentsContext.Provider>

      {/* TODO: 内容 -> Footer  */}
      <Footer previous={prev} next={next}>
        <Link href={`https://github.com/steedos/low-code-protocol/edit/main/src/pages${router.pathname}.mdx`}>
          <a className="hover:text-slate-900 dark:hover:text-slate-400">Edit this page on GitHub</a>
        </Link>
      </Footer>

      {/* TODO: 内容 -> 右侧三级导航 -> 本页内容 */}
      <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 px-8 overflow-y-auto hidden xl:block">
        {toc.length > 0 && (
          <TableOfContents tableOfContents={toc} currentSection={currentSection} />
        )}
      </div>

    </div>
  )
}
