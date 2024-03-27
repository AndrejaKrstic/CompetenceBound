import React from "react";
import svgBloom from "../images/Blooms.svg";
import svgDispositions from "../images/dispositions.svg";

import competences from "../static/competences.json";
import CompetenceSection from "./CompetenceSection";

function CompetencyModelPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        <b>Competency Model</b>
      </h1>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">What is a competence</h3>
              <p className="card-text">
                Competence refers to the set of skills, knowledge and behaviour
                necessary to successfully complete a task. Possessing the
                required competences makes an individual capable of completing
                tasks successfully and within the specified timeframe. It can be
                said that the concept of competences connects two different
                aspects. Competencies fundamentally represent the relationship
                between individuals' abilities and capabilities on one hand, and
                the successful completion of tasks on the other.
              </p>
              <p className="card-text">
                Five main components of competences can be identified:
              </p>
              <ol>
                <li>
                  Knowledge - refers to the specific knowledge that an
                  individual possesses in the required field.
                </li>
                <li>
                  Skills - relate to an individual's ability to apply knowledge
                  and perform a task.
                </li>
                <li>
                  Attitude, beliefs, and values that an individual possesses.
                </li>
                <li>
                  Psychophysical characteristics of the individual - traits that
                  are necessary for performing specific tasks (e.g., good
                  vision, calmness).
                </li>
                <li>
                  Motivation - all impulses that stimulate action, emotions,
                  need for work, and success.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Competency Model</h3>
              <p className="card-text">
                Competency model represents a detailed list and description of
                all competences necessary to successfully perform designated
                tasks. The model also outlines the required levels of
                competences, i.e., the measure of specific competencies, for
                different roles individuals take in the activities for which the
                competency model is developed.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">IS2020</h3>
              <p className="card-text">
                Association for Computing Machinery &#40;ACM&#41; and
                Association for Information Systems &#40;AIS&#41; issued a
                recommendation for a competency model for the education process
                in the field of information technology &#40;IS2020&#41;.
              </p>
              <p className="card-text">
                We differentiate 6 levels of skills according to Revised Bloom's
                Cognitive Skill list:
              </p>
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid"
                  style={{ width: "60%" }}
                  src={svgBloom}
                  alt="Blooms table"
                />
              </div>
              <p className="card-text mt-3">
                There are also 11 dispositions that can come with each
                competence:
              </p>
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid"
                  style={{ width: "60%" }}
                  src={svgDispositions}
                  alt="Dispositions table"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">How we calculate competence level</h3>
              <p className="card-text">
                After selecting the <b>Competence</b> user will have to assign a
                value from <b>1 to 6</b> for each level that competence has.
                Each level coresponds to the skill on the Bloom's Cognitive
                Skill list.
                <br />
                The final competence level will be calculated as an average
                value after adding all of the levels.
                <br />
                <br />
                EXAMPLE:
                <br />
                If competence has 4 levels and you assign values like this:
                <br />
                level1 &#8594; 3 <br />
                level2 &#8594; 3 <br />
                level3 &#8594; 2 <br />
                level4 &#8594; 6 <br />
                <br />
                Final level will be &#40;3 + 3 + 2 + 6&#41; / 4 <br />
                Which is equal to 3.5, in this case this will be rounded to 4.
                <br /> <br />
                Each level gets a different award for a competence.
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Current available competences</h3>
              {competences.map((comp, i) => (
                <div className="card mb-4" key={i}>
                  <div className="card-body">
                    <h3 className="card-title">{`${i + 1}.`}</h3>
                    <CompetenceSection comp={comp} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompetencyModelPage;
