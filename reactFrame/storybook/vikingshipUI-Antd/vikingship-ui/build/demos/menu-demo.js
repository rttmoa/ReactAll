import React from 'react';
import Menu from '../components/Menu/menu';
import MenuItem from '../components/Menu/menuItem';
import SubMenu from '../components/Menu/subMenu';
function MenuDemo() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Menu, { defaultIndex: '0', defaultOpenSubMenus: ['3'], onSelect: function (index) { alert(index); } },
            React.createElement(MenuItem, null, "title one"),
            React.createElement(MenuItem, { disabled: true }, "disabled link"),
            React.createElement(MenuItem, null,
                React.createElement("a", { href: "http://www.baidu.com" }, "Baidu!")),
            React.createElement(SubMenu, { title: 'dropdown' },
                React.createElement(MenuItem, null, "dropdown 1"),
                React.createElement(MenuItem, null, "dropdown 2")),
            React.createElement(MenuItem, null, "cool link 3"))));
}
export default MenuDemo;
