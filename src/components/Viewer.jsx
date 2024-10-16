import React, { useEffect, useState } from 'react'
// import { ethers, JsonRpcProvider } from 'ethers';
import axios from 'axios'
import Navbar from "./Navbar.jsx";
import { useContract } from '../ContractContext'
import { CardDataComponent } from './CardDataComponent';

// interface NFTData {
//   name: string
//   description: string
//   image: string
//   attributes: Array<{
//     trait_type: string
//     value: string
//   }>
// }

//   const NFTViewer = () => {
// function NFTViewer(): JSX.Element {
function NFTViewer() {
  const { userAddress, isConnected, contract } = useContract();
  // const [contractAddress, setContractAddress] = useState<Address | undefined>(undefined)
  // const [contractAddress, setContractAddress] = useState<string | ''>('');
  const [tokenId, setTokenId] = useState('')
  // const [nftData, setNftData] = useState<NFTData | null>(null)
  const [cardData, setCardData] = useState(null)
  const [error, setError] = useState('')
  let companyId = 0;
  // const [contract, setContract] = useState(null);

  // const isValidAddress = (address: string) => {
  const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  useEffect(() => {
    const fetchCompanyId = async () => {
      if (isConnected && userAddress && contract) {
        try {
          companyId = await contract.getMyCompanyId();
          console.log("Company ID:", companyId);
        } catch (error) {
          console.error("Error obteniendo el companyId:", error);
        }
      }
    };
  
    fetchCompanyId();
  }, [userAddress, isConnected, contract]);

  const getERC721 = async () => {
    try {
      return await contract.tokenURI(tokenId);
    } catch {
      console.error("Error al recuperar la URI del tokenId indicado")
      return undefined;
    }
  };
  const fetchCardData = async () => {
    if (!contract || !tokenId) {
      setError('Contract address and Token ID are required');
      return;
    }

    setError('');
    setCardData(null);

  
    try {
      const uri = await getERC721();
      const response = await axios.get(uri);
      console.log("Responde", response);
      setCardData(response.data);
      console.log("Response.DATA", response.data);
    } catch (err) {
      setError(err.message);;
      console.error((err).message);
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center p-12 w-full mt-20 text-white space-y-8">
        <h1 className="text-3xl font-bold">VISOR DE CARDs</h1>
        <div className="flex w-full ">
          {/* <input
        // className="flex-grow text-xl bg-zinc-400 bg-opacity-70 rounded-lg border-2 p-4"
        className={`w-full text-xl bg-zinc-400 bg-opacity-70 rounded-lg border-2 p-4 ${
          addressError ? 'border-red-500' : 'border-gray-300'
        }`}
        type="text"
        placeholder="Identificador de la tarjeta"
        value={contractAddress ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          setContractAddress(value);
          if (value && !isValidAddress(value)) {
            setAddressError('Dirección no válida');
          } else {
            setAddressError('');
          }
        }}
      /> */}
          {/* {addressError && (
        <p className="absolute text-red-500 text-sm mt-1 mb-2">{addressError}</p>
      )} */}
       <div className="mt-4 text-stone-800 text-center w-full rounded-lg shadow-2xl">
       <div className="flex flex-row mt-4 gap-2 text-stone-800 text-center w-full rounded-lg shadow-2xl">

            <p className="bg-stone-100 py-2 px-20 w-full rounded-md shadow-2xl text-xl">Número de la tarjeta</p>
            <input
              className="bg-stone-100 py-2 w-1/5 text-right text-xl pr-2 rounded-md shadow-2xl"
              type="number"
              placeholder="0"
              value={tokenId}
              min={1}
              step={1}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div>
          </div>
        </div>
        <button className="bg-blue-700 hover:bg-blue-600 hover:scale-105 text-white font-bold py-2 px-4 rounded"
          onClick={fetchCardData} disabled={!tokenId}>
          Visualizar tarjeta
        </button>
        {cardData && <div className="text-center w-full  flex justify-between items-center gap-2">
          <CardDataComponent id={tokenId} loadingText="Solicitando la conexión" className="w-full 
          "/>
          {/* <img src={cardData?.image} alt={cardData?.name} className="max-w-full h-auto rounded-lg border-2 border-gray-100" />
          <div className="text-stone-800  text-center w-full flex flex-col items-center rounded-lg shadow-2xl gap-2">
            <h1 className="bg-stone-100 mt-4 py-2 w-full border-2 border-gray-100 rounded-md shadow-2xl">{cardData?.name}</h1> */}
            {/* <p className="mt-10 py-2 text-white w-full border-2 border-gray-100 rounded-md shadow-2xl">{cardData?.id}</p>                                   */}
          {/* </div>
          <div className="flex mt-4 gap-2 text-stone-800 text-center w-full flex justify-center rounded-lg shadow-2xl">
            <h2 className="bg-stone-100 py-2 w-1/2 border-2 border-gray-100 rounded-md shadow-2xl">{cardData?.position}</h2>
            <h2 className="bg-stone-100 py-2 w-1/2 border-2 border-gray-100 rounded-md shadow-2xl">{cardData?.category}</h2>
          </div>
          <div className="flex w-full text-stone-800 items-center">
            <h3 className="bg-stone-100 py-2  text-center w-full border-2 border-gray-100 items-center rounded-md shadow-2xl">{cardData?.urls}</h3>
          </div> */}
        </div>}
      </div>
    </>
  )
}

export default NFTViewer

