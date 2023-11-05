import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';
var UseAlert = function (props) {
    var _a;
    var title = props.title, closable = props.closable, type = props.type, customClose = props.customClose, onClose = props.onClose, children = props.children;
    var customCloseP = customClose || React.createElement(Icon, { icon: "times", className: 'window-close', size: 'lg' });
    var classes = classNames('alert', (_a = {}, _a["alert-".concat(type)] = type, _a));
    var _b = useState(true), visible = _b[0], setVisible = _b[1];
    var handleClick = function () {
        setVisible(false);
        onClose && onClose();
    };
    return (React.createElement(Transition, { in: visible, timeout: 300, animation: 'zoom-in-left', wrapper: true },
        React.createElement("div", { className: classes },
            title && (React.createElement("h4", { className: 'alert-title' }, title)),
            React.createElement("p", { className: 'alert-message' }, children),
            closable && (React.createElement("i", { onClick: handleClick }, customCloseP)))));
};
UseAlert.defaultProps = {
    closable: true,
    type: 'primary'
};
export default UseAlert;
