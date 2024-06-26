import clsx from 'clsx'

import { Button } from '@/components/salient/Button'
import { Container } from './Container'




function SwirlyDoodle({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 281 40"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
      />
    </svg>
  )
}


// ul li 前面的  √
function CheckIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      className={clsx('h-6 w-6 flex-none fill-current stroke-current', className)}
    >
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


// ? 社区版、专业版、企业版 卡片
function  Plan({ name, price, description, href, hrefTitle, features, featured = false }) {
  return (
    // !order-last: flex-direction: column; 纵向排序显示的位置
    <section className={clsx('flex flex-col rounded-3xl px-6 sm:px-8', featured ? 'order-first bg-blue-600 py-8 lg:order-none' : 'lg:py-8')}>
      <h3 className="mt-5 font-display text-lg text-white">{name}</h3>
      <p className={clsx('mt-2 text-base', featured ? 'text-white' : 'text-slate-400')}>
        {description}
      </p>
      <p className="order-first font-display text-5xl font-light tracking-tight text-white">
        {price}
      </p>
      <ul role="list" className={clsx('order-last mt-10 flex flex-col gap-y-3 text-sm', featured ? 'text-white' : 'text-slate-200')}>
        {features.map((feature) => (
          <li key={feature} className="flex">
            <CheckIcon className={featured ? 'text-white' : 'text-slate-400'} />
            <span className="ml-4">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href={href}
        variant={featured ? 'solid' : 'outline'}
        color="white"
        className="mt-8"
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        {hrefTitle}
      </Button>
    </section>
  )
}

// TODO: 版本与报价
export function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing" className="bg-slate-900 py-20 sm:py-32">
      <Container>
        <div className="md:text-center">
          <h2 className="font-display text-3xl text-white sm:text-4xl tracking-tight">
            <span className="relative whitespace-nowrap">
              {/* 背景图画 （Svg） */}
              <SwirlyDoodle className="absolute top-1/2 left-0 h-[1em] w-full fill-blue-400" />
              <span className="relative">版本与报价</span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            华炎魔方社区版完全免费，不限制用户数、不限制时间。
          </p>
        </div>
        {/* 专业版、社区版、企业版；网格布局；当 width < 1024 时，显示一个 Plan */}
        <div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
          <Plan
            name="完全免费"
            price="社区版"
            href="/docs"
            hrefTitle="快速开始"
            features={[
              '可视化搭建业务应用',
              '自动化业务流程	',
              '管理数据访问权限	',
              '开放标准API接口',
              '支持外部数据源集成',
              '支持数据导入导出',
              '支持移动端同步使用',
              '自定义业务数据大屏',
              '公有云/私有化本地部署',
            ]}
          />
          <Plan
            description="描述...."
            // 蓝色卡片
            featured
            name="¥9,800/不限用户/年"
            price="专业版"
            hrefTitle="申请试用"
            href="/company/contact-us"
            features={[
              '自定义品牌和Logo',
              '业务数据编辑日志',
              '业务审批流程管理',
              '钉钉集成',
              '企业微信集成',
              '附件在线预览',
            ]}
          />
          <Plan
            name="请联系我们获取报价"
            price="企业版"
            href="/company/contact-us"
            hrefTitle="预约演示"
            features={[
              '业务对象字段级加密',
              '集团级组织角色管理',
              'ToolJet 微应用',
              'n8n 业务流程编排',
              '平台拓展插件',
              '解决方案模版库',
              'Steedos ID统一身份认证',
            ]}
          />
        </div>
      </Container>
    </section>
  )
}
