import { useEffect } from 'react'
import Repo from './Repo'
import Link from 'next/link'
import { withRouter } from 'next/router'
import api from '../lib/api'
import { get, cache } from '../lib/repo-basic-cache'


function makeQuery(queryObject) {
  const query = Object.entries(queryObject).reduce((result, entry) => {
      result.push(entry.join('='));
      return result;
    }, []).join('&');
  return `?${query}`;
}
const isServer = typeof window === 'undefined';



/***--- 封装 Comp 组件 ---**/
export default function(Comp, type = 'index') {   // type: index / issue

  function WithDetail({repoBasic, router, ...rest}) {
    const query = makeQuery(router.query);
    // console.log("query", query) // ?owner=rttmoa&name=DesignPatterns
    // console.log("repoBasic", repoBasic)    // 仓库信息
    // console.log("router query", router.query) //--->  {owner: 'rttmoa', name: 'DesignPatterns'}
    // console.log("router asPath", router.asPath) //--->    /detail?owner=rttmoa&name=DesignPatterns
    // debugger
    // console.log("...rest", rest)


    useEffect(() => {
      // cache缓存页面数据 && 对于cacheArray，服务端是没有必要去执行的 && 这个是用户去搜索有关的
      if (!isServer) { cache(repoBasic) }
    })

    return (
      <div className="root">
        <div className="repo-basic">
          <Repo repo={repoBasic} />
          {/* 切换 Readme | Issue */}
          <div className="tabs">
            {type === 'index' ? (<span className="tab">Readme</span>) : (
              <Link href={`/detail${query}`}>
                <a className="tab index">Readme</a>
              </Link>
            )}  
            {type === 'issues' ? (<span className="tab">Issues</span>) : (
              <Link href={`/detail/issues${query}`}>
                <a className="tab issues">Issues</a>
              </Link>
            )}
          </div>
        </div>

        {/* 渲染 Detail | Issue 组件 */}
        <div>
          <Comp {...rest}/>
        </div>

        <style jsx>{`
          .root {
            padding-top: 20px;
          }
          .repo-basic {
            padding: 20px;
            border: 1px solid #eee;
            margin-bottom: 20px;
            border-radius: 5px;
          }
          .tab + .tab {
            margin-left: 20px;
          }
        `}</style>
      </div>
    )
  }

  WithDetail.getInitialProps = async context => {
    // console.log(ctx.query)
    const { router, ctx } = context;
    const { owner, name } = ctx.query;

    const full_name = `${owner}/${name}`;

    let pageData = {};
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context);     // 传入完整的context
    }

    if (get(full_name)) {
      /* TODO: 如果缓存中有数据，直接拿，      如果缓存中没有数据 则发请求去拿 */
      return {
        repoBasic: get(full_name),
        ...pageData
      }
    }

    const repoBasic = await api.request({url: `/repos/${owner}/${name}`}, ctx.req, ctx.res);
    return {
      repoBasic: repoBasic.data,
      ...pageData
    }
  }

  return withRouter(WithDetail)
}
