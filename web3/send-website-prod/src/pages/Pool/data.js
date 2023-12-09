import { Table } from 'antd';
import TokenBalance from '@/components/TokenBalance';
//  network
export const networkColumns = [
  {
    title: 'Network',
    width: '20%',
    dataIndex: 'network',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a - b,
    showSorterTooltip: false,
    render: (text) => text && text.map(item => <><img style={{ width: '30px', marginRight: '5px' }} src={item.icon} /><b>{item.name}</b></>) || <span></span>
  },
  {
    title: 'Asset',
    width: '20%',
    dataIndex: 'assets',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // sorter: (a, b) => a.name.length - b.name.length,
    // showSorterTooltip: false,
    render: (text) => text && text.map((item, index) => {
      if (index < 3) {
        return <img style={{ width: '20px', marginRight: '5px' }} src={item.icon} />
      }
      if (index == 3) {
        return '+' + (text.length - 3);
      }
    }) ||
      <span></span>
  },
  {
    title: 'Liquidity',
    width: '20%',
    dataIndex: 'liquidity',
    sorter: (a, b) => a.totalSupply - b.totalSupply,
    showSorterTooltip: false,

  },
  {
    title: 'Volume (24h)',
    width: '20%',
    dataIndex: 'vol24h',
    sorter: (a, b) => a.supplyApr - b.supplyApr,
    showSorterTooltip: false,
  },
  {
    title: 'Volume (7d)',
    width: '20%',
    dataIndex: 'vol7d',
    sorter: (a, b) => a.totalBorrow - b.totalBorrow,
    showSorterTooltip: false,

  },
  {

    title: 'APR',
    dataIndex: 'apr',
    sorter: (a, b) => a.borrowApr - b.borrowApr,
    showSorterTooltip: false,
  },
  Table.EXPAND_COLUMN,
];
export const childNetworkColumns = [

  {
    title: 'Network',
    width: '20%',
    dataIndex: 'network',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a - b,
    showSorterTooltip: false,
    render: (text) => text && text.map(item => <><img style={{ width: '30px', marginRight: '5px' }} src={item.icon} /><b>{item.name}</b></>) || <span></span>
  },
  {
    title: 'Asset',
    width: '20%',
    dataIndex: 'assets',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // sorter: (a, b) => a.name.length - b.name.length,
    // showSorterTooltip: false,
    render: text => {
      return text && text.map(item => <><img style={{ width: '30px', marginRight: '5px' }} src={item.icon} />{item.name}</>) || <span></span>
    },
  },
  {
    title: 'Liquidity',
    width: '20%',
    dataIndex: 'liquidity',
    sorter: (a, b) => a.totalSupply - b.totalSupply,
    showSorterTooltip: false,

  },
  {
    title: 'Volume (24h)',
    width: '20%',
    dataIndex: 'vol24h',
    sorter: (a, b) => a.supplyApr - b.supplyApr,
    showSorterTooltip: false,
  },
  {
    title: 'Volume (7d)',
    width: '20%',
    dataIndex: 'vol7d',
    sorter: (a, b) => a.totalBorrow - b.totalBorrow,
    showSorterTooltip: false,

  },
  {

    title: 'APR',
    dataIndex: 'apr',
    sorter: (a, b) => a.borrowApr - b.borrowApr,
    showSorterTooltip: false,
  },
  {
    width: '50px',
    render: () => <span><button style={{ opacity: '0' }} type="button" class="ant-table-row-expand-icon ant-table-row-expand-icon-expanded" aria-label="关闭行" aria-expanded="true"></button></span>
  },
];
export const dataNetwork = [
  {
    key: '1',
    assets: [{
      name: 'USDT',
      icon: 'usdt.svg'
    }, {
      name: 'BUSD',
      icon: 'busd.svg'
    },],
    network: [{ name: 'Ethereum', icon: 'eth.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%',
    childData: [
      {
        key: '11',
        assets: [{
          name: 'USDT',
          icon: 'usdt.svg'
        }],
        network: [{ name: 'Ethereum', icon: 'eth.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '7.87%',
      },
      {
        key: '12',
        assets: [{
          name: 'BUSD',
          icon: 'busd.svg'
        },],
        network: [{ name: 'Ethereum', icon: 'eth.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      }
    ],
  },
  {
    key: '2',
    assets: [{
      name: 'USDT',
      icon: 'usdt.svg'
    }, {
      name: 'BUSD',
      icon: 'busd.svg'
    }, {
      name: 'BNB',
      icon: 'bnb.svg'
    },
    {
      name: 'BTC',
      icon: 'btc.svg'
    },],
    network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%',
    childData: [
      {
        key: '11',
        assets: [{
          name: 'USDT',
          icon: 'usdt.svg'
        }],
        network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '7.87%',
      },
      {
        key: '12',
        assets: [{
          name: 'BUSD',
          icon: 'busd.svg'
        },],
        network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      },
      {
        key: '12',
        assets: [{
          name: 'BNB',
          icon: 'bnb.svg'
        },],
        network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      },
      {
        key: '12',
        assets: [{
          name: 'BTC',
          icon: 'btc.svg'
        },],
        network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      }
    ],
  },
  {
    key: '3',
    assets: [{
      name: 'USDT',
      icon: 'usdt.svg'
    }, {
      name: 'BUSD',
      icon: 'busd.svg'
    },],
    network: [{ name: 'Polygon', icon: 'polygon.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%',
    childData: [
      {
        key: '11',
        assets: [{
          name: 'USDT',
          icon: 'usdt.svg'
        }],
        network: [{ name: 'Polygon', icon: 'polygon.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '7.87%',
      },
      {
        key: '12',
        assets: [{
          name: 'BUSD',
          icon: 'busd.svg'
        },],
        network: [{ name: 'Polygon', icon: 'polygon.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      },

    ],
  }
];

// assets
export const assetColumns = [
  {
    title: 'Asset',
    width: '20%',
    dataIndex: 'assets',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // sorter: (a, b) => a.name.length - b.name.length,
    // showSorterTooltip: false,
    render: text => {
      return text && text.map(item => <><img style={{ width: '30px', marginRight: '5px' }} src={item.icon} /><b>{item.name}</b></>) || <span></span>
    },
  },
  {
    title: 'Network',
    width: '20%',
    dataIndex: 'network',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a - b,
    showSorterTooltip: false,
    render: (text) => text && text.map((item, index) => {
      if (index < 3) {
        return <img style={{ width: '20px', marginRight: '5px' }} src={item.icon} />
      }
      if (index == 3) {
        return '+' + (text.length - 3);
      }
    }) ||
      <span></span>
  },
  {
    title: 'Liquidity',
    width: '20%',
    dataIndex: 'liquidity',
    sorter: (a, b) => a.totalSupply - b.totalSupply,
    showSorterTooltip: false,

  },
  {
    title: 'Volume (24h)',
    width: '20%',
    dataIndex: 'vol24h',
    sorter: (a, b) => a.supplyApr - b.supplyApr,
    showSorterTooltip: false,
  },
  {
    title: 'Volume (7d)',
    width: '20%',
    dataIndex: 'vol7d',
    sorter: (a, b) => a.totalBorrow - b.totalBorrow,
    showSorterTooltip: false,

  },
  {

    title: 'APR',
    dataIndex: 'apr',
    sorter: (a, b) => a.borrowApr - b.borrowApr,
    showSorterTooltip: false,
  },
  Table.EXPAND_COLUMN,
];
export const childAssetColumns = [
  {
    title: 'Asset',
    width: '20%',
    dataIndex: 'assets',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // sorter: (a, b) => a.name.length - b.name.length,
    // showSorterTooltip: false,
    render: text => {
      return text && text.map(item => <><img style={{ width: '30px', marginRight: '5px' }} src={item.icon} /><b>{item.name}</b></>) || <span></span>
    },
  },
  {
    title: 'Network',
    width: '20%',
    dataIndex: 'network',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a - b,
    showSorterTooltip: false,
    render: (text) => text && text.length > 0 && <><img style={{ width: '30px', marginRight: '5px' }} src={text[0].icon} />{text[0].name}</>,
  },
  {
    title: 'Liquidity',
    width: '20%',
    dataIndex: 'liquidity',
    sorter: (a, b) => a.totalSupply - b.totalSupply,
    showSorterTooltip: false,

  },
  {
    title: 'Volume (24h)',
    width: '20%',
    dataIndex: 'vol24h',
    sorter: (a, b) => a.supplyApr - b.supplyApr,
    showSorterTooltip: false,
  },
  {
    title: 'Volume (7d)',
    width: '20%',
    dataIndex: 'vol7d',
    sorter: (a, b) => a.totalBorrow - b.totalBorrow,
    showSorterTooltip: false,

  },
  {
    title: 'APR',
    dataIndex: 'apr',
    sorter: (a, b) => a.borrowApr - b.borrowApr,
    showSorterTooltip: false,
  },
  {
    width: '50px',
    render: () => <span><button style={{ opacity: '0' }} type="button" class="ant-table-row-expand-icon ant-table-row-expand-icon-expanded" aria-label="关闭行" aria-expanded="true"></button></span>
  },
];
export const dataAssets = [
  {
    key: '1',
    assets: [{
      name: 'USDT',
      icon: 'usdt.svg'
    }],
    network: [{ name: 'Ethereum', icon: 'eth.svg' }, { name: 'Ethereum', icon: 'bnb.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%',
    childData: [
      {
        key: '11',
        assets: [{
          name: 'USDT',
          icon: 'usdt.svg'
        }],
        network: [{ name: 'Ethereum', icon: 'eth.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '7.87%',
      },
      {
        key: '12',
        assets: [{
          name: 'USDT',
          icon: 'usdt.svg'
        },],
        network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      }
    ],
  },
  {
    key: '2',
    assets: [{
      name: 'BUSD',
      icon: 'busd.svg'
    }],
    network: [{ name: 'Ethereum', icon: 'eth.svg' },
    { name: 'BNB', icon: 'bnb.svg' },
    { name: 'Polygon', icon: 'polygon.svg' },
    { name: 'Arbitrum', icon: 'arb.svg' },
    ],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%',
    childData: [
      {
        key: '11',
        assets: [{
          name: 'BUSD',
          icon: 'busd.svg'
        }],
        network: [{ name: 'Ethereum', icon: 'eth.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '7.87%',
      },
      {
        key: '12',
        assets: [{
          name: 'BUSD',
          icon: 'busd.svg'
        },],
        network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      },
      {
        key: '12',
        assets: [{
          name: 'BUSD',
          icon: 'busd.svg'
        },],
        network: [{ name: 'Polygon', icon: 'polygon.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      },
      {
        key: '12',
        assets: [{
          name: 'BUSD',
          icon: 'busd.svg'
        },],
        network: [{ name: 'Arbitrum', icon: 'arb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      }
    ],
  },
  {
    key: '3',
    assets: [{
      name: 'BTC',
      icon: 'btc.svg'
    }],
    network: [{ name: 'Ethereum', icon: 'eth.svg' }, { name: 'Ethereum', icon: 'bnb.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%',
    childData: [
      {
        key: '11',
        assets: [{
          name: 'BTC',
          icon: 'btc.svg'
        }],
        network: [{ name: 'Ethereum', icon: 'eth.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '7.87%',
      },
      {
        key: '12',
        assets: [{
          name: 'BTC',
          icon: 'btc.svg'
        },],
        network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      }
    ],
  },
  {
    key: '4',
    assets: [{
      name: 'ETH',
      icon: 'eth.svg'
    }],
    network: [{ name: 'Ethereum', icon: 'eth.svg' }, { name: 'Ethereum', icon: 'bnb.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%',
    childData: [
      {
        key: '11',
        assets: [{
          name: 'ETH',
          icon: 'eth.svg'
        }],
        network: [{ name: 'Ethereum', icon: 'eth.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '7.87%',
      },
      {
        key: '12',
        assets: [{
          name: 'ETH',
          icon: 'eth.svg'
        },],
        network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      }
    ],
  },
  {
    key: '5',
    assets: [{
      name: 'USDC',
      icon: 'usdc.svg'
    }],
    network: [
      { name: 'Ethereum', icon: 'eth.svg' },
      { name: 'BNB Chain', icon: 'bnb.svg' },
      { name: 'Arbitrum', icon: 'arbitrum.svg' },
      { name: 'Polygon', icon: 'polygon.svg' },
      { name: 'Arbitrum', icon: 'arb.svg' },
    ],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%',
    childData: [
      {
        key: '11',
        assets: [{
          name: 'USDC',
          icon: 'usdc.svg'
        }],
        network: [{ name: 'Ethereum', icon: 'eth.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '7.87%',
      },
      {
        key: '12',
        assets: [{
          name: 'USDC',
          icon: 'usdc.svg'
        },],
        network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      },
      {
        key: '12',
        assets: [{
          name: 'USDC',
          icon: 'usdc.svg'
        },],
        network: [{ name: 'Arbitrum', icon: 'arbitrum.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      },
      {
        key: '12',
        assets: [{
          name: 'USDC',
          icon: 'usdc.svg'
        },],
        network: [{ name: 'Polygon', icon: 'polygon.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      },
      {
        key: '12',
        assets: [{
          name: 'USDC',
          icon: 'usdc.svg'
        },],
        network: [{ name: 'Arbitrum', icon: 'arb.svg' }],
        liquidity: '$4,179,163.96',
        vol24h: '$26,068,439.18',
        vol7d: '$384,213.85',
        apr: '8.9%',
      }
    ],
  },
];
const tokenImg={
  'ETH-Mainnet':'eth.svg',
  'Optimism':'optimism.png',
  'BSC':'bnb.svg',
  'Base':'base.svg',
  'Arbitrum':'arb.svg'
}
// my pools
export const mypoololumns = [
  {
    title: 'Asset',
    width: '20%',
    // dataIndex: 'token_name',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // sorter: (a, b) => a.name.length - b.name.length,
    // showSorterTooltip: false,
    render: (data) => {
      return <><img style={{ width: '30px', marginRight: '5px' }} src={`${data.token_name.toLowerCase()}.svg`} /><b>{data.token_name}</b></>
    },
  },
  {
    title: 'Network',
    width: '20%',
    // dataIndex: 'chain_name',
    // render: text => {
    //   return text && text.map(item => <><img style={{ width: '30px', marginRight: '5px' }} src={item.icon} /><b>{item.name}</b></>) || <span></span>
    // },
    render: (data) => {
      return <><img style={{ width: '30px', marginRight: '5px' }} src={`${tokenImg[data.chain_name]}`} /><b>{data.chain_name}</b></>
    },
  },
  {
    title: 'Liquidity',
    width: '20%',
    render: data => <TokenBalance
      rpc={data.provider_url}
      tokenAddress={data.token_address}
      contractAddress={data.send_contract}
      decimals={data.decimals}
    />
  },
  {
    title: 'Volume (24h)',
    width: '20%',
    dataIndex: 'vol24h',
    sorter: (a, b) => a.supplyApr - b.supplyApr,
    showSorterTooltip: false,
  },
  {
    title: 'Volume (7d)',
    width: '20%',
    dataIndex: 'vol7d',
    sorter: (a, b) => a.totalBorrow - b.totalBorrow,
    showSorterTooltip: false,

  },
  {

    title: 'APR',
    dataIndex: 'apr',
    sorter: (a, b) => a.borrowApr - b.borrowApr,
    showSorterTooltip: false,
  },
  {
    width: '50px',
    render: () => <span><button style={{ opacity: '0' }} type="button" class="ant-table-row-expand-icon ant-table-row-expand-icon-expanded" aria-label="关闭行" aria-expanded="true"></button></span>
  },
];
export const dataMyPool = [
  {
    key: '1',
    assets: [{
      name: 'USDT',
      icon: 'usdt.svg'
    }],
    network: [{ name: 'Ethereum', icon: 'eth.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  },
  {
    key: '2',
    assets: [{
      name: 'USDC',
      icon: 'usdc.svg'
    }],
    network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  }
];
export const dataAvailable = [
  {
    key: '1',
    assets: [{
      name: 'BNB',
      icon: 'bnb.svg'
    }],
    network: [{ name: 'Polygon', icon: 'polygon.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  },
  {
    key: '2',
    assets: [{
      name: 'USDC',
      icon: 'usdc.svg'
    }],
    network: [{ name: 'Polygon', icon: 'polygon.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  },
  {
    key: '2',
    assets: [{
      name: 'ETH',
      icon: 'eth.svg'
    }],
    network: [{ name: 'Polygon', icon: 'polygon.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  }
];
export const dataTopPool = [
  {
    key: '1',
    assets: [{
      name: 'USDT',
      icon: 'usdt.svg'
    }],
    network: [{ name: 'Ethereum', icon: 'eth.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  },
  {
    key: '2',
    assets: [{
      name: 'USDC',
      icon: 'usdc.svg'
    }],
    network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  },
  {
    key: '1',
    assets: [{
      name: 'BNB',
      icon: 'bnb.svg'
    }],
    network: [{ name: 'Ethereum', icon: 'eth.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  },
  {
    key: '2',
    assets: [{
      name: 'BTC',
      icon: 'btc.svg'
    }],
    network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  },
  {
    key: '1',
    assets: [{
      name: 'Matic',
      icon: 'matic.svg'
    }],
    network: [{ name: 'Ethereum', icon: 'eth.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  },
  {
    key: '2',
    assets: [{
      name: 'ETH',
      icon: 'eth.svg'
    }],
    network: [{ name: 'BNB Chain', icon: 'bnb.svg' }],
    liquidity: '$4,179,163.96',
    vol24h: '$26,068,439.18',
    vol7d: '$384,213.85',
    apr: '15.9%'
  }
];