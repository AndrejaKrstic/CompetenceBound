import React from "react";
import dappExample from "../images/dappExample.jpeg"

import style from "./CompetenceLevelImages.module.css"

function CompetenceLevelImages() {
  return (
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 1</h5>
              <img src={dappExample} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 2</h5>
              <img src={dappExample} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 3</h5>
              <img src={dappExample} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 4</h5>
              <img src={dappExample} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 5</h5>
              <img src={dappExample} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-lg-2 mt-3 col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Level 6</h5>
              <img src={dappExample} alt="example" className={style.levelCardImage}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompetenceLevelImages;
