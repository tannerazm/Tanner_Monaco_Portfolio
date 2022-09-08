import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, Home, Projects, IndividualProject, About, Blog, Contact, Resume, BackToTop, Footer } from "./";
import "../style/App.css";

const App = () => {
  const [page, setPage] = useState(null);

  return (
    <>
      <Header page={page} />
      <Routes>
        <Route path="/" element={<Home setPage={setPage} />} />
        <Route path="/projects" element={<Projects setPage={setPage} />} />
        <Route path="/projects/:project_name" element={<IndividualProject setPage={setPage} />} />
        <Route path="/about" element={<About setPage={setPage} />} />
        <Route path="/blog" element={<Blog setPage={setPage} />} />
        <Route path="/contact" element={<Contact setPage={setPage} />} />
        <Route path="/resume" element={<Resume setPage={setPage} />} />
      </Routes>
      <BackToTop />
      <Footer />
    </>
  );
};

export default App;
