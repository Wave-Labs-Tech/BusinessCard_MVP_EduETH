export const addCardToWallet = async (tokenAddress, tokenId, fileURL) => {
    try {
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC721',
            options: {
                address: tokenAddress, // Dirección del contrato del NFT
                tokenId: tokenId, // ID del NFT
                symbol: 'BCARD', // Símbolo del NFT
                decimals: 0, // Generalmente 0 para NFTs
                image: fileURL // Opcional: URL de la imagen del NFT
            },
        },
      });
  
      if (wasAdded) {
        console.log('NFT fue agregado a MetaMask');
      } else {
        console.log('El usuario rechazó la solicitud para agregar el NFT.');
      }
    } catch (error) {
      console.error('Error al intentar agregar el NFT a MetaMask:', error);
    }
  };

// export async function addCardToMetamask(contractAddress, tokenId) {
//     if (typeof window.ethereum !== 'undefined') {
//       try {
//         // Solicitar al usuario que agregue el NFT
//         await window.ethereum.request({
//           method: 'wallet_watchAsset',
//           params: {
//             type: 'ERC721',
//             options: {
//               address: contractAddress,
//               tokenId: tokenId
//             },
//           },
//         });
//         console.log('NFT importado exitosamente a MetaMask');
//       } catch (error) {
//         console.error('Error al importar NFT:', error);
//       }
//     } else {
//       console.error('MetaMask no está instalado');
//     }
//   }