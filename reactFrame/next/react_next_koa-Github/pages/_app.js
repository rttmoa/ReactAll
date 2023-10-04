import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'

import Layout from '../components/Layout'
import PageLoading from '../components/PageLoading'
import testHoc from '../lib/with-redux';    
import 'antd/dist/antd.css'



class MyApp extends App { // 覆盖 _app.js 文件
  // 获取 github 中 react的数据
  // axios.get("https://api.github.com/search/repositories?q=react").then(resp => console.log(resp))
  // axios.get("github/search/repositories?q=react").then(resp => console.log(resp))
  
  // state可以通过 this.props.pageProps属性传递到每个页面中
  state = {
    context: 'value',
    loading: false,
  }

  startLoading = () => {this.setState({ loading: true })}
  stopLoading = () => {this.setState({ loading: false })}
  // 组件挂载：当页面开始时，加载进度条从开始到结束
  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading)    // 切换：路由开始的时候 Loading：true
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }
  // 组件卸载：当页面卸载时，加载进度条从开始到结束
  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)  
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }

  /* TODO: 使用static获取全局数据  &&  打印是在 服务端打印CMD */
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    // console.log("getInitialProps ctx")
    // console.error('getInitialProps app init')
    let pageProps = {}; 
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    }
  }

  

  render() {
    const { Component, pageProps, reduxStore } = this.props; 
    // console.log("_appjs", this.props)
    
    return (
      <Container>
        <Provider store={reduxStore}>
          {this.props.loading && <PageLoading />}

          {/* Layout布局：头，体，足 */}
          <Layout>
            {/*  把 pageProps 传递给实际渲染的页面   实际上是Index.getInitialProps函数中的数据渲染到要渲染的Component组件中去   */}
            <Component {...pageProps} />
          </Layout>
          
        </Provider>
      </Container>
    )
  }
}
// todo 高阶组件
export default testHoc(MyApp)
