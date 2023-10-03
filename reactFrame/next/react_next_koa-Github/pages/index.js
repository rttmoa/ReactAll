import { useEffect } from 'react'
import { Button, Icon, Tabs } from 'antd'
import getCofnig from 'next/config'     /** #### TODO: 获取 next.config.js 文件中 configs属性   */
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import Repo from '../components/Repo'
import { cacheArray } from '../lib/repo-basic-cache' // 缓存更新策略： const cache = new LRU({  maxAge: 1000 * 10 })
// import LRU from 'lru-cache'
// import axios from 'axios'

const api = require('../lib/api')
const { publicRuntimeConfig, serverRuntimeConfig } = getCofnig();
let cachedUserRepos, cachedUserStaredRepos; // 缓存数据：使用变量保存起来
const isServer = typeof window === 'undefined'; // todo 开发模式下


// TODO:  Index: 首页
function Index({ userRepos, userStaredRepos, user, router }) { // 浏览器端 
  const tabKey = router.query.key || "1"; // 要显示 你的仓库 | 你关注的仓库

  const handleTabChange = activeKey => { Router.push(`/?key=${activeKey}`) }  // 动态切换Tabs, 查看地址栏即可

  useEffect(() => {
    // 缓存到页面中 
    if (!isServer) {
      // console.log('我的仓库', userRepos)
      cachedUserRepos = userRepos; // 你的仓库
      cachedUserStaredRepos = userStaredRepos; // 你关注的仓库

      // if (userRepos) { cache.set('userRepos', userRepos) }
      // if (userStaredRepos) { cache.set('userStaredRepos', userStaredRepos) }

      // 每隔十秒，将缓存清空，重新请求数据
      const timeout = setTimeout(() => {
        cachedUserRepos = null;
        cachedUserStaredRepos = null;
      }, 1000 * 60 * 10);
    }
  }, [userRepos, userStaredRepos])

  // lru-cache缓存数据，缓存主页 我的仓库&我关注的仓库
  useEffect(() => { 
    // cache缓存页面数据 && 对于cacheArray，服务端是没有必要去执行的 && 这个是用户去搜索有关的
    if (!isServer) {
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

  return (
    <div className="root">
      {/* 左侧用户信息 */}
      <div className="user-info">
        <img src={user.avatar_url} alt="user avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
          <Icon type="mail" style={{ marginRight: 10 }} />
          <a href={`mailto:${user.email}`}>{user && user.email || "none"}</a>
        </p>
      </div>

      {/* 右侧用户仓库列表（你的仓库，你关注的仓库） */}
      <div className="user-repos">
        <Tabs activeKey={tabKey} onChange={handleTabChange} animated={true}>
          <Tabs.TabPane tab="你的仓库" key="1">
            {userRepos.map(repo => <Repo key={repo.id} repo={repo} /> )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {userStaredRepos.map(repo => <Repo key={repo.id} repo={repo} /> )}
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
// TODO: 服务端处理数据
// Github接口代理完善：
  // 1、getInitialProps：是在客户端页面跳转的时候会调用，同时在服务端渲染的时候访问Index页面也会调用getInitialProps
  // 2、在服务端渲染的时候处于Nodejs环境，会访问80端口的 axios.get('http://localhost/github/search/repositories?q=react').then(resp => console.log(resp)) 
  // 3、同构概念：客户端和服务端同时渲染 /lib/api.js
// 在服务端渲染的时候就可以拿到，函数体中的数据 | 而不需要客户端加载完js文件再渲染
Index.getInitialProps = async ({ ctx, reduxStore }) => { // 服务端
  console.log('----Indexjs 是否在控制台中打印，还是在浏览器中打印------');
  // const promise = new Promise(resolve => {setTimeout(() => resolve({name: 'jokcy'}, 1000))})
  // return await promise;
  // console.log(promise);

  // const moment = await import("moment") // 异步加载
  // console.log("moment", moment) // moment 好多属性
  
  // const result = await axios.get('/github/search/repositories?q=react').then(resp => console.log(resp)) 
  // console.log('搜索react', result)

  // 在Nodejs环境拿不到浏览器对象
  // 但是在with-reduxjs中:  ctx.reduxStore = reduxStore;  // 给Nodejs环境绑定reduxStore：   将浏览器的reduxStore绑定给Nodejs

  // console.log("客户端/服务端打印 ctx、reduxStore")
  // console.log("index.getInitialProps -> ctx", ctx) // {pathname: '/', query: {…}, asPath: '/'}
  // console.log("index.getInitialProps -> ctx", reduxStore) // {dispatch, subscribe, getState, replaceReducer, [Symbol(observable)]} 
  const user = reduxStore.getState().user;
  // console.log("reduxStore user", user) 
  if (!user || !user.id) {
    return {
      isLogin: false
    }
  }

  // 当不是服务端时，
  if (!isServer) {
    // console.log("客户端！")
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

  // todo 将下面返回的数据和withRouter和Redux数据返回给 function Index() {}
  // const userRe = await api.request({ url: '/search/repositories?q=react'}, ctx.req, ctx.res)
  // console.log(userRe.data.length) // 可以拿到数据的
  const userRepos = await api.request({url: '/user/repos'}, ctx.req, ctx.res)
  const userStaredRepos = await api.request({url: '/user/starred'}, ctx.req, ctx.res)
  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStaredRepos: userStaredRepos.data,
  }
}
function mapState(state) { return { user: state.user } }
function mapDispatch () { return {} }
export default withRouter(connect(mapState, mapDispatch)(Index))