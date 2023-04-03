import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
// import * as serviceWorker from '../serviceWorker';

import store from './store/store';
import './css/index.css';
import App from './App.jsx';





/***--- 主页 - 搜索页 ---**/
// http://localhost:3032/
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// if ('production' === process.env.NODE_ENV) {
//     serviceWorker.register();
// } else {
//     serviceWorker.unregister();
// }
