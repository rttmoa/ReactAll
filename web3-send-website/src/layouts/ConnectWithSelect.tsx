import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { useCallback, useEffect, useState, useContext } from 'react'
import { CHAINS, getAddChainParameters } from '../chains'
import './index.less';
function ChainSelect({
  activeChainId,
  switchChain,
  chainIds,
}: {
  activeChainId: number
  switchChain: (chainId: number) => void
  chainIds: number[]
}) {
  return (
    <>
      {chainIds.map((chainId) => (
        <div className='network' key={chainId} onClick={() => { switchChain(Number(chainId)) }}>
          <img src={CHAINS[chainId]?.icon} style={{ marginRight: '15px', width: '30px' }} />
          {CHAINS[chainId]?.name ?? chainId}
        </div>
      ))}
    </>

  )
}

export function ConnectWithSelect({
  connector,
  activeChainId,
  chainIds = Object.keys(CHAINS).map(Number),
  isActivating,
  isActive,
  error,
  switchChain,
}: {
  connector: MetaMask
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[]
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  switchChain: (chainId: number) => void
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(28, 27, 27)',
      border: ' 1px solid rgb(47, 52, 62)',
      borderRadius: '5px'
    }}>
      <ChainSelect activeChainId={activeChainId} switchChain={switchChain} chainIds={chainIds} />
    </div>
  )
}
