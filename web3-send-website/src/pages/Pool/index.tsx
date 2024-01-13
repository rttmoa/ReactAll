import { useEffect, useState, useMemo } from "react";
import { Row, Col, Tabs, Table, Drawer, Modal, Button, Select } from "antd";
import { getNetworks, getTokenList, pools, getToken } from "@/constants";
// import usePriceFeed from '@/components/Covalent';
// import usePriceFeed from '@/components/Binance';
import { readState } from "@/apis";
import { getContractAddr } from "@/constants/addresses";
import DataProvider from "@/abis/DataProvider.json";
import { toFloat } from "@/utils";
import KpBuy from "@/components/KpBuy";
import KpRpc from "@/components/KpRpc";
import KpTabs from "@/components/KpTabs";
import KpChildTable from "@/components/KpChildTable";
import TokenLine from "@/components/TokenLine";
import PoolCard from "@/components/PoolCard";
import { ethers } from "ethers";
import {
  networkColumns,
  childNetworkColumns,
  dataNetwork,
  assetColumns,
  childAssetColumns,
  dataAssets,
  dataMyPool,
  mypoololumns,
  dataAvailable,
  dataTopPool,
} from "./data";

import styles from "./index.less";
import MarketDashboard from "@/components/KpMarketDashboard";
import { SEND_CONTRACT_ABI } from "@/abis/SEND";
import { ERC20_ABI } from "@/abis/ERC20_ABI";
import { hooks, metaMask } from "../../connectors/metaMask";
import { Card } from "./Card";
import { SEND_CONSTANTS } from "@/constants";
import SettingInput from "@/components/SettingInput";
const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

const { TabPane } = Tabs;

function ValueOf({ chainId, chooseDT }: any) {
  const [result, setResult] = useState('');

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.JsonRpcProvider(SEND_CONSTANTS[chainId]?.provider_url);
      console.log('SEND_CONSTANTS', SEND_CONSTANTS)
      const contractAddress = SEND_CONSTANTS[chainId]?.send_contract;
      console.log('contractAddress', contractAddress, chainId)

      const sendContract = new ethers.Contract(contractAddress, SEND_CONTRACT_ABI, provider);

      try {
        const token = SEND_CONSTANTS?.[chainId]?.token?.[chooseDT];
        const tx = await sendContract.getBalance(token?.address);
        setResult(ethers.utils.formatUnits(
          ethers.BigNumber.from(tx).toString(),
          token.decimals
        ));
      } catch (error) {
        console.error('Error calling contract function:', error);
      }
    }

    fetchData();
  }, []); // 空数组表示仅在组件挂载和卸载时执行一次

  return (
    <span>
      {result}
    </span>
  );
}

