import React, { useEffect, useRef, useState } from "react";
import CompetenceCard from "./CompetenceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "bootstrap";
import style from "./CompetencesPage.module.css";
import AssignCompteneceModal from "./AssignCompteneceModal";
import NoCompetencesToShow from "./NoCompetencesToShow";
import { useAppContext } from "../AppContext";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_NFTS_BY_STUDENT_ADDRESS, GET_ALL_NFTS } from "../graphql/Queries";
import Alert from "./Alert";
import { fetchAllNftData } from "../requests/NFTDataRequest";
import {
  getAllNFTs,
  getNFTsByCompetenceName,
  getNFTSByStudentAdress,
  getNFTSByStudentAndCompetence,
} from "../requests/NFTRequest";

function CompetencesPage() {
  const { isAdmin } = useAppContext();
  const [searchLoading, setSearchLoading] = useState(false);
  const [dataToShow, setDataToShow] = useState();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [compSearchOptions, setCompSearchOptions] = useState();
  const [studentSearchOptions, setStudentSearchOptions] = useState();
  const [selectedCompetenceFilter, setSelectedCompetenceFilter] = useState();
  const [selectedStudentFilter, setSelectedStudentFilter] = useState();
  const [searchActive, setSearchActive] = useState();
  const client = useApolloClient();
  const alertRef = useRef();
  const warningRef = useRef();

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-togglic="tooltip"]'
    );
    [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );
  }, []);

  const handleCompetenceFilterChange = (event) => {
    setSearchActive(true);
    setSelectedCompetenceFilter(event.target.value);
    if (event.target.value) {
      if (isAdmin && selectedStudentFilter) {
        getNFTSByStudentAndCompetence(
          client,
          setSearchLoading,
          setDataToShow,
          setShowErrorModal,
          event.target.value,
          selectedStudentFilter
        );
      } else if (isAdmin && !selectedStudentFilter) {
        getNFTsByCompetenceName(
          client,
          setSearchLoading,
          setDataToShow,
          setShowErrorModal,
          event.target.value
        );
      } else {
        getNFTSByStudentAndCompetence(
          client,
          setSearchLoading,
          setDataToShow,
          setShowErrorModal,
          event.target.value,
          sessionStorage.getItem("eth_account")
        );
      }
    } else {
      if (isAdmin && selectedStudentFilter) {
        getNFTSByStudentAdress(
          client,
          setSearchLoading,
          setDataToShow,
          setShowErrorModal,
          selectedStudentFilter
        );
      } else if (isAdmin && !selectedStudentFilter) {
        getAllNFTs(client, setSearchLoading, setDataToShow, setShowErrorModal);
        setSearchActive(false);
      } else {
        setSearchActive(false);
        getNFTSByStudentAdress(
          client,
          setSearchLoading,
          setDataToShow,
          setShowErrorModal,
          sessionStorage.getItem("eth_account")
        );
      }
    }
  };
  const handleStudentFilterChange = (event) => {
    setSearchActive(true);
    setSelectedStudentFilter(event.target.value);
    if (event.target.value) {
      if (selectedCompetenceFilter) {
        getNFTSByStudentAndCompetence(
          client,
          setSearchLoading,
          setDataToShow,
          setShowErrorModal,
          selectedCompetenceFilter,
          event.target.value
        );
      } else {
        getNFTSByStudentAdress(
          client,
          setSearchLoading,
          setDataToShow,
          setShowErrorModal,
          event.target.value
        );
      }
    } else {
      if (selectedCompetenceFilter) {
        getNFTsByCompetenceName(
          client,
          setSearchLoading,
          setDataToShow,
          setShowErrorModal,
          selectedCompetenceFilter
        );
      } else {
        getAllNFTs(client, setSearchLoading, setDataToShow, setShowErrorModal);
      }
    }
  };

  const handleFilterClear = () => {
    if (selectedCompetenceFilter) {
      const compSelect = document.getElementById("compSelect");
      compSelect.selectedIndex = 0;
      setSelectedCompetenceFilter("");
    }
    if (isAdmin) {
      getAllNFTs(client, setSearchLoading, setDataToShow, setShowErrorModal);
      if (selectedStudentFilter) {
        const studentSelect = document.getElementById("studentSelect");
        studentSelect.selectedIndex = 0;
        setSelectedStudentFilter("");
      }
    } else {
      getNFTSByStudentAdress(
        client,
        setSearchLoading,
        setDataToShow,
        setShowErrorModal,
        sessionStorage.getItem("eth_account")
      );
    }
    setSearchActive(false);
  };

  const assignSelectOptions = async () => {
    if (!searchActive) {
      const nfts = await fetchAllNftData(error, data);
      setCompSearchOptions([...new Set(nfts.map((obj) => obj.name))]);
      if (isAdmin) {
        const uniqueStudents = [];
        nfts.forEach((nft) => {
          const isUnique = !uniqueStudents.some(
            (uniqueNft) => uniqueNft.studentAddress === nft.studentAddress
          );
          if (isUnique) {
            uniqueStudents.push(nft);
          }
        });
        setStudentSearchOptions(uniqueStudents);
      }
    }
  };

  const { loading, error, data } = useQuery(
    isAdmin ? GET_ALL_NFTS : GET_NFTS_BY_STUDENT_ADDRESS,
    {
      variables: { studentAddress: sessionStorage.getItem("eth_account") },
    }
  );

  useEffect(() => {
    setDataToShow(data);
  }, [data]);

  useEffect(() => {
    if (dataToShow?.nfts.length) {
      assignSelectOptions();
    }
  }, [dataToShow]);

  useEffect(() => {
    if (showErrorModal) {
      alertRef.current.showAlert(
        "There was an error processing your request, please try again later.",
        "danger"
      );
      setTimeout(() => {
        setShowErrorModal(false);
      }, 5000);
    } else {
      alertRef.current.hideAlert();
    }
  }, [showErrorModal]);

  function showWarning(warning) {
    warningRef.current.showAlert(warning, "warning");
    setShowWarningModal(true);
  }

  useEffect(() => {
    if (showWarningModal) {
      setTimeout(() => {
        setShowWarningModal(false);
      }, 5000);
    } else {
      warningRef.current.hideAlert();
    }
  }, [showWarningModal]);

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        <b>Competences</b>
      </h1>
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
      {dataToShow?.nfts?.length || searchActive ? (
        <div className="row justify-content-center">
          <form className="col-lg-6 col-md-8 col-sm-10">
            <div className={`row ${!isAdmin ? "justify-content-center" : ""}`}>
              <div
                className={`col-lg-6 col-md-6 col-sm-12 mb-3 ${
                  !isAdmin ? "text-center" : ""
                }`}
              >
                <label htmlFor="compSelect" className="form-label">
                  <b>Filter by Competence:</b>
                </label>
                <select
                  id="compSelect"
                  className="form-select justify-content-center"
                  onChange={handleCompetenceFilterChange}
                >
                  <option value="">Choose a Competence</option>
                  {compSearchOptions ? (
                    compSearchOptions.map((compName, i) => (
                      <option key={i} value={compName}>
                        {compName}
                      </option>
                    ))
                  ) : (
                    <option value="">No competences to filter...</option>
                  )}
                </select>
              </div>
              {isAdmin && (
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <label htmlFor="studentSelect" className="form-label">
                    <b>Filter by Student:</b>
                  </label>
                  <select
                    id="studentSelect"
                    className="form-select"
                    onChange={handleStudentFilterChange}
                  >
                    <option value="">Choose a Student</option>
                    {studentSearchOptions ? (
                      studentSearchOptions.map((comp, i) => (
                        <option key={i} value={comp.studentAddress}>
                          {comp.studentName} {comp.studentID}
                        </option>
                      ))
                    ) : (
                      <option value="">No students to filter...</option>
                    )}
                  </select>
                </div>
              )}
            </div>
            <div className="d-grid gap-2 justify-content-center">
              <button
                type="button"
                className="btn mb-4 clear-filters-btn"
                disabled={!selectedCompetenceFilter && !selectedStudentFilter}
                onClick={handleFilterClear}
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}

      <div className="row">
        {dataToShow?.nfts && dataToShow.nfts.length
          ? dataToShow.nfts.map((nft, i) => (
              <CompetenceCard
                id={i}
                key={nft.tokenURI}
                nft={nft}
                loading={loading || searchLoading}
                error={error}
              />
            ))
          : !loading && !searchLoading && <NoCompetencesToShow />}
      </div>
      {isAdmin && (
        <AssignCompteneceModal
          setSearchLoading={setSearchLoading}
          setShowErrorModal={setShowErrorModal}
          allData={dataToShow}
          setDataToShow={setDataToShow}
          showWarning={showWarning}
        />
      )}
      {(loading || searchLoading) && (
        <div className="spinner-container">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Alert ref={alertRef} />
      <Alert ref={warningRef} />
    </div>
  );
}

export default CompetencesPage;
