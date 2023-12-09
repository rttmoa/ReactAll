// the following addresses are only on Polygon Mumbai
export const contractAddrs = {
  deployer: '0x0754f7fc90f842a6ace8b6ec89e4edadeb2a9ba5',
  usdc: '0xf7d7eaf3d6d3ab5a81514309f16395a37af6e6bc',
  eth: '0xb2b07ac6e3513d4e94b1c9c32057eadce1381bf0',
  matic: '0xe927ab3a717b5f4b17cae4a7879904f9de728161',
  oracle: '0xc94777b9a10cebe85c2f91972deb176cde86e027',
  swap: '0xec4eeebd0b2ea356ae30b0d613b16eaa8ac01c27',
  addressProvider: '0xe44278ace07452e45373d93e458a00aded87ad8a',
  mainPool: '0x07b18069e6d06ed9f3e6dd604ef63fecda2865fc',
  ethUsdcPool: '0xe7ac4b2f2def09d5b64a4b20c43c3f4b8b67d87d',
  usdcStrategy: '0x1ca45e58a067b770ff0f03dcb7f4c3d075d1c814',
  ethStrategy: '0x4853f4cf2274def143d58a2068f62c52c8aa59a2',
  maticStrategy: '0xfa3e8a1f76429e5e1ba107dfe95ca66a8fd53c92',
  mainPoolConfigurator: '0xcd2b058bf079ce75a1deaa6f5e7eb6d3cd66802c',
  flashLoanReceiver: '0x0997205e3415fd3b3694650f1bfb2a9804c409ef',
  dataProvider: '0x131bbaaa298ba663a507c283a3817f0aa9c4a76a',
};

export const getContractAddr = (contractName) => contractAddrs[contractName];

export const getUsdtContractAddr =(chainId: string | number|undefined)=>{
  const contractAddr={
    56:'0x55d398326f99059fF775485246999027B3197955',
    42161:'0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
  }
  return contractAddr[chainId];
}
export const getSendContractAddr =(chainId: string | number|undefined)=>{
  const contractAddr={
    56:'0x04fEfd2cCAD9782174Bc2aD81ba76432e06e3B5a',
    42161:'0x6Bc39f8de47fE6aBFB05f55E0F6b216c5F3cbd00'
  }
  return contractAddr[chainId];
}
export const getBlockExplorerUrls =(chainId:number)=>{
  const contractAddr={
    56:'https://bscscan.com/',
    42161: 'https://arbiscan.io/',
    1: 'https://etherscan.io/',
    8453: 'https://basescan.org/',
    10: 'https://optimistic.etherscan.io/',
  }
  return contractAddr[chainId];
}