import { Row, Col, Button, Slider, Checkbox, Switch } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Expand } from '@/assets/expand.svg';
import KpBigInput from '@/components/KpBigInput';
import KpInfoList from '@/components/KpInfoList';
import KpTokenInput from '@/components/KpTokenInput';
import KpTokenNPoolSelect from '@/components/KpTokenNPoolSelect';
import { ethers } from 'ethers';
import { toBN, toFloat } from '@/utils';

import styles from './index.less';
import { useWeb3React } from '@web3-react/core';
import { approve, checkAllowance, performTx, withConfirmation } from '@/apis';
import { getPoolAddr, getToken } from '@/constants';
import useSWR from 'swr';
import LendingPool from '@/abis/LendingPool.json';
import {
  parseUnits,
  parseEther,
  formatUnits,
  formatEther,
} from '@ethersproject/units';
const infolistMain = [
  ['Share Of Pool', '8.02%'],
  ['Volume (7d)', '$293,349.89'],
  ['APR', '3.41%'],
];
const infolistMore = [
  ['Reserve deposit limit', '1,000,000,000 USDC'],
  ['Loan to value (LTV ratio) ', '75%'],
  ['Liquidation threshold ', '85%'],
  ['Liquidation penalty', '5%'],
  ['Max borrow APR ', '50%'],
  ['Target borrow APR ', '8%'],
  ['Target utilization metric info', '80%'],
  ['Current asset utilization', '58.48%'],
  ['Reserve address', 'Bgxf...Mpmw '],
  ['Token mint', 'Bgxf...Mpmw '],
  ['cToken mint', 'Bgxf...Mpmw '],
  ['Pyth oracle address', 'Bgxf...Mpmw '],
  ['Switchboard oracle address', 'Bgxf...Mpmw '],
];

const checkApprove = () => {};

const KpTotal = (props: any) => {
  const {
    KpTokenList,
    dataSource,
    onSelectPool,
    onSelectToken,
    selectedTab,
    ...rest
  } = props;
  const { active, account, chainId, library } = useWeb3React();
  const [passedVal, setPassedVal] = useState();

  const [step, setStep] = useState('approve');

  const TabRef = useRef();
  TabRef.current = selectedTab;
  // useEffect(() => {

  // }, [])

  const onButtonClicked = (selectedTab) => {
    console.log('executingTX');
    if (step == 'approve') {
      const poolName = dataSource.r2.name;
      console.log(
        'kpbuy, onbuttonclicked 0: ',
        selectedTab,
        dataSource,
        poolName,
      );
      const poolAddr = getPoolAddr(poolName);
      console.log('kpbuy, onbuttonclicked 1: ', poolName, poolAddr, chainId);
      console.log(
        'kpbuy, onbuttonclicked 2: ',
        dataSource.r1.name,
        poolAddr,
        chainId,
      );
      approve(chainId, library, account, dataSource.r1.name, poolAddr);
      console.log('api debug check approve');
    } else {
      const token = getToken(chainId, dataSource.r1.name);
      const parsedAmount = passedVal;
      // parseUnits(
      //   passedVal || `0`,
      //   token.decimals,
      // ).toString();

      if (TabRef.current == 'Supply') {
        const poolName = dataSource.r2.name;
        const poolAddr = getPoolAddr(poolName);
        // console.log("withconfirmation see lending pool", LendingPool);
        withConfirmation(
          performTx(library, LendingPool.abi, account, poolAddr, 'supply', [
            token.address,
            parsedAmount,
            account,
          ]),
        ).then(() => {
          console.log('Transaction done');
        });
      } else if (TabRef.current == 'Borrow') {
        const poolName = dataSource.r2.name;
        const poolAddr = getPoolAddr(poolName);
        console.log(LendingPool);
        withConfirmation(
          performTx(library, LendingPool.abi, account, poolAddr, 'borrow', [
            token.address,
            parsedAmount,
            1,
            account,
          ]),
        ).then(() => {
          console.log('Transaction done');
        });
      } else if (TabRef.current == 'Withdraw') {
        const poolName = dataSource.r2.name;
        const poolAddr = getPoolAddr(poolName);
        console.log(LendingPool);
        // const parsedAmount = parseUnits(`${passedVal}`,decimals).toString();
        withConfirmation(
          performTx(library, LendingPool.abi, account, poolAddr, 'withdraw', [
            token.address,
            parsedAmount,
            account,
          ]),
        ).then(() => {
          console.log('Transaction done');
        });
      } else if (TabRef.current == 'Repay') {
        const poolName = dataSource.r2.name;
        const poolAddr = getPoolAddr(poolName);
        console.log(LendingPool);
        // const parsedAmount = parseUnits(`${passedVal}`,decimals).toString();
        withConfirmation(
          performTx(library, LendingPool.abi, account, poolAddr, 'repay', [
            token.address,
            parsedAmount,
            1,
            account,
          ]),
        ).then(() => {
          console.log('Transaction done');
        });
      }
    }
  };

  const token = dataSource.r1.name || 'ETH';
  const poolAddr = dataSource.r2?.name
    ? getPoolAddr(dataSource.r2.name)
    : 'main pool';
  console.log('debug check kpbuy, mainpool', poolAddr);

  const { data: allowance, mutate: updateAllowance } = useSWR(
    [chainId, library, account, token, poolAddr],
    checkAllowance,
  );

  useEffect(() => {
    if (!passedVal || !allowance) return;
    let inputBN;
    if (
      passedVal ==
      '115792089237316195423570985008687907853269984665640564039457584007913129639935'
    ) {
      inputBN = ethers.BigNumber.from(`${passedVal}`);
    } else {
      inputBN = ethers.BigNumber.from(`${parseFloat(passedVal)}`);
    }

    if (inputBN.gt(allowance)) {
      setStep('approve');
      console.log('api debug: setstep approve');
    } else {
      setStep('tx');
      console.log('api debug: setstep tx');
    }
    setPassedVal(passedVal);
  }, [allowance, passedVal]);

  useEffect(() => {
    if (!library) return;
    library.on('block', () => {
      console.log('kpbuy, updated block');
      updateAllowance();
    });
    return () => {
      library.removeAllListeners('block');
    };
  }, [library]);


  return (
    <div className={styles.ki} {...rest}>
      <div style={{ padding: '36px 15px' }}>
        <KpTokenNPoolSelect
          pool
          onSelectPool={onSelectPool}
          onSelectToken={onSelectToken}
          dataSource={props.dataSource}
        />
        <KpBigInput
          selectedTab={selectedTab}
          placeholder="Amount"
          passedVal={passedVal}
          setPassedVal={setPassedVal}
          KpTokenList={KpTokenList}
          tokenName={props.dataSource.r2.name}
          // poolName={props.dataSource.r2.name}
        />

        <KpInfoList dataSource={infolistMain} />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button disabled={!active} onClick={onButtonClicked}>
            {step == 'approve' ? 'Connect Wallet' : selectedTab}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default KpTotal;
