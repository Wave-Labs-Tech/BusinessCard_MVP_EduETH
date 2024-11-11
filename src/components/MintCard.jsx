import Navbar from "./Navbar.jsx";
import { addCardToWallet } from "../utils/AddCardToWallet";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/Pinata";
import { ethers } from "ethers";
import { contractAddress } from '../assets/constants/index';
// import { useLocation } from "react-router";
import CardForm from "./CardForm.jsx";
import PreMintData from "./PreMintData.jsx";
import { encryptData, decryptData } from "../utils/Crypto";
import { useContract } from "../contexts/ContractContext";
import { ClipLoader } from "react-spinners";
import LoadingScreen from "./LoadingScreen.jsx";
import { toast } from "react-toastify";

export default function MintCard() {
  const { contract, userAddress, provider, companyId } = useContract();

  // console.log("Contract", contract);
  // console.log("Provider", provider);
  const [formParams, updateFormParams] = useState({ name: '', position: '', category: '', urls: '', telefono: '', email: '' , address: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState('');

  const [fileURL, setFileURL] = useState(null);
  
  const [message, updateMessage] = useState('');
  // const [cardId, setCardId] = useState<number | null>(null);
  const [cardId, setCardId] = useState(null);
  
  // async function disableButton() {
  //     const listButton = document.getElementById("list-button")
  //     listButton.disabled = true
  //     listButton.style.backgroundColor = "grey";
  //     listButton.style.opacity = 0.3;
  // }

  // async function enableButton() {
  //     const listButton = document.getElementById("list-button")
  //     listButton.disabled = false
  //     listButton.style.backgroundColor = "#A500FF";
  //     listButton.style.opacity = 1;
  // }

  //This function uploads the NFT image to IPFS
  // async function OnChangeFile(e) {
  //     var file = e.target.files[0];
  //     //check for file extension
  //     try {
  //         //upload the file to IPFS
  //         disableButton();
  //         updateMessage("Uploading image.. please dont click anything!")
  //         const response = await uploadFileToIPFS(file);
  //         if(response.success === true) {
  //             enableButton();
  //             updateMessage("")
  //             console.log("Uploaded image to Pinata: ", response.pinataURL)
  //             setFileURL(response.pinataURL);
  //             console.log("fileURL updated:", fileURL);
  //         }
  //     }
  //     catch(e) {
  //         console.log("Error during file upload", e);
  //     }
  // }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS(data, fileURL, id) {
    console.log("Datos recibidos UPLOAD:", data, fileURL);
    let cardCid = null;
    let privateInfoCid = null;
    // let _companyId = 1;/////////////////////TEMPORALMENTE/////////////////////////////
    // console.log("cardId-cardId: ", cardId);
    const { name, position, category, urls, telefono, email } = data;
    // const name = data.name;
    // const position = data.posicion;
    // const category = data.category;
    // const urls = data.urls;
    // const telefono = data.telefono;
    // const email = data.email;
    // const fileURL = fileURL;
    console.log("Inic. UPLOAD:", data, fileURL);
    console.log("Inic. MINt: name:", data.name);
    console.log("Inic. MINt: fileURL:", fileURL);
    console.log("Inic. MINt: telefono:", data.telefono);
    //Make sure that none of the fields are empty
    console.log("Todos los valores: ", companyId, id, name, position, category, urls, telefono, email, fileURL);
    if (!id || !name || !position || !category || !urls || !telefono || !email || !fileURL) {
      updateMessage("Please fill all the fields!")
      return -1;
    } else if (!companyId) {
      updateMessage("Error fetched companyId from the contract!")
      return -1;
    }

    const cardJSON = {
      id ,name, position, category, urls, image: fileURL
    }
    const temporaryCids = [
      'https://gateway.pinata.cloud/ipfs/QmWCPpcWc5nd5yfpmhWrRkqud8xenCYtda6nADanMuedMr',
      'https://gateway.pinata.cloud/ipfs/QmZwZtRfz2kBT1Frd8RRfgrmDAGJRzCvYiSNd6zN14HSvu',
      'https://gateway.pinata.cloud/ipfs/QmXxn4YUH6MaPQgZ5vr28tJy5UCPfvKJZm6zvfr8WVat24',
      'https://gateway.pinata.cloud/ipfs/QmVMPD4aMRRPH8QsY2vYDy9Wqi6xj2E8JMxDkLR6otiq84',
      'https://gateway.pinata.cloud/ipfs/QmaoqrXkoQAsjjDL4ttr1aQb2QurkHY3ZaqcJhjQtmQBKx',
      'https://gateway.pinata.cloud/ipfs/QmWsQhr4kreDbHp4oCquuKAEVeFRV7vV3esSKhvZBc3HkQ',
      'https://gateway.pinata.cloud/ipfs/QmcVEPJHH2hnzDAGbf7DQEkyEoi3uN4G22iDpn1tiHB9ZK',
      'https://gateway.pinata.cloud/ipfs/QmUPcYPa5BhWDJ8crx3pFbitwQfCccnB1SLbfKoPqogTXE',
      'https://gateway.pinata.cloud/ipfs/QmcJFw79QdG4cFz3VP4acZ6kDNgpeqr9KWDxGaWGuB9KLj',
      'https://gateway.pinata.cloud/ipfs/QmeHbwXgfFt5Ev7fssBZnTnwD8ihE6mUKrVdAreSfXD5sk'
    ];
    // let cidsNum = 0;
    //será 0 si se cambia de navegador
    let cidsNum = parseInt(localStorage.getItem('cidsNum')) || 0;
    try {
      //upload the metadata JSON to IPFS
      // const cardResponse = { success: true, pinataURL: temporaryCids[cidsNum] };
      // cidsNum++;
      // if(cidsNum >= temporaryCids.length) cidsNum = 0;
      // localStorage.setItem('cidsNum', cidsNum);
      
      const cardResponse = { success: true, pinataURL: "https://gateway.pinata.cloud/ipfs/QmZwZtRfz2kBT1Frd8RRfgrmDAGJRzCvYiSNd6zN14HSvu" };
      // const cardResponse = await uploadJSONToIPFS(cardJSON);//TEMPORALMENTE DESACTIVADA DURANTE EL DESARROLLO
      // const cardResponse = { success: true, pinataURL: "https://gateway.pinata.cloud/ipfs/QmWgwHYTUHhc5xb97Psug56JYEWosTdeHnmeNKnrmLR6mS" };
      if (cardResponse.success === true) {
        cardCid = cardResponse.pinataURL;
      }
    }
    catch (e) {
      console.log("error uploading card JSON metadata:", e);
      return -1;
    }

    const privateInfoJson = {
      telefono, email
    }
    const encryptedPrivateInfo = encryptData(privateInfoJson);
    console.log("Encrypted Data:", encryptedPrivateInfo);

    // const decrypted = decryptData(encryptedPrivateInfo); //SOLO TEMPORALMENTE para pruebas
    // console.log("Decrypted Data:", decrypted);
    try {
      if (!encryptedPrivateInfo) {
        return -1;
      }
      const temporaryPrivateCids =[
        'https://gateway.pinata.cloud/ipfs/QmeQAynASrqptFsLH8DesA5dYTo6rdm8fWAdqoFAzWsZJY',
        'https://gateway.pinata.cloud/ipfs/QmRDRxYJsc2YZGTCkam5T4Axom74JadbGJ5kw9vc9gb3hJ',
        'https://gateway.pinata.cloud/ipfs/QmW87GSnCJ354sowdUPPNa4ofqV9zbewQoyxRw69D8VGVB'
      ]
      let privateCidsNum = parseInt(localStorage.getItem('privateCidsNum')) || 0;
      //upload the metadata JSON to IPFS
      const encryptedPrivateInfoObj = { encryptedData: encryptedPrivateInfo };
      const privateInfoResponse = { success: true, pinataURL: temporaryPrivateCids[privateCidsNum] }
      // const privateInfoResponse = await uploadJSONToIPFS(encryptedPrivateInfoObj);//TEMPORALMENTE DESACTIVADA DURANTE EL DESARROLLO
      // const privateInfoResponse = { success: true, pinataURL: "https://gateway.pinata.cloud/ipfs/QmZYgYkrCvK56rFVetKB5f2fi6Kdeq9ioyishLRVg1wYg8" }; //Encriptado
      // const privateInfoResponse = { success: true, pinataURL: "https://gateway.pinata.cloud/ipfs/Qmds1TGp6kRiqpD8qp9Z67TSmqs5nqBk5bmbNDjSskmziW" };//Sin encriptar
      privateCidsNum++;
      if(privateCidsNum >= temporaryPrivateCids.length) privateCidsNum = 0;
      localStorage.setItem('privateCidsNum', privateCidsNum);
      
      if (privateInfoResponse.success === true) {
        privateInfoCid = privateInfoResponse.pinataURL;
        // console.log("Uploaded privateInfoJson to Pinata: ", privateInfoResponse);
        // console.log("Uploaded privateInfoJson PinataURL: ", privateInfoResponse.pinataURL);
        // return privateInfoResponse.pinataURL;
      }


    }
    catch (e) {
      console.log("error uploading JSON private metadata:", e);
      return -1;
    }
    // console.log("-----cardCid, privateInfoCid:", cardCid, privateInfoCid);
    return { cardCid, privateInfoCid };
  }


  async function mintCard(data, fileURL) {
    setIsLoading(true)
    let id;
    // e.preventDefault();

    //Upload data to IPFS
    try {
      const { address } = data;
      console.log("Card address:", address);
      try{
        const lastCardId = await contract.lastCardId();
        id = parseInt(lastCardId.toString())+ 1;
        console.log("id en cardMINT:", id);
      }catch(error){
          console.log("Error obteniendo el ultimo cardId:", error);
      }
      
      const result = await uploadMetadataToIPFS(data, fileURL, id);
      if (result === -1) {
        console.error("Error uploading metadata to IPFS");
        return;
      }
      const { cardCid, privateInfoCid } = result;
      console.log("Card CID:", cardCid);
      console.log("Private Info CID:", privateInfoCid);
      // disableButton();
      updateMessage("Uploading Card(takes 5 mins).. please dont click anything!")
      // console.log("contract-Pre-CARD", contract);   
      console.log("DATOS-Pre-CARD", contract, cardCid, privateInfoCid, address);
      if (contract && cardCid && privateInfoCid && address) {
        console.log("cardId-Pre-ADD", cardId);
        console.log("Address", address);
        let transaction = await contract?.createCardFor(cardCid, privateInfoCid, address);
        await transaction.wait();
        console.log("transaction", transaction);
        try{
        const amountValue = ethers.parseEther("0.0015");
        // const amountValue = 1500000000000000;

        // Enviar ETH directamente desde la cuenta dueña del contrato
        console.log("amountValue Mint", amountValue);
        const signer = await provider.getSigner();
        console.log("contract.signer Mint", signer);
        const transferTx = await signer.sendTransaction({
          to: address,
          value: amountValue
        });
        await transferTx.wait();
        console.log("transferTx", transferTx);
        console.log(`Se han enviado 0.0015 ETH a la dirección: ${address}`);
        toast(`Se han enviado 0.0015 ETH a la dirección: ${address}`)
      } catch (error) {
        toast.error("Error al enviar ETH:", error);
        console.error("Error al enviar ETH:", error.message);
      }
        //   setTimeout(() => {
        //     alert("Successfully listed your Card!");  
        // }, 150000); // 8000 milisegundos = 8 segundos
        addCardToWallet(contractAddress, cardId.toString(), fileURL);
        alert("Successfully listed your Card!");
      }

      // enableButton();
      updateMessage("");
      updateFormParams({ id: 0, name: '', position: '', category: '', urls: '', telefono: '', email: '', address: '' });
      window.location.replace("/lastCard")
    }catch (e) {
      alert("Upload error" + e)
      updateMessage("Error emitiendo la tarjeta")
    } finally {
      setIsLoading(false);
    }
  }

  // const handleFormSubmit = (data: CardData, fileURL: string | null) => {
  const handleFormSubmit = (data, fileURL) => {
    if(!data){
      return
    }
    // updateFormParams(data);
    // setFileURL(fileURL);

    console.log("Datos RECIBIDOS en handlesubmit:", data, fileURL);
    mintCard(data, fileURL);
  };

  if (isLoading) {
    return (
      <LoadingScreen loadingText="Creando tu Business Card"/>
      // <div className="flex items-center justify-center h-screen">
      //   <div className="flex flex-col bg-stone-100 p-8 items-center justify-center border-2 border-stone-800 rounded-md">
      //     <ClipLoader color="#3498db" size={100} />
      //     <p className="mt-4 text-xl font-semibold">Creando tu Business Card</p>
      //     <p className="mt-2 text-lg text-stone-900">Esto puede tomar unos momentos. Por favor, no cierres esta página.</p>
      //   </div>
      // </div>
    );
  }

  return (
    <div className="">
      <Navbar />
      <div className="w-full flex-col xl:flex-row flex justify-between mt-12">
        <PreMintData setCardId={setCardId} />
        <div className="w-full flex flex-col place-items-center mt-28">
          {message && (<p className="w-full p-4 bg-stone-100 flex justify-center mt-2 text-red-600 text-2xl font-bold rounded-md">
            {message}</p>)}
          <CardForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  )
}