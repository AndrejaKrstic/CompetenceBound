import React, { useEffect, useState } from "react";
import comps from "../static/competences.json";
import { assignCompetences } from "../controllers/AssignCompetenceController";
import Web3 from "web3";
import { useApolloClient } from "@apollo/client";

const sepoliaRPCUrl =
  "https://sepolia.infura.io/v3/e2d17050f550446dad42f6bab853f289";

function AssignCompteneceModal({
  setSearchLoading,
  setShowErrorModal,
  allData,
  setDataToShow,
}) {
  const [competences, setCompetences] = useState([]);
  const [selectedComptenece, setSelectedCompetence] = useState();
  const [web3, setWeb3] = useState();
  const client = useApolloClient();

  const [data, setData] = useState({
    name: "",
    surname: "",
    studentId: "",
    metamaskAccount: "",
    competence: {
      name: "",
      description: "",
      dispositions: [],
      elements: {},
    },
    competenceLevel: 0,
  });

  const clearForm = () => {
    setData({
      name: "",
      surname: "",
      studentId: "",
      metamaskAccount: "",
      competence: {
        name: "",
        description: "",
        dispositions: [],
        elements: {},
      },
      competenceLevel: 0,
    });
    document.getElementById("modal-close-button").click();
    setSelectedCompetence("");
    document.getElementById("inputName").value = "";
    document.getElementById("inputSurname").value = "";
    document.getElementById("inputStudentId").value = "";
    document.getElementById("inputMetamaskAccount").value = "";
    document.getElementById("competenceSelect").selectedIndex = 0;
  };

  useEffect(() => {
    const web3Instance = new Web3(sepoliaRPCUrl);
    console.log(web3Instance);
    setWeb3(web3Instance);
  }, []);

  const fetchCompetences = () => {
    setCompetences(comps);
  };

  useEffect(() => {
    fetchCompetences();
  }, []);

  const calculateCompetencelevel = () => {
    let sum = 0;
    let count = 0;
    const obj = data.competence.elements;

    for (let key in obj) {
      if (obj[key]) {
        sum += parseFloat(obj[key]);
        count++;
      } else {
        return;
      }
    }
    let level = sum / count;
    let decimalPart = level - Math.floor(level);
    if (decimalPart >= 0.5) {
      level = Math.ceil(level);
    } else {
      level = Math.floor(level);
    }
    console.log(level);
    setData({ ...data, competenceLevel: level });
  };

  useEffect(() => {
    if (data.competenceLevel) {
      assignCompetences(
        data,
        web3,
        allData,
        setSearchLoading,
        setShowErrorModal,
        setDataToShow,
        client
      );
      clearForm();
    }
  }, [data.competenceLevel, web3]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    calculateCompetencelevel();
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    const selectedComp = competences.find((obj) => obj.name === e.target.value);
    setSelectedCompetence(selectedComp);
    console.log(selectedComp);
    let comp = data.competence;
    if (selectedComp) {
      comp = {
        ...comp,
        name: selectedComp.name,
        description: selectedComp.description,
        dispositions: selectedComp.dispositions,
      };
    } else {
      comp = { ...comp, name: "", description: "", dispositions: [] };
    }
    setData({ ...data, competence: comp });
  };

  const handleElementSelectChange = (e) => {
    const [level, element] = e.target.value.split(",");
    if (level) {
      let comp = data.competence;
      let elements = comp.elements;
      elements = { ...elements, [element]: level };
      comp = { ...comp, elements: elements };
      setData({ ...data, competence: comp });
    }
  };
  return (
    <div
      className="modal fade"
      id="assignCompModal"
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
              id="modal-close-button"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="inputName"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputSurname" className="form-label">
                  Surname
                </label>
                <input
                  name="surname"
                  type="text"
                  className="form-control"
                  id="inputSurname"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputStudentId" className="form-label">
                  Student ID
                </label>
                <input
                  name="studentId"
                  type="text"
                  className="form-control"
                  id="inputStudentId"
                  placeholder="ex. 2024/0123"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputMetamaskAccount" className="form-label">
                  MetaMask Account
                </label>
                <input
                  name="metamaskAccount"
                  type="text"
                  className="form-control"
                  id="inputMetamaskAccount"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="competenceSelect" className="form-label">
                  Competence
                </label>
                <select
                  className="form-select"
                  id="competenceSelect"
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Select Competence</option>
                  {competences.map((competence) => (
                    <option key={competence.name} value={competence.name}>
                      {competence.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedComptenece && (
                <div className="mb-3 text-center">
                  <label htmlFor="setCompetenceLevels" className="form-label">
                    Skill levels
                  </label>
                  <br />
                  {selectedComptenece.elements.map((element, index) => (
                    <div key={index} className="mb-2">
                      <span>{element.name}</span>
                      <select
                        className="ms-2"
                        onChange={handleElementSelectChange}
                        required
                      >
                        <option value="">0</option>
                        {[1, 2, 3, 4, 5, 6].map((level) => (
                          <option
                            key={level}
                            value={`${level},${element.name}`}
                          >
                            {level}
                          </option>
                        ))}
                      </select>
                      <br />
                    </div>
                  ))}
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                Assign
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignCompteneceModal;
