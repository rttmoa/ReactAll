import { createContext } from 'react';

interface WalletContextType {
  currentChain: number;
  switchChain: (chainId: number) => void;
}

const ModalContext = createContext<WalletContextType | null>(null);

//  const ModalContext = createContext({
//   currentChain: -1,
//   switchChain: (chainId:any) => void,
// });
export default ModalContext;