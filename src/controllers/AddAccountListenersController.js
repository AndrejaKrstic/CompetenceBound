import Web3 from "web3";

export const addMetamaskListener = (logInUser) => {
  window.ethereum.on("accountsChanged", (newAccounts) => {
    const web3 = new Web3(window.ethereum);
    const checksumAddress = web3.utils.toChecksumAddress(newAccounts[0]);
    logInUser(checksumAddress);
    return checksumAddress;
  });
};
