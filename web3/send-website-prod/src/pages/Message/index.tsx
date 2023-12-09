import React, { useEffect, useState,useRef } from 'react'
import { Button, Card, InputNumber, Input, Divider, Switch } from 'antd';
import { Menu, Space } from 'antd';
import { EditOutlined, SettingOutlined,TeamOutlined, PlusOutlined, ArrowLeftOutlined, MessageOutlined, UnlockOutlined,SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MessageItem from './MessageItem';
import DetailItem from './DetailItem';
import HeadImg from './HeadImg';

export default function Message() {

  const [action, setAction] = useState(0);
  const [iw, setIw] = useState(100);
  const inputRef = useRef(null);
  const [list, setList] = useState([{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  },{
    checked:false,
  }]);
  // useEffect(()=>{

  // },)
  return (
    <div>
      <div className='message'>
        <div className='msg_main' >
          <div className='friendlist msg_flex msg_flex_col'>
            <div className='header msg_flex msg_flex_between msg_items_center msg_border_b'>
              <div><Input ref={inputRef} style={{ color: 'white', background: 'transparent',border: 'transparent', height: '30px' }} prefix={<SearchOutlined onClick={()=>{
                inputRef.current.focus({
                  cursor: 'start',
                });
              }} style={{ color: '#ffffff',cursor:'pointer' }} />}/></div>
              <div ><TeamOutlined />&nbsp;<EditOutlined onClick={() => setAction(0)} /></div>
            </div>
            <div className='msg_list'>
              {
                list.map((item,index)=> <div onClick={()=>{
                  setList(data=>{
                      const newData=data.map(item=>{item.checked=false;return item;}).map((item,index2)=>{
                        if(index2==index){
                          item.checked=true;
                        }
                        return item;
                      })
                      return newData;
                  });
                  setAction(1);
                }}><MessageItem checked={item.checked} /></div>)
              }
              <p><br /></p>
            </div>
          </div>
          <div className='msgdetails msg-w-full msg_flex msg_flex_col'>
            {/* 新建聊天 */}
            {
              action == 0 && <>
                <div className='header msg_flex msg_flex_between msg_items_center msg_border_b'>
                  <div onClick={() => setAction(1)}><ArrowLeftOutlined />&nbsp;&nbsp;&nbsp;&nbsp;Send Message</div>
                </div>
                <div className='msg-max-w-sm'>
                  {/* <h1 className='msg-mt-8 msg-mb-4'>Create thread</h1> */}
                  <p>Enter recipient address</p>
                  <Input style={{ color: 'white', background: '#040000', height: '50px' }} />
                  {/* <p className='mst-opacity-50 msg-font-base'>Link twitter twitter.cardinal.so and domain naming.bonfida.org</p> */}
                  <Divider className='mst-opacity-50' style={{ background: '#ffffff' }} />
                  <div className='msg_flex msg_flex_between msg_bg_subtle_night msg-py-3 msg-px-4 msg-rounded-2xl'>
                    <span><MessageOutlined />&nbsp;&nbsp;Off-chain</span>
                    <Switch />

                  </div>
                  <br />
                  <div className='msg_flex msg_flex_between msg_bg_subtle_night msg-py-3 msg-px-4 msg-rounded-2xl'>
                    <span><UnlockOutlined />&nbsp;&nbsp;Unencrypted</span>
                    <Switch />

                  </div>
                  <br />
                  <Button type='primary' size='large' className='cardButton'>Send Message</Button>
                </div>
              </>
            }
            {/* 聊天记录 */}
            {
              action == 1 && <>
                <div className='header msg_flex msg_flex_between msg_items_center msg_border_b'>
                  <HeadImg data={list}/>
                  <div><SettingOutlined /></div>
                </div>
                <div className='detail_list msg_flex msg-flex-col-reverse'>
{
   list.map((item,index)=><DetailItem />)
}
                  
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem self/>
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem /><DetailItem self/><DetailItem self/><DetailItem self/><DetailItem self/>
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                </div>
                <div style={{ padding: '10px' }}>
                  <Input style={{ color: 'white', background: '#040000' }} className='sendInput' suffix={
                    <PlusOutlined style={{ color: '#ffffff' }} />
                  } />
                  <p>0/100</p>
                </div>
              </>
            }

          </div>
        </div>
      </div>
    </div>
  )
}
