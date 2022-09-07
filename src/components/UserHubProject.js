import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import UserHub from "../projectpictures/UserHub.png";

const UserHubProject = () => {
  return (
    <div className="individualProjectContainer">
      <div className="divBackToAllProjects">
        <NavLink to="/projects" className="navLinkBackToAllProjects">
          <BsArrowLeft id="arrowLeftBackToAllProjects" /> Back to All Projects
        </NavLink>
      </div>
      <span className="individualProjectNameSpan">
        <a
          href="https://golden-pastelito-de022f.netlify.app"
          target="https://golden-pastelito-de022f.netlify.app"
          className="individualProjectATag"
        >
          User Hub
        </a>
      </span>
      <br></br>
      <br></br>
      <div className="individualProjectPictureDiv">
        <img src={UserHub} className="individualProjectPicture" />
      </div>
      <div className="individualProjectDescriptionDiv">
        <div className="individualProjectExtrasDiv">
          <span
            className="individualProjectDescriptionSpan"
            id="individualProjectExtras"
          >
            June 26th, 2022
          </span>
          <br></br>
          <br></br>
          <span
            className="individualProjectDescriptionSpan"
            id="individualProjectExtras"
          >
            HTML | CSS | DOM Manipulation | JavaScript
          </span>
        </div>
        <br></br>
        <br></br>
        <span
          className="individualProjectDescriptionSpan"
          id="individualProjectDescription"
        >
          This project is a personal take on the age old game, Tic Tac Toe. It
          resembles efforts in HTML, CSS, DOM Manipulation and JavaScript. This
          project was built over the second week of the Fullstack Academy
          boot-camp and displays some ingenious ways to link a front facing HTML
          page with a "back-end" JavaScript file structure to determine winners,
          players and so much more. Being my second project in the cohort, this
          was a tough project due to the lack of knowledge at the time, and took
          a ton of critical thinking and utilizing the features and code that we
          had learned in a brand new way.
          <br></br>
          <br></br>
          The hardest part of this project was definitely understanding how to
          make the computer functional on it's own.
          <br></br>
          <br></br>I thoroughly enjoyed working on this project where I got to
          display my full capabilities up until that point.
          <br></br>
          <br></br>
          Extra Features: Score Counter | Fully Functional Clear Button |
          Additional CSS Features
        </span>
      </div>
    </div>
  );
};

export default UserHubProject;
