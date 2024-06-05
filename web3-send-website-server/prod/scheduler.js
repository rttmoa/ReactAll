const schedule = require('node-schedule');
const Web3 = require('web3');
const ethers = require('ethers');
const axios = require('axios');

const SEND_CONSTANTS = {
    1: {
        chain_name: 'ETH-Mainnet',
        provider_url: 'https://eth-mainnet.public.blastapi.io',
        send_contract: '0x268EdDd8B4C9ec7E0e45300514e6946b3f6B7f97',
        start_block: 17985423,
        token: {
            USDT: {
                name: 'USDT',
                address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                decimals: 6,
            },
            USDC: {
                name: 'USDC',
                address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                decimals: 6,
            },
        },
    },
    56: {
        chain_name: 'BSC',
        provider_url: 'https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3',
        send_contract: '0x6bc39f8de47fe6abfb05f55e0f6b216c5f3cbd00',
        start_block: 30908806,
        token: {
            USDT: {
                name: 'USDT',
                address: '0x55d398326f99059fF775485246999027B3197955',
                decimals: 18,
            },
            USDC: {
                name: 'USDC',
                address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                decimals: 18,
            },
        },
    },
    42161: {
        chain_name: 'Arbitrum',
        provider_url: 'https://arb-mainnet.g.alchemy.com/v2/L6XIuVuTl40vV1R9gcNoNo7j5g3jrI2T',
        send_contract: '0xd27c1Ea2086065dB1b8c609321B9EfBABE6E7369',
        start_block: 122014987,
        token: {
            USDT: {
                name: 'USDT',
                address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
                decimals: 6,
            },
            USDC: {
                name: 'USDC',
                address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                decimals: 6,
            },
        },
    },
    8453: {
        chain_name: 'Base',
        provider_url: 'https://base.meowrpc.com',
        send_contract: '0x83859561036110d6a31d018bb51ca012f8f48d5c',
        start_block: 2710396,
        token: {
            USDC: {
                name: 'USDC',
                address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
                decimals: 6,
            },
        },
    },
    10: {
        chain_name: 'Optimism',
        provider_url: 'https://opt-mainnet.g.alchemy.com/v2/84rJNCR4ZalEvn2_kGw8mJtFYUTdbMX7',
        send_contract: '0xbbac4d9d25835596dcf3978e1193454705eb16a6',
        start_block: 108304677,
        token: {
            USDT: {
                name: 'USDT',
                address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
                decimals: 6,
            },
            USDC: {
                name: 'USDC',
                address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
                decimals: 6,
            },
        },
    },
};

const contractABI = [
    {
        constant: true,
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
]; // You need to provide the ABI of the contract

// 定义定时任务
const minuteTask = schedule.scheduleJob('* * * * *', async () => {
    try {
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
        for (let i = 0; i < tokenListBalance.length; i++) {
            const element = tokenListBalance[i];
            // 初始化Web3连接
            const providerUrl = element.provider_url;
            const web3 = new Web3(providerUrl);

            // 合约地址和ABI
            const contractAddress = element.token_address;

            // 获取合约实例
            const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

            // 获取账户地址
            const account = element.send_contract;

            // 使用合约实例查询余额
            const balance = await contractInstance.methods.balanceOf(account).call();

            console.log(`USDT Balance: ${ethers.utils.formatUnits(balance, element.decimals) * 1}`);

            // 请求的 URL
            const url = 'http://147.182.251.92:3000/api/tokenBalanceHistory';
            // const url = 'http://localhost:3000/api/tokenBalanceHistory';

            // 请求的数据（这里使用 JSON 格式）
            const postData = {
                tokenAddress: contractAddress,
                contractAddress: account,
                tokenName: element.token_name,
                chainName: element.chain_name,
                balance: ethers.utils.formatUnits(balance, element.decimals) * 1,
            };
            console.log(postData);
            // 发起 POST 请求
            axios
                .post(url, postData)
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    ``;
                    console.error('An error occurred:', error);
                });
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
