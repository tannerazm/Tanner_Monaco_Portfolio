import { useEffect } from "react";
import "../style/Blog.css"

const Blog = ({ setPage }) => {
  useEffect(() => {
    setPage("Blog");
  }, []);

  return <div className="blogPage">Blog!</div>;
};

export default Blog;
