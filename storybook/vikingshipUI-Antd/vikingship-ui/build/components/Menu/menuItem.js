import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
export var MenuItem = function (props) {
    var className = props.className, index = props.index, style = props.style, children = props.children, disabled = props.disabled;
    var context = useContext(MenuContext);
    var cs = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return React.createElement("li", { className: cs, style: style, onClick: handleClick }, children);
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
