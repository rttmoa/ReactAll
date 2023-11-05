import React, { useState, createContext } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0' });
/**
 * #### 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单
 * ~~~js
 * import { Menu } from 'vikingship-ui'
 * 然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ~~~
 */
// TODO: CODE: React.Children & React.cloneElement & React.createContext
export var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    // todo 向 children 中提供 index、onSelect、mode、defaultOpenSubMenus
    var passedContent = {
        index: currentActive ? currentActive : "0",
        onSelect: function (index) {
            setActive(index);
            onSelect && onSelect(index);
        },
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContent }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};
export default Menu;
