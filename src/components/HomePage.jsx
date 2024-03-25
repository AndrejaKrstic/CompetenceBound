import React from "react";
import style from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={`container mt-5 ${style.homePageContainer}`}>
      <h1 className="text-start">
        Welcome to <span className="madimi-one">CompetenceBound</span>!
      </h1>
      <p className={`text-start mt-5 ms-4 ${style.homeDesc}`}>
        Discover a <b>transparent</b>, <b>decentralized</b>, and{" "}
        <b>immutable</b> solution for managing gained competencies gained
        through education process. <br />
        With us, <b>authenticity</b> and <b>validity</b> are guaranteed, ensuring acquired
        skills are recognized and celebrated with confidence.
      </p>
      <hr className="divider mt-5 mb-4" />
      <div className="row mt-5">
        <div className="col text-start">
          <h3>Get Started</h3>
          <div className={`mt-3 ${style.buttonContainer}`}>
            <a className={style.blogButton} href="/blog">
              Check out some blog posts
            </a>
            <a className={style.compButton} href="/competences">
              Dive into competences
            </a>
            <a className={style.compButton} href="/competency-model">
              Check out the competency model!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
