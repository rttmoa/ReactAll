import { Row, Col, Button, Slider, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { ReactComponent as Expand } from '@/assets/expand.svg';
import KpBigInput from '@/components/KpBigInput';
import KpInfoList from '@/components/KpInfoList';
import { useWeb3React } from '@web3-react/core';
import KpTokenInput from '@/components/KpTokenInput';
import KpTokenSelect from '@/components/KpTokenSelect';
import KpInputSection from '@/components/KpInputSection';
import usePriceFeed from '@/components/Covalent';
import useSWR from 'swr';
import { checkAllowance, approve, performTx, withConfirmation } from '@/apis';
import { ethers } from 'ethers';
import { parseUnits } from '@ethersproject/units';
import LendingPool from '@/abis/LendingPool.json';
import { toBN } from '@/utils';

import styles from './index.less';
import { getPoolAddr, getToken } from '@/constants';

const KpLongShort = (props: any) => {
  const {
    selectedToken,
    collateralToken,
    setCollateralToken,
    futureToken,
    setFutureToken,
    longToken,
    setLongToken,
    shortToken,
    setShortToken,
    onSelectPool,
    onSelectToken,
    selectedTab,
    tokenUpdated,
    setTokenUpdated,
    ...rest
  } = props;
  const [more, setMore] = useState(false);
  const [lm, setLm] = useState(true);
  const { library, chainId, active, account, activate, deactivate } =
    useWeb3React();
  const [slider, setSlider] = useState(1.0);
  const [inputVal, setInputVal] = useState();
  const [inputFutureVal, setInputFutureVal] = useState();
  const [inputLongVal, setInputLongVal] = useState();

  const [step, setStep] = useState('approve');
  const [buttonText, setButtonText] = useState('Approvee');

  const latestPrices = usePriceFeed();

  // TODO: calculate info
  const [infolistMain, setInfolistMain] = useState([]);
  useEffect(() => {
    const newInfolistMain = [
      [
        `${selectedTab} Token Amount`,
        `${((inputVal || 0) * slider).toFixed(3)} ${futureToken?.name || ''}`,
      ],
      ['Liq. Price', ''],
      // ['Borrow Rate', '3.41%'],
    ];
    setInfolistMain(newInfolistMain);
  }, [futureToken, inputVal, slider]);

  const onSelectCollateralToken = () => {
    setTokenUpdated('collateral');
    onSelectToken();
  };
  const onSelectFutureToken = () => {
    setTokenUpdated('future');
    onSelectToken();
  };
  const onSelectLongToken = () => {
    setTokenUpdated('long');
    onSelectToken();
  };
  const onSelectShortToken = () => {
    setTokenUpdated('short');
    onSelectToken();
  };
  useEffect(() => {
    if (tokenUpdated == 'collateral') {
      setCollateralToken(selectedToken);
    } else if (tokenUpdated == 'future') {
      setFutureToken(selectedToken);
    } else if (tokenUpdated == 'long') {
      setLongToken(selectedToken);
    } else if (tokenUpdated == 'short') {
      setShortToken(selectedToken);
    }
  }, [selectedToken]);
  console.log('collateral / future: ', collateralToken, futureToken);

  const printArgs = () => {
    console.log(
      'kplongshort, args: ',
      selectedTab,
      collateralToken?.name,
      futureToken?.name,
      inputVal,
      slider,
    );
  };

  // const token = collateralToken ? getToken(chainId, collateralToken) || 'ETH';
  const poolAddr = getPoolAddr('main pool');

  // allowance check
  const { data: allowance, mutate: updateAllowance } = useSWR(
    active &&
      collateralToken && [
        chainId,
        library,
        account,
        collateralToken?.name || 'ETH',
        poolAddr,
      ],
    checkAllowance,
  );
  console.log('kplongshort, allowance: ', allowance);

  useEffect(() => {
    console.log('kpbuy, update step', inputVal, allowance);
    if (!inputVal || !allowance) return;
    const inputBN = ethers.BigNumber.from(`${inputVal}`);
    if (inputBN.gt(allowance)) {
      setStep('approve');
    } else {
      setStep('tx');
    }
  }, [allowance, inputVal]);

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

  const onChangeLeverage = (e) => {
    setSlider(e);
    if (collateralToken && inputVal && (futureToken || shortToken)) {
      setInputFutureVal(inputVal * e);
      setInputLongVal(inputVal * e);
    }
  };

  const onChangeFutureVal = (input) => {
    setInputLongVal(input);
    if (collateralToken && inputVal && (futureToken || shortToken)) {
      const sliderVal = input / inputVal;
      if (1.0 <= sliderVal && sliderVal <= 20) {
        setSlider(sliderVal);
      } else if (sliderVal < 1.0) {
        setSlider(1.0);
      } else {
        setSlider(20);
      }
    }
  };

  const onChangeLongVal = (input) => {
    setInputFutureVal(input);
    onChangeFutureVal(input);
  };

  // button click action
  const onButtonClicked = () => {
    console.log('executingTX', chainId);
    const poolAddr = getPoolAddr('main pool');
    if (step == 'approve') {
      approve(chainId, library, account, collateralToken.name, poolAddr);
    } else {
      const parsedAmount = parseUnits(
        inputVal || `0`,
        collateralToken.decimals,
      ).toString();
      const parsedLeverage = parseUnits(`${slider}` || `0`, 27).toString();
      if (selectedTab == 'Long') {
        withConfirmation(
          performTx(
            library,
            LendingPool.abi,
            account,
            poolAddr,
            'openPosition',
            [
              collateralToken.address,
              collateralToken.address,
              futureToken.address,
              parsedAmount,
              parsedLeverage,
              0, // minLongAmountOut
              account, // onBehalfOf
            ],
          ),
        ).then(() => {
          console.log('Transaction done');
        });
      } else if (selectedTab == 'Short') {
        withConfirmation(
          performTx(
            library,
            LendingPool.abi,
            account,
            poolAddr,
            'openPosition',
            [
              collateralToken.address,
              futureToken.address,
              collateralToken.address,
              parsedAmount,
              parsedLeverage,
              0, // minLongAmountOut
              account, // onBehalfOf
            ],
          ),
        ).then(() => {
          console.log('Transaction done');
        });
      } else if (selectedTab == 'Hedge') {
        withConfirmation(
          performTx(
            library,
            LendingPool.abi,
            account,
            poolAddr,
            'openPosition',
            [
              collateralToken.address,
              shortToken.address,
              longToken.address,
              parsedAmount,
              parsedLeverage,
              0, // minLongAmountOut
              account, // onBehalfOf
            ],
          ),
        ).then(() => {
          console.log('Transaction done');
        });
      }
    }
  };

  return (
    <div className={styles.ki} {...rest}>
      <div style={{ padding: '36px 15px' }}>
        <div style={{ padding: '5px 0' }}>
          <span style={{ display: 'flex', color: 'rgba(255, 255, 255, 0.4)' }}>
            Collateral
          </span>
          <KpInputSection
            placeholder="Collateral Amount"
            inputVal={inputVal}
            setInputVal={setInputVal}
            onSelectToken={onSelectCollateralToken}
            name={collateralToken?.name}
            icon={collateralToken?.icon}
          />
        </div>

        {selectedTab == 'Hedge' ? (
          <>
            <div style={{ padding: '5px 0' }}>
              <span
                style={{ display: 'flex', color: 'rgba(255, 255, 255, 0.4)' }}
              >
                Long
              </span>
              <KpInputSection
                placeholder="Long Amount"
                inputVal={inputLongVal}
                setInputVal={setInputLongVal}
                onSelectToken={onSelectLongToken}
                name={longToken?.name}
                icon={longToken?.icon}
                onChangeFutureVal={onChangeLongVal}
              />
            </div>
            <div style={{ padding: '5px 0' }}>
              <span
                style={{ display: 'flex', color: 'rgba(255, 255, 255, 0.4)' }}
              >
                Short
              </span>
              <KpInputSection
                placeholder="Short Amount"
                inputVal={inputFutureVal}
                setInputVal={setInputFutureVal}
                onSelectToken={onSelectShortToken}
                name={shortToken?.name}
                icon={shortToken?.icon}
                onChangeFutureVal={onChangeFutureVal}
              />
            </div>
            {/* <div style={{ padding: '5px 0' }}>
              <span
                style={{ display: 'flex', color: 'rgba(255, 255, 255, 0.4)' }}
              >
                Long
              </span>
              <KpTokenSelect
                onSelectToken={onSelectLongToken}
                name={longToken?.name}
                icon={longToken?.icon}
              />
            </div> */}
          </>
        ) : (
          <>
            <div style={{ padding: '5px 0' }}>
              <span
                style={{ display: 'flex', color: 'rgba(255, 255, 255, 0.4)' }}
              >
                Target
              </span>
              {/* <KpTokenSelect
                onSelectToken={onSelectFutureToken}
                name={futureToken?.name}
                icon={futureToken?.icon}
              /> */}
              <KpInputSection
                placeholder="Target Amount"
                inputVal={inputFutureVal}
                setInputVal={setInputFutureVal}
                onSelectToken={onSelectFutureToken}
                name={futureToken?.name}
                icon={futureToken?.icon}
                onChangeFutureVal={onChangeFutureVal}
              />
            </div>
          </>
        )}

        <>
          <div className={styles.lm}>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>Leverage Model</div>
            <div className={styles.inputArea}>
              <div>
                <input
                  value={
                    (typeof slider == 'number' && (slider * 1).toFixed(1)) ||
                    slider
                  }
                  onChange={(e) => onChangeLeverage(e.target.value)}
                />
                <span>x</span>
              </div>
            </div>
            <Checkbox checked={lm} onChange={(e) => setLm(e.target.checked)} />
          </div>
          {lm && (
            <Slider
              onChange={onChangeLeverage}
              marks={{ 1.0: '1.0x', 5: '5x', 10: '10x', 15: '15x', 20: '20x' }}
              value={slider}
              step={0.1}
              min={1.0}
              max={20}
            />
          )}
        </>

        <KpInfoList dataSource={infolistMain} />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button disabled={!active} onClick={onButtonClicked}>
            {step == 'approve' ? 'Approve' : selectedTab}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default KpLongShort;
