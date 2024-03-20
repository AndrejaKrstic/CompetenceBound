import React from "react";
import style from "./Layout.module.css";
import { useAppContext } from "../AppContext";

function Layout({ children }) {
  const { logOutUser } = useAppContext();

  return (
    <div className="main">
      <nav className={`navbar navbar-expand-lg ${style.layoutNavbar}`}>
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
                  className="nav-link text-white fw-bold"
                  href="/competences"
                  style={{}}
                >
                  Competences
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white fw-bold"
                  href="/competency-model"
                >
                  Competency Model
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white fw-bold" href="/blog">
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
      {children}
    </div>
  );
}

export default Layout;
