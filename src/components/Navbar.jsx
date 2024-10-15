import {
  BrowserRouter as Router, 
  Link,
} from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router';
// import Web3 from 'web3';
import { useContract } from '../ContractContext'
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit'

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  // const [currAddress, updateAddress] = useState('0x');
  const { userAddress, isConnected, disconnectWallet  } = useContract();
  const { disconnect } = useDisconnect();  // Hook de desconexión de RainbowKit
  const [walletAddress, setWalletAddress] = useState(null);
console.log("userADDRESS", userAddress);
  // useEffect(() => {
  //   if (address) {
  //     updateAddress(address);
  //     toggleConnect(true);
  //   }
  // }, [address]);
  // useEffect(() => {
  //   if (userAddress && userAddress !== '0x') {
  //     toggleConnect(true);
  //   } else {
  //     toggleConnect(false);
  //   }
  // }, [userAddress]);

  useEffect(() => {
    if (isConnected && userAddress) {
      console.log("Wallet conectada:", userAddress);
    } else {
      console.log("No wallet connected");
    }
  }, [isConnected, userAddress]);


  const connectMetaMask = async () => {
    if (window.ethereum) {
      // const web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const addr = accounts[0];
          // setWalletAddress(addr);
          // updateAddress(addr);
          // toggleConnect(true); // Actualiza el estado de conexión
          // updateButton(); // Actualiza el botón
          connectWallet(addr);
        }catch(error){
          console.error("Error al habilitar MetaMask:", error);
        };
    } else {
      console.error("MetaMask no está instalado.");
    }
  };

  const disconnectWalletHandler = () => {
    disconnect();
    disconnectWallet(); // Llama al método de desconexión del contexto
    console.log("Desconectado de la wallet");
  };


  return (
    <div className="w-full fixed top-0 left-0">
      <nav className="bg-transparent text-stone-800">
        <ul className='flex items-center justify-between py-3 bg-stone-100 text-stone-800 pr-5'>
          <li className='flex items-end mt-4  ml-5 pb-2  w-fit'>
            <Link to="/">
              <img src="public/UAI_logo.png" alt="Business Card Logo" width={180} height={120} className="inline-block -mt-2 rounded-sm" />
              <div className='inline-block font-bold text-xl ml-2'>
                Card Exhibition
              </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg  w-fit'>
              {location.pathname === "/" ?
                <li className='border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                  <Link to="/">Card Exhibition</Link>
                </li>
                :
                <li className='hover:border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                  <Link to="/">Card Exhibition</Link>
                </li>
              }
              {location.pathname === "/CardDetails" ?
                <li className='border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                  <Link to="/CardDetails">Card Details</Link>
                </li>
                :
                <li className='hover:border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                  <Link to="/CardDetails">Card Details</Link>
                </li>
              }
              {location.pathname === "/viewer" ?
                <li className='border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                  <Link to="/viewer">Card Viewer</Link>
                </li>
                :
                <li className='hover:border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                  <Link to="/viewer">Card Viewer</Link>
                </li>
              }
              <li>
                {/* <button onClick={connectMetaMask} className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">{connected? "Connected":"Connect Wallet"}</button> */}
                <ConnectButton showBalance={true} accountStatus={'avatar'} />
        {/* {connected ? (
          <button
            onClick={disconnectWalletHandler}
            className={`enableEthereumButton bg-green-500 hover:bg-green-700 hover:scale-105 text-white font-bold py-2 px-4 rounded text-sm`}
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={connectMetaMask}
            className={`enableEthereumButton bg-blue-500 hover:bg-blue-700 hover:scale-105 text-white font-bold py-2 px-4 rounded text-sm`}
          >
            Connect
          </button>
        )} */}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className='text-white text-bold text-right mr-10 text-sm'>
        {/* {userAddress !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs"} {userAddress !== "0x" ? (userAddress.slice(0, 7) + '...' + userAddress.slice(-5)) : ""} */}
        {isConnected ? `Connected to ${userAddress?.slice(0, 7)}...${userAddress?.slice(-5)}` : "Not Connected. Please login to view NFTs"} 
      </div>
    </div>
  );
}

export default Navbar;