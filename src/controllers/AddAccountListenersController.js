export const addMetamaskListener = (logInUser) => {
  window.ethereum.on("accountsChanged", (newAccounts) => {
    logInUser(newAccounts[0]);
    console.log("Switched to account: ", newAccounts[0]);
    return newAccounts[0];
  });
};
