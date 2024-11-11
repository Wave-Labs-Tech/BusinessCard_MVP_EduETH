// ContractContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BusinessCardABI } from '../assets/abis/BusinessCardABI';
import { contractAddress } from '../assets/constants';
import { useAccount, useConfig, useChainId, usePublicClient, useWalletClient, useSwitchChain } from 'wagmi'
import { useNavigate } from 'react-router-dom';

// import { ConnectToMetamaskOnly } from './utils/ConnectToMetamaskOnly';// type ContractContextType = ethers.Contract | null;


interface ContractContextType {
  contract: ethers.Contract | null;
  userAddress: string | null;
  isConnected: boolean;
  provider: any | null;
  companyId: number | null;
  // disconnectWallet: () => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const { address, isConnected } = useAccount();
  // const config = useConfig()
  const chainId = useChainId() // Proporcionado por Wagmi
  // const provider = usePublicClient();
  const [provider, setProvider] = useState<any>(null);
  const navigate = useNavigate();
  const [userDisconnected, setUserDisconnected] = useState(false); // Estado para manejar desconexión
  const [companyId, setCompanyId] = useState(0);
  const CORRECT_CHAIN_ID = 421614 // ID de Arbitrum Sepolia
  const { switchChain } = useSwitchChain()
  // let companyId = 0;
  useEffect(() => {
    // Redirigir al usuario si no está conectado
    if (!isConnected) {
      setUserDisconnected(true);  // Cambiamos el estado global para forzar un rerender
    } else {
      setUserDisconnected(false);

    }
  }, [isConnected]);

  useEffect(() => {
    // Redirigir al usuario si no está conectado
    if (userDisconnected) {
      navigate('/');  // Redirige a la página principals
    }
    checkAndSwitchNetwork();
  }, [userDisconnected, navigate]);


  useEffect(() => {
    const init = async () => {
      if (isConnected) {
        if (chainId !== CORRECT_CHAIN_ID) {
          alert('Por favor, cambia a la red Arbitrum Sepolia')
          await switchToCorrectNetwork()
          return
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        const signer = await provider.getSigner();

        const _contract = new ethers.Contract(contractAddress, BusinessCardABI, signer);
        setContract(_contract);

        try {
          const companyId = await _contract.getMyCompanyId();
          setCompanyId(parseInt(companyId.toString()));
        } catch (error) {
          console.error("Error al obtener el companyId" + error)
        }

      } else {
        setProvider(null);
        setContract(null);
      }
    };
    init();
  }, [isConnected, chainId]);



  const switchToCorrectNetwork = async () => {
    try {
      const result = await switchChain({ chainId: CORRECT_CHAIN_ID })
      console.log('Switched to chain:', result)
    } catch (error) {
      console.error('Error al cambiar de red:', error)
    }
  }

  const checkAndSwitchNetwork = async () => {
    if (isConnected && chainId !== CORRECT_CHAIN_ID) {
      await switchToCorrectNetwork()
    }
  }
  console.log('Chain ID actual:', chainId)
  console.log('¿Está conectado?', isConnected)
  console.log('¿Es la red correcta?', chainId === CORRECT_CHAIN_ID)
  console.log("TODOS datos en context: ", contract, address, isConnected, provider, companyId);
  return (
    // <ContractContext.Provider value={{ contract, userAddress: address || null, isConnected, provider, companyId, disconnectWallet }}>
    <ContractContext.Provider value={{ contract, userAddress: address || null, isConnected, provider, companyId }}>
      {children}
    </ContractContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a BlockchainProvider');
  }
  return context;
};