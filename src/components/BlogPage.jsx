import React from "react";
import BlogItem from "./BlogItem";

function BlogPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Blog</h1>
      <div className="row">
        <div className="col-md-12">
          <BlogItem
            title="Sample Blog Post 1"
            date="March 15, 2024"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non ornare nisl. Sed et enim justo."
          />
        </div>
        <div className="col-md-12 mt-4">
          <BlogItem
            title="Sample Blog Post 2"
            date="March 16, 2024"
            text="Praesent ut est ut arcu gravida pharetra. Aliquam erat volutpat. Phasellus maximus ipsum id arcu congue, eget placerat neque fermentum."
          />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
