import React, { useState, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import { Http, timer } from '@/utils';
import Img from './360-202.jpg'




export default function (props) {
  // console.log(props)
  const [state, setState] = useState()

  /**去支付 按钮 */
  const handlePay = async () => {
    const result = await Http({ // 默认是 post
      url: '/orders/pay',
      body: { id: props.id }
    });
    if(result){
      Toast.success('支付成功')
      window.location.reload();
    }
  }

  useEffect(() => {}, [])

  // 不管 type 是0还是1  都用此组件渲染数据，只是按钮不一定 判断结果用 renderPay
  const renderPay = () => {
    switch (props.type) {
      case 0:
        return <Button type='warning' size='small' onClick={handlePay}>去支付</Button>
      case 1:
        return <Button size='small'>已完成</Button>
      default:
        break;
    }
  };


  // 循环遍历此结构
  return (
    <div className='order-item'>
      {/* <img alt='order' src={props?.house?.imgs[0]?.url} /> */}
      <img alt='order' src={Img} />
      <div className='center'>
        <div className='title'>{props?.house?.name}</div>
        <div className='price'>￥{props?.house?.price}</div>
        <div className='time'>{timer(props?.createTime, 'day')}</div>
      </div>
      <div className='pay'>
        {renderPay()}
      </div>
    </div>
  )
}
