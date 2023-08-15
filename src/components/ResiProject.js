import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Resi from "../projectpictures/Resi.png";

const ResiProject = () => {
  return (
    <div className="individualProjectContainer">
      <div className="divBackToAllProjects">
        <NavLink to="/projects" className="navLinkBackToAllProjects">
          <BsArrowLeft id="arrowLeftBackToAllProjects" /> Back to All Projects
        </NavLink>
      </div>
      <span className="individualProjectNameSpan">
        <a
          href="https://app.getresi.com/login"
          target="https://app.getresi.com/login"
          className="individualProjectATag"
        >
          Resi
        </a>
      </span>
      <br />
      <br />
      <small>This is a link to the application.</small>
      <br></br>
      <br></br>
      <div className="individualProjectPictureDiv">
        <img src={Resi} className="individualProjectPicture" />
      </div>
      <div className="individualProjectDescriptionDiv">
        <div className="individualProjectExtrasDiv">
          <span
            className="individualProjectDescriptionSpan"
            id="individualProjectExtras"
          >
            March 6th, 2023 - Current
          </span>
          <br></br>
          <br></br>
          <span
            className="individualProjectDescriptionSpan"
            id="individualProjectExtras"
          >
            PHP | Twig | CraftCMS | JavaScript | Less | AJAX/GuzzleHttp
          </span>
        </div>
        <br></br>
        <br></br>
        <span
          className="individualProjectDescriptionSpan"
          id="individualProjectDescription"
        >
          Current Web Application for Resi.
        </span>
      </div>
    </div>
  );
};

export default ResiProject;
