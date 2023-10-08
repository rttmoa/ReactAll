import Link from 'next/link'
import get from 'lodash/get'
import Image from 'next/image'
import useSWR from 'swr'
import removeMarkdown from 'remove-markdown'
import { getVideo, getVideos } from '@/lib/video'

import React, { FunctionComponent } from 'react'
import { useWindowSize } from 'react-use'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { Markdown } from '@/components/Markdown'
import { Player } from '@/components/player'
  
import { VideoData } from '.'

  
  
// export async function getStaticProps({ params, res, locale, locales, preview }) {
//   const { slug } = params;
//   console.log('slug', slug);
//   const video = await getVideo(slug)
//   if (!video) return { notFound: true };
//   return {
//     props: { title: video.name, ...video, },
//     revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
//   }
// }

// export async function getStaticPaths() {
//   const items = await getVideos()
//   const paths = items.map((item) => ({ // 根据帖子获取我们想要预渲染的路径
//     params: { slug: item.slug },
//   })) 
//   let paths = [{params: {slug: 'lesson-object-relationship'}}, {params: {slug: 'lesson-object'}},{params: {slug: 'workflow_rules'}},]
//   return { paths, fallback: 'blocking' }
// }



// TODO:  <Markdown />  <Player />  仅渲染
const OFFSET_Y = 80
const VIDEO_MIN_HEIGHT = 480
const Video: FunctionComponent<any> = (props) => {  
  // const {
  //   title = 'Missing title', _id, body, download_url, duration, hls_url, is_free, name, owner, site, slug, subtitles_url, owner__expand, thumb_image,
  // } = props;

  const playerRef = React.useRef(null)
  const { height } = useWindowSize()
  const [videoMaxWidth, setVideoMaxWidth] = React.useState(0)

  React.useEffect(() => {
    setVideoMaxWidth(Math.round((height - OFFSET_Y) * 1.6))
  }, [height])

  const router = useRouter()
  // console.log(router); // 拿到router对象


  const { title, body, hls_url, name, owner__expand, thumb_image } = VideoData[4];


  let seo_title_calc = title;
  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath;
  const imageUrl = thumb_image ? process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL + `/api/files/images/${thumb_image}` : null;
  // console.log(url); // https://www.steedos.cn/videos/workflow_rules
  // console.log(imageUrl); // https://console.steedos.cn/api/files/images/DaDC5LTuqoa4Nqv8j
  
  
  return (
    <>
      <NextSeo 
        title={seo_title_calc}
        openGraph={{ 
          title: seo_title_calc,
          url,
          images: [{
            url: imageUrl,
            alt: title,
          }],
        }}
      />
      <Head>
        <script src="//cdn.bitmovin.com/player/web/8/bitmovinplayer.js" />
      </Head>
      <div>
        <div className="bg-black -mt-3">
          <div className="w-full mx-auto" 
            style={{ maxWidth: height > VIDEO_MIN_HEIGHT + OFFSET_Y ? videoMaxWidth : VIDEO_MIN_HEIGHT * 1.6 }}
          >
            <div className="w-full relative overflow-hidden bg-black text-white" style={{ paddingTop: '56.25%' }}>
              <div className="absolute w-full h-full top-0 left-0">
                <Player
                  ref={playerRef}
                  hls_url={hls_url}
                  light={`${process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL}/api/files/images/${thumb_image}`}
                  width="100%"
                  height="100%"
                  // config= {{ attributes: { width: 'auto', height: 'auto' } }} 
                />
              </div>
            </div>
          </div>
        </div>
        <main className="mx-auto max-w-7xl lg:mt-14 md:mt-8 mt-3 mb-16 px-4 sm:px-6 lg:px-8 ">
          <article>
            {/* header: 标题 + 作者 */}
            <header>
              <h1 className="text-black max-w-7xl lg:text-4xl md:text-4xl sm:text-3xl text-2xl w-full font-bold mb-8 lg:mb-10">
                {name}
              </h1>
              <div className="mt-2 flex items-center">
                    <a
                      className="text-base dark:text-gray-400 text-gray-800 hover:text-blue-600 transition-colors ease-in-out duration-300 flex items-center"
                    >
                      <span className="ml-1">{owner__expand.name}</span>
                    </a>
                </div>
            </header>

            <Markdown body={body}></Markdown>
          </article>
        </main>
      </div>
    </>
  )
}

export default Video
