import React from 'react';
import Button from '../components/Button/button';
function ButtonDemo() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, null, "hello"),
        React.createElement(Button, { autoFocus: true }, "autoFocus"),
        React.createElement(Button, { onClick: function (e) { e.preventDefault(); alert(123); } }, "onClick"),
        React.createElement(Button, { className: "custom" }, "ClassName Button"),
        React.createElement(Button, { disabled: true }, "Disabled Button"),
        React.createElement(Button, { btnType: 'primary', size: 'lg' }, "Large Primary"),
        React.createElement(Button, { btnType: 'danger', size: 'sm' }, "Small Danger"),
        React.createElement(Button, { btnType: 'link', href: "https://www.baidu.com", target: "_blank" }, "BaiDu Link"),
        React.createElement(Button, { disabled: true, btnType: 'link', href: "https://www.baidu.com" }, "Disabled Link")));
}
export default ButtonDemo;
