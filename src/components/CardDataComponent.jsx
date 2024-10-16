import { useState, useEffect } from "react";
import { useContract } from '../ContractContext';
import axios from "axios";
import { decryptData } from "../utils/Crypto";
import { GetCardData } from '../utils/CardData';
import Navbar from "./Navbar.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import { GetIpfsUrlFromPinata } from "../utils/Pinata";
import { contractAddress } from "../assets/constants";
import { toast } from "react-toastify";


//FALLA CUANDO LA USA LA UNI a la hora de mostrar datos privados, necesario nuevo despliegue.


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

        let contact = false;

        try {
            let meta;
    
            let cardAddress = '0x0';
            try {
                cardAddress = await contract.cardAddresses(parseInt(id));
                setCardAddress(cardAddress);
            } catch (error2) {
                console.error("Error al obtener la cardAddress - " + error2)
            }

            const tokenBalance = await contract.balanceOf(cardAddress);
            setBalance(parseInt(tokenBalance.toString()));
            try {
                meta = await GetCardData(contract, 0, cardAddress);//Funciona bien para address dueña de Card
            } catch (error) {
                console.log("Error al obtener datos de la Card", error);
            }
            // if (parseInt(parseInt(tokenBalance.toString())) > 0 && companyId < 1) {
            if (parseInt(tokenBalance.toString()) > 0 && !companyId) {
                
                const shared = await contract.hasShared(userAddress, cardAddress);
                setIsSended(shared);

                const sharedWithMe = await contract.hasShared(cardAddress, userAddress);
                setIsShared(sharedWithMe);

                contact = await contract.isMyContact(cardAddress);
                if (contact) setIsContact(true);
            }

            if (contact || companyId > 0) {
                try {
                    let privateData;
                    try {
                        privateData = await contract.getPrivateInfoCard(cardAddress);
                    } catch (error) {
                        console.error("Error al recuperar datos privados " + error)
                        alert("No tienes acceso a los datos privados");
                    }
                    // const privateData = "https://gateway.pinata.cloud/ipfs/QmZYgYkrCvK56rFVetKB5f2fi6Kdeq9ioyishLRVg1wYg8"
                    const response = await axios.get(privateData);
                    const cardPrivateData = decryptData(response.data.encryptedData);
                    setCardPrivateData(cardPrivateData);
                } catch (error) {
                    console.error("Error al recuperar datos privados " + error)
                }


            }

            let item = {
                id: meta.id,
                name: meta.name,
                position: meta.position,
                category: meta.category,
                urls: meta.urls,
                image: meta.image
            }
            updateData(item);
            updateDataFetched(true);
        } catch (error) {
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
            alert("Has enviado solicitud de conexión a esa tarjeta");
            toast("Has enviado solicitud de conexión a esa tarjeta");
            fetchData();
        } catch (error) {
            alert("Error solicitando conexión a la tarjeta");
            console.error("Error compartiendo la tarjeta " + error)
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
        return <div className="bg-stone-100 py-2 px-24 m-auto text-stone-800 text-3xl text-center rounded-md shadow-2xl min-h-[50px]">Cargando...</div>;
    }

    // if (!data) {
    //     return <div><p className="mt-60 p-3 text-gary-800 w-full bg-gray-100 border-2 border-gray-100 flex flex-col items-center rounded-lg shadow-2xl">
    //         No se encontró información para este NFT</p> </div>;
    // }

    if (typeof data?.image == "string")
        data.image = GetIpfsUrlFromPinata(data?.image);

    if (isLoading) {
        <LoadingScreen loadingText={loadingText} />
    }
    console.log("CARD private DATA", cardPrivateData);
    return (
        // <div style={{ "minHeight": "100vh" }}>
        <div className="w-full mt-28">
            <Navbar></Navbar>
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
            <div className="container mx-auto px-4"></div>
            {/* <div className="w-full flex flex-col lg:flex-row justify-between bg-red-300 mb-12 p-4 gap-4"> */}
            <div className="w-full flex flex-col lg:flex-row justify-between p-6 gap-8 ">
                {/* <div className="w-full lg:w-1/2 flex justify-center md:justify-start"> */}
                <div className="w-full lg:w-auto lg:flex-shrink-0">
                    <img
                        src={data?.image}
                        alt=""
                        //   className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-lg object-contain"    />
                        //   className="w-full h-auto max-h-[800px] rounded-lg object-contain"/>
                        className="w-full lg:w-[500px] h-auto max-h-[800px] rounded-lg object-contain" />
                </div>
                {/* <div className="w-full lg:w-1/2 text-xl space-y-6 text-white shadow-2xl rounded-lg border-2 p-6 bg-blue-900 bg-opacity-70 overflow-auto"> */}
                <div className="w-full h-fit my-auto lg:flex-grow text-xl space-y-6 text-white shadow-2xl rounded-lg border-2 p-6 bg-blue-900 bg-opacity-70 overflow-auto">
                    <div>
                        <h2 className="text-center bg-stone-100 p-2 flex-grow w-full text-stone-800 rounded-md shadow-2xl">
                            ID: {data?.id.toString() ? data.id.toString() : ''}
                        </h2>
                    </div>
                    <div className="flex justify-center gap-x-2 text-stone-800 text-center w-full rounded-md shadow-2xl">
                        {/* <h2 className="bg-stone-100 p-2 flex-grow w-fit rounded-md shadow-2xl"> */}
                        <h2 className="bg-stone-100 py-2 px-20 w-full rounded-md shadow-2xl">
                            {data?.name}
                        </h2>
                    </div>
                    <div className="flex justify-center gap-x-2 text-stone-800 text-center w-full rounded-md shadow-2xl">
                        {/* <h2 className="bg-stone-100 p-2 flex-grow w-fit rounded-md shadow-2xl"> */}
                        <h2 className="bg-stone-100 py-2 px-20 w-full rounded-md shadow-2xl">
                            {data?.position}
                        </h2>
                    </div>
                    <div className="flex justify-center gap-x-2 text-stone-800 text-center w-full rounded-md shadow-2xl">
                        {/* <h2 className="bg-stone-100 p-2 flex-grow w-fit rounded-md shadow-2xl"> */}
                        <h2 className="bg-stone-100 py-2 px-20 w-full rounded-md shadow-2xl">
                            {data?.category}
                        </h2>
                    </div>
                    <div className="flex justify-center  gap-x-2 text-stone-800 text-center w-full rounded-md shadow-2xl">
                        {/* <h2 className="bg-stone-100 p-2 flex-grow w-fit rounded-md shadow-2xl"> */}
                        <h2 className="bg-stone-100 py-2 px-20 w-full rounded-md shadow-2xl">
                            {data?.urls}
                        </h2>
                    </div>
                    <div>
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
