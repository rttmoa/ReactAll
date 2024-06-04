import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';
import { Button, Dropdown } from 'antd';

import { getName } from '../utils/utils';
import { Accounts } from './Accounts';
import { Chain } from './Chain';
import WalletProvider from './WalletProvider';
import { CHAINS, getAddChainParameters } from '../chains';
import { ConnectWithSelect } from './ConnectWithSelect';
import { Status } from './Status';
import { hideMiddleChars } from '@/utils';
import { useCallback, useContext, useEffect, useState } from 'react';

interface Props {
    connector: MetaMask;
    activeChainId: ReturnType<Web3ReactHooks['useChainId']>;
    chainIds?: ReturnType<Web3ReactHooks['useChainId']>[];
    isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
    isActive: ReturnType<Web3ReactHooks['useIsActive']>;
    error: Error | undefined;
    setError: (error: Error | undefined) => void;
    ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
    provider?: ReturnType<Web3ReactHooks['useProvider']>;
    accounts?: string[];
}

export function Card({ connector, activeChainId, chainIds, isActivating, isActive, error, setError, ENSNames, accounts, provider }: Props) {
    const [desiredChainId, setDesiredChainId] = useState<number>(-1);
    const { currentChain } = useContext(WalletProvider)!;

    // 连接钱包 去切换链
    const switchChain = useCallback(
        async (desiredChainId: number) => {
            setDesiredChainId(desiredChainId);
            try {
                // 如果我们已经连接到所需的链，则返回
                const needConnected = desiredChainId === activeChainId;
                // 如果他们想连接到默认链并且我们已经连接，请返回
                const defaultConnected = desiredChainId === -1 && activeChainId !== undefined;
                if (needConnected || defaultConnected) {
                    setError(undefined);
                    return;
                }

                const res = await connector.activate(getAddChainParameters(desiredChainId));
                console.log('切换链，结果', res);
                localStorage.setItem('chainId', desiredChainId + '');
                setError(undefined);
            } catch (error: any) {
                setError(error);
            }
        },
        [connector, activeChainId, setError]
    );
    useEffect(() => {
        if (currentChain != -1) {
            switchChain(currentChain);
        }
    }, [currentChain]);
    return (
        <div style={{ zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Dropdown
                trigger={['click']}
                placement="bottomRight"
                dropdownRender={() => {
                    return <ConnectWithSelect connector={connector} activeChainId={activeChainId} chainIds={chainIds} isActivating={isActivating} isActive={isActive} error={error} switchChain={switchChain} />;
                }}>
                <Button style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} type="primary" className="topConnect">
                    {(accounts && accounts?.length > 0 && (
                        <>
                            <img src={CHAINS[activeChainId as number]?.icon} style={{ marginRight: '10px', width: '25px' }}></img>
                            {hideMiddleChars(accounts[0])}
                        </>
                    )) ||
                        'Connect Wallet'}
                </Button>
            </Dropdown>

            <div style={{ position: 'absolute', top: 50, right: 0 , width: 200}}>
                <div style={{ display: 'flex', justifyContent:'space-between' }}>
                    <b style={{ marginRight: 10 }}>{getName(connector)}</b>
                    <span style={{ marginBottom: '1rem' }}>
                        <Status isActivating={isActivating} isActive={isActive} error={error} />
                    </span>
                </div>
                <Chain chainId={activeChainId} />
                <div style={{ marginBottom: '1rem' }}>
                    <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
                </div>
            </div>
        </div>
    );
}
