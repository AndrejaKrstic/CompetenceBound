import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import style from "./LoginPage.module.css";
import photo from "../images/MetaMask_Fox.svg.png";
import { useAppContext } from "../AppContext";

const sepoliaRPCUrl = "https://sepolia.infura.io/v3/22db25488a504c54b022c84cd9e9eca8";

const LoginPage = () => {
  const {logInUser} = useAppContext();

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log("Connected to Ethereum account: ", accounts[0]);
        logInUser(accounts[0]);
        window.ethereum.on('accountsChanged', (newAccounts) => {
          setAccount(newAccounts[0]);
          console.log("Switched to account: ", newAccounts[0]);
        });
      } else {
        console.log("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
    }
  };

  useEffect(() => {
    const web3Instance = new Web3(sepoliaRPCUrl);
    console.log(web3Instance);
    setWeb3(web3Instance);
  }, []);

  return (
    <div className={style.container}>
      <div className="row h-100">
        <div className={`col-md-7 ${style.leftRow}`}>
          <div className={style.leftContent}>
            <div className={style.titleContainer}>
              <h1 className={style.appName} data-text="Name of the app">
                <span>Name of the app</span>
              </h1>
            </div>
          </div>
        </div>
        <div className={`col-md-5 ${style.rightRow}`}>
          <div className={style.rightContent}>
            <div className={style.loginContainer}>
              <button
                onClick={() => connectWallet()}
                className={`btn btn-primary ${style.loginButton}`}
              >
                Connect
              </button>
              <h2 className={style.loginText}>
                to <span>Metamask</span>
              </h2>
              <img
                src={photo}
                alt="Metamask logo"
                className={style.metamaskLogo}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
