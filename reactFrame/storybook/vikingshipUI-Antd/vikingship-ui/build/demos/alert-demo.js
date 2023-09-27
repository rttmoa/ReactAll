import React from 'react';
import Alert from '../components/Alert';
function AlertDemo() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Alert, { title: "\u63D0\u793A\u6807\u9898\u6B27\u4EB2", type: 'primary' }, "this is a long description!"),
        React.createElement("hr", null),
        React.createElement(Alert, { type: 'warning' }, "this is a long description!"),
        React.createElement("hr", null),
        React.createElement(Alert, { title: '\u6807\u98981', type: "success", closable: false, customClose: "1", onClose: function () { return console.log(123); } }, "\u81EA\u5B9A\u4E49")));
}
export default AlertDemo;
