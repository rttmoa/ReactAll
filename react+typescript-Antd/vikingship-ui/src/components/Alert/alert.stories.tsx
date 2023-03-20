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

storiesOf('Alert Component', module)
  .add('Alert', defaultAlert)
  .add('不同样式的 Alert', alertWithType)
  .add('添加描述的及回调 Alert', alertWithChildren)
