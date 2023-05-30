import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getVideos,  } from '@/lib/video';
import { Markdown } from '@/components/Markdown'

const FakeData = [
    {
      "title": "如何为自定义对象创建子表？",
      "_id": "61500e649e41640031da3670",
      "body": "为子表创建一个自定义对象；创建关联字段，将子表绑定到主表。",
      "download_url": "https://vod.steedos.cn/video/56dbfae5-17729395672-0000-0000-009-c59e0.mp4",
      "duration": "3.51",
      "hls_url": "https://vod.steedos.cn/video/56dbfae5-17729395672-0000-0000-009-c59e0.mp4",
      "is_free": true,
      "name": "如何为自定义对象创建子表？",
      "owner": "6138086132d70a00318ed8aa",
      "published_at": "2022-01-24T11:23:19.928Z",
      "site": "61461596b48a570030ca63d2",
      "summary": "为子表创建一个自定义对象；创建关联字段，将子表绑定到主表。",
      "slug": "lesson-object-relationship",
      "subtitles_url": null,
      "thumb_image": "PHvrrL4aJZzbLrhyg",
      "owner__expand": {
          "name": "庄建国"
      }
  },{
      "title": "如何创建自定义应用程序",
      "_id": "61500a3b9e41640031da366c",
      "body": "本视频介绍了如何使用华炎魔方创建自定义对象、配置字段、配置列表视图，并创建自定义应用程序引用此对象。",
      "download_url": "https://vod.steedos.cn/video/593e2774-1772933e406-0000-0000-009-c59e0.mp4",
      "duration": "7.17",
      "hls_url": "https://vod.steedos.cn/video/593e2774-1772933e406-0000-0000-009-c59e0.mp4",
      "is_free": true,
      "name": "如何创建自定义应用程序",
      "owner": "6138086132d70a00318ed8aa",
      "published_at": "2022-01-24T11:21:31.869Z",
      "site": "61461596b48a570030ca63d2",
      "summary": "本视频介绍了如何使用华炎魔方创建自定义对象、配置字段、配置列表视图，并创建自定义应用程序引用此对象。",
      "slug": "lesson-object",
      "subtitles_url": null,
      "thumb_image": "rw5Sqv4pcFsP8gTZB",
      "owner__expand": {
          "name": "庄建国"
      }
  },{
      "title": "如何创建工作流规则？",
      "_id": "615281729e41640031da37d5",
      "body": "工作流可让您自动化标准内部过程和进程，以在贵组织范围内节省时间。",
      "download_url": null,
      "duration": null,
      "hls_url": "https://vod.steedos.cn/video/33431afb-177dbee8bba-0000-0000-009-c59e0.mp4",
      "is_free": null,
      "name": "如何创建工作流规则？",
      "owner": "614a9d62b48a570030ca64a8",
      "published_at": "2022-01-24T11:25:58.450Z",
      "site": null,
      "summary": "工作流可让您自动化标准内部过程和进程，以在贵组织范围内节省时间。",
      "slug": "workflow_rules",
      "subtitles_url": null,
      "thumb_image": "S9swHiqG9xS4PQwam",
      "owner__expand": {
          "name": "苏进荣"
      }
  }, {
      "title": "低代码训练营第三课：流程自动化",
      "_id": "6397005c6f5764003e512f16",
      "body": "通过本节课的学习，你将学习到：\n\n* 通过配置批准过程，实现项目立项审批；\n* 通过配置字段更新，实现项目立项审批完成后，更新状态字段； \n* 通过配置工作流通知，实现项目状态变更后通知项目小组成员； \n* 通过配置工作流规则，实现项目任务到期前定时提醒功能； \n* 通过配置出站消息，实现项目收付款数据推送给财务系统； \n* 通过配置对象验证规则，实现项目合同金额跨对象数据校验。\n\n\\\n",
      "download_url": "https://vod.steedos.cn/video/4bf777eb-1860fe0b688-0000-0000-009-c59e0.mp4",
      "duration": "17:07",
      "hls_url": "https://vod.steedos.cn/video/4bf777eb-1860fe0b688-0000-0000-009-c59e0.mp4",
      "is_free": true,
      "name": "低代码训练营第三课：流程自动化",
      "owner": "6136d5d032d70a00318ed822",
      "published_at": "2022-12-12T05:45:40.002Z",
      "site": "61461596b48a570030ca63d2",
      "summary": "低代码训练营系列课程之第三课：字段更新、工作流通知、出站消息等业务流程自动化配置说明。",
      "slug": "course-process",
      "subtitles_url": null,
      "thumb_image": "639add796f5764003e5132b7",
      "owner__expand": {
          "name": "李征"
      }
  }

];



