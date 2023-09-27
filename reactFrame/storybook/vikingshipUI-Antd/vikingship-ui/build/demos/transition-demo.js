import React, { useState } from 'react';
import Transition from '../components/Transition';
import Button from '../components/Button';
function TransitionDemo() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { size: 'lg', onClick: function () { setShow(!show); } }, "Toggle Show  "),
        React.createElement(Transition, { in: show, timeout: 300, animation: 'zoom-in-left' },
            React.createElement("div", null,
                React.createElement("p", null, " edit name"),
                React.createElement("p", null, " edit name"),
                React.createElement("p", null, " edit name"),
                React.createElement("p", null, " edit name"))),
        React.createElement(Transition, { in: show, timeout: 300, animation: 'zoom-in-top', wrapper: true },
            React.createElement(Button, { btnType: 'primary', size: 'lg' }, "A Large Button")),
        React.createElement("hr", null)));
}
export default TransitionDemo;
