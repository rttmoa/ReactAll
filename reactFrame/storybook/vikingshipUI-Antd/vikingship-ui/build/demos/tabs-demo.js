import React from 'react';
import Tabs from '../components/Tabs/tabs';
import TabsItem from '../components/Tabs/tabsItem';
function TabsDemo() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Tabs, { defaultIndex: 0, styleType: "underline", onSelect: function () { } },
            React.createElement(TabsItem, { label: "card1" }, "this is card one"),
            React.createElement(TabsItem, { label: "card2" }, "this is content two"),
            React.createElement(TabsItem, { label: "disabled", disabled: false }, "this is content three")),
        React.createElement("hr", null),
        React.createElement(Tabs, { defaultIndex: 0, styleType: "outline", onSelect: function () { } },
            React.createElement(TabsItem, { label: "card1" }, "this is card one"),
            React.createElement(TabsItem, { label: "card2" }, "this is content two"),
            React.createElement(TabsItem, { label: "disabled", disabled: false }, "this is content three"))));
}
export default TabsDemo;
