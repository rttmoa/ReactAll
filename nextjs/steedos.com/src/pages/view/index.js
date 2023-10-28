import React from 'react'
import Head from 'next/head'

import { Features } from '../../components/Features' // ? 数据建模，无代码
import { OpenSource } from '../../components/salient/OpenSource' // ? 开源开放，携手伙伴 总布局
import { CallToAction } from '../../components/salient/CallToAction' // ? 快速开始，免费试用
import { Faqs } from '../../components/salient/Faqs' // ? 常见问题 English
import { Hero } from '../../components/salient/Hero' // ? 主页；新一代 低代码 DevOps 平台
import { Pricing } from '../../components/salient/Pricing' // ? 版本与报价 && 社区版、专业版、企业版 卡片
import { PrimaryFeatures } from '../../components/salient/PrimaryFeatures' // ! 可视化，更高效的开发方式
import { SecondaryFeatures } from '../../components/salient/SecondaryFeatures' // !零代码融合高代码，快速且强大
import { Testimonials as Testimonials2} from '../../components/salient/Testimonials' // !Loved by businesses worldwide (深受全球企业喜爱)

import { Trash } from '../../components/Trash'
import { Title } from '../../components/Title'
import { TipGood, TipBad, TipCompat,TipInfo } from '../../components/Tip'
import { PostItem } from '../../components/PostItem'
import { List, ListItemGood, ListItemBad } from '../../components/List'
import { Button } from '../../components/Button'
import { Community } from '../../components/Community'
import { Cta } from '../../components/Cta'
import { ImageSwiper } from '../../components/ImageSwiper'


// todo 此文件Url：  http://localhost:3000/view
function views() {
  const ims = [
    {src: "https://user-images.githubusercontent.com/105489435/278785425-0d01f3d4-c146-4643-9d20-4b28015fa5d0.png"}, 
    {src: "https://user-images.githubusercontent.com/105489435/278785456-1ffb31dc-2347-4644-9973-d25ca4145b9c.png"},
    {src: "https://img0.baidu.com/it/u=666517787,2620707380&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641"},
    
  ]
  return (
    <div className='bg-gray-200'>
      <Head><title>测试Index组件 - 赋能企业，打造数字驱动型组织</title></Head>

      {/* 使用 快速开始 页面，查看头部 底部布局， 头部底部在 _app.js 页面中 */}
      {/* <CallToAction /> */}


      {/* <Cta description="ssss" href="hhh" label="sbkjb"  /> */}

      <ImageSwiper images={ims} />

    </div>
  )
}

export default views
