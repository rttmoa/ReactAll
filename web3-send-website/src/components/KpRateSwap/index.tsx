import { useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import KpInputSection from '@/components/KpInputSection';
import KpInfoList from '@/components/KpInfoList';
import KpBigInput from '@/components/KpBigInput';

import styles from './index.less';

const KpRateSwap = (props: any) => {
  const { selectedTab, selectedToken, onSelectToken } = props;

  const [mode, setMode] = useState('Market');
  const [inputVal, setInputVal] = useState();
  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    if (selectedTab == 'Fixed Yield') {
      const data = [
        ['Interest Yielded', '-'],
        [`Price per n${selectedToken?.name}`, '-'],
        ['Fixed APY', '-'],
        ['Fee', '-'],
        ['Maturity', 'September 30, 2022'],
      ];
      setInfoList(data);
    } else {
      const data = [
        [`n${selectedToken?.name} Purchased`, '-'],
        [`Price per n${selectedToken?.name}`, '-'],
        ['Projected Profit', '-'],
        ['Projected APY', '-'],
        ['Fee', '-'],
        ['Maturity', 'September 30, 2022'],
      ];
      setInfoList(data);
    }
  }, [selectedTab, selectedToken]);

  const onChangeMode = () => {
    if (mode == 'Market') {
      setMode('Limit');
    } else {
      setMode('Market');
    }
  };
  return (
    <div className={styles.ki}>
      <div style={{ padding: '36px 15px' }}>
        <div style={{ float: 'right', padding: '2px 6px' }}>
          <span style={{ marginRight: '7px' }}>Limit</span>
          <Checkbox onChange={onChangeMode} />
        </div>

        <div style={{ padding: '5px 0' }}>
          <KpInputSection
            placeholder="Amount"
            inputVal={inputVal}
            setInputVal={setInputVal}
            onSelectToken={onSelectToken}
            name={selectedToken?.name}
            icon={selectedToken?.icon}
          />

          {mode == 'Limit' && <KpBigInput placeholder="Price" />}
        </div>

        <KpInfoList dataSource={infoList} />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button> Place {mode} Order</Button>
        </div>
      </div>
    </div>
  );
};
export default KpRateSwap;
