import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_KEY;// Asegúrate de mantener esta clave segura


// Encriptar
// export const encryptData = (data: any) => {
export const encryptData = (data) => {
    if(!secretKey){
        console.error("Error con la secretkey de encriptacion");
        return;
    }
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

// Desencriptar
// export const decryptData = (ciphertext: any) => {
export const decryptData = (ciphertext) => {
    if(!secretKey){
        console.error("Error con la secretkey de encriptacion");
        return;
    }
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };