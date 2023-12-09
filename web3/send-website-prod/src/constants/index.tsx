import { getContractAddr } from './addresses';

// available networks
const networks = [
  {
    name: 'Polygon',
    img: '/polygon.svg',
    id: 80001,
    checked: false,
  },
  {
    name: 'Arbitrum',
    img: '/art.png',
    id: 69,
    checked: false,
  },
  {
    name: 'HardHat',
    img: '/polygon.svg',
    id: 31337,
    checked: false,
  },
  {
    name: 'Ganache',
    img: '/polygon.svg',
    id: 1337,
    checked: false,
  },
];

const defaultChainId = 80001;

export const getNetworks = () => networks;
export const getDefaultNetwork = () =>
  networks.find((net) => net.id == defaultChainId);

// lending pools
export const pools = {
  'main pool': {
    id: 1,
    address: getContractAddr('mainPool'),
  },
  'eth-usdc pool': {
    id: 2,
    address: getContractAddr('ethUsdcPool'),
  },
};

export const getPoolAddr = (key) => pools[key].address;

// tokenlist
export const tokenListPolygon = [
  // {
  //   key: '1',
  //   name: 'BTC',
  //   pools: [1],
  //   icon: '/btc.svg',
  // },
  // {
  //   key: '2',
  //   name: 'MATIC',
  //   address: getContractAddr('matic'),
  //   decimals: 18,
  //   pools: ['main pool', 'eth-usdc pool'],
  //   icon: '/matic.svg',
  // },
  // {
  //   key: '3',
  //   name: 'ETH',
  //   address: getContractAddr('eth'),
  //   decimals: 18,
  //   icon: '/eth.svg',
  //   pools: ['main pool', 'eth-usdc pool'],
  // },
  // {
  //   key: '4',
  //   name: 'USDC',
  //   address: getContractAddr('usdc'),
  //   decimals: 6,
  //   icon: '/usdc.svg',
  //   pools: ['main pool'],
  // },
  // {
  //   key: '7',
  //   name: 'BNB',
  //   address: getContractAddr('usdc'),
  //   decimals: 6,
  //   icon: '/bnb.svg',
  //   pools: ['main pool'],
  // },
  {
    key: '5',
    name: 'USDT',
    address: getContractAddr('usdc'),
    decimals: 6,
    icon: '/usdt.svg',
    pools: ['main pool'],
  },
  {
    key: '4',
    name: 'USDC',
    address: '0x74E3fcEB6D94F1445E2Ed3a2A495578B3E04Af63',
    decimals: 6,
    icon: '/usdc.svg',
    pools: ['main pool'],
  },
  // {
  //   key: '6',
  //   name: 'BUSD',
  //   address: getContractAddr('usdc'),
  //   decimals: 6,
  //   icon: '/busd.svg',
  //   pools: ['main pool'],
  // },
];

// tokenlist
export const tokenListGanache = [
  // {
  //   key: '1',
  //   name: 'BTC',
  //   pools: [1],
  //   icon: '/btc.svg',
  // },
  {
    key: '2',
    name: 'MATIC',
    address: '0x1Df2FAa18c6D0EAa5CE77feEC82AF5e7ae03D56e',
    decimals: 18,
    pools: ['main pool', 'eth-usdc pool'],
    icon: '/matic.svg',
  },
  {
    key: '3',
    name: 'ETH',
    address: '0x632e32C4003B6e71DA94eD5D05ED15044F97Bf7a',
    decimals: 18,
    icon: '/eth.svg',
    pools: ['main pool', 'eth-usdc pool'],
  },
  {
    key: '4',
    name: 'USDC',
    address: '0x74E3fcEB6D94F1445E2Ed3a2A495578B3E04Af63',
    decimals: 6,
    icon: '/usdc.svg',
    pools: ['main pool'],
  },
];