export async function getStaticProps( {params} ) {
  // const videos = await getVideos(); // null - 服务端fetchGraphql失败 无权限

  // 先模拟steedos.cn中返回的数据
  const videos = FakeData;
  return {
    props: { videos },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

const SiteVideos: React.FC = (props: any) => {
  const { videos } = props;
  const name = '视频中心';

  return (
    <div className="mx-auto max-w-3xl lg:max-w-7xl lg:pt-16 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="mt-1 text-3xl font-extrabold sm:text-4xl sm:tracking-tight lg:text-5xl text-black dark:text-white">
          {name}
        </h2>
        <p className="prose max-w-xl mt-5 mx-auto text-xl text-gray-500">
          欢迎使用华炎魔方低代码平台，您可以免费访问这里的视频。
        </p>
        <br />
        <h2><b>模拟的假数据(接口返回的结果 操)</b></h2>
      </div>
      <div className="mx-auto w-full lg:py-16 py-6 px-1">
        <div className="py-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {videos && videos.map((video: any) => {
              return (
                <div key={`${video.slug}`} className="flex flex-col border border-solid  rounded-lg border-slate-100">
                  {video.thumb_image ? (
                    <div className="md:mb-2 mb-2">
                      <Link href={`/videos/${video.slug}`}>
                        <a>
                          <img
                            src={`${process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL}/api/files/images/${video.thumb_image}`}
                            alt={video.name}
                            width={1280}
                            height={720}
                            className="rounded-t-lg"
                          />
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <div className="aspect-w-16 aspect-h-9 md:mb-4 mb-2">
                      <Link href={`/videos/${video.slug}`}>
                        <a>
                          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-600">
                            <IconPlaceholder />
                          </div>
                        </a>
                      </Link>
                    </div>
                  )}
                  <Link href={`/videos/${video.slug}`}>
                    <a className="px-4 py-2">
                      <b className="text-lg font-medium text-gray-900">
                        {video.name}
                      </b>
                    </a>
                  </Link>
                  {video.summary && (
                    <div className="dark:prose-dark text-sm text-gray-500 dark:text-white  p-4 pt-0">
                      {video.summary}
                    </div>
                  )}
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
  return null
  return (
    <div className="mx-auto max-w-3xl lg:max-w-7xl lg:pt-16 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="mt-1 text-3xl font-extrabold sm:text-4xl sm:tracking-tight lg:text-5xl text-black dark:text-white">
        {name}
        </h2>
        <p className="prose max-w-xl mt-5 mx-auto text-xl text-gray-500">
          欢迎使用华炎魔方低代码平台，您可以免费访问这里的视频。
        </p>
      </div>
      <div className="mx-auto w-full lg:py-16 py-6 px-1">
      {videos && videos.map((video_collection: any) => {
        return (
          <div className="pt-4" key={video_collection._id}>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
            {video_collection.name}
          </h2>
          <div className="text-gray-500 py-2">
            {video_collection.description}
          </div>
          <div className="py-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            123
            {video_collection && video_collection.videos.map((video: any) => {
              return (
                <div key={`${video.slug}`} className="flex flex-col border border-solid  rounded-lg border-slate-100">
                  {video.thumb_image ? (
                    <div className="md:mb-2 mb-2">
                      <Link href={`/videos/${video.slug}`}>
                        <a>
                          <img
                            src={`${process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL}/api/files/images/${video.thumb_image}`}
                            alt={video.name}
                            width={1280}
                            height={720}
                            className="rounded-t-lg"
                          />
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <div className="aspect-w-16 aspect-h-9 md:mb-4 mb-2">
                      <Link href={`/videos/${video.slug}`}>
                        <a>
                          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-600">
                            <IconPlaceholder />
                          </div>
                        </a>
                      </Link>
                    </div>
                  )}
                  <Link href={`/videos/${video.slug}`}>
                    <a className="px-4 py-2">
                      <b className="text-lg font-medium text-gray-900">
                        {video.name}
                      </b>
                    </a>
                  </Link>
                  {video.summary && (
                    <div className="dark:prose-dark text-sm text-gray-500 dark:text-white  p-4 pt-0">
                      {video.summary}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )})}
      </div>
    </div>
  )
}

const IconPlaceholder = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        fill="currentColor"
      />
    </g>
  </svg>
)

export default SiteVideos;
