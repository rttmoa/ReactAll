import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { isEmpty } from 'project-libs';
import OrderItem from '../Item';
import { ShowLoading } from '@/components';
import { OrderSkeletons } from '@/skeletons';



/***--- 未支付 / 已支付 Item ---**/
export default function (props) {
  const [state, setState] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      // console.log(props)
      if(isEmpty(props?.orders)){
        setState(true)
      }
    }, 1500);
  }, [])

  // 这个 orders 是根据 type 去发的请求  是请求已完成还是未完成的数据
  return (
    <div>
      {isEmpty(props?.orders) ?  <>{state ? <ShowLoading showLoading={false}/> : <OrderSkeletons/>}</> :
        <div className='tab-lists'>
          {props.orders.map(item => (
            <OrderItem type={props.type} key={item.id} {...item} />
          ))}
          <ShowLoading showLoading={props.showLoading}/>
        </div>
      }
    </div>
  )
}
