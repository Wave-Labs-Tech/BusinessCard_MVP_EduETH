import { ethers } from "ethers";

export async function ConnectToMetamaskOnly() {
  if (window.ethereum && window.ethereum.isMetaMask) {
    try {
      // Solicitar acceso a la cuenta
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Crear un nuevo proveedor a partir de MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Obtener la lista de cuentas
      const signer = provider.getSigner();
      const accounts = await signer.getAddress();

      // Obtener el ID de red
      const network = await provider.getNetwork();

      console.log("Conectado a MetaMask");
      console.log("Cuenta:", accounts);
      console.log("ID de Red:", network.chainId);

      return { provider, signer, accounts, networkId: network.chainId };
    } catch (error) {
      console.error("Error al conectar a MetaMask:", error);
      throw new Error("No se pudo conectar a MetaMask.");
    }
  } else {
    throw new Error("MetaMask no está instalado. Por favor, instala MetaMask y vuelve a intentarlo.");
  }
}

// export default connectToMetamaskOnly;
