import { useState, useEffect } from "react";
import { useContract } from '../ContractContext';
import axios from "axios";
import { decryptData } from "../utils/Crypto";
import { GetCardData } from '../utils/CardData';
import Navbar from "./Navbar.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import { GetIpfsUrlFromPinata } from "../utils/Pinata";
import { contractAddress } from "../assets/constants";


//FALLA CUANDO LA USA LA UNI, a causa de que no tiene card
//en linea 46 no consigue cardAddress


export const CardDataComponent = ({ id, loadingText }) => {
    const { contract, userAddress, isConnected, companyId } = useContract();
    const [dataFetched, updateDataFetched] = useState(false);
    const [cardAddress, setCardAddress] = useState('0x0');
    const [isShared, setIsShared] = useState(false);
    const [isContact, setIsContact] = useState(false);
    const [isSended, setIsSended] = useState(false);
    const [cardPrivateData, setCardPrivateData] = useState(null);
    const [data, updateData] = useState({});
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tokenURI, setTokenURI] = useState({});
    const [error, setError] = useState(null);

    const getCardData = async () => {
        if (!contract) {
            console.log("Contrato aún no cargado.");
            return;
        }
        if (!id) {
            console.error("Error: ID no está definido.");
            return null; // O renderiza algún mensaje de error o componente de carga
        }
        // let companyId = 0;
        console.log("contract!!! ETC", userAddress, isConnected, contract);
        try {
            // const ethers = require("ethers");
            let meta;
            console.log("ID_ID.", id);
            // var tokenURI = await contract.tokenURI(tokenId);
            // let tokenURI = await contract.tokenUriByAddress("0xc7873b6ee9d6ef0ac02d5d1cef98abeea01e29e2");
            // try {
            //     companyId = await contract.getMyCompanyId();
            //     setCompanyId(companyId);
            // } catch (error) {
            //     console.error("Error al obtener el companyId" + error)
            // }
            let cardAddress = '0x0';
            try {
                cardAddress = await contract.cardIds(id);
                setCardAddress(cardAddress);
            } catch (error2) {
                console.error("Error al obtener la cardAddress" + error2)
            }
            console.log("COMPANY-ID", companyId);
            console.log("Card-ADDRESS", cardAddress);
            const tokenBalance = await contract.balanceOf(cardAddress);
            setBalance(parseInt(tokenBalance.toString()));
            console.log("!!!!!!!!!!tokenBalance", tokenBalance.toString());
            // console.log("!!!!!!!!!!cardAddress", cardAddress);
            // let tokenURI = await contract.tokenUriByAddress(cardAddress);
            try {
                meta = await GetCardData(contract, 0, cardAddress);//Funciona bien para address dueña de Card
            } catch (error) {
                console.log("Error al obtener datos de la Card", error);
            }
            // if (parseInt(parseInt(tokenBalance.toString())) > 0 && companyId < 1) {
            if (parseInt(tokenBalance.toString()) > 0 && !companyId) {
                // console.log("!!!!!!!!!!tokenURI", tokenURI);
                console.log("!!!!!!!!!!Balance??", parseInt(tokenBalance.toString()) > 0);
                console.log("!!!!!!!!!!Balance", parseInt(tokenBalance.toString()));
                // setTokenURI(tokenURI);
                // tokenURI = GetIpfsUrlFromPinata(tokenURI);
                // meta = await axios.get(tokenURI);
                // Suponiendo que el tamaño del array es un uint (puedes definir esto en tu contrato)

                const shared = await contract.hasShared(userAddress, cardAddress);
                console.log("Se he enviado share", shared);
                setIsSended(shared);

                console.log("meta para AJENA", meta);
                console.log("meta.name", meta.name);
                console.log("meta.image", meta.image);
                const sharedWithMe = await contract.hasShared(cardAddress, userAddress);

                // const isSended2 = await contract.contacts(cardAddress, userAddress);
                console.log("Se ha recibido share", sharedWithMe);
                // console.log("Se ha recibido share2", isSended2);
                if (sharedWithMe) setIsShared(true);
                
                const contact = await contract.isMyContact(cardAddress);
                // return contact
                if (contact) setIsContact(true);
            }
            
            console.log("Comprobar CompanyID", companyId);
            if (isContact || companyId > 0) {
                try {
                    // const cardPrivateData = await contract.getContactInfoCard(userAddress);//FALLA FALLA FALLA 
                    const privateData = "https://gateway.pinata.cloud/ipfs/QmZYgYkrCvK56rFVetKB5f2fi6Kdeq9ioyishLRVg1wYg8"
                    console.log("CARD--PRIVATE--DATA", privateData);
                    const response = await axios.get(privateData);
                    console.log("CARD--PRIVATE--RESPONSE.data", response.data.encryptedData);
                    const cardPrivateData = decryptData(response.data.encryptedData);
                    console.log("CARD--PRIVATE--DECRIP", cardPrivateData);
                    console.log("CARD--PRIVATE--DECRIP.tel", cardPrivateData.telefono);
                    console.log("CARD--PRIVATE--DECRIP.eml", cardPrivateData.email);
                    setCardPrivateData(cardPrivateData);
                } catch (error) {
                    console.error("Error al recuperar datos privados" + error)
                }


            }



            console.log("meta", meta);

            let item = {
                id: meta.id,
                name: meta.name,
                position: meta.position,
                category: meta.category,
                urls: meta.urls,
                image: meta.image
            }
            console.log(item);
            updateData(item);
            updateDataFetched(true);
            console.log("userAddress, cardAddress", userAddress, cardAddress)
        } catch (error) {
            console.error("Error en getCardData:", error);
            updateData(null);
            updateDataFetched(true);
        }
    }

    const fetchData = async () => {
        if (contract && userAddress) {
            try {
                await getCardData(id);
            } catch (error) {
                console.error("Error getting Card data:", error);
                setError("Card no encontrada o error al cargar los datos");
            }
        } else {
            setError("Fallo al recopilar datos de la Card");
        }
    };

    async function handleshare(to) {
        setIsLoading(true);
        try {
            const transaction = await contract.shareMyCard(cardAddress);  // Se inicia la transacción
            await transaction.wait();  // Se espera la confirmación en blockchain
            alert("Has conectado con esa Card. Ahora el receptor debe aceptar la conexión");
            fetchData();
        } catch (error) {
            alert("Error compartiendo la tarjeta");
            alert("Error compartiendo la tarjeta " + error);
            console.error("Error compartiendo la tarjeta", error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {

        if (!dataFetched) {
            fetchData();
        }
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!dataFetched) {
        return <div>Cargando...</div>;
    }

    // if (!data) {
    //     return <div><p className="mt-60 p-3 text-gary-800 w-full bg-gray-100 border-2 border-gray-100 flex flex-col items-center rounded-lg shadow-2xl">
    //         No se encontró información para este NFT</p> </div>;
    // }

    if (typeof data?.image == "string")
        data.image = GetIpfsUrlFromPinata(data?.image);

    console.log("LOADING TEXT", loadingText);

    if (isLoading) {
        <LoadingScreen loadingText={loadingText} />
    }

    return (
        // <div style={{ "minHeight": "100vh" }}>
        <div className="w-full mt-28">
            <Navbar></Navbar>
            {/* Renderiza mensaje especial si es el propietario */}
            <div>
                <div className="flex justify-center mt-4">
                    {cardAddress?.toLowerCase() === userAddress?.toLowerCase() ? (
                        <div className="flex flex-col items-center text-4xl text-center text-blue-900 font-bold mb-12">
                            <h2 className="bg-stone-100 rounded-md py-2 px-20 w-fit text-5xl mb-8">Esta es tu Card</h2>
                            <p className="bg-stone-100 rounded-md py-2 px-20">Crea conexiones con otras Cards para generar <br></br> networking de calidad</p>
                        </div>
                    ) : (
                        <div className="text-4xl text-center text-blue-900 font-bold bg-stone-100 rounded-md mb-12 py-2 px-20">
                            Esta Card pertenece a {data?.name}</div>
                    )}
                </div>
            </div>
            <div className="w-full flex justify-center mb-12" >
                {/* <img src={data?.image} alt="" className="w-2/5" /> */}
                <img src={data?.image} alt="" className="w-3/5 md:full rounded-lg" />
                {/* <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5"> */}
                <div className="text-xl break-word md:mx-20 mt-8  bg-blue-900 bg-opacity-70  space-y-8 text-white shadow-2xl rounded-lg border-2 p-12 w-4/5 md:w-3/5 overflow-auto" >
                    <div>
                        <h2 className="text-center bg-stone-100 p-2 flex-grow w-full text-stone-800 rounded-md shadow-2xl">
                            ID: {data?.id.toString() ? data.id.toString()  : ''}
                        </h2>
                    </div>
                    <div className="flex justify-center gap-x-2 text-stone-800 text-center w-full rounded-md shadow-2xl">
                        <h2 className="bg-stone-100 p-2 flex-grow w-fit rounded-md shadow-2xl">
                            {data?.name}
                        </h2>
                    </div>
                    <div className="flex justify-center gap-x-2 text-stone-800 text-center w-full rounded-md shadow-2xl">
                        <h2 className="bg-stone-100 p-2 flex-grow w-fit rounded-md shadow-2xl">
                            {data?.position}
                        </h2>
                    </div>
                    <div className="flex justify-center gap-x-2 text-stone-800 text-center w-full rounded-md shadow-2xl">
                        <h2 className="bg-stone-100 p-2 flex-grow w-fit rounded-md shadow-2xl">
                            {data?.category}
                        </h2>
                    </div>
                    <div className="flex justify-center  gap-x-2 text-stone-800 text-center w-full rounded-md shadow-2xl">
                        <h2 className="bg-stone-100 p-2 flex-grow w-fit rounded-md shadow-2xl">
                            {data?.urls}
                        </h2>
                    </div>
                    <div>
                        {/* {currAddress !== data.owner && currAddress !== data?.seller?
                        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                        : <div className="text-emerald-700">You are the owner of this NFT</div>
                    } */}

                        {/* {accounts.length > 0 ?
                        currAddress === data.seller || currAddress === data.owner ?
                            <div className="text-white">You are the owner of this NFT</div>
                            // : <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                            : <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" >Buy this NFT</button>
                        : <div className="text-red-400">Please connect your wallet to buy this NFT</div>
                    } */}

                    </div>
                    {userAddress?.toLowerCase() !== cardAddress?.toLowerCase() && balance && <div className="flex flex-col text-center items-center mt-11 text-white">
                        {isContact || companyId ? (
                            <div className="flex flex-col items-center gap-2 w-full">
                                {!companyId && <h2 className="font-bold mt-10 w-3/5 px-1 bg-green-400 text-stone-800 rounded p-2 shadow-lg">
                                    Conectados
                                </h2>}
                                <div className="flex mt-4 w-full text-stone-800 items-center">
                                    <h3 className="bg-stone-100 p-2 text-center w-full rounded-md shadow-2xl">Datos privados</h3>
                                </div>
                                <div className="flex gap-x-2 text-stone-800 text-center w-full justify-center rounded-lg shadow-2xl">
                                    <h2 className="bg-stone-100 p-2 flex-grow rounded-md shadow-2xl">{cardPrivateData?.telefono}</h2>
                                </div>
                                <div className="flex gap-x-2 text-stone-800 text-center w-full justify-center rounded-lg shadow-2xl">
                                    <h2 className="bg-stone-100 p-2 flex-grow w-fit rounded-md shadow-2xl">{cardPrivateData?.email}</h2>
                                </div>
                            </div>
                        ) : (
                            !isSended ? (
                                <button
                                    onClick={handleshare}
                                    className=" font-bold mt-10 w-3/5 px-1 bg-orange-400 text-stone-800 rounded p-2 shadow-lg hover:scale-105"
                                >
                                    Conectar
                                </button>
                            ) : (
                                <h2
                                    className=" font-bold mt-10 w-3/5 px-1 bg-orange-400 text-stone-800 rounded p-2 shadow-lg"
                                >
                                    Conexión enviada
                                </h2>
                            )
                        )}
                    </div>}
                    {isShared && !isContact && <p className="text-stone-800 text-center bg-orange-200 mt-4 py-2 w-full border-2 border-stone-800 rounded-md shadow-2xl">
                        {data?.name} ha solicitado conexión</p>}
                </div>
            </div>
            {Boolean(companyId) &&
                <div>
                    <div className="flex mt-4 w-full text-md text-stone-800 justify-center">
                    </div>
                    <div className="flex mb-8 gap-x-2 text-stone-800 text-center w-full justify-center rounded-lg shadow-2xl">
                        <h2 className="bg-stone-100 py-3 px-12 w-fit text-center rounded-md shadow-2xl min-h-[50px]">
                            Cuenta y número identificador (ID) de la Card
                        </h2>
                        <h2 className="bg-stone-100 py-3 px-4 flex-grow rounded-md shadow-2xl min-h-[50px]">
                            {contractAddress ? contractAddress : ''}
                        </h2>
                        <h2 className="bg-stone-100 py-3 px-4 rounded-md shadow-2xl min-h-[50px]">
                        {data?.id ? data.id.toString() : ''}
                        </h2>
                    </div>                            
                    <div className="flex mt-4 mb-12 gap-x-2 text-stone-800 text-center w-full justify-center items-center rounded-lg shadow-2xl">
                        <h2 className="bg-stone-100 py-3 px-12 w-fit rounded-md shadow-2xl ">Cuenta del dueño de la Card:</h2>
                        <h2 className="bg-stone-100 py-3 flex-grow rounded-md shadow-2xl">{cardAddress ? cardAddress : ''}</h2>
                    </div>
                </div>
            }
        </div >
    )
}
