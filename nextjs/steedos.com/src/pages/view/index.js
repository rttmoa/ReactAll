import React from 'react'
import Head from 'next/head'
import { Trash } from '../../components/Trash'
import { Title } from '../../components/Title'
import { TipGood, TipBad, TipCompat,TipInfo } from '../../components/Tip'
import { PostItem } from '../../components/PostItem'
import { List, ListItemGood, ListItemBad } from '../../components/List'
import { Button } from '../../components/Button'
import { Community } from '../../components/Community'


import { Features } from '../../components/Features' // ? 数据建模，无代码
import { OpenSource } from '../../components/salient/OpenSource' // ? 开源开放，携手伙伴 总布局
import { CallToAction } from '../../components/salient/CallToAction' // ? 快速开始，免费试用
import { Faqs } from '../../components/salient/Faqs' // ? 常见问题 English
import { Hero } from '../../components/salient/Hero' // ? 主页；新一代 低代码 DevOps 平台
import { Pricing } from '../../components/salient/Pricing' // ? 版本与报价 && 社区版、专业版、企业版 卡片
import { PrimaryFeatures } from '../../components/salient/PrimaryFeatures' // ! 可视化，更高效的开发方式
import { SecondaryFeatures } from '../../components/salient/SecondaryFeatures' // !零代码融合高代码，快速且强大
import { Testimonials as Testimonials2} from '../../components/salient/Testimonials' // !Loved by businesses worldwide (深受全球企业喜爱)


// todo 此文件Url：  http://localhost:3000/view
function views() {
  return (
    <div className='bg-gray-200'>
      <Head><title>测试Index组件 - 赋能企业，打造数字驱动型组织</title></Head>

      <Testimonials2 />

    </div>
  )
}

export default views
