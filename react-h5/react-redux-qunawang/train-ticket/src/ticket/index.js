import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import * as serviceWorker from '../serviceWorker';

import store from './store/store';
import './css/index.css';
import App from './App.jsx';






/***--- 订单详情页面 ---**/
// http://localhost:3032/order.html?trainNumber=G21&dStation=%E5%8C%97%E4%BA%AC%E5%8D%97&aStation=%E5%8D%97%E4%BA%AC%E5%8D%97&type=%E4%B8%80%E7%AD%89%E5%BA%A7&date=2019-02-10
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

if ('production' === process.env.NODE_ENV) {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
