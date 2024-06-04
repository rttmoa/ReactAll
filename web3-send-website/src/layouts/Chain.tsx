import type { Web3ReactHooks } from '@web3-react/core';

import { CHAINS } from '../chains';

export function Chain({ chainId }: { chainId: ReturnType<Web3ReactHooks['useChainId']> }) {
    if (chainId === undefined) return null;

    const name = chainId ? CHAINS[chainId]?.name : undefined;

    if (name) {
        return (
            <div style={{display: 'flex', justifyContent:'space-between' }}>
                <span style={{ marginRight: 10 }}>Chain: </span>
                <b>
                    {name} ({chainId})
                </b>
            </div>
        );
    }

    return (
        <div>
            Chain Id： <b>{chainId}</b>
        </div>
    );
}
