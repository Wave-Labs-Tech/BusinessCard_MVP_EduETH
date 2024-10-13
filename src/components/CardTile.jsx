import {
    BrowserRouter as Router,
    Link,
    useNavigate
  } from "react-router-dom";
//   import { GetIpfsUrlFromPinata } from "../utils/Pinata";
//   import { CardPage } from './CardPage.jsx';
  

// function CardTile (data) {
function CardTile ({ data, cardId, cardAddress }) {
    console.log("CardADDRESS en Tile", cardAddress);
    console.log("Data en Tile", data);
    console.log("CardId en Tile", data.id);
    console.log("Image en Tile", data.image);
    const newTo = {
    //     // pathname:"/nftPage/"+data.data.tokenId
        pathname:"/cardPage/" + data.id
    //     pathname:"/nftPage"
    // }
    // const newTo = {
        // pathname: '/nftPage',
        // search: `?address=${cardAddress}`
        // search: `?address=${"0xc7873b6ee9d6ef0ac02d5d1cef98abeea01e29e2"}`
    };
    // const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

    const navigate = useNavigate(); // Hook para navegar
    // const handleClick = () => {
    //     // Aquí pasas el valor que deseas a CardPage
    //     navigate('/CardPage', { state: { cardAddress } });
    // };

    
    return (
        <Link to={newTo}>
        {/* <div onClick={handleClick} style={{ cursor: 'pointer' }}  className="w-full border-2 border-gray-100 mt-5 mb-12 flex flex-col items-center rounded-lg shadow-2xl"> */}
        <div style={{ cursor: 'pointer' }}  className="w-full border-2 border-gray-100 flex flex-col items-center rounded-lg shadow-2xl">
            <img src={data.image} alt="" className="w-full rounded-lg object-cover" />
            {/* <div className= "text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20"> */}
            <div className= "flex flex-col items-center text-white w-full p-2 bg-gradient-to-t from-[#313170]  to-transparent rounded-lg pt-5 -mt-20">
                <strong className="text-xl">{data.id}</strong>
                <strong className="text-xl">{data.name}</strong>
                <p className="display-inline">{data.position}</p>
                <p className="display-inline">{data.category}</p>
                <p className="display-inline">{data.urls}</p>
            </div>
        </div>
        </Link>
    )
}

export default CardTile;
