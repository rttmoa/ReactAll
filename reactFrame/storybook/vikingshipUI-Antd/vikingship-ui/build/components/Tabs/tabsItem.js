import React from 'react';
import classNames from 'classnames';
export var TabsItem = function (props) {
    var classes = classNames('tabs-content', props.className, {
        'tabs-content-active': props.isActive
    });
    return (React.createElement("div", { key: props.label, className: classes }, props.children));
};
TabsItem.defaultProps = {
    disabled: false,
    isActive: false
};
TabsItem.displayName = 'TabsItem';
export default TabsItem;
