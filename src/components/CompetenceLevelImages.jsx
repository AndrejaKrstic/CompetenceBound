import React from "react";
import dappGold from "../images/collections/dapp-development/6.png"
import dappSilver from "../images/collections/dapp-development/5.png"
import dappBronze from "../images/collections/dapp-development/4.png"
import dappGrees from "../images/collections/dapp-development/3.png"
import dappBlue from "../images/collections/dapp-development/2.png"
import dappPurple from "../images/collections/dapp-development/1.png"

import style from "./CompetenceLevelImages.module.css"

function CompetenceLevelImages() {
  return (
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 1</h5>
              <img src={dappPurple} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 2</h5>
              <img src={dappBlue} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 3</h5>
              <img src={dappGrees} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 4</h5>
              <img src={dappBronze} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 5</h5>
              <img src={dappSilver} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 6</h5>
              <img src={dappGold} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompetenceLevelImages;
