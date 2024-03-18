import React from "react";
import style from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={style.container}>
      <div>
        <h1 className={style.mainText}>How did you get here!?</h1>
        <span className={style.errorCode}>404</span>
        <h5 className={style.secondText}>This page doesn't exist.. yet..</h5>
      </div>
    </div>
  );
}

export default NotFoundPage;
