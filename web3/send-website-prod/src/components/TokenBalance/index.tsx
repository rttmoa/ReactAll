import { ERC20_ABI } from "@/abis/ERC20_ABI";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from '@ethersproject/contracts';
import { useEffect, useState } from "react"
import { ethers } from "ethers";

const TokenBalance = (props:any) => {
    const [newbalance, setBalance] = useState(0);
    const {rpc,tokenAddress,contractAddress,decimals}=props;
    useEffect(() => {
        const provider1 = new JsonRpcProvider(rpc);


        // 代币合约地址和 ABI
        const usdtContractAddress = tokenAddress; // USDT 合约地址
    
        // 创建代币合约实例
        const usdtContract = new Contract(usdtContractAddress, ERC20_ABI, provider1);
    
        async function queryUSDTBalance(address: string) {
          const balance = await usdtContract.balanceOf(address);
          return balance;
        }
    
        const addressToQuery = contractAddress; // 要查询的地址
        queryUSDTBalance(addressToQuery)
          .then(balance => {
            const formatBalance = ethers.utils.formatUnits(balance, decimals) * 1;
            setBalance(formatBalance);
          })
          .catch(error => {
            console.error("Error:", error);
          });
    }, [])
    return <span>
        {newbalance}
    </span>
}
export default TokenBalance;