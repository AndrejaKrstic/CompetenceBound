import React, { createContext, useContext, useMemo, useState } from "react";

const applicationContext = createContext();

export function useAppContext() {
  const context = useContext(applicationContext);
  return context;
}

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("eth_account")
  );

  const logInUser = (account) => {
    localStorage.setItem("eth_account", account);
    setIsAuthenticated(true);
  };

  const logOutUser = () => {
    localStorage.removeItem("eth_account");
    setIsAuthenticated(false);
  };

  return (
    <applicationContext.Provider
      value={{ logInUser, logOutUser, isAuthenticated }}
    >
      {children}
    </applicationContext.Provider>
  );
};

export default ContextProvider;
