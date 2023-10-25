import React from 'react';
import Upload from '../components/Upload';
import Icon from '../components/Icon';
function UploadCom() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Upload, { action: 'https://run.mocky.io/v3/bf320cd5-28e3-4081-b426-66e4ea0cd491', onChange: function () { console.log(123); }, 
            // defaultFileList={() => {console.log(123)}}
            onRemove: function () { console.log(123); }, 
            // beforeUpload={() => {console.log(123)}}
            onError: function () { console.log(123); }, name: "fileName", 
            // data={{ 'key': 'value' }}
            // headers={{'X-Powered-By': 'vikingship'}}
            // accept=".jpg"
            accept: ".png", multiple: true, drag: true },
            React.createElement(Icon, { icon: "upload", size: "5x", theme: "secondary" }),
            React.createElement("br", null),
            React.createElement("p", null, "Drag file over to upload"))));
}
export default UploadCom;
