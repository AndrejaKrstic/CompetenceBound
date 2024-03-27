export const addMetamaskListener = (logInUser) => {
  window.ethereum.on("accountsChanged", (newAccounts) => {
    logInUser(newAccounts[0]);
    return newAccounts[0];
  });
};
