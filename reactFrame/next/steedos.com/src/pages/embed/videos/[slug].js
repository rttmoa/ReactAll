// import {  useRef,  useState,  useEffect,  createContext,  Fragment,  useCallback,  isValidElement,  useContext  } from 'react'
// import dynamic from 'next/dynamic'
// import { SidebarLayout } from '@/layouts/SidebarLayout'
// import tinytime from 'tinytime'
// import clsx from 'clsx'
// import Image from 'next/image'
// import { PageHeader } from '@/components/PageHeader'
// import { MDXRemote } from 'next-mdx-remote'
// import { Markdown } from '@/components/Markdown'
// import Link from 'next/link'
// const {serialize} = require('next-mdx-remote/serialize')

// import { useRouter } from 'next/router'
// import { NextSeo } from 'next-seo'
// import { getVideo, getVideos } from '@/lib/video'
// import { Player } from '@/components/player'
// import { Heading } from '@/components/Heading'

// const components = { Heading }

// export async function getStaticProps({ params, res, locale, locales, preview }) {
//   const { slug } = params
//   const video = await getVideo(slug)
//   if (!video) return { notFound: true }
//   return {
//     props: {
//       title: video.name,
//       ...video,
//     },
//     revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
//   }
// }

// export async function getStaticPaths() {
//   const items = await getVideos()
  
//   const paths = items.map((item) => ({
//     params: {
//       slug: item.slug,
//     },
//   }))  
//   return { paths, fallback: 'blocking' }
// }




// // todo 此文件被重写  /pages/videos/index.tsx
// export default function VideoEmbed(props) {
//   console.log("VideoEmbed")
//   const router = useRouter()
//   const {
//     title = 'Missing title',_id,body,download_url, duration, hls_url, is_free, name,owner,site,slug,thumb_image,
//   } = props;

//   let seo_title_calc = title;
//   const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
//   const imageUrl = thumb_image ? process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL + `/api/files/images/${thumb_image}` : null
//   return (
//     <>
//       <NextSeo
//         title={seo_title_calc}
//         openGraph={{
//           title: seo_title_calc,
//           url,
//           images: [{url: imageUrl,alt: title},],
//         }}
//       />
//       <div className="react-player-wrapper" style={{ position: 'relative', paddingTop: '56.25%' }}>
//         <Player
//           className="react-player"
//           hls_url={hls_url}
//           light={`${process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL}/api/files/images/${thumb_image}`}
//           height="100%"
//           width="100%"
//           style={{ position: 'absolute', top: 0, left: 0 }}
//           // subtitlesUrl={subtitles_url}
//         />
//       </div>
//     </>
//   )
// }

// VideoEmbed.layoutProps = {}
