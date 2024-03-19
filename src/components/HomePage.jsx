import React from "react";
import style from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={`container mt-5 ${style.homePageContainer}`}>
      <h1 className="text-start">Welcome to Name of the App</h1>
      <p className="text-start mt-3">Description of the App: bla bla truc</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
