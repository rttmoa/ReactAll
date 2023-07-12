import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store'

import Container from './Main/Container.jsx';






/***--- TODO: 文章分类：主页面中8个Nav ---**/
// 分类 url:   http://localhost:8080/category.html
ReactDom.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById('root')
);

// 实现功能：
    // 1、滚动加载数据
    // 2、全部分类 || 综合排序 || 筛选