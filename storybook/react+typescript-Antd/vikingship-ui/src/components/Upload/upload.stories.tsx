import React  from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
// import Button from '../Button/button'
import Icon from '../Icon/icon'

// 上传前检测文件大小  直接返回布尔值
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big')
//     return false
//   }
//   return true
// }

// 上传前 改变文件名 返回 promise
// const filePromise = (file: File) => {
//   const newFile = new File([file], 'new_name.docx', {type: file.type})
//   return Promise.resolve(newFile)
// }

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

const SimpleUpload = () => {
  return (
    <Upload
      action='https://run.mocky.io/v3/bf320cd5-28e3-4081-b426-66e4ea0cd491'
      onChange={action('changed')}
      defaultFileList={defaultFileList}
      onRemove={action('removed')}
      // beforeUpload={filePromise}
      onError={action("error")}
      name="fileName"
      // data={{ 'key': 'value' }}
      // headers={{'X-Powered-By': 'vikingship'}}
      // accept=".jpg"
      accept=".png"
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br/>
      <p>Drag file over to upload</p>
    </Upload>
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
