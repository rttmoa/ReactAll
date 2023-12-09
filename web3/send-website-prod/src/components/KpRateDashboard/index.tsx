import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import KpTabs from '@/components/KpTabs';

import styles from './index.less';

const RateDashboard = () => {
  const { chainId, library, account } = useWeb3React();
  const [orders, setOrders] = useState([]);
  const [trades, setTrades] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Orders');

  const updateOrdersTable = async () => {
    if (!library) return;
  };

  const updateTradesTable = async () => {
    if (!library) return;
  };

  useEffect(() => {
    updateOrdersTable();
    updateTradesTable();
  }, [library]);

  useEffect(() => {
    if (!library) return;
    library.on('block', () => {
      updateOrdersTable();
      updateTradesTable();
    });

    return () => {
      library.removeAllListeners('block');
    };
  }, [library]);

  return (
    <>
      <hr />
      <div style={{ width: '40%', textAlign: 'center' }}>
        <KpTabs
          tabType="rateDashboard"
          setSelectedTab={setSelectedTab}
          onChange={() => {}}
        />
      </div>
      <div className={styles.boxItem}>
        <div>
          <p className={styles.small}>Type</p>
        </div>
        <div>
          <p className={styles.small}>Principal</p>
        </div>
        <div>
          <p className={styles.small}>Premium</p>
        </div>
        <div>
          <p className={styles.small}>Price</p>
        </div>
        {selectedTab == 'Orders' && (
          <div>
            <p className={styles.small}>Filled</p>
          </div>
        )}
        {selectedTab == 'Orders' && (
          <div>
            <p className={styles.small}>Status</p>
          </div>
        )}
        {selectedTab == 'Trades' && (
          <div>
            <p className={styles.small}>Time</p>
          </div>
        )}
      </div>
      {selectedTab == 'Orders' &&
        orders.map((order) => (
          <div className={`${styles.boxItem} ${styles.light}`}>
            <div>
              <p className={styles.title}>
                <p className={styles.title}>{order.type}</p>
              </p>
            </div>
            <div>
              <p className={styles.title}>{order.principal}</p>
            </div>
            <div>
              <p className={styles.title}>{order.premium}</p>
            </div>
            <div>
              <p className={styles.title}>${order.price}</p>
            </div>
            <div>
              <p className={styles.title}>{order.filled}%</p>
            </div>
            <div>
              <p className={styles.title}>{order.status}</p>
            </div>
          </div>
        ))}
      {selectedTab == 'Trades' &&
        trades.map((trade) => (
          <div className={`${styles.boxItem} ${styles.light}`}>
            <div>
              <p className={styles.title}>
                <p className={styles.title}>{trade.type}</p>
              </p>
            </div>
            <div>
              <p className={styles.title}>{trade.principal}</p>
            </div>
            <div>
              <p className={styles.title}>{trade.premium}</p>
            </div>
            <div>
              <p className={styles.title}>${trade.price}</p>
            </div>
            <div>
              <p className={styles.title}>{trade.time}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default RateDashboard;
