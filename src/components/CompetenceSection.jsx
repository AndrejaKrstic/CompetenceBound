import React from "react";
import CompetenceLevelImages from "./CompetenceLevelImages";

const CompetenceSection = ({ comp }) => {
  const { area, name, description, elements, dispositions } = comp;
  return (
    <div className="competence-section">
      <h5>
        <b>Area:</b>
        <br />
        {area}
      </h5>
      <h5>
        <b>Name:</b>
        <br />
        {name}
      </h5>
      <h5>
        <b>Description:</b>
      </h5>
      <p>{description}</p>

      <div className="competence-elements">
        <h5>Elements:</h5>
        <ol>
          {elements.map((element, i) => (
            <li key={i} className="mb-3">
              <b>Name:</b>
              <br />
              {element.name}
              <br />
              <b>Description:</b>
              <br />
              {element.description}
            </li>
          ))}
        </ol>
      </div>

      <div className="competence-dispositions">
        <h5>Dispositions:</h5>
        <ul>
          {dispositions.map((disposition, i) => (
            <li key={i}>{disposition}</li>
          ))}
        </ul>
      </div>
      <div className="competence-awards">
        <h5>Awards for this competence:</h5>
        <CompetenceLevelImages />
      </div>
    </div>
  );
};

export default CompetenceSection;
