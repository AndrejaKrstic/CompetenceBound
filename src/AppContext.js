import React, { createContext, useContext, useState } from "react";

const applicationContext = createContext();

export function useAppContext() {
  const context = useContext(applicationContext);
  return context;
}

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("eth_account")
  );
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("is_admin") === "true");

  const logInUser = (account) => {
    localStorage.setItem("eth_account", account);
    if (account === process.env.REACT_APP_ADMIN_ACCOUNT) {
      localStorage.setItem("is_admin", "true");
      setIsAdmin(true);
    } else {
      localStorage.setItem("is_admin", "false");
      setIsAdmin(false);
    }
    setIsAuthenticated(true);
  };

  const logOutUser = () => {
    localStorage.removeItem("is_admin");
    localStorage.removeItem("eth_account");
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
