import React, { useState } from "react";
import style from "./LoginPage.module.css";
import photo from "../images/MetaMask_Fox.svg.png";
import { useAppContext } from "../AppContext";
import { addMetamaskListener } from "../controllers/AddAccountListenersController";
import Web3 from "web3";

const LoginPage = () => {
  const { logInUser } = useAppContext();

  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const originalAddress = accounts[0];
        const web3 = new Web3(window.ethereum);
        const checksumAddress = web3.utils.toChecksumAddress(originalAddress);
        setAccount(checksumAddress);
        logInUser(checksumAddress);
     
        setAccount(addMetamaskListener(logInUser));
      } else {
        console.log("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
    }
  };

  return (
    <div className={style.container}>
      <div className="row h-100">
        <div className={`col-md-7 ${style.leftRow}`}>
          <div className={style.leftContent}>
            <div className={style.titleContainer}>
              <h1 className={style.appName} data-text="CompetenceBound">
                <span>CompetenceBound</span>
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
