import React, { useEffect, useState } from "react";
import CompetenceCard from "./CompetenceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "bootstrap";
import style from "./CompetencesPage.module.css";
import AssignCompteneceModal from "./AssignCompteneceModal";
import { useAppContext } from "../AppContext";
import { useQuery, useApolloClient } from "@apollo/client";
import {
  GET_NFTS_BY_STUDENT_ADDRESS,
  GET_NFTS_BY_COMPETENCE_NAME,
  GET_ALL_NFTS,
} from "../graphql/Queries";
import NoCompetencesToShow from "./NoCompetencesToShow";

function CompetencesPage() {
  const { isAdmin } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [dataToShow, setDataToShow] = useState();
  const client = useApolloClient();
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-togglic="tooltip"]'
    );
    [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== "" && searchTerm !== activeSearchTerm) {
      setSearchLoading(true);
      setActiveSearchTerm(searchTerm);
      client
        .query({
          query: GET_NFTS_BY_COMPETENCE_NAME,
          variables: { competenceName: searchTerm },
        })
        .then(({ data }) => {
          setSearchLoading(false);
          setDataToShow(data);
          console.log(data);
        })
        .catch((error) => {
          setSearchLoading(false);
        });
    } else if (searchTerm !== activeSearchTerm) {
      if (isAdmin) {
        client
          .query({
            query: GET_ALL_NFTS,
          })
          .then(({ data }) => {
            setSearchLoading(false);
            setDataToShow(data);
          })
          .catch((error) => {
            setSearchLoading(false);
          });
      } else {
        client
          .query({
            query: GET_NFTS_BY_STUDENT_ADDRESS,
            variables: { studentAddress: localStorage.getItem("eth_account") },
          })
          .then(({ data }) => {
            setSearchLoading(false);
            setDataToShow(data);
          })
          .catch((error) => {
            setSearchLoading(false);
          });
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { loading, error, data } = useQuery(
    isAdmin ? GET_ALL_NFTS : GET_NFTS_BY_STUDENT_ADDRESS,
    {
      variables: { studentAddress: localStorage.getItem("eth_account") },
    }
  );

  useEffect(() => {
    setDataToShow(data);
  }, [data]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Competences</h1>
      <div className="row justify-content-center">
        <form className="d-flex col-6 mb-4" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      {isAdmin && (
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
        {dataToShow?.nfts && dataToShow.nfts.length
          ? dataToShow.nfts.map((nft, i) => (
              <CompetenceCard
                id={i}
                key={i}
                nft={nft}
                loading={loading || searchLoading}
                error={error}
              />
            ))
          : !loading && !searchLoading && <NoCompetencesToShow />}
      </div>
      <AssignCompteneceModal />
      {(loading || searchLoading) && (
        <div className="spinner-container">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </div>
  );
}

export default CompetencesPage;
