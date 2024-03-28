import React from "react";
import { useAppContext } from "../AppContext";

function CompetenceInfoModal({ id, compData }) {
  const { isAdmin } = useAppContext();
  return (
    <div
      className="modal fade"
      id={`modal_${id}`}
      tabIndex="-1"
      aria-hidden="true"
      aria-labelledby={`modal_label_${id}`}
    >
      {compData && (
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`modal_label_${id}`}>
                {compData.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {isAdmin && (
                <h5 className="text-center">
                  Student: {compData.studentName} {compData.studentID}
                </h5>
              )}
              <h6>
                <b>Competence Level:</b>
              </h6>
              <p className="mb-2">{compData.competenceLevel}</p>
              <h6>
                <b>Description:</b>
              </h6>
              <p>{compData.description}</p>
              <h6>
                <b>Dispositions:</b>
              </h6>
              <ul>
                {compData.dispositions.map((disp, i) => (
                  <li key={i}>{disp}</li>
                ))}
              </ul>
              <h6>
                <b>Skills:</b>
              </h6>
              {compData?.skills[Object.keys(compData.skills)[0]] === "NA" && (
                <span>&#40;This NFT was assigned automatically&#41;</span>
              )}
              <ul>
                {Object.entries(compData.skills).map(([key, value]) => (
                  <li key={key}>
                    {key} <span className="ms-3">{value}</span>
                  </li>
                ))}
              </ul>
              <h6 className="text-center justify-content-center">
                <b>NFT</b>
              </h6>
              <div className="text-center justify-content-center">
                <img
                  src={`https://lavender-familiar-cobra-609.mypinata.cloud/${compData.image}`}
                  alt="nft"
                  style={{ width: "50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompetenceInfoModal;
