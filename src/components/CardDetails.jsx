import Navbar from "./Navbar.jsx";
import { GetCardData } from '../utils/CardData';
import Dashboard from "./Dashboard.jsx";
import { decryptData } from "../utils/Crypto";
import { useLocation, useParams } from 'react-router-dom';
// import { BusinessCardABI } from "../assets/abis/BusinessCardABI";
// import { contractAddress } from "../assets/constants";
import { useContract } from "../contexts/ContractContext";
import axios from "axios";
import { useState, useEffect } from "react";
import CardTile from "./CardTile.jsx";
import { contractAddress } from "../assets/constants";
import LoadingScreen from "./LoadingScreen.jsx";

export default function CardDetails() {
    const { contract, userAddress, isConnected, companyId } = useContract();

    const [cardId, setCardId] = useState(null);
    const [isCard, setIsCard] = useState(false);
    // const [companyId, setCompanyId] = useState(null);
    const [dataFetched, updateFetched] = useState(false);
    const [cardData, setCardData] = useState(null);
    const [cardPrivateData, setCardPrivateData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isBurning, setIsBurning] = useState(false);
    const [cardAddress, setCardAddress] = useState('0x0');

    async function fetchCardData() {
        try {
            // if(!isConnected) return;
            // const lastCardId = await contract.lastCardId();
            // console.log("___________lastCardId", lastCardId);
            // const cardId = parseInt(lastCardId.toString());

            // const uriByAddress = await contract.tokenUriByAddress(userAddress);
            // console.log("!!!!!!!!!!UriByAddress", uriByAddress);
            console.log("ADDRESS123", userAddress)
            // let companyId;
            // try {
            //     companyId = await contract.getMyCompanyId();
            //     console.log("MyCompanyId", companyId);
            //     console.log("MyCompanyId para esta address", companyId, userAddress);
            //     setCompanyId(companyId);
            // } catch (error) {
            //     console.log("Error al obtener el companyId", error);
            // }
            if (companyId) return;

            try {
                let balance = await contract.balanceOf(userAddress);
                console.log("BALANCE", parseInt(balance.toString()));
                if (parseInt(parseInt(balance.toString())) === 1) {
                    const data = await contract.getMyCard();
                    console.log("CARD---DATA", data);
                    const _cardId = data?.[4];
                    const cardId = parseInt(_cardId.toString());
                    console.log("CARD---ID", cardId);
                    setCardId(cardId.toString());
                    const cardData = await GetCardData(contract, cardId, '0x');
                    setCardData(cardData);
                    let cardAddress = '0x0';
                    try {
                        cardAddress = await contract.cardAddresses(cardId);
                        setCardAddress(cardAddress);
                    } catch (error) {
                        console.error("Error al obtener la cardAddress" + error)
                    }
                    const privateData = await contract.getPrivateInfoCard(cardAddress);
                    // const privateData = "https://gateway.pinata.cloud/ipfs/QmZYgYkrCvK56rFVetKB5f2fi6Kdeq9ioyishLRVg1wYg8"
                    console.log("CARD--PRIVATE--DATA", privateData);
                    const response = await axios.get(privateData);
                    console.log("CARD--PRIVATE--RESPONSE.data", response.data.encryptedData);
                    const cardPrivateData = decryptData(response.data.encryptedData);
                    console.log("CARD--PRIVATE--DECRIP", cardPrivateData);
                    console.log("CARD--PRIVATE--DECRIP.tel", cardPrivateData.telefono);
                    console.log("CARD--PRIVATE--DECRIP.eml", cardPrivateData.email);
                    setCardPrivateData(cardPrivateData);
                    setIsCard(true);
                } else {
                    setIsCard(false);
                }
            } catch (error) {
                console.error("Error obteniendo card data" + error);

            }
            // let transaction = await contract.getMyCard();
            // console.log("transaction", transaction);
            // const cardData = await GetCardData(contract, cardId, '0x');

            updateFetched(true);  // Marca que los datos ya fueron obtenidos.
            // updateAddress(userAddress);
            /*
            * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
            * and creates an object of information that is to be displayed
            */

            // const items = await Promise.all(transaction.map(async i => {
            //     const tokenURI = await contract.tokenURI(i.tokenId);
            // let meta = await axios.get(x);
            // meta = meta.data;

            //     let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            // let item = {
            //     name: meta.name,
            //     position: meta.position,
            //     category: meta.category,
            //     urls: meta.urls,
            //     image: meta.image
            // }
            // return item;

            // }))
            //     try{
            //         GetCardData();
            //   } catch (error) {
            //         console.error("Error fetching card metadata:", error);
            //         throw error; // Propagar el error si es necesario
            //     }
            // updateFetched(true);
            // updateData(items);

        } catch (error) {
            console.error("Error obteniendo datos de la tarjeta:", error);
        }
    }

    async function handleVisibility() {
        setIsLoading(true);
        try {
            const transaction = await contract.setVisibilityCard(false);
            // const transaction = await contract.setVisibilityCard(true);
            await transaction.wait();
            console.log("transaction", transaction);
            alert("La tarjeta ahora puede verse en el Dashboard")
        } catch (error) {
            alert("Ha fallado el cambio de visibilidad")
            console.error("Ha fallado el cambio de visibilidad" + error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!dataFetched && contract && userAddress) {
            fetchCardData();
        }
    }, [dataFetched, contract, userAddress]);

    async function handleBurn() {
        setIsLoading(true);
        setIsBurning(true);
        try {
            const transaction = await contract.deleteMyCard();
            // const transaction = await contract.setVisibilityCard(true);
            await transaction.wait();
            console.log("transaction", transaction);
            alert("La tarjeta se ha borrado")
            updateFetched(false); 
        } catch (error) {
            alert("Ha habido un error en el borrado")
            console.error("Ha habido un error en el borrado" + error)
        } finally {
            setIsLoading(false);
            setIsBurning(false);
        }
    }

    // const params = useParams();
    // const tokenId = params.tokenId;
    // if(!dataFetched) fetchCardData();


    // if(!dataFetched) GetCardData(cardId);
    // GetCardData(cardId);
    if (isLoading) {
        return (
                isBurning ? <LoadingScreen loadingText="Eliminando la card" /> 
                    : <LoadingScreen loadingText="Cambiando la visibilidad de la card" />
            );
    }

    return (
        <div className="w-full">
            <Navbar />
            {/* Condicional A: Si existe companyId, se muestra el mensaje de "No acceso" */}
            {companyId ? (
                <div>
                    {/* <h1 className="text-4xl text-center text-blue-900 font-bold bg-stone-100 rounded-md mt-36 py-1 px-20">
                        No tienes acceso a las tarjetas
                    </h1> */}
                    <Dashboard reverse={true} />
                </div>
            ) : (
                /* Condicional B: Si no existe companyId, se verifica isCard */
                <div className="mb-12 min-w-full">
                    {/* Si isCard es true, mostrar los detalles de la tarjeta */}
                    {isCard ? (
                        cardData && (
                             <div>
                                <h2 className="text-4xl text-center text-blue-900 font-bold bg-stone-100 rounded-md mb-12 mt-36 py-1 px-20">
                                    Esta es tu Business Card
                                </h2>

                            {/* </div> */}
                            <div className="flex items-end gap-2 gap-8 w-full">

                            
                            <CardTile data={cardData} cardAddress={userAddress}></CardTile>
                            <div>
                                {/* <div className="mt-10 text-white w-full border-2 border-gray-100 flex flex-col items-center rounded-lg shadow-2xl">
                                    <img
                                        src={cardData?.image}
                                        alt={cardData?.name}
                                        className="w-full rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col items-center text-white w-full p-2 bg-gradient-to-t from-[#313170] to-transparent rounded-lg pt-5 -mt-20">
                                        <strong className="text-xl">
                                            {cardData?.name}
                                        </strong>
                                        <p>{cardData?.position}</p>
                                        <p>{cardData?.category || "No category available"}</p>
                                        <p>{cardData?.urls}</p>
                                    </div>
                                </div> */}

                                <div className="text-center text-lg w-full flex flex-col items-center gap-2">
                                    <div className="text-stone-800  text-center w-full flex flex-col items-center rounded-lg shadow-2xl gap-x-2">
                                        <h1 className="bg-stone-100 mt-4 p-2 w-full border-2 border-gray-100 rounded-md shadow-2xl">{cardData?.name}</h1>
                                        {/* <p className="mt-10 py-2 text-white w-full border-2 border-gray-100 rounded-md shadow-2xl">{cardData?.id}</p>                                   */}
                                    </div>
                                    <div className="flex mt-4 gap-2 text-stone-800 text-center w-full justify-center rounded-lg shadow-2xl">
                                        <h2 className="bg-stone-100 p-2 w-1/2 border-2 border-gray-100 rounded-md shadow-2xl">{cardData?.position}</h2>
                                        <h2 className="bg-stone-100 p-2 w-1/2 border-2 border-gray-100 rounded-md shadow-2xl">{cardData?.category}</h2>
                                    </div>
                                    <div className="flex w-full text-stone-800 items-center">
                                        <h2 className="bg-stone-100 p-2  text-center w-full border-2 border-gray-100 items-center rounded-md shadow-2xl">{cardData?.urls}</h2>
                                    </div>
                                    <div className="flex mt-4 w-full text-stone-800 items-center">
                                        <h3 className="bg-stone-100 p-2 text-center w-full border-2 border-gray-100 items-center rounded-md shadow-2xl">Datos privados</h3>
                                    </div>
                                    <div className="flex gap-x-2  text-stone-800 text-center w-full justify-center rounded-lg shadow-2xl">
                                        <h2 className="bg-stone-100 p-2 flex-grow border-2 border-gray-100 rounded-md shadow-2xl">{cardPrivateData?.telefono}</h2>
                                    </div>
                                    <div className="flex gap-x-2  text-stone-800 text-center w-full justify-center rounded-lg shadow-2xl">
                                        <h2 className="bg-stone-100 p-2 flex-grow w-fit border-2 border-gray-100 rounded-md shadow-2xl">{cardPrivateData?.email}</h2>
                                    </div>
                                    <div className="flex mt-4 w-full text-stone-800 items-center">
                                        <h3 className="bg-stone-100 p-2 text-center w-full border-2 border-gray-100 items-center rounded-md shadow-2xl">Cuenta y número identificador(ID) de tu Card</h3>
                                    </div>
                                    <div className="flex gap-x-2  text-stone-800 text-center w-full justify-center rounded-lg shadow-2xl">
                                        <h2 className="bg-stone-100 p-2 w-fit border-2 border-gray-100 rounded-md shadow-2xl">{contractAddress}</h2>
                                        <h2 className="bg-stone-100 p-2 flex-grow border-2 border-gray-100 rounded-md shadow-2xl">ID: </h2>
                                        <h2 className="bg-stone-100 p-2 flex-grow w-fit border-2 border-gray-100 rounded-md shadow-2xl">{cardId}</h2>
                                    </div>
                                    <div className="flex mt-4 gap-2 text-stone-800  text-center w-fit justify-center rounded-lg shadow-2xl">
                                        <h2 className="bg-stone-100 p-2 w-fit border-2 border-gray-100 rounded-md shadow-2xl">Tu cuenta:</h2>
                                        <h2 className="bg-stone-100 p-2 w-fit border-2 border-gray-100 rounded-md shadow-2xl">{userAddress}</h2>
                                    </div>
                                </div>

                                <div className="flex justify-center text-center items-center mt-4  text-white gap-4 text-xl">
                                    {/* <button
                                        onClick={handleVisibility}
                                        className=" font-bold  w-3/5 px-1 bg-orange-400 text-stone-800 rounded p-2 shadow-lg hover:scale-105">
                                        Ocultar
                                    </button> */}
                                    <button
                                        onClick={handleBurn}
                                        className=" font-bold w-3/5 px-1 bg-red-500 text-stone-800 rounded p-2 shadow-lg hover:scale-105">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                            </div>
                            </div>
                        )
                    ) : (
                        <h2 className="text-4xl text-center text-blue-900 font-bold bg-stone-100 rounded-md mb-12 py-1 px-20 mt-36">No posees ninguna tarjeta</h2>
                    )}
                </div>
            )}
        </div>
    );

}
//<p>No se ha encontrado una tarjeta</p>