import { ethers } from 'ethers';

export const toFloat = (bn:any, decimals:any) => {
  if (bn == undefined) {
    return;
  }
  return ethers.utils.formatUnits(bn, decimals);
};

export const toBN = (num:any, decimals:any) => {
  return ethers.utils.parseUnits(`${num}`, decimals);
};

export const hideMiddleChars = (str: string) => {
  if (!str||str.length <= 10) {
    return str;
  } else {
    const startChars = str.slice(0, 6);
    const endChars = str.slice(-4);
    return `${startChars}...${endChars}`;
  }
}
