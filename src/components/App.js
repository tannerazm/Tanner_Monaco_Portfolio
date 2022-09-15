import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, Home, Projects, IndividualProject, About, Blog, AddBlogPost, IndividualBlogPost, LoginPage, Contact, Resume, BackToTop, Footer } from "./";
import "../style/App.css";

const App = () => {
  const [page, setPage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [blogPosts, setBlogPosts] = useState([
    {
      blogPicture: "",
      blogDate: "",
      blogTitle: "",
      blogContent: "",
    },
  ]);

  return (
    <>
      <Header page={page} />
      <Routes>
        <Route path="/" element={<Home setPage={setPage} />} />
        <Route path="/projects" element={<Projects setPage={setPage} />} />
        <Route path="/projects/:project_name" element={<IndividualProject setPage={setPage} />} />
        <Route path="/about" element={<About setPage={setPage} />} />
        <Route path="/blog" element={<Blog setPage={setPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} blogPosts={blogPosts} setBlogPosts={setBlogPosts} />} />
        <Route path="/add_blog_post" element={<AddBlogPost setPage={setPage} />} />
        <Route path="/contact" element={<Contact setPage={setPage} />} />
        <Route path="/resume" element={<Resume setPage={setPage} />} />
        <Route path="/blog/secret/login/page/howdidyoufindme" element={<LoginPage setPage={setPage} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/blog/post/:postID" element={<IndividualBlogPost setPage={setPage} setIsLoggedIn={setIsLoggedIn} blogPosts={blogPosts} isLoggedIn={isLoggedIn} />} />
      </Routes>
      <BackToTop />
      <Footer />
    </>
  );
};

export default App;
