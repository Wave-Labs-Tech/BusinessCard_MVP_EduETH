
import axios from "axios";

export async function GetCardData(contract, _cardId, cardAddress) {
    console.log("TODO en getCardData",contract, _cardId, cardAddress);
    let tokenURI
    // Obtener el tokenURI para la address proporcionada
    try {
        if(_cardId === 0){
            tokenURI = await contract.tokenUriByAddress(cardAddress);
        }else{
            tokenURI = await contract.tokenURI(_cardId);
        }
    } catch (error) {
        console.log("Se ha producido un error obteniendo la card" + error);
    }

    // if(cardId === 0){
    //     tokenURI = await contract.tokenUriByAddress(cardAddress);
    // }else{
    //     tokenURI = await contract.tokenURI(cardId);
    // }
    console.log("tokenURI en GETCARDDATA", tokenURI);
    // Hacer una solicitud para obtener los metadatos
    let response;
    try {
        response = await axios.get(tokenURI);
        console.log("CARD RESPONSE", response);
    } catch (error) {
        console.error("Error al obtener los metadatos desde tokenURI:", error);
        return null;
    }
    if (!response || !response.data) {
        console.error("No se obtuvieron datos desde la respuesta del tokenURI");
        return null;
    }
    let meta = response.data;
    console.log("CARD META", meta);

    // Extraer los datos 
    const {id, name, position, category, urls, image } = meta;
    // const id = cardId.toString();
    // const id = cardId;
    console.log("CARD ID", id);
    console.log("CARD ID", name);
    console.log("CARD ID", image);
    // Crear un objeto con los datos extraídos
    let cardData = {
        id,
        name,
        position,
        category,
        urls, // Asegurarse de que esto sea un array de URLs
        image,
    };

console.log("CARDDATA", cardData);
    return cardData;
}