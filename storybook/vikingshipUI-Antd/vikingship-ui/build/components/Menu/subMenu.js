var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon';
import Transition from '../Transition';
export var SubMenu = function (props) {
    var index = props.index, title = props.title, children = props.children, className = props.className;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _a = useState(isOpened), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    // mode="vertical"时， 点击事件 （下拉菜单）
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {};
    // mode="horizontal"时， 防抖 （下拉菜单）
    var timer;
    var handleMouse = function (e, toggle) {
        // 1.清除定时器
        clearTimeout(timer);
        e.preventDefault();
        // 2.开启本次定时器
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    // todo 渲染 SubMenu 下拉菜单中 children
    var renderChildren = function () {
        var subMenuClasses = classNames('viking-submenu', { 'menu-opened': menuOpen });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: "".concat(index, "-").concat(i) }); // todo 设置 SubMenu 下的 index
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            " ",
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
