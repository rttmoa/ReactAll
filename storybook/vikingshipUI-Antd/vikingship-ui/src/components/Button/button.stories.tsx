import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'
import UseButton from './UseButton'

const defaultButton = () => (
  <Button onClick={action('clicked')}>Default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg">Large button</Button>
    <Button size="sm">Small button</Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary">Primary button</Button>
    <Button btnType="default">Default Button</Button>
    <Button btnType="danger">Danger button</Button>
    <Button btnType="link" href="https://google.com">Link button</Button>
    <Button btnType="danger" disabled={true} size="sm" className='test'>测试按钮</Button>
  </>
)

const useButton = () => {
  return (
    <>
      {/* 可以添加HTML属性 */}
      <UseButton size='sm' btnType='primary' disabled>useButton</UseButton>
      <UseButton size='sm' btnType='default'>useButton</UseButton>
      <UseButton size='sm' btnType='danger'>useButton</UseButton>
      <UseButton size='sm' btnType='link' href="https://google.com">useButton</UseButton>
      <UseButton size='sm' btnType='danger' disabled>useButton</UseButton>
      <UseButton size='sm' btnType='danger' onChange={() => {}}>useButton</UseButton>
      <UseButton size='lg' btnType='danger' className='useButton'>useButton</UseButton>
    </>
  )
}
storiesOf('Button Component', module)
.add('useButton', useButton)
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)
