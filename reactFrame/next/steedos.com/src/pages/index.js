
import { SearchButton } from '@/components/Search'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/Logo'
import { NavItems, NavPopover } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Markdown } from '@/components/Markdown'
import NextLink from 'next/link'
import Head from 'next/head'
import {getSite, getSiteByDomain, getSiteDomains} from '@/lib/site'
import { getCollectionProducts, getCollections } from '@/lib/product';
import ReviewStars from '@/components/product/ReviewStars'
import Price from '@/components/product/Price'
import { getDefaultPrice } from '@/lib/product.client';
import clsx from 'clsx'
import styles from './index.module.css'


import { Features } from '@/components/Features'
import { OpenSource } from '../components/salient/OpenSource'
import { CallToAction } from '../components/salient/CallToAction'
import { Faqs } from '../components/salient/Faqs'
import { Hero } from '../components/salient/Hero'
import { Pricing } from '../components/salient/Pricing'
import { PrimaryFeatures } from '../components/salient/PrimaryFeatures'
import { SecondaryFeatures } from '../components/salient/SecondaryFeatures'
import { Testimonials as Testimonials2} from '../components/salient/Testimonials'





export async function getStaticProps({params}) {
  const slug = 'steedos-packages'
  const collection = await getCollectionProducts('steedos-packages')
  console.log(collection)
  return {
    props: {
      collection,
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}


export default function Home(props) {
  const { name, collection } = props; 


  return (
    <>
      {/* ========={document.title}========== */}
      <Head>
        <title>华炎魔方低代码平台 - 赋能企业，打造数字驱动型组织</title>
      </Head>

      <h2><b>首页 indexjs</b></h2>

      {/* ========={首页}========== */}
      <Hero />

      {/* ========={可视化，更高效的开发方式}========== */}
      <PrimaryFeatures />

      {/* ========={零代码融合高代码，快速且强大}========== */}
      <SecondaryFeatures />

      {/* ========={数据建模、查询设计器、元数据同步....}========== */}
      <Features />
    
      {/* ========={Loved by businesses worldwide.}========== */}
      <Testimonials2 />
      
      {/* ========={Frequently asked questions}========== */}
      <Faqs />
      
      {/* ========={快速开始}========== */}
      <CallToAction />

      {/* ========={开源开放，携手伙伴，打造海量解决方案}========== */}
      <OpenSource  collection={collection} />
      
      {/* ========={版本与报价}========== */}
      <Pricing />

      {/* <Footer /> */}
    </>
  )
}
