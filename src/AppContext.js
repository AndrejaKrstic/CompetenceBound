import React, { createContext, useContext, useState } from "react";

const applicationContext = createContext();

export function useAppContext() {
  const context = useContext(applicationContext);
  return context;
}

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("eth_account")
  );
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem("is_admin") === "true");

  const logInUser = (account) => {
    sessionStorage.setItem("eth_account", account);
    if (account === process.env.REACT_APP_ADMIN_ACCOUNT) {
      sessionStorage.setItem("is_admin", "true");
      setIsAdmin(true);
    } else {
      sessionStorage.setItem("is_admin", "false");
      setIsAdmin(false);
    }
    setIsAuthenticated(true);
  };

  const logOutUser = () => {
    sessionStorage.removeItem("is_admin");
    sessionStorage.removeItem("eth_account");
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  return (
    <applicationContext.Provider
      value={{ logInUser, logOutUser, isAuthenticated, isAdmin }}
    >
      {children}
    </applicationContext.Provider>
  );
};

export default ContextProvider;
