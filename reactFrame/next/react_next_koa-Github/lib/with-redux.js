import React from 'react'
import createSore from '../store/store'


// 判断是否是服务端：是否有window全局变量判断是否处于window环境
const isServer = typeof window === 'undefined';
const __NEXT_REUDX_STORE__ = '__NEXT_REUDX_STORE__';
function getOrCreateStore(initialState) {
  // console.log(initialState) // {user: {…}}

  // 如果是服务端
  if (isServer) {
    return createSore(initialState)
  }

  if (!window[__NEXT_REUDX_STORE__]) {
    // 通过window保存变量，并创建一个Store
    window[__NEXT_REUDX_STORE__] = createSore(initialState)
  }
  // 在客户端每次都拿到这个Store就可以了
  return window[__NEXT_REUDX_STORE__]
}

// todo  高阶函数  1.处理服务端  2.处理客户端  （_app.js）
export default Comp => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props) 
      const { initialReduxState } = this.props; 
      this.reduxStore = getOrCreateStore(initialReduxState); 
    }

    render() { 
      const { Component, pageProps, ...rest } = this.props; 
      // console.log('window', window[__NEXT_REUDX_STORE__])
      // console.log('WithReduxApp', this.props)

      if (pageProps) pageProps.test = '123 - 表示不是每个页面都有 pageProps （pageProps 存在才有 test属性）';

      return <Comp Component={Component} pageProps={pageProps} reduxStore={this.reduxStore} {...rest} />
    }
  }
  // getInitialProps方法会在每次页面切换时，都会被调用的
  WithReduxApp.getInitialProps = async ctx => {  
    // 保证只有一个Store对象，如果每次都创建一个Store，那么Store每次就是初始化状态了，不是之前维持更新记录的Store了
    let reduxStore;

    // 如果是服务端
    if (isServer) {
      const { req } = ctx.ctx; // 在nextjs渲染之前 serverjs中 ctx.req.session = ctx.session;
      const session = req.session;
      // console.log("session", session) // <ref *1> Session {...}

      // 在serverjs中 ctx有session并且挂载到ctx中
      if (session && session.userInfo) {
        reduxStore = getOrCreateStore({ user: session.userInfo })
      } else {
        reduxStore = getOrCreateStore()
      }
    } else {
      // 初始化redux
      reduxStore = getOrCreateStore()
    }

    ctx.reduxStore = reduxStore;  // 给Nodejs环境绑定reduxStore

    let appProps = {};
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx);
    }
    // console.log(appProps) // { pageProps: { repoBasic: {}, readme: {} } }
    return {
      ...appProps,
      initialReduxState: reduxStore.getState(), // { user: {} }
    }
  }
  return WithReduxApp
}
