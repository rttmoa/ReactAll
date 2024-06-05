import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Web3ReactHooks } from '@web3-react/core';
import { useEffect, useState } from 'react';

function useBalances(provider?: ReturnType<Web3ReactHooks['useProvider']>, accounts?: string[]): BigNumber[] | undefined {
    const [balances, setBalances] = useState<BigNumber[] | undefined>();

    useEffect(() => {
        if (provider && accounts?.length) {
            let stale = false;

            void Promise.all(accounts.map(account => provider.getBalance(account))).then(balances => {
                if (stale) return;
                setBalances(balances);
            });

            return () => {
                stale = true;
                setBalances(undefined);
            };
        }
    }, [provider, accounts]);
    return balances;
}

export function Accounts({ accounts, provider, ENSNames }: { accounts: ReturnType<Web3ReactHooks['useAccounts']>; provider: ReturnType<Web3ReactHooks['useProvider']>; ENSNames: ReturnType<Web3ReactHooks['useENSNames']> }) {
    const balances = useBalances(provider, accounts);

    if (accounts === undefined) return null;
    return (
        <div style={{display:'flex', justifyContent:'space-between' }}>
            Accounts:{' '}
            <b>
                {accounts.length === 0
                    ? 'None'
                    : accounts?.map((account, i) => {
                          let address = ENSNames?.[i];
                          let apprAddr = ""
                          if (address) {
                            apprAddr = address.substring(0, 10) + '...' + address.substring(address.length - 4, address.length);
                          } else {
                            apprAddr = account.substring(0, 10) + '...' + account.substring(account.length - 4, account.length);
                          }
                          return (
                              <ul key={account} style={{ margin: 0, overflow: 'hidden' }}>
                                  {apprAddr}
                                  {/* {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null} */}
                              </ul>
                          );
                      })}
            </b>
        </div>
    );
}
