import { Row, Col, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { readState } from '@/apis';
import { useWeb3React } from '@web3-react/core';
import { toFloat, toBN } from '@/utils';
import { getToken } from '@/constants';

import DataProvider from '@/abis/DataProvider.json';
import { getContractAddr } from '@/constants/addresses';
import { parseUnits } from 'ethers/lib/utils';

const KpBigInput = (props: any) => {
  const {
    selectedTab,
    name,
    price,
    number,
    placeholder,
    passedVal,
    setPassedVal,
    KpTokenList,
    tokenName,
    ...rest
  } = props;

  const { active, library, chainId, account } = useWeb3React();

  const [balance, setBalance] = useState('');
  const [inputVal, setInputVal] = useState();

  const fetchBalance = async () => {
    if (tokenName) {
      const res = await readState(
        library,
        DataProvider.abi,
        getContractAddr('dataProvider'),
        'getUserReserveData',
        [0, KpTokenList[tokenName].address, account],
      );
      let token = getToken(chainId, tokenName);
      let decimals = token.decimals;
      let bal = parseFloat(toFloat(res.currentKTokenBalance, decimals)).toFixed(
        2,
      );
      setBalance(bal);

      if (!res) {
        console.warn(
          'kpMarketDashboard, failed to fetch data from DataProvider',
        );
      }
    }
  };

  const onButtonClicked = () => {
    //should be set to maximum balance
    setInputVal(parseInt(balance));
    setPassedVal(
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    );
  };
  useEffect(() => {
    fetchBalance();
  }, [library, KpTokenList, tokenName]);
  useEffect(() => {});

  return (
    <div className={styles.kb} style={{ boxSizing: 'content-box' }} {...rest}>
      <div className={styles.areaInput}>
        <input
          placeholder={placeholder}
          value={inputVal}
          onChange={(e) => {
            if (isNaN(e.target.value)) {
              return;
            }
            setPassedVal(
              parseUnits(
                e.target.value || `0`,
                KpTokenList[tokenName].decimals,
              ).toString(),
            );
            setInputVal(e.target.value);
          }}
        />
        <Row style={{ width: '100%' }}>
          <Col span={4}>
            <div className={styles.price}>${balance}</div>
          </Col>
          <Col span={4} offset={16} style={{ marginBottom: '0.3rem' }}>
            {selectedTab == 'Repay' || selectedTab == 'Withdraw' ? (
              <Button
                style={{
                  fontSize: '0.6rem',
                  padding: '0px',
                  width: '30px',
                  height: '20px',
                }}
                onClick={onButtonClicked}
              >
                MAX
              </Button>
            ) : (
              <div> </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default KpBigInput;
