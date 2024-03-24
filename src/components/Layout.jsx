import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import { useAppContext } from "../AppContext";
import { addMetamaskListener } from "../controllers/AddAccountListenersController";

function Layout({ children }) {
  const { logOutUser, logInUser } = useAppContext();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    addMetamaskListener(logInUser);
    setPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setPath = () => {
    const pathAfterBase = window.location.href.substring(
      window.location.origin.length
    );
    setCurrentPath(pathAfterBase);
  };
  return (
    <div className="main">
      <nav
        className={`navbar fixed-top navbar-expand-lg ${style.layoutNavbar}`}
      >
        <div className={`container-fluid ${style.titleContainer}`}>
          <a
            className={`navbar-brand text-white fw-bold ${style.navbarTitle}`}
            href="/"
          >
            CompetenceBound
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link fw-bold"
                  href="/competences"
                  style={{
                    color: currentPath === "/competences" ? "black" : "white",
                  }}
                >
                  Competences
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-bold"
                  href="/competency-model"
                  style={{
                    color:
                      currentPath === "/competency-model" ? "black" : "white",
                  }}
                >
                  Competency Model
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-bold"
                  href="/blog"
                  style={{
                    color: currentPath === "/blog" ? "black" : "white",
                  }}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <button
            className={`d-flex ${style.disconnectButton}`}
            onClick={() => logOutUser()}
          >
            Disconnect
          </button>
        </div>
      </nav>
      <div style={{ paddingTop: "70px" }}>{children}</div>
    </div>
  );
}

export default Layout;
