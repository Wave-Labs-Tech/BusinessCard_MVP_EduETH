// import CardForm from "./CardForm";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContract } from '../ContractContext';
import { contractAddress } from '../assets/constants/index';
import { ethers } from "ethers";


const PreMintData = ({setCardId}) => {
    const { contract, userAddress, provider } = useContract();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState('');

    const [message, updateMessage] = useState('');
    // const [cardId, setCardId] = useState<number | null>(null);
    const [lastCardId, setLastCardId] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [owner, setOwner] = useState(null);
    const [network, setNetwork] = useState('');

    const goToLastCard = () => {
        navigate('/LastCard');  // Navegar a la ruta /LastCard
    };

    useEffect(() => {
        const fetchNetwork = async () => {
            if (provider) {
                try {
                    const network = await provider.getNetwork(); // Esperar la resolución de la promesa
                    console.log("Network NAME", network);
                    setNetwork(network); // Asignar el nombre de la red al estado
                } catch (error) {
                    console.error("Error fetching network name:", error);
                }
            }
        };

        fetchNetwork(); // Llama a la función que obtiene el nombre de la red
    }, [provider]); // Ejecuta el efecto cuando `provider` cambia

    useEffect(() => {
        const fetchData = async () => {
            if (!contract || !provider) {
                console.warn("Contract or provider not ready");
                return; // Asegúrate de que contract y provider están listos
            }
            setIsLoading(true);

            try {
                // Obtener balance en wei           
                const balance = await provider.getBalance(userAddress);
                // Convertir de wei a ether
                const balanceInEth = ethers.formatEther(balance);
                setBalance(balanceInEth);
                console.log(`El balance de la cuenta del USER es: ${balanceInEth} ETH`);

                const lastCardId = await contract.lastCardId();
                setCardId(parseInt(lastCardId.toString()) + 1);
                setLastCardId(parseInt(lastCardId.toString()));

                const owner = await contract.owner();
                setOwner(owner);

                console.log("Address PREVIO CompanyId MintCard", userAddress);
                const companyId = await contract.getMyCompanyId();
                console.log("Respuesta directa CompanyId", companyId);
                if (companyId) {
                    setCompanyId("Universidad Adolfo Ibáñez");
                } else {
                    setCompanyId('');
                }
                console.log("companyId", companyId);
            } catch (err) {
                console.error("No se ha podido obtener data del contrato", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData(); // Ejecuta la función asíncrona dentro del useEffect.
    }, [contract, provider, userAddress]);


    return (
        <div className="w-full flex flex-col place-items-center mt-36 mr-20">
            <div>
                <div className="flex gap-2 text-stone-800 text-lg font-bold  text-lg">
                    <p className="w-60 py-2 px-2 bg-stone-200 flex items-center mt-10 rounded-md text-sm">
                        Cuenta del contrato:</p>
                    <p className="flex w-full py-2 px-4 bg-stone-100  items-center justify-center mt-10 rounded-md"> {contractAddress ? contractAddress : ""}</p>
                </div>
                <div className="flex gap-2 text-stone-800 text-lg font-bold">
                    <p className="w-1/3 py-2 px-2 bg-stone-200 flex items-center mt-10 rounded-md text-sm">
                        Dueño del Contrato:</p>
                    <p className="flex w-full py-2 px-4 bg-stone-100  items-center justify-center mt-10 rounded-md"> {owner ? owner : ""}</p>
                </div>
                <div className="flex gap-2 text-stone-800 text-lg font-bold">
                    <p className="w-1/3 py-2 px-2 bg-stone-200 flex items-center mt-10 rounded-md text-sm">
                        Compañia:</p>
                    <p className="flex w-full py-2 px-4 bg-stone-100  items-center justify-center mt-10 rounded-md"> {companyId ? companyId : "NO"}</p>
                    {/* {blockNumber? <p className="flex w-full py-2 px-4 bg-stone-100  items-center justify-center mt-10 rounded-md"> {blockNumber}</p> : <p>'</p>} */}
                    {/* {blockNumber && <p className="flex w-full py-2 px-4 bg-stone-100  items-center justify-center mt-10 rounded-md"> {blockNumber}</p>} */}
                </div>

                <div className="flex gap-2 text-stone-800 text-lg font-bold">
                    <p className="w-1/3 py-2 px-2 bg-stone-200 flex items-center mt-10 rounded-md text-sm">
                        Cuenta conectada:</p>
                    <p className="flex w-full py-2 px-4 bg-stone-100  items-center justify-center mt-10 rounded-md"> {userAddress ? userAddress : ""}</p>
                </div>
                <div className="flex gap-2 text-stone-800 text-lg font-bold">
                    <p className="w-1/3 py-2 px-2 bg-stone-200 flex items-center mt-10 rounded-md text-sm">
                        Red:</p>
                    <p className="flex w-full py-2 px-4 bg-stone-100  items-center justify-center mt-10 rounded-md">   {network ? network.chainId === 421614 ? "Arbitrum Sepolia" : network.name : 'Cargando...'}
                    </p>
                </div>
                <div className="flex gap-2 text-stone-800 text-lg font-bold">
                    <p className="w-1/3 py-2 px-2 bg-stone-200 flex items-center mt-10 rounded-md text-sm">
                        Balance:</p>
                    <p className="flex w-full py-2 px-4 bg-stone-100  items-center justify-center mt-10 rounded-md"> {balance ? balance : ""}</p>
                </div>
                <div className="flex gap-2 text-stone-800 text-lg font-bold">
                    <p className="w-1/3 py-2 px-2 bg-stone-200 flex items-center mt-10 rounded-md text-sm">
                        Proxima tarjeta:</p>
                    <p className="flex w-full py-2 px-4 bg-stone-100  items-center justify-center mt-10 rounded-md"> {lastCardId ? lastCardId + 1 : ""}</p>
                </div>
                <div className="flex justify-center gap-2 text-stone-800 text-lg font-bold">
                    <button className="w-1/2 py-2 px-4 bg-stone-100 flex justify-center mt-10 rounded-md hover:scale-105 hover:bg-stone-200" onClick={goToLastCard}>Ver última tarjeta</button>
                </div>
            </div>
        </div>
    )
}
export default PreMintData;