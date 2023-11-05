var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonDemo from './demos/button-demo';
import AlertDemo from './demos/alert-demo';
import MenuDemo from './demos/menu-demo';
import TabsDemo from './demos/tabs-demo';
import IconDemo from './demos/icon-demo';
import TransitionDemo from './demos/transition-demo';
import InputDemo from './demos/input-demo';
import UploadDemo from './demos/upload-demo';
import UploadCom from './demos/uploadCom';
function App() {
    var _a = useState(''), title = _a[0], setTitle = _a[1];
    useEffect(function () {
        axios.get('https://jsonplaceholder.typicode.com/posts/1').then(function (response) { setTitle(response.data.title); });
    });
    var styleProps = {
        backgroundColor: '#eae6e6', marginBottom: '100px', padding: '20px 60px'
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("div", { style: __assign({}, styleProps) },
            React.createElement("b", null,
                "Title: ",
                title)),
        React.createElement("div", { style: __assign({}, styleProps) },
            React.createElement(ButtonDemo, null)),
        React.createElement(AlertDemo, null),
        React.createElement(InputDemo, null),
        React.createElement(TransitionDemo, null),
        React.createElement(IconDemo, null),
        React.createElement(TabsDemo, null),
        React.createElement(MenuDemo, null),
        React.createElement(UploadDemo, null),
        React.createElement(UploadCom, null)));
}
export default App;
