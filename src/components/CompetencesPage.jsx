import React, { useEffect, useState } from "react";
import CompetenceCard from "./CompetenceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "bootstrap";
import style from "./CompetencesPage.module.css";

function CompetencesPage({ userType }) {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-togglic="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Competences</h1>

      <div className="d-flex justify-content-end mb-3">
        <button
          className={`btn btn-primary ${style.assignButton}`}
          data-bs-toggle="modal"
          data-bs-togglic="tooltip"
          data-bs-target="#exampleModal"
          data-bs-placement="top"
          data-bs-title="Assign a Competence"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

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

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Assign a competence
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompetencesPage;
