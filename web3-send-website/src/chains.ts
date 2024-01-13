import type { AddEthereumChainParameter } from '@web3-react/types'

const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18,
}
const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'ETH',
  symbol: 'ETH',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string,
  id:number,
  icon:string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}
type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation }

export const MAINNET_CHAINS: ChainConfig = {
  56: {
    urls: ['https://bsc-dataseed.binance.org'],
    name: 'BNB Chain',
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://bscscan.com/'],
    icon:'/bnb.svg',id:56
  },
  42161: {
    id:42161,
    icon:'/arb.svg',
    urls: ['https://arb1.arbitrum.io/rpc'],
    name: 'Arbitrum One',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io/'],
  },
  1: {
    id:1,
    icon:'/eth.svg',
    urls: ['https://mainnet.infura.io/v3/'],
    name: 'Ethereum',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  8453: {
    id:8453,
    icon:'/base.svg',
    urls: ['https://mainnet.base.org'],
    name: 'Base',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://basescan.org/'],
  },
  10: {
    id:10,
    icon:'/optimism.png',
    urls: ['https://mainnet.optimism.io'],
    name: 'Optimism',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io/'],
  },
}
export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs
    }

    return accumulator
  },
  {}
)
