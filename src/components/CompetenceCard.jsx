import React, { useEffect, useState } from "react";
import CompetenceInfoModal from "./CompetenceInfoModal";
import { useAppContext } from "../AppContext";
import { fetchNftData } from "../requests/NFTDataRequest";

function CompetenceCard({ nft, loading, error, id }) {
  const { isAdmin } = useAppContext();
  const [compData, setCompData] = useState();

  useEffect(() => {
    if (!compData?.image) {
      fetchNftData(loading, error, nft, setCompData);
    }
  }, []);
  return (
    <div className="col-md-6 col-lg-4 col-xl-3 col-xxl-3 col-6 mb-4">
      {compData && (
        <div
          className="card competence-card"
          data-bs-toggle="modal"
          data-bs-target={`#modal_${id}`}
        >
          <div className="card-body">
            <h5 className="card-title text-center">{compData.name}</h5>
            {isAdmin && (
              <h6 className="text-center">
                Student: {compData.studentName} {compData.studentID}
              </h6>
            )}
            {compData.image && (
              <img
                src={`https://lavender-familiar-cobra-609.mypinata.cloud/${compData.image}`}
                alt="nft"
                className="competence-card-image"
              ></img>
            )}
          </div>
        </div>
      )}
      <CompetenceInfoModal id={id} compData={compData} />
    </div>
  );
}

export default CompetenceCard;
