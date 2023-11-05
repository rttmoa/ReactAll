import React from 'react';
import classNames from 'classnames';
// React.Children 遍历 TabsItem
export var TabsItem = function (props) {
    var className = props.className, isActive = props.isActive, label = props.label, children = props.children;
    var classes = classNames('tabs-content', className, {
        'tabs-content-active': isActive,
    });
    return (React.createElement("div", { key: label, className: classes }, children));
};
TabsItem.defaultProps = {
    disabled: false,
    isActive: false
};
TabsItem.displayName = 'TabsItem';
export default TabsItem;
