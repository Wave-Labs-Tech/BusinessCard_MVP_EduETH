import React, { useState, ChangeEvent, FormEvent } from 'react';
import { uploadJSONToIPFS, uploadFileToIPFS } from "../utils/Pinata";
import {
    handleNameChange as handleNameChangeFromUtils,
    handlePhoneNumberChange as handlePhoneNumberChangeFromUtils, handlePhoneNumberBlur,
    validateUrls
} from "../utils/Utils";
import { compressImage } from "../utils/CompressImage";
// import { handlePhoneNumberChange as handlePhoneNumberChangeFromUtils } from "../utils/Utils";
// import { CardData } from '../../types';

// interface PrivateInfo {
//     telefono: string;
//     email: string;
//   }
// interface CardData {
//     name: string;
//     position: string;
//     urls: string;
//     // privateInfoUrl: string;
//     telefono: string;
//     email: string;
//   }

// interface CardFormProps {
//     onSubmit: (data: CardData, fileURL: string | null) => void;
// }

// const CardForm: React.FC<CardFormProps> = ({ onSubmit }) => {
const CardForm = ({ onSubmit }) => {
    const [cancelProcess, setCancelProcess] = useState(false);
    // const [formParams, updateFormParams] = useState<CardData>({
    const [formParams, updateFormParams] = useState({
        name: '',
        position: '',
        category: '',
        urls: '',
        //   privateInfoUrl: '',
        telefono: '+',
        email: '',
        address: ''
    });
    // const [privateInfo, updatePrivateInfo] = useState<PrivateInfo>({
    //     telefono: '',
    //     email: '',
    //   });

    const [message, updateMessage] = useState('');
    const [fileURL, setFileURL] = useState(null);
    // const [fileURL, setFileURL] = useState<string | null>(null);
    // const [formParams, updateFormParams] = useState({ name: '', cargo: '', descripcion: '', telefono: '+', email: ''});
    // const [originalUrl, setOriginalUrl] = useState<string | null>(null);
    const [originalUrl, setOriginalUrl] = useState(null);
    // const [compressedPreviewUrl, setCompressedPreviewUrl] = useState<string | null>(null);
    const [compressedPreviewUrl, setCompressedPreviewUrl] = useState(null);

    //This function uploads the NFT image to IPFS
    // async function OnChangeFile(e: React.FormEvent<HTMLInputElement>) {
    async function OnChangeFile(e) {
        try {
            // const fileInput = e.target as HTMLInputElement; // Afirmación de tipo
            const fileInput = e.target; 
            const file = fileInput.files?.[0]; // Usa el operador de encadenamiento opcional
            // console.log("file en inicio de OnChangeFile: ", file)

            //check for file extension
            try {
                //upload the file to IPFS
                // disableButton();
                if (!file) return;
                const compressedImage = await compressImage(file, 600, 600);
                // console.log("compressedImage: ", compressedImage)
                console.log("Tamaño original:", file.size, "bytes");
                console.log("Tamaño comprimido:", compressedImage.size, "bytes");

                //ELIMINAR, comprobaciones de prueba
                // const originalUrl = URL.createObjectURL(file);
                // setOriginalUrl(originalUrl);
                const compressedUrl = URL.createObjectURL(compressedImage);
                setCompressedPreviewUrl(compressedUrl);

                // console.log("URL imagen original:", originalUrl);
                console.log("URL imagen comprimida:", compressedUrl);

                updateMessage("Uploading image.. please dont click anything!")
                if (file) {
                      const response = await uploadFileToIPFS(compressedImage);//DESACTIVADO durante el desarrollo
                    // const response = {
                    //     success: true,
                    //     // pinataURL: "https://gateway.pinata.cloud/ipfs/QmSRkTj5rrUUJcPPFcVrRMgdKKtdikkgZ4igVLe6i3dNXy",
                    //     pinataURL: "https://gateway.pinata.cloud/ipfs/Qma8W5dmpk5d6Xyy5w8EQHx4aSzGNzjhZuzRTsud5aNmkS",
                    // };
                    if (response.success === true) {
                        // enableButton();
                        updateMessage("")
                        console.log("Uploaded image to Pinata: ", response.pinataURL)
                        // Verifica que response.pinataURL no sea undefined
                        if (response.pinataURL) {
                            setFileURL(response.pinataURL);
                            console.log("fileURL updated:", response.pinataURL);
                        }
                    }
                }
            }
            catch (e) {
                console.log("Error during file upload", e);
                updateMessage("Error uploading image")
            }
        } catch (error) {
            console.error("Error en OnChangeFile:", error);
        }
    }

    // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const handleNameChange = (e) => {
        const newName = e.target.value;
        handleNameChangeFromUtils(e, formParams, updateFormParams, updateMessage);
    };


    // const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const handlePhoneNumberChange = (e) => {
        const newPhoneNumber = e.target.value;
        handlePhoneNumberChangeFromUtils(e, formParams, updateFormParams, updateMessage);
    };

    const handleCancel = () => {
        // e.preventDefault();
        setCancelProcess(true);
        // updateFormParams({ name: '', position: '', urls: '', privateInfoUrl: ''});
        updateFormParams({ name: '', position: '', urls: '', telefono: '+', email: '', address: '' });
        // updatePrivateInfo({telefono: '', email: ''});
        setFileURL('');
        updateMessage("");
        setCompressedPreviewUrl('');
    }

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const {telefono, email} = privateInfo;
        // if(!telefono || !email)
        //     {
        //         updateMessage("Please fill all the fields!")
        //         return;
        //     }
        //     const privateInfoJSON = {
        //         telefono, email
        //     }
        // console.log("formparams y fileurl en CardForm", formParams, fileURL);
        const { isValid, invalidUrls } = validateUrls(formParams.urls);
        // console.log("isValid, invalidUrls ", isValid, invalidUrls);
        if (!isValid) {
            updateMessage(`Las siguientes URLs no son válidas: ${invalidUrls.join(', ')}`);
            return;
        }
        try {
            //upload the metadata JSON to IPFS
            // const response = await uploadJSONToIPFS(privateInfoJSON);//DESACTIVADO TEMPORALMENTE
            // const response = { success: true, pinataURL: "https://gateway.pinata.cloud/ipfs/Qmds1TGp6kRiqpD8qp9Z67TSmqs5nqBk5bmbNDjSskmziW" };
            // if(response.success === true){
            //     console.log("Uploaded private JSON to Pinata: ", response);
            //     console.log("Uploaded private JSON PinataURL: ", response.pinataURL);
            //     // Actualizar formParams con la URL de la información privada
            //     updateFormParams(prev => ({
            //         ...prev,
            //         privateInfoUrl: response.pinataURL || ''
            //     }));
            //     // Esperar un momento para asegurarse de que el estado se haya actualizado
            // await new Promise(resolve => setTimeout(resolve, 0));
            // }
            const { name, position, category, urls, telefono, email, address } = formParams;
            console.log("DATOS en CARDForm:", name, position, category, urls, telefono, email, address, fileURL);
            // Asegúrate de que los campos no están vacíos
            if (!name || !position || !category || !urls || !telefono || !email || !address || !fileURL) {
                updateMessage("Por favor, completa todos los campos.");
                return;
            }
            // onSubmit({ ...formParams}, {...privateInfo}, fileURL );
            onSubmit({ name, position, category, urls, telefono, email, address }, fileURL);
        }
        catch (e) {
            console.log("error uploading JSON metadata:", e);
            updateMessage("Error uploading private JSON metadata");
        }
    };
    //   const handlePrivateInfoChange = (field: keyof PrivateInfo, value: string) => {
    //     updatePrivateInfo(prev => ({ ...prev, [field]: value }));
    //   };

    return (
        <div className="w-full max-w-2xl flex flex-col place-items-center mb-12">
            <form onSubmit={handleSubmit} className="w-full max-w-full bg-white shadow-md rounded px-20 py-4 text-blue-900">
                {/* <h3 className="text-center font-bold mb-8">Upload your Card to the APP</h3> */}
                <h3 className="text-center font-bold mb-8 text-xl md:text-2xl">Crear una nueva Card</h3>
                <div className="mb-4 w-full">
                    <label className="text-lg font-bold mb-2" htmlFor="name">Nombre</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 text-lg leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" name="name" placeholder="Tu nombre" required minLength={10}
                        maxLength={100} onChange={handleNameChange} value={formParams.name}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">Posicion</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="position" type="text" name="position" placeholder="Tu posicion" required minLength={10}
                        maxLength={50} onChange={e => updateFormParams({ ...formParams, position: e.target.value })} value={formParams.position}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="category">Categoria</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category" type="text" name="category" placeholder="Categoria" required minLength={10}
                        maxLength={50} onChange={e => updateFormParams({ ...formParams, category: e.target.value })} value={formParams.category}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="urls">Urls</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        cols={40} rows={5} id="urls" name="urls" placeholder="Urls" onChange={e => updateFormParams({ ...formParams, urls: e.target.value })} value={formParams.urls}></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="telefono">Teléfono</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        // id="telefono" type="tel" name="telefono" placeholder="+34 555 555 555" required onChange={handlePhoneNumberChange} value={privateInfo.telefono}></input>
                        id="telefono" type="text" name="telefono" placeholder="+123 456 789 ó +12 34567890" required onChange={handlePhoneNumberChange} value={formParams.telefono}
                        onBlur={() => handlePhoneNumberBlur(formParams.telefono, updateFormParams, updateMessage)}></input>
                    {/* // id="telefono" type="tel" name="telefono" placeholder="+34 555 555 555" required onChange={e => updateFormParams({...formParams, telefono: e.target.value})} value={formParams.telefono}></input> */}

                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        // id="email" type="email" name="email" placeholder="tunombre@loquesea.com" required onChange={e => handlePrivateInfoChange("email",e.target.value)} value={privateInfo.email}></input>
                        id="email" type="email" name="email" placeholder="ejemplo@dominio.com" required minLength={20}
                        maxLength={100} onChange={e => updateFormParams({ ...formParams, email: e.target.value })} value={formParams.email}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">Cuenta</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address" type="text" name="address" placeholder="0x1a2B3c4D5e6F7g8H9I0j" required minLength={10}
                        maxLength={50} onChange={e => updateFormParams({ ...formParams, address: e.target.value })} value={formParams.address}></input>
                </div>
                {/* <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div> */}
                {/* <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="Cuenta">Cuenta</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="cuenta" type="text" name="cuenta" placeholder="Número de cuenta" required onChange={e => updateFormParams({...formParams, cuenta: e.target.value})} value={formParams.cuenta}></input>
                </div> */}
                <div>
                    <label className="block text-sm font-bold mb-2" htmlFor="image">Subir imagen (&lt;500 KB)</label>
                    <input type={"file"} onChange={OnChangeFile}></input>
                    <div className="flex flex-col items-center text-center mt-4">
                    {compressedPreviewUrl && (
                        <>
                            <h3>Vista previa de la imagen comprimida</h3>
                            <img src={compressedPreviewUrl} alt="Vista previa comprimida" className="w-3/4 rounded-md mt-4"/>
                        </>
                    )}   
                </div>
                </div>
                <br></br>
                <div className="text-red-500 text-center">{message}</div>
                <div className="flex gap-2 text-sm md:text-lg">
                    <button type="submit" disabled={!formParams || !fileURL}
                        className="font-bold mt-10 w-4/5 bg-blue-500 text-white rounded p-2 shadow-lg" id="list-button">
                        Crear Card
                    </button>
                    <button onClick={handleCancel} className="font-bold mt-10 w-1/5 px-1 bg-red-600 text-white rounded p-2 shadow-lg" id="list-button">
                        Cancelar
                    </button>
                </div>
                {/* <button onClick={mintCard} className="font-bold mt-10 w-full bg-blue-500 text-white rounded p-2 shadow-lg" id="list-button">
                    Crear Card
                </button> */}
            </form>
        </div>
    );
}
export default CardForm
