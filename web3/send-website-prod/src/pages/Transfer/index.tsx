import { connect } from "umi";
import { useEffect, useState, useContext } from "react";
import TokenInput from "@/components/TokenInput";
import {
  SettingOutlined,
  ArrowDownOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  SmileOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { SEND_CONSTANTS, getTokenList } from "@/constants";
import {
  Button,
  Drawer,
  Tooltip,
  Input,
  Switch,
  Modal,
  Table,
  Tag,
  Space,
  message,
  notification,
} from "antd";
import ButtonGroup from "@/components/SendButtonGroup";
import { hooks } from "@/connectors/metaMask";
import { ReactComponent as ViewIcon } from "@/assets/icon_open.svg";
import WalletProvider from "@/layouts/WalletProvider";
import { ethers } from "ethers";
import { getBlockExplorerUrls } from "@/constants/addresses";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { CHAINS } from "@/chains";
import USDTABI from "@/abis/USDTARB.json";
import { SEND_CONTRACT_ABI } from "@/abis/SEND";
import Decimal from "decimal.js";
import { post, get } from "@/utils/http";
import {
  getUsdtContractAddr,
  getSendContractAddr,
} from "@/constants/addresses";
import useSendContract from "@/hooks/useSendContract";
import styles from "./index.less";
import { ERC20_ABI } from "@/abis/ERC20_ABI";
import { JsonRpcProvider } from "@ethersproject/providers";
import TokenBalance from "@/components/TokenBalance";
// 定义一个防抖函数
function debounce(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
const HomePage = (props: any) => {
  const [api, contextHolder] = notification.useNotification();
  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = hooks;
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [valueAddress, setValueAddress] = useState("");
  const [sendContract, setSendContract] = useState<any>();
  const [balance, setBalance] = useState();
  const [direction, setDirection] = useState(0);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const chainId = useChainId();
  const { currentChain, switchChain } = useContext(WalletProvider)!;
  const onClose = () => {
    setVisible(false);
  };
  const onSelectTokenCurrent = (item: any) => {
    setVisible(false);
    if (isToD) {
      setCurrentToToken(item);
    } else {
      setCurrentFromToken(item);
      setCurrentToToken(item);
    }
  };
  const onSelectChainCurrent = (item: any) => {
    setOpen(false);
    if (direction == 0) {
      switchChain(item.id);
    } else {
      setCurrentToChain(item);
    }
  };
  const [open, setOpen] = useState(false);
  const [openMost, setOpenMost] = useState(false);

  const chainList = [
    // {
    //   'name': 'Ethereum',
    //   'icon': '/eth.svg'
    // },
    {
      id: 56,
      name: "BNB Chain",
      icon: "/bnb.svg",
    },
    // {
    //   'name': 'Polygon',
    //   'icon': '/polygon.svg'
    // },
    {
      id: 42161,
      name: "Arbitrum One",
      icon: "/arb.svg",
    },
    {
      id: 1,
      icon: "/eth.svg",
      name: "Ethereum",
    },
    {
      id: 8453,
      icon: "/base.svg",
      name: "Base",
    },
    {
      id: 10,
      icon: "/optimism.png",
      name: "Optimism",
    },
  ];
  const chainOrg = {
    56: {
      name: "BNB Chain",
      icon: "/bnb.svg",
    },
    42161: {
      name: "Arbitrum One",
      icon: "/arb.svg",
    },
    1: {
      icon: "/eth.svg",
      name: "Ethereum",
    },
    8453: {
      icon: "/base.svg",
      name: "Base",
    },
    10: {
      icon: "/optimism.png",
      name: "Optimism",
    },
  };
  const [currentToToken, setCurrentToToken] = useState(getTokenList(null)[0]);
  const [currentToChain, setCurrentToChain] = useState(chainList[1]);
  const [currentFromToken, setCurrentFromToken] = useState(
    getTokenList(null)[0]
  );
  const [currentFromChain, setCurrentFromChain] = useState(chainList[1]);
  const [isToBase, setIsToBase] = useState(false);
  const [isToD, setIsTD] = useState(false);
  const [isAll, setIsAll] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const accounts = useAccounts();
  const provider = useProvider();

  useEffect(() => {
    setCurrentFromChain(CHAINS[chainId || 56]);
    // setValue('');
    setValueAddress((accounts && accounts[0]) || "");
    // chainId==8453&& setCurrentFromToken(getTokenList(null)[1])
  }, [chainId]);
  useEffect(() => {
    if (chainId == 8453 && !isToD) {
      setCurrentFromToken(getTokenList(null)[1]);
      setCurrentToToken(getTokenList(null)[1]);
    }
    if (currentToChain.id == 8453) {
      setCurrentToToken(getTokenList(null)[1]);
    }
    if (currentToChain.id != 8453 && currentFromToken.name == "USDT") {
      setCurrentToToken(getTokenList(null)[0]);
    }
    console.log("changetoken", currentToToken);
  });
  useEffect(() => {
    if (!SEND_CONSTANTS?.[chainId]?.send_contract) {
      return;
    }
    if (!SEND_CONSTANTS?.[chainId]?.token?.[currentFromToken.name]?.address) {
      return;
    }
    if (provider && accounts?.length) {
      getTD(accounts[0]);
      // approveToken();
      checkApproval();

      setSendContract(
        new ethers.Contract(
          SEND_CONSTANTS?.[chainId]?.send_contract,
          SEND_CONTRACT_ABI,
          provider?.getSigner()
        )
      );
      const usdtContract = new ethers.Contract(
        SEND_CONSTANTS?.[chainId]?.token?.[currentFromToken.name]?.address,
        USDTABI,
        provider
      );
      usdtContract
        .balanceOf(accounts[0])
        .then((balance) => {
          const formatBalance =
            ethers.utils.formatUnits(balance, chainId == 56 ? 18 : 6) * 1;
          setBalance(formatBalance.toFixed(6));
        })
        .catch((error) => {
          console.error("Failed to fetch USDT balance:", error);
        });
    }
    getAuth();
  }, [provider, accounts, currentFromToken]);
  const handleSwitchChain = () => {
    setCurrentFromChain(currentToChain);
    setCurrentToChain(currentFromChain);
    switchChain(currentToChain.id);
  };
  async function approveToken() {
    // 获取 MetaMask 提供的以太坊提供程序
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // 代币合约地址和目标地址
    const tokenContractAddress =
      SEND_CONSTANTS?.[chainId]?.token?.[currentFromToken.name].address;
    const targetAddress = SEND_CONSTANTS?.[chainId]?.send_contract;

    // 获取当前 MetaMask 账户
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    // 创建代币合约实例
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      USDTABI,
      signer
    );
    // 构建 approve 函数的交易对象
    const approveTx = await tokenContract.approve(
      targetAddress,
      ethers.constants.MaxUint256
    );

    // 发送交易并等待确认
    const approveTxResponse = await approveTx.wait();
    setAllowance(0.1);
    console.log("Transaction hash:", approveTxResponse.transactionHash);
    console.log("Transaction receipt:", approveTxResponse);
  }
  async function checkApproval() {
    // 连接到以太坊网络
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // 设置要查询的地址和代币合约地址
    const ownerAddress = accounts[0];
    const spenderAddress = SEND_CONSTANTS?.[chainId]?.send_contract;
    const tokenContractAddress =
      SEND_CONSTANTS?.[chainId]?.token?.[currentFromToken.name].address;

    // 创建代币合约实例
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      USDTABI,
      provider
    );

    // 调用 allowance 函数查询已授权的代币数量
    const allowance = await tokenContract.allowance(
      ownerAddress,
      spenderAddress
    );

    setAllowance(allowance.toString());
  }
  // 轮询
  const saveTD = async (hash: string) => {
    try {
      const response = await get(
        "/api/transferHistory?addressFrom=" + accounts[0]
      );
      // 检查你想要的结果是否满足条件，如果满足条件则返回数据，否则继续递归调用makeRequest函数
      if (
        response.code == 200 &&
        response.data.length > 0 &&
        response.data[response.data.length - 1].hashFrom == hash
      ) {
        getTD(accounts[0]);
        api.info({
          icon: <FileDoneOutlined />,
          message: "Done",
          description: (
            <a
              target="_blank"
              href={`${getBlockExplorerUrls(currentToChain.id)}/tx/${
                response.data[0].hashTo
              }`}
              className={styles.tokenlist}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <img
                  src={chainOrg[currentToChain.id]?.icon}
                  style={{ width: "24px" }}
                />
                <p style={{ margin: 0 }}>{chainOrg[currentToChain.id]?.name}</p>
                <ViewIcon width={24} fill="#fff" />
              </div>
            </a>
          ),
          placement: "topRight",
          duration: 30,
        });
      } else {
        // 继续递归调用makeRequest函数，直到满足条件为止
        saveTD(hash);
      }
    } catch (error) {
      // 处理错误情况，可以根据需要进行重试或者返回错误信息
      console.error("网络请求错误:", error);
      throw error; // 可以选择抛出错误以中断递归
    }
  };
  // 查询
  const getTD = async (address: string) => {
    const result = await get("/api/transferHistory?addressFrom=" + address);
    // const result = await get('/api/transferHistory?address=0x08bf2999C67a807FD1708670E4C48Ada46aABAc5');
    const { dispatch } = props;
    dispatch({
      type: "history/updateData",
      payload: { data: result.data },
    });
  };
  const getAuth = async () => {
    const result = await get("/api/whiteList?walletAddress=" + accounts[0]);
    if (result && result.code == 200 && result.data && result.data.length > 0) {
      setIsAuth(true);
    }
  };
  return (
    <div style={{ padding: "50px 0" }} className="flex flex-center">
      {contextHolder}
      {/* <Button onClick={abc}>aa</Button> */}
      <div
        className="flex flex-column gap-4"
        style={{
          width: "375px",
          backgroundColor: "#1c1b1b",
          padding: "1.25rem",
          border: "1px solid #2f343e",
          borderRadius: "1rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="flex flex-between flex-align-center"
          style={{ marginBottom: "15px" }}
        >
          <span>Mode</span>

          {/* 先隐藏 */}
          {/* <div style={{ cursor: 'pointer' }} onClick={() => setVisibleSetting(true)}><SettingOutlined /></div> */}
          <div style={{ marginRight: "-10px" }}>
            <ButtonGroup value="FlashBridge" onSelect={() => {}}>
              <ButtonGroup.Item value="FlashBridge">
                FlashBridge
              </ButtonGroup.Item>
              <ButtonGroup.Item disabled value="zkBridge">
                zkBridge
              </ButtonGroup.Item>
            </ButtonGroup>
          </div>
        </div>
        <Tooltip
          open={openMost}
          placement="right"
          title="10 USDT At Most in the Small-Amount Mainnet"
        >
          <TokenInput
            key="ti1"
            defaultValue={value}
            onChange={(v: any) => {
              setValue(v);
              setOpenMost(v > 10);
            }}
            max
            currentChain={currentFromChain}
            currentToken={currentFromToken}
            selectToken={() => {
              setVisible(true);
              setIsTD(false);
              setIsToBase(false);
              setIsAll(currentFromChain.id != 8453);
            }}
            selectChain={() => {
              setOpen(true);
              setDirection(0);
              setIsToBase(false);
            }}
            title="From"
            maxValue={balance}
            desc={
              balance >= 0 && `Balance: ${balance} ${currentFromToken?.name}`
            }
            choose
            chooseToken
          />
        </Tooltip>
        <div style={{ textAlign: "center" }}>
          <div className="swap-hover" onClick={handleSwitchChain}>
            <ArrowDownOutlined style={{ color: "#ffffff" }} />
          </div>
        </div>
        <TokenInput
          key="ti2"
          defaultValue={value}
          onChange={(v: any) => setValue(v)}
          currentChain={currentToChain}
          currentToken={currentToToken}
          selectToken={() => {
            setVisible(true);
            setIsTD(true);
            setIsToBase(true);
            if (currentFromChain.id == 8453 && currentToChain.id != 8453) {
              setIsAll(true);
            } else {
              setIsAll(false);
            }
          }}
          selectChain={() => {
            setOpen(true);
            setDirection(1);
            setIsToBase(true);
          }}
          title="To"
          desc={value && `Expect to receive: ${value} ${currentToToken?.name}`}
          choose
          chooseToken={currentFromChain.name == "Base"}
        />
        <TokenInput
          key="ti3"
          simple
          defaultValue={valueAddress}
          onChange={(v: any) => setValueAddress(v)}
          currentChain={currentToChain}
          currentToken={currentToToken}
          title="Recipient Address"
          choose
        />
        <Button
          disabled={
            (value == "" && allowance != 0) || !chainId || value > 10 || !isAuth
          }
          // onClick={debounce(async () => {
          //   // <Button disabled onClick={async () => {
          //   if (!chainId) {
          //     return;
          //   }
          //   if (allowance == 0) {
          //     approveToken();
          //     return;
          //   }
          //   const chainList = [
          //     {
          //       id: currentFromChain.id,
          //       fee: 0,
          //     },
          //     {
          //       id: currentToChain.id,
          //       fee: 0,
          //     },
          //   ];
          //   // getfees

          //   let allFees = new Decimal("0");
          //   let targetFees;
          //   await Promise.all(
          //     chainList.map(async (item, index) => {
          //       const chainIds: number = item.id;
          //       const tx = await sendContract.chainFee(chainIds);
          //       const oldNum = new Decimal(
          //         ethers.utils.formatUnits(
          //           ethers.BigNumber.from(tx).toString(),
          //           18
          //         )
          //       );
          //       const num = oldNum.div(10);
          //       // allFees.plus(num)

          //       // const num2 = new Decimal('0.2');

          //       // 进行高精度加法计算
          //       allFees = allFees.plus(num);
          //       if (index == 1) {
          //         allFees = allFees.plus(oldNum);
          //       }
          //       // console.log('aaaa',result.toString());
          //     })
          //   );
          //   // console.log('ethers.BigNumber.from(value).toBigInt()',ethers.BigNumber.from(""+value).toBigInt());
          //   console.log(allFees.toString());
          //   sendContract
          //     .sendToken(
          //       currentToChain.id,
          //       SEND_CONSTANTS?.[chainId]?.token?.[currentFromToken.name]
          //         .address,
          //       valueAddress, //'0x08bf2999C67a807FD1708670E4C48Ada46aABAc5',
          //       ethers.utils.parseUnits(value, chainId == 56 ? 18 : 6),
          //       {
          //         value: ethers.utils.parseUnits(allFees.toString(), 18),
          //       }
          //     )
          //     .then(async (tx: ethers.providers.TransactionResponse) => {
          //       // messageApi.success('Send SuccessFul!')
          //       const result = await tx.wait();
          //       console.log("sendResult", result);
          //       if (result.status == 1) {
          //         saveTD(result.transactionHash);
          //       }
          //     })
          //     .catch((err) => {});
          //   //  const result=await
          //   //   console.log(result);
          // }, 500)}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            borderRadius: "30px",
            padding: "8px 26px",
            height: "auto",
          }}
          type="primary"
        >
          {/* {(chainId && ((allowance == 0 && "Approve") || "Confirm")) ||
            "Connect Wallet"} */}
          Coming Soon
        </Button>

        {/* <Button onClick={async () => {
          sendContract.withdrawAllTokens();
        }}>取钱</Button> */}
        <Drawer
          title="Select Token"
          className={styles.h100}
          placement="bottom"
          onClose={onClose}
          open={visible}
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
            {(isAll &&
              getTokenList(null).map((item) => (
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
              ))) ||
              getTokenList(null)
                .filter((item) => item.name != "USDT")
                .map((item) => (
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
          onClose={() => setOpen(false)}
          open={open}
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
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </Drawer>
        <Drawer
          title="Advanced Settings"
          className={styles.h100}
          placement="bottom"
          onClose={() => setVisibleSetting(false)}
          open={visibleSetting}
          getContainer={false}
          maskClosable={false}
          // closeIcon={false}
          style={{ position: "absolute" }}
          bodyStyle={{ paddingTop: "0" }}
        >
          <div className={styles.tokenlist}>
            <div className="flex flex-between flex-align-center">
              <span> Gas on destination chain</span>
              <Tooltip title="The default amount allows you to perform a couple of transactions (e.g. Approve and Swap). Once you approve the transfer in your wallet, the transaction gas amount will be higher than a regular transaction as this includes the selected amount of destination gas to be sent.">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <hr
              style={{ background: "#323232", margin: "10px 0px 20px 0px" }}
            />
            <ButtonGroup value="none" onSelect={() => {}}>
              <ButtonGroup.Item value="none">None</ButtonGroup.Item>
              <ButtonGroup.Item value="default">Default</ButtonGroup.Item>
            </ButtonGroup>
            <Input
              style={{ marginTop: "20px" }}
              placeholder="0.0"
              prefix={
                <span>
                  <img
                    src="/eth.svg"
                    style={{ marginRight: "5px", width: "20px" }}
                  />
                </span>
              }
              suffix={<span>Max</span>}
            />
            <div
              className="flex flex-between flex-align-center"
              style={{ marginTop: "30px" }}
            >
              <span> Slippage tolerance</span>
              <Tooltip title="Your transaction will revert if the price changes unfavorably by more than this percentage">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <hr
              style={{ background: "#323232", margin: "10px 0px 20px 0px" }}
            />

            <ButtonGroup value="0.1" onSelect={() => {}}>
              <ButtonGroup.Item value="0.1">0.1%</ButtonGroup.Item>
              <ButtonGroup.Item value="0.5">0.5%</ButtonGroup.Item>
              <ButtonGroup.Item value="1.0">1.0%</ButtonGroup.Item>
            </ButtonGroup>
            <Input
              style={{ marginTop: "20px" }}
              placeholder="0.0"
              suffix={<span>%</span>}
            />
          </div>
        </Drawer>
      </div>
    </div>
  );
};
export default connect(({ history }: any) => ({
  history,
}))(HomePage);
