import React, { useState } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';
/**
 * ### 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * #### title? | closable? | customClose? | onClose()? | children? | type
 */
export var Alert = function (props) {
    var _a;
    var title = props.title, closable = props.closable, type = props.type, customClose = props.customClose, onClose = props.onClose, children = props.children;
    var customCloseP = customClose || React.createElement(Icon, { icon: "times", className: "window-close", size: 'lg' });
    var classes = classnames('alert', (_a = {}, _a["alert-".concat(type)] = type, _a));
    var handleClick = function () {
        setVisible(false);
        onClose && onClose();
    };
    var _b = useState(true), visible = _b[0], setVisible = _b[1];
    return (React.createElement(Transition, { in: visible, timeout: 300, animation: "zoom-in-left", wrapper: true },
        React.createElement("div", { className: classes },
            title ? React.createElement("h4", { className: "alert-title" }, title) : null,
            React.createElement("p", { className: "alert-message" }, children),
            closable ? React.createElement("i", { onClick: handleClick }, customCloseP) : null)));
};
Alert.defaultProps = {
    closable: true,
    type: 'primary'
};
export default Alert;
