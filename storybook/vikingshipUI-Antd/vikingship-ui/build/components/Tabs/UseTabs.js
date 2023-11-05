import classNames from 'classnames';
import React, { useState } from 'react';
export var UseTabsItems = function (props) {
    var className = props.className, isActive = props.isActive, label = props.label, children = props.children;
    var cs = classNames('tabs-content', className, { 'tabs-content-active': isActive });
    return React.createElement("div", { key: label, className: cs }, children);
};
UseTabsItems.defaultProps = { disabled: false, isActive: false };
UseTabsItems.displayName = 'TabsItem';
export var UseTabs = function (props) {
    var defaultIndex = props.defaultIndex, styleType = props.styleType, onSelect = props.onSelect, className = props.className, children = props.children;
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var cs = classNames('tabs-nav', className, {
        'tabs-underline': styleType === 'underline',
        'tabs-outline': styleType === 'outline'
    });
    // console.log(children); // (4) [{…}, {…}, {…}, {…}]
    // todo 导航区域
    var ChildrenCom = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var isLabelDisabled = childElement.props.disabled ? childElement.props.disabled : false;
            var tableLabelClasses = classNames('tabs-label', className, {
                'tabs-label-active': activeIndex === index,
                'tabs-label-disabled': childElement.props.disabled
            });
            var handleChildClick = function () {
                if (isLabelDisabled)
                    return;
                setActiveIndex(index);
                if (typeof onSelect === 'function')
                    onSelect(index);
            };
            return (React.createElement("li", { key: index, className: tableLabelClasses, onClick: handleChildClick }, childElement.props.label));
        });
    };
    // todo 内容区域
    var ContentChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            console.log(displayName);
            if (displayName === 'TabsItem') {
                return React.cloneElement(childElement, { isActive: activeIndex === index });
            }
            else {
                console.error("Warning: Tabs has a child which is not a TabsItem component");
            }
        });
    };
    return (React.createElement("div", null,
        React.createElement("nav", { className: cs },
            React.createElement("ul", { className: 'tabs-ul' }, ChildrenCom())),
        ContentChildren()));
};
UseTabs.defaultProps = { defaultIndex: 0, styleType: 'underline' };
