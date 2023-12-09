import { useState, useEffect } from 'react';
import { ethers, Contract, ContractInterface } from 'ethers';
import { hooks } from '@/connectors/metaMask'
interface ContractHookProps {
  contractAddress: string;
  abi: ContractInterface;
}

const useSendContract = ({ contractAddress, abi }: ContractHookProps): Contract | null => {
  const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks
  const [contract, setContract] = useState<Contract | null>(null);
  const provider = useProvider()
  useEffect(() => {
    const newContract = new Contract(contractAddress, abi, provider);

    setContract(newContract);

    // Clean up function
    return () => {
      setContract(null); // Cleanup the contract instance
    };
  }, [contractAddress, abi]);

  return contract;
};

export default useSendContract;
