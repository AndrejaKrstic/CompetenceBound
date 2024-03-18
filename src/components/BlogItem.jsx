import React from "react";

function BlogItem({ title, date, text }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{text}</p>
        <p className="card-text">
          <small className="text-muted">Published on: {date}</small>
        </p>
      </div>
    </div>
  );
}

export default BlogItem;
