import React, { useState } from 'react';
import classNames from 'classnames';
/**
 * ### 文件上传拖拽到组件中
 * #### onFile()? & children
 */
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var classes = classNames('viking-uploader-dragger', { 'is-dragover': dragOver });
    // 放入盒子中 （完成）
    var handleDrop = function (e) {
        // console.log("handleDrop");
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    // 拖文件到DOM中 （一直触发）
    var handleDrag = function (e, over) {
        // console.log("handleDrag");
        e.preventDefault();
        setDragOver(over);
    };
    return (React.createElement("div", { className: classes, onDragOver: function (e) { handleDrag(e, true); }, onDragLeave: function (e) { handleDrag(e, false); }, onDrop: handleDrop }, children));
};
export default Dragger;
