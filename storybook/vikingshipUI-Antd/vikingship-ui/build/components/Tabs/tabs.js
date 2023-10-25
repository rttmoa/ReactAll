import React, { useState } from 'react';
import classNames from 'classnames';
/**
 * ### 选项卡切换组件。 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * #### defaultIndex? | styleType? | onSelect()? | className?
 */
export var Tabs = function (props) {
    var className = props.className, styleType = props.styleType, children = props.children, onSelect = props.onSelect;
    var classes = classNames('tabs-nav', className, {
        'tabs-underline': styleType === 'underline',
        'tabs-outline': styleType === 'outline'
    });
    var _a = useState(0), activeIndex = _a[0], setActiveIndex = _a[1];
    function handleClick(index, disabled) {
        if (disabled) {
            return;
        }
        setActiveIndex(index);
        if (typeof onSelect === 'function') {
            onSelect(index);
        }
    }
    /***--- 导航区域 ---**/
    var childrenComponent = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var isLabelDisabled = childElement.props.disabled ? childElement.props.disabled : false;
            var tabsLabelClasses = classNames('tabs-label', {
                'tabs-label-active': activeIndex === index,
                'tabs-label-disabled': childElement.props.disabled
            });
            var handleChildClick = function () {
                handleClick(index, isLabelDisabled);
            };
            return (React.createElement("li", { key: index, className: tabsLabelClasses, onClick: handleChildClick }, childElement.props.label));
        });
    };
    /***--- 内容区域 ---**/
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            // console.log(childElement)
            if (displayName === 'TabsItem') {
                return React.cloneElement(childElement, { isActive: activeIndex === index });
            }
            else {
                console.error("Warning: Tabs has a child which is not a TabsItem component");
            }
        });
    };
    return (React.createElement("div", null,
        React.createElement("nav", { className: classes },
            React.createElement("ul", { className: "tabs-ul" }, childrenComponent())),
        renderChildren()));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    styleType: 'underline'
};
export default Tabs;
