import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import "../style/IndividualBlogPost.css";
import { deletePost, updatePostPhoto, updatePostDate, updatePostTitle, updatePostContent } from "../api";

const IndividualBlogPost = ({ setPage, blogPosts, isLoggedIn }) => {
  const [showButton, setShowButton] = useState(false);
  const [photoLink, setPhotoLink] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { postID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setPage("Blog");
  }, []);

  async function handleDelete() {
    await deletePost(postID);
    navigate("/blog");
  }

  async function handleUpdatePhoto() {
    await updatePostPhoto(postID, photoLink);
  }

  async function handleUpdateDate() {
    await updatePostDate(postID, date);
  }

  async function handleUpdateTitle() {
    await updatePostTitle(postID, title);
  }

  async function handleUpdateContent() {
    await updatePostContent(postID, content);
  }

  return (
    <div className="individualBlogPostPage">
      {isLoggedIn ? (
        <div>
          <div className="divBackToAllBlogPosts">
            <NavLink to="/blog" className="navLinkBackToAllProjects">
              <BsArrowLeft id="arrowLeftBackToAllProjects" /> Back to All Blog
              Posts
            </NavLink>
          </div>
          <div>
            {blogPosts.post
              ? blogPosts.post.map((individualBlog, idx) => {
                  if (individualBlog._id == postID) {
                    return (
                      <div key={`Individual Blog Post: ${idx}`}>
                        <img
                          src={individualBlog.blogPicture}
                          className="individualBlogPicture"
                          id="individualBlogPicture"
                        />
                        <div>
                          <div className="individualBlogDate">
                            <div
                              className="individualBlogInfo"
                              id="individualBlogDate"
                            >
                              {individualBlog.blogDate}
                            </div>
                          </div>
                          <div className="individualBlogTitle">
                            <div
                              className="individualBlogInfo"
                              id="individualBlogTitle"
                            >
                              {individualBlog.blogTitle}
                            </div>
                          </div>
                          <div className="individualBlogContent">
                            <div
                              className="individualBlogInfo"
                              id="individualBlogContent"
                            >
                              {individualBlog.blogContent}
                            </div>
                          </div>
                        </div>
                        <form onSubmit={handleDelete}>
                          <button type="submit" className="deletePostButton">
                            Delete Post
                          </button>
                        </form>
                          {showButton ? (
                            <>
                              <form onSubmit={handleUpdatePhoto}>
                              <input
                                type="text"
                                placeholder="Photo Link"
                                className="updateBlogPostInput"
                                value={photoLink}
                                onChange={(event) => {
                                  event.preventDefault();
                                  setPhotoLink(event.target.value);
                                }}
                              />
                              <button
                                type="submit"
                                className="updatePostButton"
                              >
                                Update Photo
                              </button>
                              </form>
                              <br></br>
                              <br></br>
                              <form onSubmit={handleUpdateDate}>
                              <input
                                type="text"
                                placeholder="Date"
                                className="updateBlogPostInput"
                                value={date}
                                onChange={(event) => {
                                  event.preventDefault();
                                  setDate(event.target.value);
                                }}
                              />
                              <button
                                type="submit"
                                className="updatePostButton"
                              >
                                Update Date
                              </button>
                              </form>
                              <br></br>
                              <br></br>
                              <form onSubmit={handleUpdateTitle}>
                              <input
                                type="text"
                                placeholder="Title"
                                className="updateBlogPostInput"
                                value={title}
                                onChange={(event) => {
                                  event.preventDefault();
                                  setTitle(event.target.value);
                                }}
                              />
                              <button
                                type="submit"
                                className="updatePostButton"
                              >
                                Update Title
                              </button>
                              </form>
                              <br></br>
                              <br></br>
                              <form onSubmit={handleUpdateContent}>
                              <textarea
                                type="text"
                                placeholder="Content"
                                className="updateBlogPostInput"
                                rows="5"
                                value={content}
                                onChange={(event) => {
                                  event.preventDefault();
                                  setContent(event.target.value);
                                }}
                              ></textarea>
                              <button
                                type="submit"
                                className="updatePostButton"
                              >
                                Update Content
                              </button>
                              <br></br>
                              <button
                                className="cancelButton"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setShowButton(false);
                                }}
                              >
                                Cancel
                              </button>
                              </form>
                            </>
                          ) : (
                            <button
                              type="submit"
                              className="updatePostButton"
                              onClick={(event) => {
                                event.preventDefault();
                                setShowButton(true);
                              }}
                            >
                              Update Post
                            </button>
                          )}
                      </div>
                    );
                  }
                })
              : null}
          </div>
        </div>
      ) : (
        <div>
          <div className="divBackToAllBlogPosts">
            <NavLink to="/blog" className="navLinkBackToAllProjects">
              <BsArrowLeft id="arrowLeftBackToAllProjects" /> Back to All Blog
              Posts
            </NavLink>
          </div>
          <div>
            {blogPosts.post
              ? blogPosts.post.map((individualBlog, idx) => {
                  if (individualBlog._id == postID) {
                    return (
                      <div key={`Individual Blog Post: ${idx}`}>
                        <img
                          src={individualBlog.blogPicture}
                          className="individualBlogPicture"
                          id="individualBlogPicture"
                        />
                        <div>
                          <div className="individualBlogDate">
                            <div
                              className="individualBlogInfo"
                              id="individualBlogDate"
                            >
                              {individualBlog.blogDate}
                            </div>
                          </div>
                          <div className="individualBlogTitle">
                            <div
                              className="individualBlogInfo"
                              id="individualBlogTitle"
                            >
                              {individualBlog.blogTitle}
                            </div>
                          </div>
                          <div className="individualBlogContent">
                            <div
                              className="individualBlogInfo"
                              id="individualBlogContent"
                            >
                              {individualBlog.blogContent}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualBlogPost;
