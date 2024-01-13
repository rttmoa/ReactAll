import { useEffect, useState } from 'react'
import { Button } from 'antd';

import { hooks, metaMask } from '../connectors/metaMask'
import {hooks as hooks2, network } from '../connectors/network'
import { Card } from './Card'

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function MetaMaskCard() {
  const chainId = useChainId()
  const chainId2 = hooks2.useChainId()
  
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [error, setError] = useState(undefined)

  // attempt to connect eagerly on mount
  // useEffect(() => {
  //   // void metaMask.connectEagerly().catch(() => {
  //   //   console.debug('Failed to connect eagerly to metamask')
  //   // })
  //   // void network.activate().catch(() => {
  //   //   console.debug('Failed to connect to network')
     
  //   // })
  //   debugger;
  // const a=  provider?.getSigner('0xebaD00B2BaD5a981658706d0373B893ed1DA89e1').connectUnchecked();
    
  //   console.log(chainId2,'chainId2')
  // }, [])

  return (
    <Card
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  )
}
