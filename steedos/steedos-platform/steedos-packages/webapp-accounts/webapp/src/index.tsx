// @ts-nocheck

import 'react-app-polyfill/ie9';
import 'core-js/proposals/url';
import 'core-js/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from './root';
import { Provider } from 'react-redux'
import IntlProvider from './components/intl_provider';

import store from './stores/redux_store';

import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider>
            <Router />
        </IntlProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement);
