import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import * as serviceWorker from '../serviceWorker';

import store from './store/store';
import './css/index.css';
import App from './App.jsx';





/***--- 订单填写 ———— 添加乘客信息+提交订单 ---**/
// http://localhost:3032/ticket.html?aStation=%E5%8D%97%E4%BA%AC&dStation=%E5%8C%97%E4%BA%AC&trainNumber=Z281&date=2019-02-10
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
