import React from 'react'
import Alert from '../components/Alert'

function AlertDemo() {
  return (
    <>
      <Alert title="提示标题欧亲" type='primary'>this is a long description!</Alert> 
      <hr/>
      <Alert type='warning'>this is a long description!</Alert>
      <hr />
      <Alert title='标题1' type="success" closable={false} customClose="1" onClose={() => console.log(123)}>自定义</Alert>
    </>
  )
}

export default AlertDemo;
