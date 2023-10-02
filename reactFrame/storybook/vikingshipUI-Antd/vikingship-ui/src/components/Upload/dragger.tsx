import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'


// todo {drag ? <Dragger onFile={files => uploadFiles(files)}>{children}</Dragger> : children}

interface DraggerProps {
  onFile: (files: FileList) => void;
}
/**
 * ### 文件上传拖拽到组件中
 * #### onFile()?
 */
export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;

  const [ dragOver, setDragOver ] = useState(false);
  const classes = classNames('viking-uploader-dragger', { 'is-dragover': dragOver })
  
  // 放入盒子中 （完成）
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    // console.log("handleDrop");
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  }
  // 拖文件到DOM中 （一直触发）
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    // console.log("handleDrag");
    e.preventDefault();
    setDragOver(over);
  }
  return (
    <div className={classes}
      onDragOver={e => { handleDrag(e, true)}}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
