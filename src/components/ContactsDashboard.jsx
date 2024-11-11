import Navbar from "./Navbar.jsx";
import CardTile from "./CardTile.jsx";
import MintCard from "./MintCard.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
// import { GetIpfsUrlFromPinata } from "../utils/Pinata";
import { useContract } from "../contexts/ContractContext";
export default function ContactsDashboard({ reverse = false }) {
  const { contract, userAddress, isConnected, companyId } = useContract();
  const [data,] = useState([]);
  const [, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
 const [cardAddress, setCardAddress] = useState("0x0");


  // if (!isConnected && !contract) {
  //   return <div>Conecta tu wallet para acceder al Dashboard</div>;
  // }
 
    useEffect(() => {
        const fetchData = async () => {
          if (contract && isConnected) {
            try {
              const uris = await contract.getPublicCards();
              const fetchedCardData = await Promise.all(uris.map(async (item) => {
            try {
              const response = await axios.get(item[1]);
              const isContact = await contract.isMyContact(item[0]);
              
              // Solo retornamos los datos si es un contacto
              if (isContact) {
                return {
                  ...response.data,
                  cardAddress: item[0],
                  isContact
                };
              }
              return null; // Si no es contacto, retornamos null
            } catch (error) {
              console.error(`Error fetching data for URI: ${item[1]}`, error);
              return null;
            }
          }));
  
          const groupedCardData = fetchedCardData.reduce((acc, card) => {
            if (card && card.category) {
              if (!acc[card.category]) {
                acc[card.category] = [];
              }
              acc[card.category].push(card);
            }
            return acc;
          }, {});
  
          setCardData(groupedCardData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching card data:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [isConnected, userAddress, contract]);
        
          useEffect(() => {
          }, [cardData]);
        console.log("CARDDATA", cardData);
        
          return (
            <>
              <div>
                <Navbar></Navbar>
                {companyId && !reverse ? (
                  <div className="w-full">
                    <MintCard className="w-full w-full max-w-2xl" />
        
                  </div>
        
                ) : (
        
                  <div className="w-full flex flex-col justify-center place-items-center m-auto mt-32 text-center">
                    <div className="flex flex-col items-center md:text-xl font-bold text-white">
                      <h1 className="md:text-4xl font-bold text-white mb-10">
                        La tarjeta de presentación del Siglo XXI</h1>
                      <h2 className="md:text-3xl font-bold text-white mb-10">
                        Una revolución en las interacciones profesionales</h2>
                      <p className="w-4/5 py-2 px-12 md:text-xl font-bold text-stone-700 bg-stone-200 rounded-md">
                      Una tarjeta que proporciona datos verificables propiedad del usuario y trazabilidad de las interacciones,
                      eliminando tarjetas físicas y fomentando la sostenibilidad y la mejora de las relaciones profesionales en el mundo digital.</p>
                    </div>
                    <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                      {/* {sampleData.map((data, index) => { */}
                      {/* {data.map((data, index) => { */}
                      {/* // return <CardTile data={value} key={index}></CardTile>; */}
                      {/* // return <CardTile data={data} key={index}></CardTile>; */}
                      {/* // })} */}
                    </div >
                    <div className="flex flex-col items-center">
                      {cardData && isConnected ? (<h2 className="mt-12 font-bold text-xl text-stone-700 font-bold bg-stone-100 rounded-md py-2 px-20">
                        Listado de tus contactos</h2>
                        ) : (
                        <h2 className="mt-12 font-bold text-stone-700 font-bold bg-stone-100 rounded-md py-2 px-20">
                          Conéctate para ver tus contactos</h2>)}
                          {cardData && (
  <div className="flex flex-col items-center text-white gap-4">
    {Object.keys(cardData).map((category) => (
      <div key={category} className="flex flex-col items-center mt-10 text-white gap-4">
        <div className="flex flex-col justify-content mt-8 text-white gap-4">
        <h2 className="text-4xl text-center text-blue-900 font-bold bg-stone-100 rounded-md mt-4 py-2 px-20">{category}</h2>             
          {cardData[category].map((card, index) => (
            
            <div key={index} className="flex flex-col items-center">
              <CardTile data={card} />
              <p className="text-blue-700 mt-4 text-2xl text-center font-bold bg-stone-100 rounded-md py-2 px-8">Contacto</p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)}
        
                      <div className="flex justify-center mt-5 text-center text-white mt-12 mb-12 px-60" >
                        {userAddress && (
                          // <p>Wallet Address: {(userAddress.substring(0, 15) + '...')}</p>
                          <p className="text-stone-700 bg-stone-100 mt-20 py-1 px-6 w-fit border-2 border-stone-700 rounded-md shadow-2xl">Cuenta conectada: {(userAddress)}</p>
                        )}
                        {/* {!userAddress && (
                        <div>
                          <p className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center text-white">Connect Your Wallet </p>
                          <button onClick={connectMetaMask} className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm mb-10">{connected ? "Connected" : "Connect"}</button>
                        </div>
                      )} */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        }  