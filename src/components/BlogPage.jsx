import React from "react";
import BlogItem from "./BlogItem";
import blogs from "../static/blogs.json";
import image1 from "../images/management.jpg";
import image2 from "../images/blockchain.jpeg";
import image3 from "../images/jobss.jpeg";

function BlogPage() {
  const getImage = (i) => {
    switch (i) {
      case 0:
        return image1;
      case 1:
        return image2;
      case 2:
        return image3;
      default:
        break;
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Blog</h1>
      {blogs.length && (
        <div className="row">
          {blogs.map((blog, i) => (
            <div className="col-md-12" key={i} id={i}>
              <BlogItem
                title={blog.title}
                date={blog.date}
                text={blog.text}
                image={getImage(i)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPage;
