import React, { useEffect } from "react";
import CompetenceCard from "./CompetenceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "bootstrap";
import style from "./CompetencesPage.module.css";
import AssignCompteneceModal from "./AssignCompteneceModal";
import { useAppContext } from "../AppContext";

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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Competences</h1>
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
        <CompetenceCard
          title="Competence 1"
          description="Description of Competence 1"
        />
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
