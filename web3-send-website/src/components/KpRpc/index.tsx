import {
  DownOutlined,
  SmileOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Space, Row, Col } from 'antd';
import { useWeb3React } from '@web3-react/core';
import styles from './index.less';
import { getNetworks, getDefaultNetwork } from '@/constants';
import millify from 'millify';

const switchChain = async (selectedChainId:any) => {
  console.log(
    'selected current chainId: ',
    selectedChainId,
    web3.utils.toHex(selectedChainId),
  );
  if (window.ethereum.networkVersion !== selectedChainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(selectedChainId) }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Polygon Mainnet',
              chainId: web3.utils.toHex(selectedChainId),
              nativeCurrency: {
                name: 'MATIC',
                decimals: 18,
                symbol: 'MATIC',
              },
              rpcUrls: ['https://polygon-rpc.com/'],
            },
          ],
        });
      }
    }
  }
};
const menu = (chainId: Number) => {
  const networks = getNetworks();
  const otherNetworks = networks.filter((network) => network.id != chainId);

  return (
    <div className={styles.marker}>
      <ul>
        <div className={styles.title}>
          <p>Select Market</p>
          <hr></hr>
        </div>
        {otherNetworks.map((network) => (
          <li style={{ padding: '3px 5px' }}>
            {network.checked == true ? (
              <div
                className={styles.networkChecked}
                style={{ padding: '5px 7px', border: '1px solid #ff5c28' }}
              >
                <div className={styles.icon}>
                  <img src={network.img} />
                </div>
                <div>{network.name}</div>
                <CheckCircleOutlined className={styles.checked} />
              </div>
            ) : (
              <div className={styles.networkChecked}>
                <div className={styles.icon}>
                  <img src={network.img} />
                </div>
                <div>{network.name}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
const KpTotal = (props: any) => {
  const { name, price, number, ...rest } = props;
  let { chainId } = useWeb3React();
  const defaultNetwork = getDefaultNetwork();
  chainId = chainId || defaultNetwork.id;
  const currentNetwork = getNetworks().find((net) => net.id == chainId);
  return (
    <div className={styles.kt} {...rest}>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <div className={styles.title}>
          <div>
            <img
              style={{ width: '35px', verticalAlign: 'top' }}
              src={currentNetwork?.img}
            />
            <span className={styles.rpc}>{currentNetwork?.name}</span>
            <DownOutlined style={{ fontSize: '20px', color: '#ffffff' }} />
          </div>
        </div>
      </Dropdown>
      <div className={styles.dashboard}>
        {/* <div className={styles.item}>
          <div>
            <div></div>
            <div>
              <span>$5.69M</span>
              <br />
              <span>Total market size</span>
            </div>
          </div>
        </div> */}
        <div className={styles.item}>
          <div>
            <div></div>
            <div>
              <span>${millify(props.totalSupply)}</span>
              <br />
              <span>Total supply</span>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div>
            <div></div>
            <div>
              <span>${millify(props.totalBorrows)}</span>
              <br />
              <span>Total borrows</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KpTotal;
