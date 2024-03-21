import React from "react";

function CompetenceCard({ title, description, imgPath }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <img src={imgPath} alt="nft"></img>
        </div>
      </div>
    </div>
  );
}

export default CompetenceCard;
