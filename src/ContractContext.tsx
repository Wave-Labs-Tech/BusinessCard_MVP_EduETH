// ContractContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
// import { ethers } from 'ethers';
import { BusinessCardABI } from './assets/abis/BusinessCardABI';
import { contractAddress } from './assets/constants';
import { useAccount } from 'wagmi';
// import { ConnectToMetamaskOnly } from './utils/ConnectToMetamaskOnly';// type ContractContextType = ethers.Contract | null;
console.log("contractAddress", contractAddress);
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';



interface ContractContextType {
  contract: ethers.Contract | null;
  userAddress: string | null;
  isConnected: boolean;
  provider: any | null;
  companyId: number | null;
  disconnectWallet: () => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const { address, isConnected } = useAccount();  // Proporcionado por Wagmi
  // const provider = usePublicClient();
  const [provider, setProvider] = useState<any>(null);
  const navigate = useNavigate();
  const [userDisconnected, setUserDisconnected] = useState(false); // Estado para manejar desconexión
  const [companyId, setCompanyId] = useState(0);
  // let companyId = 0;

useEffect(() => {
    // Redirigir al usuario si no está conectado
    if (!isConnected) {
      setUserDisconnected(true);  // Cambiamos el estado global para forzar un rerender
    }else{
      setUserDisconnected(false);
    }
  }, [isConnected]);

  useEffect(() => {
    // Redirigir al usuario si no está conectado
    if (userDisconnected) {
      navigate('/');  // Redirige a la página principals
    }
  }, [userDisconnected, navigate]);

  useEffect(() => {
    const init = async () => { 
    if (isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum); // Correcto para ethers v6
      setProvider(provider);

      const signer = await provider.getSigner();

      const _contract = new ethers.Contract(contractAddress, BusinessCardABI, signer);
      setContract(_contract);

    try {
        const companyId = await _contract.getMyCompanyId();
        setCompanyId(companyId);
    } catch (error) {
        console.error("Error al obtener el companyId" + error)
    }

    } else {
      setProvider(null);
      setContract(null);
    }
  };
  init();
  }, [isConnected]);

  const disconnectWallet = () => {
    // La desconexión es manejada por RainbowKit automáticamente, así que solo reseteamos el contrato
    setContract(null);
    setUserDisconnected(true);
  };

console.log("TODOS datos en context: ", contract, address, isConnected, provider)
  return (
    <ContractContext.Provider value={{ contract, userAddress: address || null, isConnected, provider, companyId, disconnectWallet }}>
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