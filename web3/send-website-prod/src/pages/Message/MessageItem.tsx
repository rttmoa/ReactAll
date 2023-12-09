import React, { useEffect } from 'react'
import { Button, Card, InputNumber, Input } from 'antd';
import { Menu, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function MessageItem(props) {

  const { checked } = props;
  // useEffect(()=>{

  // },)
  return (
    <div className='msg_overflow_hidden msg_shrink_0'>
      <div className={`msg_flex msg_items_center msg_cursor_pointer msg_select_none msg_border_b msg_bg_subtle_hover ${checked && 'msg_bg_subtle_night'} msg-py-2 msg-px-4`}>
        <div className='msg_flex'>
          <div className='msg_flex msg_bg_neutral_900 msg-rounded-full msg-w-14 msg-h-14 msg_items_center msg-justify-center'>
            <div className='msg-text-lg'>
              <div className='msg-xs'>Send</div>
            </div>
          </div>
        </div>
        <div className='msg_flex msg-grow msg_flex_between msg-pr-2 msg-truncate'>
          <div className='msg-truncate msg-flex-col msg-max-w-full'>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '400' }}>doctor</div>
            </div>
            <div className='msg-truncate'>
              <div className='msg-truncate'><span style={{ display: 'inline-block', minWidth: '20px', height: '20px', borderRadius: '10px', textAlign: 'center', background: '#ff5c28', padding: '0 5px', fontSize: '12px' }}>221</span>&nbsp;you:hello</div>
            </div>
          </div>
          <div className='msg_flex msg-flex-col msg_items_end msg_flex_between'>
            <span style={{ fontSize: '12px', fontWeight: 'normal', color: 'rgba(255,255,255,0.4)' }}>0xeb...89e1</span>
            <span className="msg-opacity-30 msg-xs-small">11:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
