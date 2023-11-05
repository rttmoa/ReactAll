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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
/**
 * ### 通过点击或者拖拽上传文件
 */
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1]; // 文件上传列表
    // 更新文件上传状态：提交到后台更新状态
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    // <input type="file" /> 点击上传文件
    var handleClick = function () {
        if (fileInput.current) {
            // <input class="viking-file-input" type="file" accept="." multiple="" style="display: none;"></input>
            // 点击 <input /> 进行上传
            fileInput.current.click();
        }
    };
    // input['onChange'] 输入框Change事件
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        if (fileInput.current)
            fileInput.current.value = "";
    };
    // 移除文件列表中文件: 子组件传递过来的 File - onRemove
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    // todo 上传文件 (拖拽或上传，，提交到接口中)
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) { // 如果有 beforeUpload 校验，先校验 File
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) { // 上传文件之前 转换
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) { // 上传文件之前 验证
                    post(file);
                }
            }
        });
    };
    // todo 发送数据 （上传文件到接口中）
    var post = function (file) {
        var _file = {
            uid: Date.now() + '_upload_file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        // setFileList([_file, ...fileList]) // 这个方式返回是空的
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            // 请求头信息 
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            // 是否携带请求参数
            withCredentials: withCredentials,
            // 上传进度计算
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            },
        })
            .then(function (resp) {
            updateFileList(_file, { status: 'success', response: resp.data });
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        })
            .catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    // todo <Dragger onFile={file => { ...子组件中传递过来一个File }} /> 
    return (React.createElement("div", { className: "viking-upload-component", style: { backgroundColor: '#fafafa' } },
        React.createElement("div", { className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ? (React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children)) : (children),
            React.createElement("input", { className: "viking-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
// Upload.defaultProps = {
//   name: 'file'
// }
export default Upload;
