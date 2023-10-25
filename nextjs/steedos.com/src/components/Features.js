
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'

import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect'



let testimonials = [
  // Column 1
  [
    {
      content: '使用可视化界面，进行数据建模，创建对象、字段、关系，快速构建业务系统原型.',
      url: '/docs/admin/object',
      author: {
        name: '数据建模',
        role: '无代码',
        avatar: '/img/icons/home/constraint-based.png',
      },
    },
    {
      content:
        '华炎魔方提供灵活的多维度数据权限架构。使用权限集、权限集组和简档，控制用户可以访问的对象和字段。使用组织范围的共享设置、用户角色和共享规则，以指定用户可以查看并编辑的单个记录。',
      url: '/docs/admin/permission_set',
      author: {
        name: '权限控制',
        role: '无代码',
        avatar: '/img/icons/home/constraint-based.png',
      },
    },
    {
      content:
        '定义业务数据的查询与展现形式，您可以自定义需要显示的字段，从不同的维度定义视图展示不一样的数据，设定筛选条件和排序规则等参数。',
      url: '/docs/admin/listview',
      author: {
        name: '列表视图',
        role: '无代码',
        avatar: '/img/icons/home/constraint-based.png',
      },
    },
    {
      content:
        '页面布局用于控制按钮、字段和相关子表的布局和组织方式。它们也帮助确定哪些字段可见、只读和必填。使用页面布局，为您的用户自定义记录页面的内容。        ',
      url: '/docs/admin/page-layout',
      author: {
        name: '页面布局',
        role: '无代码',
        avatar: '/img/icons/home/constraint-based.png',
      },
    },
    {
      content: '通过配置数据源，可以轻松的连接到第三方业务系统，实现与外部数据的打通.',
      url: '/docs/admin/datasource',
      author: {
        name: '外部数据源',
        role: '无代码',
        avatar: '/img/icons/home/constraint-based.png',
      },
    },
    {
      content:
        '华炎魔方内置功能强大的报表统计与分析功能，可以快速创建分组报表、数据透视图。        ',
      url: '/docs/admin/record_report',
      author: {
        name: '分析报表',
        role: '无代码',
        avatar: '/img/icons/home/constraint-based.png',
      },
    },
    {
      content:
        '基于华炎魔方 Stimulsoft 报表插件，可以使用可视化工具设计像素级报表，例如报价单、发货单等业务单据，或是二维码、条形码。',
      url: '/docs/admin/stimulsoft',
      author: {
        name: '像素级报表',
        role: '无代码',
        avatar: '/img/icons/home/constraint-based.png',
      },
    },
    {
      content:
        '使用华炎魔方仪表盘，可以连接任意数据库，在界面上编写查询语句，然后再配置页面和图表，就可以轻松实现各种类型的仪表盘',
      url: '/docs/admin/dashboard',
      author: {
        name: '仪表盘',
        role: '无代码',
        avatar: '/img/icons/home/constraint-based.png',
      },
    },
  ],
  [
    {
      content:
        '可视化查询设计工具，连接外部数据源，编写SQL语句即可预览和生成查询API，进一步搭配报表工具和amis工具实现数据分析功能。',
      url: '/docs/admin/query',
      author: {
        name: '查询设计器',
        role: '低代码',
        avatar: '/img/icons/home/build-anything.png',
      },
    },
    {
      content: '公式引擎可以帮助非程序员快速实现一些简单的业务逻辑，类似Excel公式，它是从其他字段、表达式或值派生其值的一种算法，可以帮助您根据其他字段自动计算一个字段的值。      ',
      url: '/docs/admin/formula',
      author: {
        name: '公式',
        role: '低代码',
        avatar: '/img/icons/home/build-anything.png',
      },
    },
    {
      content: '工作流规则可让您自动化标准内部过程和进程，以在贵组织范围内节省时间。工作流规则是一组工作流指示的主要容器。这些指示始终可以用“如果/则”语句概括。',
      url: '/docs/admin/workflow-rules',
      author: {
        name: '工作流规则',
        role: '低代码',
        avatar: '/img/icons/home/build-anything.png',
      },
    },
    {
      content: '相比工作流规则，批准过程在自动化处理方面更进一步，让您可以指定批准该类记录所必需经历的审批步骤序列。还可以指定在各个时间点、各个审批步骤的自动处理操作。',
      url: '/docs/admin/approval-process',
      author: {
        name: '批准过程',
        role: '低代码',
        avatar: '/img/icons/home/build-anything.png',
      },
    },
    {
      content: '审批王是图形化的流程设计工具，并与您的业务对象实现数据互通。例如您可以从合同台帐中直接发起一个审批流程，然后在审批王中处理审批相关业务，最终审批结果更新回合同台帐。',
      url: '/docs/admin/workflow-admin',
      author: {
        name: '审批王',
        role: '低代码',
        avatar: '/img/icons/home/build-anything.png',
      },
    },
    {
      content: '自动操作是可重复使用的组件，可在后台执行某种操作，如更新字段或发送电子邮件。创建自动操作后，将其添加到批准过程、工作流规则中。      ',
      url: '/docs/admin/automated-action',
      author: {
        name: '自动化操作',
        role: '低代码',
        avatar: '/img/icons/home/build-anything.png',
      },
    },
    {
      content: '华炎魔方与 IBM Node-Red 低代码应用集成引擎整合，可以通过可视化开发方式，连接SAP、用友、金蝶等主流业务系统及各种数据库。',
      url: '/docs/developer/node-red',
      author: {
        name: 'node-red',
        role: '低代码',
        avatar: '/img/icons/home/build-anything.png',
      },
    },
  ],
  [
    {
      content: '通过 VS Code 插件，可以将可视化开发的元数据同步为项目源码，实现元数据的版本管理，并进一步利用传统开发中的DevOps工具实现团队开发和自动化。',
      url: '/docs/developer/sync-metadata',
      author: {
        name: '元数据同步',
        role: 'DevOps',
        avatar: '/img/icons/home/editor-tools.png',
      },
    },
    {
      content: '通过编写触发器，可以在记录增删改前和增删改查之后自动触发一段服务端代码，实现个性化的数据校验和处理。',
      url: '/docs/developer/trigger',
      author: {
        name: '触发器',
        role: '高代码',
        avatar: '/img/icons/home/editor-tools.png',
      },
    },
    {
      content: '与触发器类似，在流程流转到特定节点时自动触发一段代码逻辑。',
      url: '/docs/developer/flow-trigger',
      author: {
        name: '流程触发器',
        role: '高代码',
        avatar: '/img/icons/home/editor-tools.png',
      },
    },
    {
      content:
        '基于华炎魔方创建的自定义对象，会自动生成 GraphQL API 接口，接口自带身份验证和权限控制，确保业务数据的安全。',
      url: '/docs/developer/graphql-api',
      author: {
        name: 'GraphQL API',
        role: '高代码',
        avatar: '/img/icons/home/editor-tools.png',
      },
    },
    {
      content:
        '如果华炎魔方自动生成的标准API不能满足业务需求，可以编写自定义API，在服务端处理业务数据。',
      url: '/docs/developer/router',
      author: {
        name: '自定义API',
        role: '高代码',
        avatar: '/img/icons/home/editor-tools.png',
      },
    },
    {
      content:
        'ObjectQL 是面向对象的跨数据库查询语法。基于ObjectQL语法编写的函数兼容不同类型的数据库。        ',
      url: '/docs/developer/objectql',
      author: {
        name: 'ObjectQL',
        role: '高代码',
        avatar: '/img/icons/home/editor-tools.png',
      },
    },
    {
      content:
        '可以在对象的列表页和记录详情页配置自定义按钮，并通过编写 Javascript 脚本的方式，处理个性化的业务需求。',
      url: '/docs/developer/button',
      author: {
        name: '自定义按钮',
        role: '高代码',
        avatar: '/img/icons/home/editor-tools.png',
      },
    },
    {
      content:
        '通过定义软件包，可以将复杂的项目需求拆分成多个子模块分别由不同的团队开发。软件包可以发布到npm仓库，在不同项目、不同客户中复用，也可以上架到华炎魔方应用市场。',
      url: '/docs/developer/package',
      author: {
        name: '软件包',
        role: '高代码',
        avatar: '/img/icons/home/editor-tools.png',
      },
    },
  ],
]


