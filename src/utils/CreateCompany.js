export async function createCompany(contract) {
    const publicDataCid = "https://pruebaPublicDataCid.com";
    const privateDataCid = "https://pruebaPrivateDataCid.com";
    const initvalues = { publicDataCid, privateDataCid }
    try {
      let transaction = await contract.createCompany(initvalues);
      await transaction.wait();
      console.log("transactionCreateCompany", transaction);
      alert("Successfully created University Company!");
    } catch (err) {
      console.error("Ha habido un error al crear una company", err)
    }
  }