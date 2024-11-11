import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useContract } from "../contexts/ContractContext";
import { GetCardData } from '../utils/CardData';
import Navbar from "./Navbar.jsx";
import CardTile from "./CardTile.jsx";
import LoadingScreen from "./LoadingScreen.jsx";

export default function LastCard() {
    const { contract, userAddress } = useContract();
    const [cardId, setCardId] = useState(null);
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    /*
    * Fetches the card data from the blockchain contract.
    * This function retrieves the last card ID, fetches the corresponding 
    * card data using the GetCardData utility, and updates the state 
    * with the fetched data. It also marks the data as fetched.
    *
    * @param {number} tokenId - The ID of the token to fetch data for.
    */
    async function fetchCardData(tokenId) {
        try {
            const lastCardId = await contract.lastCardId();
            const cardId = parseInt(lastCardId.toString());
            setCardId(cardId);

            const cardData = await GetCardData(contract, cardId, '0x');

            updateData(cardData);
            updateFetched(true);  // Marca que los datos ya fueron obtenidos.

        } catch (error) {
            console.error("Error fetching card data:", error);
        }
    }

    /*
    * Handles the visibility of the card.
    * This function sends a transaction to the contract to set the 
    * visibility of the card to true. It manages loading state 
    * and provides user feedback based on the transaction result.
    */
    async function handleVisibility() {
        setIsLoading(true)
        try {
            const transaction = await contract.setVisibilityCard(true);
            await transaction.wait();
            alert("La tarjeta ahora puede verse en el Dashboard")
        } catch (error) {
            alert("Ha fallado el cambio de visibilidad")
            console.error("Ha fallado el cambio de visibilidad" + error)
        } finally {
            setIsLoading(false);
        }
    }

    /*
    * Effect that fetches card data when the component mounts or 
    * when the contract is available and data has not been fetched yet.
    * It ensures that the card data is only fetched once.
    */
    useEffect(() => {
        if (!dataFetched && contract) {
            fetchCardData();
        }
    }, [dataFetched, contract]);

    if (isLoading) {
        return (
            <LoadingScreen loadingText="Cambiando la visibilidad de la Card"/>
        );
    }

    return (
        // <div style={{ "minHeight": "100vh" }}>
        <div className="w-full">
            <Navbar></Navbar>
            <div className="profileClass">
                <div className="flex text-center flex-col mt-36 md:text-2xl text-white">
                    <div className="mb-5">
                        <h2 className="font-bold">Cuenta conectada</h2>
                        {userAddress}
                    </div>
                </div>
                <p className="flex text-center justify-center mt-10 md:text-2xl text-white">
                    Tarjeta número {cardId}
                </p>
                <div className="flex flex-col text-center items-center mt-11 text-white">
                    <h2 className="font-bold">Última tarjeta emitida</h2>
                    {data ? (
                        <CardTile data={data} cardId={cardId} />
                    ) : (
                        <p className="mt-10 text-xl">Cargando datos de la tarjeta...</p>
                    )}
                    <button onClick={handleVisibility} className="font-bold mt-10 w-2/5 px-1 bg-red-600 text-white rounded p-2 shadow-lg" id="list-button">
                        Cambiar Visibilidad</button>
                    <div className="mt-10 text-xl">
                        {data?.length === 0 ? "Oops, No NFT data to display (Are you logged in?)" : ""}
                    </div>
                </div>
            </div>
        </div>
    )
};