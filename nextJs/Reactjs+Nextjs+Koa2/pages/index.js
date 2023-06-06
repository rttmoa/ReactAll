import { useEffect } from 'react'
import { Button, Icon, Tabs } from 'antd'
import getCofnig from 'next/config'  /* 获取 next.config.js 文件中 configs属性 */
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import LRU from 'lru-cache'
import axios from 'axios'
import Repo from '../components/Repo'
import { cacheArray } from '../lib/repo-basic-cache'
const api = require('../lib/api')

// 缓存更新策略：
// const cache = new LRU({  maxAge: 1000 * 10 })


const { publicRuntimeConfig, serverRuntimeConfig } = getCofnig()
let cachedUserRepos, cachedUserStaredRepos; // 使用缓存数据
const isServer = typeof window === 'undefined';



function Index({ userRepos, userStaredRepos, user, router }) { // 浏览器端
  // console.log(userRepos, userStaredRepos)
  // console.log("router", router)

  
  const tabKey = router.query.key || '1'; // 要显示 你的仓库 | 你关注的仓库

  const handleTabChange = activeKey => {Router.push(`/?key=${activeKey}`)}  // 动态切换Tabs, 查看地址栏即可

  useEffect(() => {
    // 缓存到页面中 
    // FIXME: 
    if (!isServer) {
      // console.log(123)
      cachedUserRepos = userRepos;
      cachedUserStaredRepos = userStaredRepos;

      // if (userRepos) { cache.set('userRepos', userRepos) }
      // if (userStaredRepos) { cache.set('userStaredRepos', userStaredRepos) }

      // 每隔十秒，将缓存清空，重新请求数据
      const timeout = setTimeout(() => {
        cachedUserRepos = null;
        cachedUserStaredRepos = null;
      }, 1000 * 60 * 10);
    }
  }, [userRepos, userStaredRepos])

  useEffect(() => {
    // cache缓存页面数据 && 对于cacheArray，服务端是没有必要去执行的 && 这个是用户去搜索有关的
    if (!isServer) {
      // console.log(123123)
      cacheArray(userRepos)
      cacheArray(userStaredRepos)
    }
  })

  if (!user || !user.id) {
    return (
      <div className="root"> 
        <p>亲，您还没有登录哦~</p>
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          点击登录
        </Button>
        <style jsx>{`
          .root {
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }



  /**
   * TODO: 用户登陆后显示 用户的登陆信息   左侧用户信息  右侧你的仓库 你关注的仓库
   */ 
  return (
    <div className="root">

      {/* 用户信息 */}
      <div className="user-info">
        <img src={user.avatar_url} alt="user avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
          <Icon type="mail" style={{ marginRight: 10 }} />
          <a href={`mailto:${user.email}`}>{user && user.email || "无"}</a>
        </p>
      </div>

      {/* 用户仓库列表 */}
      <div className="user-repos">
        <Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
          <Tabs.TabPane tab="你的仓库" key="1">
            {userRepos.map(repo => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {userStaredRepos.map(repo => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>

      <style jsx>{`
        .root {
          display: flex;
          align-items: flex-start;
          padding: 20px 0;
        }
        .user-info {
          width: 200px;
          margin-right: 40px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }
        .login {
          font-weight: 800;
          font-size: 20px;
          margin-top: 20px;
        }
        .name {
          font-size: 16px;
          color: #777;
        }
        .bio {
          margin-top: 20px;
          color: #333;
        }
        .avatar {
          width: 100%;
          border-radius: 5px;
        }
        .user-repos {
          flex-grow: 1;
        }
      `}</style>

    </div>
  )
}
// Github接口代理完善：
  // 1、getInitialProps：是在客户端页面跳转的时候会调用，同时在服务端渲染的时候访问Index页面也会调用getInitialProps
  // 2、在服务端渲染的时候处于Nodejs环境，会访问80端口的 axios.get('http://localhost/github/search/repositories?q=react').then(resp => console.log(resp)) 
  // 3、同构概念：客户端和服务端同时渲染 /lib/api.js


// 在服务端渲染的时候就可以拿到，函数体中的数据 | 而不需要客户端加载完js文件再渲染
Index.getInitialProps = async ({ ctx, reduxStore }) => { // 服务端
  console.log('-----------Indexjs 是否在控制台中打印，还是在浏览器中打印-----------------');
  // const promise = new Promise(resolve => {setTimeout(() => resolve({name: 'jokcy'}, 1000))})
  // return await promise;
  // console.log(promise);

  // const moment = await import("moment") // 异步加载
  // console.log("moment", moment)
  // const result = await axios.get('/github/search/repositories?q=react').then(resp => console.log(resp)) 


  // 在Nodejs环境拿不到浏览器对象
  // 但是在with-reduxjs中:  ctx.reduxStore = reduxStore;  // 给Nodejs环境绑定reduxStore
  // 可以拿到reduxStore对象
  // console.log(reduxStore) // FIXME: {dispatch, subscribe, getState, replaceReducer, [Symbol(observable)]} 

  const user = reduxStore.getState().user;
  // console.log("reduxStore user", user) // redux 中的用户信息
  if (!user || !user.id) {
    return {
      isLogin: false
    }
  }

  // 当不是服务端时，
  if (!isServer) {
    // console.log("是否进入 !isServer 中")
    // if (cache.get('userRepos') && cache.get('userStaredRepos')) {
    //   return {
    //     userRepos: cache.get('userRepos'),
    //     userStaredRepos: cache.get('userStaredRepos'),
    //   }
    // }
    // 这部分cache是页面加载到浏览器后 会真正使用这部分cache 对于用户使用页面
    if (cachedUserRepos && cachedUserStaredRepos) {
      return {
        userRepos: cachedUserRepos,
        userStaredRepos: cachedUserStaredRepos
      }
    }
  }

  const userRe = await api.request({ url: '/search/repositories?q=react'}, ctx.req, ctx.res)
  // console.log(userRe.data) // 可以拿到数据的

  const userRepos = await api.request({url: '/user/repos'}, ctx.req, ctx.res)
  const userStaredRepos = await api.request({url: '/user/starred'}, ctx.req, ctx.res)

  // 返回的数据 都给到Indexjs页面： function Index({ userRepos, userStaredRepos, user, router }) {}
  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStaredRepos: userStaredRepos.data,
  }
}
function mapState(state) {
  return {
    user: state.user,
  }
}
export default withRouter(connect(mapState, null)(Index))