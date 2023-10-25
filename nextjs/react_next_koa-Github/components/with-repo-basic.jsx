import { useEffect } from 'react'
import Repo from './Repo'
import Link from 'next/link'
import { withRouter } from 'next/router'
import api from '../lib/api'
import { get, cache } from '../lib/repo-basic-cache'

let style = { fontWeight: "bold" }

function makeQuery(queryObject) {
  const query = Object.entries(queryObject).reduce((result, entry) => {
      result.push(entry.join('='));
      return result;
    }, []).join('&');
  return `?${query}`;
}

const isServer = typeof window === 'undefined';


// TODO: 高阶组件  详情页面 |  详情问题页面
export default function(Comp, type = 'index') {   // type: index / issue

  function WithDetail({ repoBasic, router, ...rest }) {

    const query = makeQuery(router.query);
    // console.log("repoBasic", repoBasic)    // 仓库信息
    // console.log(router) // router {}
    // console.log("query", query) // ?owner=facebook&name=react 
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
            {type === 'index' ? (<span className="tab" style={style}>README</span>) : (
              // 跳转：/detail?owner=facebook&name=react
              <Link href={`/detail${query}`}>
                <a className="tab index" style={style}>README</a>
              </Link>
            )}
            {type === 'issues' ? (<span className="tab" style={style}>ISSUE</span>) : (
              <Link href={`/detail/issues${query}`}>
                <a className="tab issues" style={style}>ISSUE</a>
              </Link>
            )}
          </div>
        </div>

        {/* 渲染 Content 部分 */}
        <div> 
          <Comp {...rest} />
        </div>

        <style jsx>{`
          .root {
            padding-top: 20px;
          }
          .repo-basic {
            padding: 20px;
            border: 5px solid #eee;
            margin-bottom: 20px;
            border-radius: 20px;
          } 
          .tab + .tab {
            margin-left: 20px; 
          }
        `}</style>
      </div>
    )
  }

  WithDetail.getInitialProps = async context => { // 服务端

    const { router, ctx } = context;
    const { owner, name } = ctx.query;

    const full_name = `${owner}/${name}`;
    // console.log(full_name) // facebook/react

    let pageData = {};
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context);     // 传入完整的 context
    }

    // console.log('get(full_name)', get(full_name))
    if (!!get(full_name)) {
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
