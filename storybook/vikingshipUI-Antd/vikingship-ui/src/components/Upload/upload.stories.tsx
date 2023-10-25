import React  from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
// import Button from '../Button/button'
import Icon from '../Icon/icon'

// 上传前检测文件大小  直接返回布尔值
const checkFileSize = (file: File) => {
  if (file.size < 1024 * 1024) { // 文件小于 1M 
    return true
  }
  console.log("文件太大");
  return false
}

// 上传前 改变文件名 返回 promise
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {type: file.type})
  return Promise.resolve(newFile)
}

const defaultFileList: UploadFile[] = [
  // { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30,  },
  // { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  // { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
  // { uid: '462', size: 1234, name: 'ready.md', status: 'ready', percent: 30 }, 
]

const SimpleUpload = () => {

  // 文件上传进度：子组件传递过来 Percentage 和 File
  const onProgress = (percentage: any, file: any) => {
    console.log('文件上传进度：', percentage);
  }
  // 服务器响应成功时：子组件传递过来 Data 和 File
  const onSuccess = (data: any, file: any) => {
    console.log("服务器响应成功时：", data);
  }
  // 服务器响应错误时：子组件传递过来 Error 和 File
  const onError = (err: any, file: File) => {
    console.log('服务器响应错误时', err, file);
  }
  // 服务器响应结果时：子组件传递过来 File 
  const onChange = (file: File) => {
    console.log('服务器响应结果时', file);
  }
  // 文件列表移除时，传递过来一个 File 属性
  const onRemove = (file: any) => {
    console.log("移除：", file);
  }
  return (
    <Upload
      action='https://run.mocky.io/v3/bf320cd5-28e3-4081-b426-66e4ea0cd491' // 提交地址
      // action="https://run.mocky.io/v3/8a19a432-1e59-46a8-9841-a92d98486bde"
      defaultFileList={defaultFileList} // ，默认文件列表
      beforeUpload={checkFileSize} // 上传之前校验 或 进行转换

      onProgress={onProgress} // 上传过程的事件
      onSuccess={onSuccess} // 上传成功的事件
      onError={onError}
      onChange={onChange}
      onRemove={onRemove}
      // onError={action("error")} // 上传失败的事件
      // onChange={action('changed')} // 上传行为改变
      // onRemove={action('removed')} // 移除上传的文件

      // headers={{'X-Powered-By': 'vikingship'}} // 添加自定义 header
      // name="fileName" // 添加name属性、代表发到后台的文件参数名称
      // data={{ 'key': 'value' }} // 上传所需的额外参数
      withCredentials={true}
      accept="."
      // accept={".jpg" || ".png" || ".jpeg" || ".webp" || ".gif"}
      multiple // 允许上传多个文件
      drag
    >
      <Icon icon="upload" size="4x" theme="secondary" />
      <br/><br/>
      <p>Drag file over to upload</p>
    </Upload>
  )
}

storiesOf('Upload （文件上传）', module)
  .add('Upload', SimpleUpload)
