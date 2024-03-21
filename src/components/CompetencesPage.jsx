import React, { useEffect, useState} from "react";
import CompetenceCard from "./CompetenceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "bootstrap";
import style from "./CompetencesPage.module.css";
import AssignCompteneceModal from "./AssignCompteneceModal";
import { useAppContext } from "../AppContext";
import { useQuery } from '@apollo/client';
import { GET_NFTS_BY_STUDENT_ADDRESS, GET_NFTS_BY_COMPETENCE_NAME, GET_ALL_NFTS } from '../graphql/Queries';
import axios from 'axios';

function CompetencesPage() {
  const { isAdmin } = useAppContext();
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-togglic="tooltip"]'
    );
    [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );
  }, []);

  // const { loading, error, data } = useQuery(GET_ALL_NFTS);

  // const { loading, error, data } = useQuery(GET_NFTS_BY_STUDENT_ADDRESS, {
  //   variables: { studentAddress: "0x2ba9e53f3C8c0bCB39262d0bB569d8833f5288b7"},
  // });

  const { loading, error, data } = useQuery(GET_NFTS_BY_COMPETENCE_NAME, {
    variables: { competenceName: "DApp Development"},
  });

  const [imgCID, setImgCID] = useState();
  
  useEffect(() => {
    const fetchNftData = async () => {
      if (!loading && !error && data && data.nfts && data.nfts.length > 0) {
        console.log(data);
        const tokenURI = data.nfts[0].tokenURI; //uzimamo putanju do prvog NFT objekta
        try {
          const response = await axios.get(`https://lavender-familiar-cobra-609.mypinata.cloud/ipfs/${tokenURI}`);
          console.log(response.data); //dobijamo ceo NFT objekat
          setImgCID(response.data["image"]); //uzimamo putanju do slike
        } catch (error) {
          console.error('Error fetching NFT data:', error);
        }
      }
    };

    fetchNftData();
  }, [loading, error, data]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Competences</h1>
      {isAdmin && !loading && data && (
        <div className="d-flex justify-content-end mb-3">
          <button
            className={`btn btn-primary ${style.assignButton}`}
            data-bs-toggle="modal"
            data-bs-togglic="tooltip"
            data-bs-target="#assignCompModal"
            data-bs-placement="top"
            data-bs-title="Assign a Competence"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      )}

      <div className="row">
        {imgCID && <CompetenceCard
          title="Competence 1"
          description="Description of Competence 1"
          imgPath={`https://lavender-familiar-cobra-609.mypinata.cloud/${imgCID}`}
        />}
        <CompetenceCard
          title="Competence 2"
          description="Description of Competence 2"
        />
        <CompetenceCard
          title="Competence 3"
          description="Description of Competence 3"
        />
        <CompetenceCard
          title="Competence 4"
          description="Description of Competence 4"
        />
        <CompetenceCard
          title="Competence 5"
          description="Description of Competence 5"
        />
        <CompetenceCard
          title="Competence 6"
          description="Description of Competence 6"
        />
      </div>
      <AssignCompteneceModal />
    </div>
  );
}

export default CompetencesPage;