export const tokenListOp = [
  // {
  //   key: '1',
  //   name: 'BTC',
  //   pools: [1],
  //   icon: '/btc.svg',
  // },
  // {
  //   key: '2',
  //   name: 'OP',
  //   pools: [1, 2],
  //   icon: '/optimism.png',
  // },
  {
    key: '3',
    name: 'ETH',
    icon: '/eth.svg',
    pools: ['main pool'],
  },
  {
    key: '4',
    name: 'USDC',
    icon: '/usdc.svg',
    pools: ['main pool'],
  },
];

export const getTokenList = (chainId: Number | undefined) =>
  ({
    69: tokenListOp,
    80001: tokenListPolygon,
    31337: tokenListPolygon,
    1337: tokenListGanache,
  }[chainId || defaultChainId]);

export const getToken = (chainId, symbol) => {
  const tokenList = getTokenList(chainId);
  return tokenList.find((token) => token.name == symbol);
};

export const getTokenByAddress = (chainId, address) => {
  const tokenList = getTokenList(chainId);
  return tokenList.find((token) => token.address == address);
};

export interface TokenInfo {
  name: string;
  address: string;
  decimals: number;
}

export const SEND_CONSTANTS: {
  [chain_id: number]: {
    chain_name: string;
    provider_url: string;
    send_contract: string;
    start_block: number;
    token: {
      [token_name: string]: TokenInfo;
    };
  };
} = {
  1: {
    chain_name: "ETH-Mainnet",
    provider_url: "https://eth-mainnet.public.blastapi.io",
    send_contract: "0x268EdDd8B4C9ec7E0e45300514e6946b3f6B7f97",
    start_block: 17985423,
    token: {
      USDT: {
        name: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6,
      },
      USDC: {
        name: "USDC",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6,
      },
    },
  },
  56: {
    chain_name: "BSC",
    provider_url:
      "https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
    send_contract: "0x6bc39f8de47fe6abfb05f55e0f6b216c5f3cbd00",
    start_block: 30908806,
    token: {
      USDT: {
        name: "USDT",
        address: "0x55d398326f99059fF775485246999027B3197955",
        decimals: 18,
      },
      USDC: {
        name: "USDC",
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        decimals: 18,
      },
    },
  },
  42161: {
    chain_name: "Arbitrum",
    provider_url:
      "https://arb-mainnet.g.alchemy.com/v2/L6XIuVuTl40vV1R9gcNoNo7j5g3jrI2T",
    send_contract: "0xd27c1Ea2086065dB1b8c609321B9EfBABE6E7369",
    start_block: 122014987,
    token: {
      USDT: {
        name: "USDT",
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        decimals: 6,
      },
      USDC: {
        name: "USDC",
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        decimals: 6,
      },
    },
  },
  8453: {
    chain_name: "Base",
    provider_url: "https://base.meowrpc.com",
    send_contract: "0x83859561036110d6a31d018bb51ca012f8f48d5c",
    start_block: 2710396,
    token: {
      USDC: {
        name: "USDC",
        address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
        decimals: 6,
      },
    },
  },
  10: {
    chain_name: "Optimism",
    provider_url:
      "https://opt-mainnet.g.alchemy.com/v2/84rJNCR4ZalEvn2_kGw8mJtFYUTdbMX7",
    send_contract: "0xbbac4d9d25835596dcf3978e1193454705eb16a6",
    start_block: 108304677,
    token: {
      USDT: {
        name: "USDT",
        address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
        decimals: 6,
      },
      USDC: {
        name: "USDC",
        address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
        decimals: 6,
      },
    },
  },
};

export default function getTokenInfo(chain_id: number, token_address: string) {
  if (!SEND_CONSTANTS[chain_id]) throw new Error("chain id not in constants");

  let targetToken;
  for (const token_name in SEND_CONSTANTS[chain_id].token) {
    if (SEND_CONSTANTS[chain_id].token[token_name].address == token_address) {
      targetToken = SEND_CONSTANTS[chain_id].token[token_name];
      break;
    }
  }
  return targetToken;
}

