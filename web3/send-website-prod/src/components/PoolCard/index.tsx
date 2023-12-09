import React from 'react'
import { Button } from 'antd'
import './index.less'
import Usdt from '@/assets/USDT.svg'
import Ethereum from '@/assets/ETH-01.svg';
import Arbitrum from '@/assets/Arbitrum-01.svg';
import Fox from '@/assets/fox-logo-01-01.svg';
import Polygon from '@/assets/polygon-matic-logo.svg';
import { Link } from 'react-router-dom'
export default function PoolCard(props) {
  const { tokenName, tokenIcon, chainName, chainIcon } = props;
  return (
    <div id='poolCard'>
      {/* <Link to='/farm'> */}
      <div className='cardBtn'>
        <div className='mainCard'>
          <div className='cardTop'>
            <div className='topLeft'>
              <img style={{width:'30px',marginRight:'10px'}} src={tokenIcon}></img>
              <div className='tokenName'>{tokenName}</div>
            </div>
            <div className='chain'>
              <div style={{ background: '#505050', borderRadius: '20px', fontSize: '10px', minWidth: '75px', padding: '2px 10px',display:'flex',alignItems:'center',gap:'5px'}}>
                <img width={16} src={chainIcon}/>
                {chainName}
              </div>
            </div>

          </div>
          <div className='cardBottom'>
            <div className='bot'>
              <div className='liquidityNum'>$111M</div>
              <label>Liquidity</label>
            </div>
            <div className='bot'>
              <div className='volumeNum'>620.5</div>
              <label>Volume</label>
            </div>
            <div className='bot'>
              <div className='walletBalance'>-</div>
              <label>Wallet Balance</label>
            </div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  )
}
