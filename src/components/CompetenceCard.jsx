import React, { useEffect, useRef, useState } from "react";
import CompetenceInfoModal from "./CompetenceInfoModal";
import { useAppContext } from "../AppContext";
import { fetchNftData } from "../requests/NFTDataRequest";

function CompetenceCard({ nft, loading, error, id }) {
  const { isAdmin } = useAppContext();
  const [compData, setCompData] = useState();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      fetchNftData(loading, error, nft, setCompData);
      hasMounted.current = true;
    }
  }, []);
  return (
    <div className="col-md-4 col-lg-3 col-xl-2 col-xxl-2 col-6 mb-4">
      {compData && (
        <div
          className="card competence-card competence-card-body"
          data-bs-toggle="modal"
          data-bs-target={`#modal_${id}`}
        >
          <div className="card-body">
            <h5 className="card-title competence-card-name">{compData.name}</h5>
            {isAdmin && (
              <h6>
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