const Page = (props) => {
  const chainId = useChainId();

  const tokenList = getTokenList(chainId);
  const [sendContract, setSendContract] = useState<any>();
  const [selectedTab, setSelectedTab] = useState("Supply");
  const [pool, setPool] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [lm, setLm] = useState(false);
  const [r1, setR1] = useState({});
  const [r2, setR2] = useState({});
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [tokenListData, setTokenListData] = useState();
  const [poolList, setPoolList] = useState({});
  // const [poolData, setPoolData] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  // const [assetData, setAssetData] = useState({});
  const [tokenTMP, setTokenTMP] = useState({});
  const [KpTokenList, setKpTokenList] = useState({}); // for making tokenlist from pool with most tokens
  // const [tmpPools, setTmpPools] = useState({});
  const [depositTokenValue, setDepositTokenValue] = useState(0);
  const [tokenBalance, setTokenBalance] = useState("");
  const [debt, setDebt] = useState("");
  const [bl, setBl] = useState("");

  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState("1");
  const [keyPool, setKeyPool] = useState("1");
  const [chooseDT, setChooseDT] = useState("USDT");
  const [chainFee, setChainFee] = useState([
    {
      icon: "/bnb.svg",
      id: 56,
      fee: "0",
    },
    {
      id: 42161,
      icon: "/arb.svg",
      fee: "0",
    },
    {
      id: 1,
      icon: "/eth.svg",
      fee: "0",
    },
    {
      id: 8453,
      icon: "/base.svg",
      fee: "0",
    },
    {
      id: 10,
      icon: "/optimism.png",
      fee: "0",
    },
  ]);
  //   const showDrawer = () => {
  //     setVisible(true);
  //   };
  let tokenListBalance = [];

  for (const chainId in SEND_CONSTANTS) {
    const chainInfo = SEND_CONSTANTS[chainId];
    const { chain_name, provider_url, send_contract, token } = chainInfo;

    for (const tokenName in token) {
      const tokenInfo = token[tokenName];
      tokenListBalance.push({
        chain_name,
        provider_url,
        send_contract,
        token_name: tokenName,
        token_address: tokenInfo.address,
        decimals: tokenInfo.decimals,
      });
    }
  }
  console.log('tokenListBalance', tokenListBalance);
  const onClose = () => {
    setVisible(false);
  };

  const onSelectToken = () => {
    setVisible(true);
  };
  const onSelectTokenCurrent = (item) => {
    setR1({ assets: [{ name: item.name, icon: item.icon }] });
    setVisible(false);
  };
  const onSelectChainCurrent = (item) => {
    setR2({ network: [{ name: item.symbol, icon: item.icon }] });
    setOpenDrawer(false);
  };
  const onChange = (key: any) => {
    setKey(key);
  };
  const onChangePool = (key: any) => {
    setKeyPool(key);
  };


  //   // only expand one row at a time: https://stackoverflow.com/questions/67295603/react-and-expandedrow-render-in-ant-design
  const onTableRowExpand = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record.key); // I have set my record.id as row key. Check the documentation for more details.
    }
    setExpandedRowKeys(keys);
  };
  const totalSupply = 0;
  const totalBorrows = 0;
  const chainList = [
    {
      symbol: "Ethereum",
      icon: "/eth.svg",
    },
    {
      symbol: "BNB Chain",
      icon: "/bnb.svg",
    },
    {
      symbol: "Polygon",
      icon: "/polygon.svg",
    },
    {
      symbol: "Arbitrum",
      icon: "/arb.svg",
    },
  ];
  const accounts = useAccounts();
  const provider = useProvider();
  useEffect(() => {
    if (!SEND_CONSTANTS[chainId].send_contract) {
      return;
    }

    if (provider && accounts?.length) {
      setSendContract(
        new ethers.Contract(
          SEND_CONSTANTS[chainId].send_contract,
          SEND_CONTRACT_ABI,
          provider?.getSigner()
        )
      );
      // setTimeout(() => {
      //   getChainFee();
      // }, 1000);
    }
  }, [provider, accounts]);
  const getChainFee = async () => {
    let newData = [...chainFee];
    await Promise.all(
      newData.map(async (item, index) => {
        const chainIds: number = item.id;
        const tx = await sendContract.chainFee(chainIds);
        item.fee = ethers.utils.formatUnits(
          ethers.BigNumber.from(tx).toString(),
          18
        );
      })
    );
    setChainFee((data) => {
      return newData;
    });
  };
  const setChainsFee = async () => {
    // 长度对应
    const chainIds: number[] = chainFee.map((item) => item.id);
    const fees: string[] = chainFee.map((item) => item.fee);
    const tx = await sendContract.batchSetChainFee(
      chainIds,
      fees.map((fee) => ethers.utils.parseEther(fee))
    );
    console.log(tx);
  };

  const depositToken = async () => {
    const token = SEND_CONSTANTS?.[chainId]?.token?.[chooseDT];
    console.log("token", token);
    console.log("depositValue", depositTokenValue);
    const tx = await sendContract.depositToken(
      token?.address,
      ethers.utils.parseUnits("" + depositTokenValue, token.decimals),
      {
        gasLimit: chainId === 1 ? "100000" : "2000000"
      }
    );
    console.log(tx);
  };

  const getBalance = async () => {
    const token = SEND_CONSTANTS?.[chainId]?.token?.[chooseDT];
    const tx = await sendContract.getBalance(token?.address);
    setTokenBalance(
      ethers.utils.formatUnits(
        ethers.BigNumber.from(tx).toString(),
        token.decimals
      )
    );
  };

  const withdrawAllTokens = async () => {
    // 取出所有代币
    const token = SEND_CONSTANTS?.[chainId]?.token?.[chooseDT];
    const tx = await sendContract.withdrawAllTokens(token.address);
    console.log(tx);
  };
  const withdrawNative = async () => {
    // 取出所有原生资产
    const tx = await sendContract.withdrawNative();
    console.log(tx);
  };

  const getDebt = async () => {
    // 长度对应
    const token = SEND_CONSTANTS?.[chainId]?.token?.[chooseDT];
    const tx = await sendContract.getDebt(accounts[0], token.address);
    setDebt(
      ethers.utils.formatUnits(
        ethers.BigNumber.from(tx).toString(),
        token.decimals
      )
    );
  };
  const withdrawDebt = async () => {
    // 长度对应
    const token = SEND_CONSTANTS?.[chainId]?.token?.[chooseDT];
    const tx = await sendContract.withdrawDebt(token.address);
    console.log(tx);
  };
  const getBl = async () => {
    const token = SEND_CONSTANTS?.[chainId];
    console.log("token", token);
    const tx = await provider?.getBalance(token.send_contract);
    setBl(
      ethers.utils.formatUnits(
        ethers.BigNumber.from(tx).toString(),
        token.decimals
      )
    );
  };

  async function approveToken() {
    const chain_setting = SEND_CONSTANTS?.[chainId];
    // 获取 MetaMask 提供的以太坊提供程序
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // 代币合约地址和目标地址
    const tokenContractAddress = chain_setting?.token?.[chooseDT]?.address;
    const targetAddress = chain_setting.send_contract;

    // 获取当前 MetaMask 账户
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();

    // 创建代币合约实例
    console.log("token address", tokenContractAddress);
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      ERC20_ABI,
      signer
    );
    // 构建 approve 函数的交易对象
    const approveTx = await tokenContract.approve(
      targetAddress,
      ethers.constants.MaxUint256
    );

    // 发送交易并等待确认
    const approveTxResponse = await approveTx.wait();
    console.log("Transaction hash:", approveTxResponse.transactionHash);
    console.log("Transaction receipt:", approveTxResponse);
  }
  return (
    <div className={styles.market}>
      <Tabs
        defaultActiveKey="1"
        type="card"
        style={{
          width: "400px",
          border: "1px solid #1b1d23",
          borderBottom: "0",
          transform: "translateY(1px)",
          marginBottom: "4px",
        }}
      >
        <TabPane tab="Setting" key="1"></TabPane>
      </Tabs>
      <ValueOf chainId='56' chooseDT='USDT' />
      <div
        style={{
          backgroundColor: "rgb(28, 27, 27)",
          padding: "15px",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {chainFee.map((item: any, index: number) => (
            <SettingInput
              key={index}
              defaultValue={item.fee}
              onChange={(v: any) =>
                setChainFee((data) => {
                  let newData = [...data];
                  newData[index].fee = v;
                  return newData;
                })
              }
              currentToken={item.icon}
              selectToken={() => {
                setVisible(true);
              }}
              choose
            />
          ))}
        </div>

        <Button
          onClick={getChainFee}
          type="primary"
          className="topConnect"
          style={{ marginRight: "15px" }}
        >
          Get Fees
        </Button>
        <Button onClick={setChainsFee} type="primary" className="topConnect">
          Submit
        </Button>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Select
            defaultValue="USDT"
            style={{ width: 120 }}
            onChange={(v) => setChooseDT(v)}
            options={[
              {
                value: "USDT",
                label: "USDT",
              },
              {
                value: "USDC",
                label: "USDC",
              },
            ]}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <SettingInput
            key={"1234"}
            defaultValue={depositTokenValue}
            onChange={(v) => setDepositTokenValue(v)}
            choose
          />

          <Button onClick={depositToken} type="primary" className="topConnect">
            DepositToken
          </Button>
          <Button onClick={approveToken} type="primary" className="topConnect">
            approveToken
          </Button>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <SettingInput
            key={"123"}
            defaultValue={tokenBalance}
            onChange={(v: any) => setDashboardData(v)}
            choose
          />

          <Button onClick={getBalance} type="primary" className="topConnect">
            GetBalance
          </Button>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Button onClick={getBl} type="primary" className="topConnect">
            getBl:{bl}
          </Button>
          <Button
            onClick={withdrawAllTokens}
            type="primary"
            className="topConnect"
          >
            withdrawAllTokens
          </Button>
          <Button
            onClick={withdrawNative}
            type="primary"
            className="topConnect"
          >
            withdrawNative
          </Button>
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        style={{
          width: "400px",
          border: "1px solid #1b1d23",
          borderBottom: "0",
          transform: "translateY(1px)",
          marginBottom: "4px",
        }}
      >
        <TabPane tab="Users" key="1"></TabPane>
      </Tabs>
      <div
        style={{
          backgroundColor: "rgb(28, 27, 27)",
          padding: "15px",
          marginBottom: "30px",
        }}
      >
        <Button
          onClick={getDebt}
          type="primary"
          className="topConnect"
          style={{ marginRight: "15px" }}
        >
          getDebt
        </Button>
        <p>debt：{debt}</p>
        <Button
          onClick={withdrawDebt}
          type="primary"
          className="topConnect"
          style={{ marginRight: "15px" }}
        >
          withdrawDebt
        </Button>
      </div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChangePool}
        type="card"
        style={{
          width: "400px",
          border: "1px solid #1b1d23",
          borderBottom: "0",
          transform: "translateY(1px)",
          marginBottom: "4px",
        }}
      >
        <TabPane tab="My Pools" key="1"></TabPane>
        <TabPane tab="Available Pools" key="2"></TabPane>
        <TabPane tab="Top Pools" key="3"></TabPane>
      </Tabs>
      <Table
        style={{ border: "1px solid #1b1d23", marginBottom: "50px" }}
        columns={mypoololumns}
        dataSource={tokenListBalance
          // (keyPool == "1" && dataMyPool) ||
          // (keyPool == "2" && dataAvailable) ||
          // (keyPool == "3" && dataTopPool)
        }
        pagination={false}
      // onRow={(record2) => {
      //   return {
      //     onClick: (event) => {
      //       setR1(record2);
      //       setR2(record2);
      //       setOpen(true);
      //     }, // 点击行
      //   };
      // }}
      />
      <div
        style={{
          backgroundColor: "rgb(28, 27, 27)",
          padding: "15px",
          marginBottom: "30px",
        }}
      >
        <TokenLine />
      </div>
      <Row>
        <Col className={styles.main} span={24}>
          {/* <KpRpc totalSupply={totalSupply} totalBorrows={totalBorrows} /> */}
          <Row>
            <Col span={24}>
              <div>
                <Tabs
                  defaultActiveKey="1"
                  onChange={onChange}
                  type="card"
                  style={{
                    width: "400px",
                    border: "1px solid #1b1d23",
                    borderBottom: "0",
                    transform: "translateY(1px)",
                    marginBottom: "4px",
                  }}
                >
                  <TabPane tab="Assets" key="1"></TabPane>
                  <TabPane tab="Network" key="2"></TabPane>
                </Tabs>
              </div>
              {(key == "1" && (
                <>
                  <Table
                    style={{ border: "1px solid #1b1d23" }}
                    columns={assetColumns}
                    dataSource={dataAssets}
                    expandedRowKeys={expandedRowKeys}
                    onExpand={onTableRowExpand}
                    expandable={{
                      expandRowByClick: true,
                      expandedRowRender: (record1) => (
                        <div style={{ background: "#040000" }}>
                          <KpChildTable
                            style={{ margin: "0" }}
                            columns={childAssetColumns}
                            showHeader={false}
                            pagination={false}
                            dataSource={record1.childData}
                            onRow={(record2) => {
                              return {
                                onClick: (event) => {
                                  setR1(record1);
                                  setR2(record2);
                                  setOpen(true);
                                }, // 点击行
                              };
                            }}
                          />
                        </div>
                      ),
                    }}
                    pagination={false}
                  />
                  {/* <MarketDashboard KpTokenList={KpTokenList} /> */}
                </>
              )) || (
                  <>
                    <Table
                      style={{
                        border: "1px solid #1b1d23",
                        whiteSpace: "nowrap",
                      }}
                      columns={networkColumns}
                      dataSource={dataNetwork}
                      expandable={{
                        expandRowByClick: true,
                        expandedRowRender: (record) => (
                          <div style={{ background: "#040000" }}>
                            <KpChildTable
                              style={{ margin: "0" }}
                              columns={childNetworkColumns}
                              showHeader={false}
                              pagination={false}
                              dataSource={record.childData}
                              onRow={(record2) => {
                                return {
                                  onClick: (event) => {
                                    setR1(record);
                                    setR2(record2);
                                    setOpen(true);
                                  }, // 点击行
                                };
                              }}
                            />
                          </div>
                        ),
                      }}
                      pagination={false}
                    />
                    {/* <MarketDashboard /> */}
                  </>
                )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        open={open}
        footer={null}
        bodyStyle={{ padding: "0" }}
        closable={false}
        onCancel={() => setOpen(false)}
      >
        <div className={styles.action}>
          <KpTabs
            onChange={(index) => setLm(index == 1)}
            setSelectedTab={setSelectedTab}
            tabType="market"
          />
          <KpBuy
            onSelectPool={() => setOpenDrawer(true)}
            onSelectToken={onSelectToken}
            selectedTab={selectedTab}
            KpTokenList={KpTokenList}
            dataSource={{
              r1,
              r2,
            }}
            open={() => props.setVisibleMetaMask(true)}
          />
          <Drawer
            title="Select Token"
            className={styles.h100}
            placement="bottom"
            onClose={onClose}
            visible={visible}
            getContainer={false}
            maskClosable={false}
            // closeIcon={false}
            style={{ position: "absolute" }}
          >
            <div className={styles.title}>
              <div>
                <p>Token Name</p>
              </div>
              <div>
                <p>Balance</p>
              </div>
            </div>
            <hr />

            <div className={styles.tokenlist}>
              {getTokenList(chainId)?.map((item) => (
                <div
                  className={styles.item}
                  onClick={() => onSelectTokenCurrent(item)}
                >
                  <div>
                    <img src={item.icon} style={{ marginRight: "15px" }} />
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <p>0</p>
                  </div>
                </div>
              ))}
            </div>
          </Drawer>
          <Drawer
            title="Select  Chain"
            className={styles.h100}
            placement="bottom"
            onClose={() => setOpenDrawer(false)}
            visible={openDrawer}
            getContainer={false}
            maskClosable={false}
            // closeIcon={false}
            style={{ position: "absolute" }}
            bodyStyle={{ paddingTop: "0" }}
          >
            <div className={styles.tokenlist}>
              {chainList.map((item) => (
                <div
                  className={styles.item}
                  onClick={() => onSelectChainCurrent(item)}
                >
                  <div>
                    <img src={item.icon} style={{ marginRight: "15px" }} />
                    <p>{item.symbol}</p>
                  </div>
                </div>
              ))}
            </div>
          </Drawer>
        </div>
      </Modal>
    </div>
  );
};
export default Page;
