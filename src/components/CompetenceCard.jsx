import React, { useEffect, useState } from "react";
import axios from "axios";
import CompetenceInfoModal from "./CompetenceInfoModal";
import { useAppContext } from "../AppContext";

function CompetenceCard({ nft, loading, error, id }) {
  const { isAdmin } = useAppContext();
  const [compData, setCompData] = useState();
  const fetchNftData = async () => {
    if (!loading && !error) {
      const tokenURI = nft.tokenURI;
      axios
        .get(
          `https://lavender-familiar-cobra-609.mypinata.cloud/ipfs/${tokenURI}`
        )
        .then((response) => {
          setCompData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching NFT data:", error);
        });
    }
  };
  useEffect(() => {
    if (!compData?.image) {
      fetchNftData();
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
