import Navbar from "./Navbar.jsx";
import CardTile from "./CardTile.jsx";
import MintCard from "./MintCard.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
// import { GetIpfsUrlFromPinata } from "../utils/Pinata";
import { useContract } from '../ContractContext';

export default function Dashboard({ reverse = false }) {
  const { contract, userAddress, isConnected, companyId } = useContract();
  const [data,] = useState([]);
  const [, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  // const [, setUserTokenURI] = useState('');
  // const [companyId, setCompanyId] = useState(null);
  // const [isUniversityCompanyCreated, setIsUniversityCompanyCreated] = useState(false);
  const [cardAddress, setCardAddress] = useState("0x0");


  // if (!isConnected && !contract) {
  //   return <div>Conecta tu wallet para acceder al Dashboard</div>;
  // }
  useEffect(() => {
    // let lastCardId = 0;
    // let companyCreated = isUniversityCompanyCreated;
    const fetchData = async () => {
      // if (!isConnected) return;
      // try {
      //   const owner = await contract?.owner();
      //   if (userAddress.toLowerCase() === owner.toLowerCase() && companyCreated === false) {
      //     console.log("isUniversityCompanyCreated???????", isUniversityCompanyCreated);
      //     if (!isUniversityCompanyCreated) {
      //       // createCompany(); ///////////////////////COMENTAR y DESCOMENTAR para gestionar creacion de company para la UNI
      //       setIsUniversityCompanyCreated(true);
      //       companyCreated = true;
      //       console.log("companyCreated?IF", companyCreated);
      //     } else {
      //       companyCreated = true;
      //       console.log("companyCreated?ELSE", companyCreated);
      //     }
      //   }
      // } catch (error) {
      //   console.error("Problema al recuperar el owner del contrato " + error);
      // }

      if (contract && isConnected) {
        // try {
        //   lastCardId = await contract?.lastCardId();
        //   console.log("lastCardId", lastCardId.toString());
        // } catch (err) {
        //   console.error("Error obteniendo el id de la ultima card" + err);
        // }

        // if(companyId) return;
          // try {
          //   let tokenURI = await contract.tokenUriByAddress(userAddress);
          //   setUserTokenURI(tokenURI);
          //   setCompanyId('');
          // } catch {
          //   console.log("No tokenURI");
          //   setUserTokenURI('');
          // }
          try {
            const uris = await contract.getPublicCards();
            // Mapeo para obtener los datos de cada URL de IPFS
            const cardData = await Promise.all(uris.map(async (item) => {
              try {
                // Realizamos una solicitud a cada URL (id es la URL de IPFS)
                const response = await axios.get(item[1]);
                // setCardAddress(item[0])
                console.log("RESPONSE: ", response);
                console.log("RESPONSE_ID: ", response.data.id);
                console.log("RESPONSE: ", response.data.image);
                console.log("CardADDRESS en Dashboard", item[0]);
                const shared = await contract.hasShared(item[0], userAddress);
                const sharedOut = await contract.hasShared(userAddress, item[0]);
                // const shared = false;
                // if(shared) setIsShared(true);
                let contact = false;
                try{
                  if(!companyId){
                    contact = await contract.isMyContact(item[0]);
                  } 
                }catch(error){
                  console.log("Error al comprobar si es un contacto: ", error);
                  return null;
                }
                // const contact = await contract.isMyContact(item[0]);
                // const contact = false;
                // if(contact) setIsContact(true);
                return {
                  ...response.data,  // Retorna los datos obtenidos desde IPFS
                  cardAddress: item[0],// Añadimos la dirección de la card
                  shared,
                  sharedOut,
                  contact  
                };
              } catch (error) {
                console.error(`Error fetching data for URI: ${item[1]}`, error);
                return null;  // Manejar el error y continuar con el siguiente ID
              }
            }));

            // Filtramos los valores nulos en caso de que haya algún error al obtener los datos
            const validCardData = cardData.filter(item => item !== null);

            // Agrupamos los datos por categoría
            const categorizedData = validCardData.reduce((acc, card) => {
              const category = card.category || "Sin categoría";  // En caso de que no tenga categoría
              if (!acc[category]) {
                acc[category] = [];  // Creamos la categoría si no existe
              }
               acc[category].push({
              ...card,
              cardAddress: card.cardAddress,
              shared: card.shared, 
              sharedOut: card.sharedOut,  // Guardamos el estado de shared en cada card
              contact: card.contact  // Guardamos el estado de contact en cada card
            });
            console.log("ACC-ACC", acc);
            console.log("ACC-ACCXX", acc["Aeroespacial"][0].sharedOut)
              return acc;
            }, {});

            // setCardData(cardData);
            setCardData(categorizedData);
            // const card = await contract?.getMyCard();
          } catch (error) {
            console.log("Error obteniendo datos de las card ", error);
          }
        
      }
    };

    setLoading(false);
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
              {cardData && isConnected ? (<h2 className="mt-12 font-bold text-stone-700 font-bold bg-stone-100 rounded-md py-2 px-20">
                Listado de Business Cards por categoría</h2>
                ) : (
                <h2 className="mt-12 font-bold text-stone-700 font-bold bg-stone-100 rounded-md py-2 px-20">
                  Conéctate para ver las cards</h2>)}
              {cardData && (
                <div className="flex flex-col items-center text-white gap-4">
                  {/* {cardData && (
                    <div className=" flex gap-4 mt-10 text-white mx-auto">
                      {cardData.map((cardData, index) => (
                        <CardTile key={index} data={cardData} cardId={cardData.cardId || index.toString()} cardAddress={cardAddress}></CardTile>
                      ))}
                    </div>
                  )} */}
                  {cardData && Object.keys(cardData).map((category) => (
                    <div key={category} className="flex flex-col items-center mt-10 text-white gap-4">
                      <h2 className="text-4xl text-center text-blue-900 font-bold bg-stone-100 rounded-md mt-4 py-2 px-20">{category}</h2>
                      <div className="flex justify-content mt-8 text-white gap-4">
                      {cardData[category].map((card, index) => (
        <div key={index} className="flex flex-col items-center">
          <CardTile data={card} />
          
          {/* Verificamos si contact o shared son true para mostrar el mensaje */}
          {card.contact? (
            <p className="text-blue-700 mt-4 text-2xl text-center font-bold bg-stone-100 rounded-md py-2 px-8">Soys contacto</p>
          ): card.shared ?(
            <p className="text-green-600 mt-4 text-2xl text-center font-bold bg-stone-100 rounded-md py-2 px-8">¡Te ha solicitado conexión!</p>
          ):  card.sharedOut ? (
            <p className="text-orange-600 mt-4 text-2xl text-center font-bold bg-stone-100 rounded-md py-2 px-8">
                Conexión enviada
            </p>
        ) : null}
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