import { useState, useEffect } from "react";
import { Web3ReactProvider, Web3ReactHooks } from "@web3-react/core";

import type { MetaMask } from '@web3-react/metamask';
import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask';
import Footer from "./Footer";
import Header from "./Header";
import WalletProvider from "./WalletProvider";

import styles from './index.less'
import { Outlet } from 'umi';
const connectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks]
]

const BasicLayout = () => {
  const [currentChain, setCurrentChain] = useState(-1);

  const switchChain = (chainId: any) => {
    setCurrentChain(chainId);
  }
  useEffect(() => {
    const chainId=localStorage.getItem('chainId')
    chainId&& switchChain(chainId*1)
  }, []);
  return <Web3ReactProvider connectors={connectors}>
    <WalletProvider.Provider value={{ currentChain, switchChain }}>
      <div className={styles.main}>
        <Header />
        {/* <MetaMaskCard /> */}
        <div style={{ flex: '1 1 auto' }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </WalletProvider.Provider>
  </Web3ReactProvider>



}
export default BasicLayout;
