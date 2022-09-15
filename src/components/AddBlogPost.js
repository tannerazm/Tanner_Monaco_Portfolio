import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { createPost } from "../api";
import "../style/AddBlogPost.css";

const AddBlogPost = ({ setPage }) => {
  const [photoLink, setPhotoLink] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPage(null);
  }, []);

  async function handleAddPost(event) {
    event.preventDefault();
    await createPost(photoLink, date, title, content);
    navigate("/blog");
  }

  return (
    <div className="addBlogPostPage">
      <div className="divBackToAllBlogPosts">
        <NavLink to="/blog" className="navLinkBackToAllProjects">
          <BsArrowLeft id="arrowLeftBackToAllProjects" /> Back to All Blog Posts
        </NavLink>
      </div>
      <div className="addBlogPostMainDiv">
        <label className="addBlogPostLabel">Add Blog Post</label>
        <br></br>
        <form onSubmit={handleAddPost} className="addBlogPostForm">
          <input
            type="text"
            placeholder="Photo Link"
            className="addBlogPostInput"
            value={photoLink}
            onChange={(event) => {
              event.preventDefault();
              setPhotoLink(event.target.value);
            }}
          />
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="Date"
            className="addBlogPostInput"
            value={date}
            onChange={(event) => {
              event.preventDefault();
              setDate(event.target.value);
            }}
          />
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="Title"
            className="addBlogPostInput"
            value={title}
            onChange={(event) => {
              event.preventDefault();
              setTitle(event.target.value);
            }}
          />
          <br></br>
          <br></br>
          <textarea
            type="text"
            placeholder="Content"
            className="addBlogPostInput"
            rows="5"
            value={content}
            onChange={(event) => {
              event.preventDefault();
              setContent(event.target.value);
            }}
          ></textarea>
          <br></br>
          <button type="submit" className="addBlogPostButton">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPost;
