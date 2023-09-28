import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import Alert from './alert'



export const defaultAlert = () => (
  <Alert closable={true} title="这 是 alert!" type="primary" />
)

export const alertWithType = () => (
  <>
    <Alert type="success" closable title="this is Success" />
    <Alert type="danger" closable title="this is Danger!" />
    <Alert type="warning" closable={false} title="this is Warning!" />
  </>
)

export const alertWithChildren = () => (
  <>
    <Alert
      type="primary"
      closable
      title="提示标题欧亲"
      children="this is a long description"
      onClose={function noRefCheck(){}}
    />
    <Alert type="success">zhangsan</Alert>
  </>
)
export const useAlert = () => {
  const str = `
    export interface AlertProps {
    /** 标题 */
    title?: string;
    /** 是否显示关闭图标 */
    closable?: boolean;
    /** the close icon */
    customClose?: string;
    /** 关闭alert时触发的事件 */
    onClose?: (() => void);
    /** 描述 */
    children?: React.ReactNode;
    /** 类型 四种可选 针对四种不同的场景 */
    type: AlertType;
  }`
  return (
    <>
      <Alert
        // className
        // style
        type='success'
        title='test useAlert'
        closable={true}
        customClose='zhihu'
        onClose={() => { console.log("关闭的回调"); }}
      >
        <span>{str}</span>
      </Alert>
    </>
  )
}
// AlertProps { title, closeable, customClose, onClose, children, type }
storiesOf('Alert Component', module)
  .add("useAlert", useAlert)
  .add('Alert Component', defaultAlert)
  .add('不同样式的 Alert', alertWithType)
  .add('添加描述的及回调 Alert', alertWithChildren)