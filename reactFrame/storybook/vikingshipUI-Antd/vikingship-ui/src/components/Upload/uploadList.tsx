import React, { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progress/progress'

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  // console.log(fileList);

  return (
    <ul className="viking-upload-list">
      {fileList.map(item => {
        return (
          <li className="viking-upload-list-item" key={item.uid}>
            {/* 左侧文件名 */}
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" /> {item.name}
            </span>
            {/* 右侧图标状态 - 成功、失败、加载中 */}
            <span className="file-status">
              {['uploading','ready'].includes(item.status!) && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            {/* 右侧隐藏的关闭图标 */}
            <span className="file-actions">
              <Icon icon="times" onClick={() => { onRemove(item)}} />
            </span>
            {/* 进度条 */}
            {item.status === 'uploading' && <Progress percent={item.percent || 0} />}
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList
