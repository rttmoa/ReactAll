import { readState } from '@/apis';
import KpToken from '@/components/KpToken';
import { useWeb3React } from '@web3-react/core';
import usePriceFeed from '../Covalent';
import styles from './index.less';
import LendingPool from '@/abis/LendingPool.json';
import DataProvider from '@/abis/DataProvider.json';
import { getPoolAddr, getTokenByAddress, getTokenList } from '@/constants';
import { getContractAddr } from '@/constants/addresses';
import { toFloat } from '@/utils';
import { SetStateAction, useEffect, useState } from 'react';

const MarginDashboard = () => {
  const latestPrices = usePriceFeed();
  const { chainId, library, account } = useWeb3React();
  const [positions, setPositions] = useState([]);

  const updatePositionTable = async () => {
    if (!library) return;
    const res = await readState(
      library,
      DataProvider.abi,
      getContractAddr('dataProvider'),
      'getTraderPositions',
      [0, account],
    );
    if (!res) {
      console.warn('kpMarginDashboard, failed to fetch data from DataProvider');
    } else {
      const data = [];
      res.forEach((item) => {
        const collateral = getTokenByAddress(
          chainId,
          item.collateralTokenAddress,
        );
        const collateralAmount = toFloat(
          item.collateralAmount,
          collateral.decimals,
        );
        const collateralPrice = latestPrices[collateral.name];
        const long = getTokenByAddress(chainId, item.longTokenAddress);
        const longAmount = toFloat(item.longAmount, long.decimals);
        const longPrice = latestPrices[long.name];
        const short = getTokenByAddress(chainId, item.shortTokenAddress);
        const shortAmount = toFloat(item.shortAmount, short.decimals);
        const shortPrice = latestPrices[short.name];
        const token = collateral == short ? long : short;
        const pnl = longAmount * longPrice - shortAmount * shortPrice;
        data.push({
          token: token.name,
          side:
            collateral == short
              ? 'Long'
              : collateral == long
              ? 'Short'
              : 'Hedge',
          size: collateral == short ? shortAmount : longAmount,
          pnl: pnl,
          entryPrice:
            collateral == short
              ? collateral.name == 'USDC'
                ? longAmount / shortAmount
                : shortAmount / longAmount
              : collateral.name == 'USDC'
              ? shortAmount / longAmount
              : longAmount / shortAmount,
          leverage:
            collateral == short
              ? shortAmount / collateralAmount
              : longAmount / collateralAmount,
          liquidationPrice:
            (collateralAmount * collateralPrice + pnl) /
            (collateralAmount * collateralPrice),
          markPrice: latestPrices[token.name] || 0,
        });
      });
      setPositions(data);
    }
  };

  useEffect(() => {
    updatePositionTable();
  }, [library]);

  useEffect(() => {
    if (!library) return;
    library.on('block', () => {
      updatePositionTable();
    });

    return () => {
      library.removeAllListeners('block');
    };
  }, [library]);

  return (
    <>
      <hr />
      <div className={styles.boxItem}>
        <div>
          <p className={styles.small}>Position</p>
          <p className={styles.small}>Side</p>
        </div>
        <div>
          <p className={styles.small}>Size</p>
          <p className={styles.small}>PnL</p>
        </div>
        <div>
          <p className={styles.small}>Entry Price</p>
          <p className={styles.small}>Leverage</p>
        </div>

        <div>
          <p className={styles.small}>Mark Price</p>
          <p className={styles.small}>Liquidation Price</p>
        </div>
      </div>
      {positions.map((position) => (
        <div className={`${styles.boxItem} ${styles.light}`}>
          <div>
            <p className={styles.title}>
              {/* <KpToken icon="/eth.svg" name="ETH" price="$1839.98" /> */}
              <p className={styles.title}>{position.token}</p>
              <p className={styles.small}>{position.side}</p>
            </p>
          </div>
          <div>
            <p className={styles.title}>{position.size}</p>
            <p className={styles.small}>{position.pnl}</p>
          </div>
          <div>
            <p className={styles.title}>${position.entryPrice}</p>
            <p className={styles.small}>{position.leverage}x</p>
          </div>
          <div>
            <p className={styles.title}>${position.markPrice}</p>
            <p className={styles.small}>${position.liquidationPrice}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default MarginDashboard;
