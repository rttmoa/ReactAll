/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconDemo from './demos/icon-demo';
function App() {
    var _a = useState(''), title = _a[0], setTitle = _a[1];
    useEffect(function () {
        axios.get('https://jsonplaceholder.typicode.com/posts/1').then(function (response) { setTitle(response.data.title); });
    });
    return (React.createElement("div", { className: "App", style: { padding: '20px 80px' } },
        React.createElement("b", null, title),
        React.createElement("br", null),
        React.createElement(IconDemo, null)));
}
export default App;
