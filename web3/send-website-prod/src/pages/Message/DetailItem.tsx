import React, { useEffect } from 'react'
import { Button, Card, InputNumber, Input } from 'antd';
import { Menu, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function MessageItem(props) {

  const {self}=props;
  // useEffect(()=>{

  // },)
  return (
    <div style={{marginBottom:'10px'}}>
      <div className={`msg_flex ${!self&&'msg-justify-end'}  msg-ml-10`}>
        <div className='msg_flex msg-flex-col' style={{paddingRight:'20px'}}>
            <div className={`msg_flex msg-flex-col msg-justify-end msg_items_center msg-border ${!self&&'msg_bg_subtle_night'}`}>
              <div className='msg-py-2 msg-px-4'>
                  <div>123</div>
                  <div className='mst-opacity-50 msg-xs-small'>10:28 PM</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
