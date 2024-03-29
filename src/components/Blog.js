import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllPosts } from "../api";
import "../style/Blog.css";

const Blog = ({
  setPage,
  isLoggedIn,
  setIsLoggedIn,
  blogPosts,
  setBlogPosts,
}) => {
  useEffect(() => {
    setPage("Blog");
    async function getBlogPosts() {
      const allBlogPosts = await getAllPosts();
      setBlogPosts(allBlogPosts);
      if (localStorage.getItem("token")) {
        setIsLoggedIn(true);
      };
    };
    getBlogPosts();
  }, []);

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <div className="blogPage">
      <div className="blogsSection">
        <div className="blogPageTitle">Blog</div>
        <div className="blogPageSubText">
          {isLoggedIn ? (
            <>
              <div className="youreLoggedInContainer">
                <div className="youreLoggedInDiv">You're logged in!</div>
                <form onSubmit={handleLogout} className="logoutForm">
                  <button type="submit" className="logoutButton">
                    Logout
                  </button>
                </form>
              </div>
              <NavLink to="/add_blog_post" className="addPostLink">
                Add Post
              </NavLink>
            </>
          ) : (
            <span>
              Work in progress
              <NavLink
                to="/blog/secret/login/page/howdidyoufindme"
                className="blogSecretLoginPage"
              >
                ,
              </NavLink>
              {" "}please check back in later!
            </span>
          )}
        </div>
        <div className="blogsMainDiv">
          <div className="blogsGridDiv">
            {blogPosts.post && blogPosts.post.length > 0
              ? blogPosts.post.map((blog, idx) => {
                  return (
                    <div key={`BlogPost ${idx}`} className="blogGridIndividual">
                      <NavLink
                        to={`/blog/post/${blog._id}`}
                        className="blogGridIndividual"
                      >
                        <img src={blog.blogPicture} className="blogPicture" />
                        <div>
                          <div className="blogDate">
                            <div className="blogInfo">{blog.blogDate}</div>
                          </div>
                          <div className="blogTitle">
                            <div className="blogInfo">{blog.blogTitle}</div>
                          </div>
                          <div className="blogContent">
                            <div className="blogInfo">{blog.blogContent}</div>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  );
                })
              : null}
          </div>
          <div>
            {blogPosts.post && blogPosts.post.length <= 0 && !isLoggedIn ? (
              <div className="sadDaysDiv">
                <span>
                  Unfortunately there are no blog posts to show as of now.
                </span>
                <small>
                  I am working hard to get more about me... to you!
                </small>
              </div>
            ) : blogPosts.post && blogPosts.post.length <= 0 && isLoggedIn ? (
              <div className="sadDaysDiv">
                <span>No posts.</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