function Testimonial({ author, content, url, expanded }) {
  // {
  //   content: '使用可视化界面，进行数据建模，创建对象、字段、关系，快速构建业务系统原型.',
  //   url: '/docs/admin/object',
  //   author: {
  //     name: '数据建模',
  //     role: '无代码',
  //     avatar: '/img/icons/home/constraint-based.png',
  //   },
  // },
  let [focusable, setFocusable] = useState(true)
  let ref = useRef()

  useEffect(() => {
    if (ref.current.offsetTop !== 0) {
      setFocusable(false)
    }
  }, [])

  return (
    <li ref={ref} className="text-sm leading-6">
      <figure className="relative flex flex-col-reverse p-6 rounded-lg bg-slate-50     dark:bg-slate-800 dark:highlight-white/5">

        <blockquote className="mt-6 text-slate-700    dark:text-slate-300">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </blockquote>

        {/* 头像、数据建模、无代码 */}
        <figcaption className="flex items-center space-x-4">
          <img
            src={author.avatar}
            alt=""
            className="flex-none w-14 h-14 rounded-full object-cover"
            loading="lazy"
          />
          <div className="flex-auto">
            <div className="text-base text-slate-900 font-semibold   dark:text-slate-300">
              {url ? (
                <a href={url} tabIndex={focusable || expanded ? 0 : -1}>
                  <span className="absolute inset-0" />
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </div>
            <div className="mt-0.5">{author.role}</div>
          </div>
        </figcaption>
      </figure>
    </li>
  )
}

// TODO: 主页的 Features
export function Features() {

  let ref = useRef() // !整个DOM盒子
  let [expanded, setExpanded] = useState(false) // !是否展开 && {expanded ? '好的，朕知道了 👍' : '查看更多...'}
  let [showCollapseButton, setShowCollapseButton] = useState(false) // !是否显示折叠按钮
  let [transition, setTransition] = useState(false) // !expanded的状态
  let { ref: inViewRef, inView } = useInView({ threshold: 0 }) // !判断是否在可视范围内
  let initial = useRef(true) // !初始状态

  useIsomorphicLayoutEffect(() => {
    if (initial.current) {
      initial.current = false
      return
    }
    if (expanded) {
      ref.current.focus({ preventScroll: expanded })
    } else {
      ref.current.focus()
      ref.current.scrollIntoView()
      // console.log(ref.current.getBoundingClientRect()) // 测量DOM尺寸
    }
    if (expanded) {
      setShowCollapseButton(false)
    }
  }, [expanded])

  useEffect(() => {
    setTimeout(() => setTransition(expanded), 0)
  }, [expanded])

  useEffect(() => {
    if (!expanded || !inView) return
    function onScroll() {
      let bodyRect = document.body.getBoundingClientRect()
      // console.log(bodyRect)
      let domRect = ref.current.getBoundingClientRect()
      // ? getBoundingClientRect() 和 ref 和 document的距离算法
      // console.log(parseInt(domRect.top), parseInt(domRect.height / 4), parseInt(bodyRect.top), parseInt(window.innerHeight / 2))
      // domRect.top; section盒子距离顶部的距离 68，向下滚动成负值 -1500
      // domRect.height; section盒子的总高度 1775
      // bodyRect.top; 整个页面距离顶部的距离 0，向下滚动成负值 -1568
      // window.innerHeight; 页面的可视高度；头+内容+脚 1011
      let middle = domRect.top + domRect.height / 4 - bodyRect.top - window.innerHeight / 2
      let isHalfWay = window.scrollY > middle;
      // console.log(parseInt(middle), parseInt(window.scrollY))
      // middle; 7
      // window.scrollY; 从0到1569，如果 >7 显示按钮，  如果 <7 隐藏按钮
      // !当展开列表时，滚动到最底部后，再向上滚动到顶部，可看到按钮被隐藏掉
      if (showCollapseButton && !isHalfWay) {
        setShowCollapseButton(false)
      } else if (!showCollapseButton && isHalfWay) {
        setShowCollapseButton(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [expanded, showCollapseButton, inView])


  // console.log(inView)
  // console.log(transition)
  return (
    // TODO  数据建模， 无代码 
    // TODO 先看DIV布局结构、再看封装的组件结构、再看Hooks函数及下面的函数逻辑、再看函数控制Class
    <section ref={ref} tabIndex="-1" className="relative max-w-7xl mx-auto focus:outline-none   px-4 sm:px-3 md:px-5">  
      <h2 className="sr-only">Testimonials</h2>
      <div ref={inViewRef} className={clsx(
          // ? 网格布局；默认一行显示一个，最小宽度640px时，显示两个， 最小宽度1280时，显示三个
          'grid gap-6 lg:gap-8   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          // ? 最大高度；超过最大高度部分隐藏掉
          !expanded && 'max-h-[33rem] overflow-hidden'
        )}
      >
        {testimonials.map((column, i) => (
          // ul标签；纵向间隔 margin-top、margin-bottom
          <ul key={i} className={clsx('space-y-8', i === 1 && 'hidden sm:block', i === 2 && 'hidden lg:block')}>
            {column.map((testimonial) => (
              <Testimonial key={testimonial.author.name} expanded={expanded} {...testimonial} />
            ))}
          </ul>
        ))}
      </div>

      <div className={clsx(
          'inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 pointer-events-none dark:from-slate-900',
          expanded ? 'sticky -mt-52' : 'absolute',
          transition && 'transition-opacity duration-300',
          expanded && (showCollapseButton ? 'opacity-100' : 'opacity-0')
        )}
      >
        <button type="button" className={clsx(
            'relative bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-700 dark:hover:bg-slate-600       text-sm font-semibold text-white h-12 px-6 rounded-lg flex items-center ',
            transition && 'transition-transform',
            expanded && !showCollapseButton && 'translate-y-4',
            (!expanded || showCollapseButton) && 'pointer-events-auto'
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '好的，朕知道了 👍' : '查看更多...'}
        </button>
      </div>
    </section>
  )
}
