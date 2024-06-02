import React, { useEffect, useState } from 'react'
import { Menu, Dropdown, Button, Divider, Space, Modal, Table } from 'antd';
import { CloseOutlined, EllipsisOutlined, HistoryOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import cbridge from '../assets/cbridge.png'
import sendFinance from '@/assets/Send-Logo.svg'
import { ReactComponent as ViewIcon } from "@/assets/icon_open.svg";
import Tabs from './Tabs';
import { hooks } from '@/connectors/metaMask'
import MetaMaskCard from "../MetaMaskCard";
import { hideMiddleChars } from "@/utils";
import { getBlockExplorerUrls } from "@/constants/addresses";
import { MAINNET_CHAINS } from "@/chains";
import './index.less'
import { connect } from 'umi';

 function Header(props:any) {
  const menu = (
    <Menu
      items={[
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" href="" style={{ color: 'white' }}>
              Docs
            </a>
          ),
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" href="" style={{ color: 'white' }}>
              FAQ
            </a>
          ),
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" href="" style={{ color: 'white', }}>
              3rd menu item
            </a>
          ),
        },
        // {
        //     label: (
        //       <Button type='primary' style={{borderRadius:'12px'}}>Connect Wallet</Button>
        //     ),
        //   }
      ]}
      className="menu" style={{ textAlign: 'center', backgroundColor: 'rgb(35, 37, 48)', borderRadius: '12px' }} />
  );
  const [historyOpen, setHistoryOpen] = useState(false);
  const columns = [
    {
      title: 'Recipient Address',
      dataIndex: 'addressFrom',
      key: 'addressFrom',
      render: (text:string) => <a>{hideMiddleChars(text)}</a>,
    },
    {
      title: 'From',
      dataIndex: 'chainFrom',
      key: 'chainFrom',
      render: (text:string,data:any) => <a target='_blank' href={MAINNET_CHAINS[text]?.blockExplorerUrls[0]+'tx/'+data.hashFrom} style={{display:'flex',alignItems:'center',gap:'5px'}}><img width={16} src={MAINNET_CHAINS[text]?.icon}/>{MAINNET_CHAINS[text]?.name}<ViewIcon width={16} height={16} fill='#fff' /></a>,
    },
    {
      title: 'To',
      dataIndex: 'chainTo',
      key: 'chainTo',
      render: (text:string,data:any) =>  <a target='_blank' href={`${MAINNET_CHAINS[text]?.blockExplorerUrls[0]}tx/${data.hashTo}`} style={{display:'flex',alignItems:'center',gap:'5px'}}><img width={16} src={MAINNET_CHAINS[text]?.icon}/>{MAINNET_CHAINS[text]?.name}<ViewIcon width={16} height={16} fill='#fff' /></a>,
    },
    {
      title: 'Value',
      dataIndex: 'tokenAmount',
      key: 'tokenAmount',
      render: (text:string,data:any) =><span><strong>{text}</strong>&nbsp;{data.tokenSymbol}</span>
    },
    {
      title: 'Mode',
      dataIndex: 'mode',
      key: 'mode',
      render:()=>'FlashBridge'
    },
    {
      title: 'Time',
      dataIndex: 'cratetime',
      key: 'time',
      render:(text:string)=>dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    }
  ];

  const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks
  const chainId = useChainId();

  return (
    <header style={{ padding: '0 30px' }}>

      <div className='left' style={{ display: 'flex', alignItems: 'center', width: '200px' }}>
        <img src={sendFinance} className='topImage' ></img>
        {/* <Button className='btn'>1</Button>
                    <Button className='btn'>1</Button>
                    <Button className='btn'>1</Button> */}
      </div>

      <div className='mid' style={{ display: 'flex', alignItems: 'center' }}>
        <Tabs></Tabs>
      </div>
      <div className='right' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {chainId && <Button onClick={() => setHistoryOpen(true)} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} type='primary' className='topConnect'>
          <HistoryOutlined /> History
        </Button>}
        <MetaMaskCard />
        {/* <Button type='primary' className='topConnect'>Connect Wallet</Button> */}

      </div>
      <Modal width={1000} open={historyOpen} onCancel={() => setHistoryOpen(false)} footer={null} closeIcon={<CloseOutlined style={{ color: '#fff' }} />}>
        <Table columns={columns} dataSource={props.history.data} />
      </Modal>
    </header >
  )
}


export default connect(({ history }: any) => ({
  history,
}))(Header);
