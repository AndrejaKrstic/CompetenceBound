import React from "react";
import style from "./BlogItem.module.css";

function BlogItem({ title, date, text, image }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {text.map((text, i) => (
          <p className="ms-4 me-4 card-text" key={i}>
            {text}
          </p>
        ))}
        <div className="text-center">
          <img src={image} alt="blog" className={style.blogImage}></img>
        </div>
        <p className="card-text">
          <small className="text-muted">Published on: {date}</small>
        </p>
      </div>
    </div>
  );
}

export default BlogItem;
