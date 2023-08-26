import App, { Container } from 'next/app'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css'

import MyContext from '../lib/my-context'
import Layout from '../components/Layout'

import testHoc from '../lib/with-redux'

class MyApp extends App {
  state = {
    context: 'value',
  }

  static async getInitialProps(ctx) {
    const { Component } = ctx
    console.log('app init')
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps,
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <Layout>
          <Provider store={reduxStore}>
            {/* React.createContext('')   Component组件中可以一直使用 Context 的内容  */}
            <MyContext.Provider value={this.state.context}>
              <Component {...pageProps} />
              {/* <button onClick={() => this.setState({ context: `${this.state.context}111` })}>Update Context</button> */}
            </MyContext.Provider>
          </Provider>
        </Layout>
      </Container>
    )
  }
}
// 不同的逻辑，不同的功能拆分到不同的文件中，包裹MyApp，以这种方式去拓展整个功能
export default testHoc(MyApp)
