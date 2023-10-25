import React from 'react';
import axios from 'axios';
var UploadDemo = function () {
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            var uploadFile = files[0];
            var formData = new FormData();
            formData.append(uploadFile.name, uploadFile);
            axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (res) {
                console.log(res);
            });
        }
    };
    return (React.createElement("div", { className: "upload-demo", style: { marginTop: '100px', marginLeft: '100px' } },
        React.createElement("input", { type: "file", name: "myFile", onChange: handleFileChange })));
};
export default UploadDemo;
