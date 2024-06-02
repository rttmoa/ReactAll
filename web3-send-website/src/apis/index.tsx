import { getAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { ethers } from 'ethers';

import { getToken, getTokenList } from '@/constants';
import { getContractAddr } from '@/constants/addresses';
import ERC20 from '@/abis/ERC20.json';

const MAX_UINT256 = ethers.BigNumber.from(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);
const getBigNumber = (amount, digit) =>
  ethers.utils.parseUnits(`${amount}`, digit);

// erc20
export const approve = async (
  chainId,
  library,
  account,
  tokenName,
  spenderAddr,
) => {
  const token = getToken(chainId, tokenName);
  console.log(
    'api debug: chainId',
    chainId,
    'account',
    account,
    'token addr',
    token.address,
    'spender addr',
    spenderAddr,
  );
  return performTx(library, ERC20.abi, account, token.address, 'approve', [
    spenderAddr,
    MAX_UINT256,
  ]);
};

export const performSupply = async (
  chainId,
  library,
  account,
  tokenName,
  spenderAddr,
) => {
  const token = getToken(chainId, tokenName);
  console.log('api debug: ', chainId, account, token.address, spenderAddr);
  return performTx(library, ERC20.abi, account, token.address, 'approve', [
    spenderAddr,
    MAX_UINT256,
  ]);
};

export const checkAllowance = async (
  chainId,
  library,
  account,
  tokenName,
  spenderAddr,
) => {
  const token = getToken(chainId, tokenName);

  let state = await readState(library, ERC20.abi, token.address, 'allowance', [
    account,
    spenderAddr,
  ]);
  console.log(
    'api debug cehck allowance: chainId',
    chainId,
    'account',
    account,
    'token addr',
    token.address,
    'spender addr',
    spenderAddr,
    'result ',
    state,
  );
  return state;
};

// tx
// export const sendMarketTx = async (chainId, library, account, tokenName, poolName, args) => {
//   const token = getToken(chainId, tokenName);
//   rturn performTx(library, ERC20.abi, account, )
// }

export const readState = async (
  library,
  abi,
  contractAddr,
  functionName,
  args,
) => {
  console.log('DEBUGGING', library, contractAddr, functionName, args);
  let value = undefined;
  let contract = getContract(contractAddr, abi, library);

  let method = contract[functionName];
  console.log('testing here');

  let result = await method(...args).catch((e) =>
    console.log('CustomError in transaction: ', e),
  );

  console.log('DEBUGGING result', result);
  return result;
};

export const performTx = async (
  library,
  abi,
  account,
  contractAddr,
  functionName,
  args,
) => {
  console.log(library, account, contractAddr, functionName, args);
  // let value;
  let value = undefined;
  let contract = getContract(contractAddr, abi, library, account);

  let estimate = contract.estimateGas[functionName];

  let method = contract[functionName];

  let result = estimate(...args, value ? { value } : {}).then(
    (estimatedGasLimit) =>
      method(...args, {
        ...(value ? { value } : {}),
        gasLimit: calculateGasMargin(estimatedGasLimit),
      }).catch((e) => {
        console.log('CustomError: ', e);
        new CustomError('CustomError in transaction');
      }),
  );

  return result;
};

export const withConfirmation = async (txpromise) => {
  const result = await txpromise;
  // await ethers.providers.waitForTransaction(
  //   result.receipt ? result.receipt.transactionHash : result.hash,
  //   3
  // );

  await result.wait;
  return result;
};

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    console.log('not working');
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function calculateGasMargin(value) {
  return value
    .mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(1000)))
    .div(ethers.BigNumber.from(10000));
}

export class CustomError {
  getErrorText() {
    return this.errorText;
  }

  constructor(errorText) {
    this.errorText = errorText;
  }
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}
