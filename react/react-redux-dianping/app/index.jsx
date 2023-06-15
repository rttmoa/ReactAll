import React from 'react'
import { render } from 'react-dom' 
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router' 
import configureStore from './store/configureStore'

import './static/css/common.less' // 全局less
import './static/css/font.css' // 全局font



// 创建 Redux 的 store 对象
const store = configureStore()

import RouteMap from './router/routeMap' // router文件夹下的路由配置


 

render(
    <Provider store={store}>

        <RouteMap history={hashHistory}/>

    </Provider>,
    document.getElementById('root')
)