import React from 'react'
import Upload from '../components/Upload'
import Icon from '../components/Icon'


function UploadCom() {
  return (
    <>
      <Upload
        action='https://run.mocky.io/v3/bf320cd5-28e3-4081-b426-66e4ea0cd491'
        onChange={() => {console.log(123)}}
        // defaultFileList={() => {console.log(123)}}
        onRemove={() => {console.log(123)}}
        // beforeUpload={() => {console.log(123)}}
        onError={() => {console.log(123)}}
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
    </>
  )
}

export default UploadCom