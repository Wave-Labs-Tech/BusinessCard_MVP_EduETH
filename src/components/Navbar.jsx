import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router';
// import Web3 from 'web3';
import { useContract } from '../contexts/ContractContext'
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit'

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  // const [currAddress, updateAddress] = useState('0x');
  const { userAddress, isConnected, disconnectWallet } = useContract();
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
      } catch (error) {
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
    <div className="w-full fixed top-0 left-0 ">
      <nav className="w-full bg-stone-100 text-stone-800">
          <div className="flex items-center w-full justify-between py-3">
            <div className='text-bg-800 font-bold space-x-4'>
              <Link to="/" className="flex items-center space-x-4 text-xl">
                <img src="/BusinessCard_logo.png" alt="Business Card Logo" className="w-80 h-auto rounded-md mx-4" />
                Card Exhibition
              </Link> 
            </div>
            <ul className='flex items-center space-x-4'>
              <li className='w-fit'>
                <ul className='lg:flex justify-between font-bold mr-10 text-lg w-fit text-xl font-bold'>
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
                  {location.pathname === "/MintCard" ?
                    <li className='border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                      <Link to="/MintCard">Mint Card</Link>
                    </li>
                    :
                    <li className='hover:border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                      <Link to="/MintCard">Mint Card</Link>
                    </li>
                  }
                  {location.pathname === "/viewer" ?
                    <li className='border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap mr-4'>
                      <Link to="/viewer">Card Viewer</Link>
                    </li>
                    :
                    <li className='hover:border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                      <Link to="/viewer">Card Viewer</Link>
                    </li>
                  }
                  {location.pathname === "/ContactsDashboard" ?
                    <li className='border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap mr-4'>
                      <Link to="/ContactsDashboard">Contacts</Link>
                    </li>
                    :
                    <li className='hover:border-b-2 border-stone-800 hover:pb-0 p-2 whitespace-nowrap'>
                      <Link to="/ContactsDashboard">Contacts</Link>
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
          </div>
      </nav>
      <div className='text-white text-bold text-right mr-10 text-lg'>
        {/* {userAddress !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs"} {userAddress !== "0x" ? (userAddress.slice(0, 7) + '...' + userAddress.slice(-5)) : ""} */}
        {isConnected ? `Connected to ${userAddress?.slice(0, 7)}...${userAddress?.slice(-5)}` : "Not Connected. Please login to view NFTs"}
      </div>
    </div>
  );
}

export default Navbar;