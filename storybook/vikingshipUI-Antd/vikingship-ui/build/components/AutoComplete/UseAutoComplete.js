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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';
var UseAutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1]; // Input['value']
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1]; // 设置下拉框
    var _e = useState(-1), highlightIndex = _e[0], setHightlightIndex = _e[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 300); // 防抖
    // todo 监听 Click
    useClickOutside(componentRef, function () { setSuggestions([]); });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            setSuggestions([]);
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (res) {
                    setLoading(false);
                    setSuggestions(res);
                    if (res.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else
            setShowDropdown(false);
        setHightlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    // todo Input['onKeyDown'] 键盘事件
    var handleKeyDown = function (e) {
        var highlight = function (index) {
            if (index < 0)
                index = 0;
            if (index > suggestions.length)
                index = suggestions.length - 1;
            setHightlightIndex(index);
        };
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setShowDropdown(false);
                break;
            // default:
            //   break
        }
    };
    // todo Input['onChange'] 输入框事件改变 (英文时生效)
    var handleChange = function (e) {
        // console.log(e);
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    // 当回车键按下时
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        onSelect && onSelect(item);
        triggerSearch.current = false;
    };
    // todo 搜索列表
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: 'zoom-in-top', timeout: 300, onExited: function () { setSuggestions([]); } },
            React.createElement("ul", { className: 'viking-suggestion-list' },
                !loading && (React.createElement("div", { className: 'suggestions-loading-icon' },
                    React.createElement(Icon, { icon: "spinner", spin: true }))),
                suggestions.map(function (item, index) {
                    var cs = classNames('suggestion-item', { "is-active": index === highlightIndex });
                    return (React.createElement("li", { key: index, className: cs, onClick: function () { return handleSelect(item); } }, renderOption ? renderOption(item) : item.value));
                }))));
    };
    console.log(highlightIndex);
    console.log(suggestions);
    return (React.createElement("div", { className: 'viking-auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        (suggestions.length > 0) && generateDropdown()));
};
export default UseAutoComplete;
