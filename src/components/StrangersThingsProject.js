import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import StrangersThings from "../projectpictures/StrangersThings.png";

const StrangersThingsProject = () => {
  return (
    <div className="individualProjectContainer">
    <div className="divBackToAllProjects">
      <NavLink to="/projects" className="navLinkBackToAllProjects">
        <BsArrowLeft id="arrowLeftBackToAllProjects" /> Back to All Projects
      </NavLink>
    </div>
    <span className="individualProjectNameSpan">
      <a
        href="https://graceful-bonbon-2cb8e1.netlify.app"
        target="https://graceful-bonbon-2cb8e1.netlify.app"
        className="individualProjectATag"
      >
        Stranger's Things
      </a>
    </span>
    <br></br>
    <br></br>
    <div className="individualProjectPictureDiv">
      <img src={StrangersThings} className="individualProjectPicture" />
    </div>
    <div className="individualProjectDescriptionDiv">
      <div className="individualProjectExtrasDiv">
        <span
          className="individualProjectDescriptionSpan"
          id="individualProjectExtras"
        >
          July 12th, 2022
        </span>
        <br></br>
        <br></br>
        <span
          className="individualProjectDescriptionSpan"
          id="individualProjectExtras"
        >
          HTML | CSS | DOM Manipulation | JavaScript | React | API Calls
        </span>
      </div>
      <br></br>
      <br></br>
      <span
        className="individualProjectDescriptionSpan"
        id="individualProjectDescription"
      >
        This project's name has no way to do with the tv series, Stranger Things, but has everything to do with a Craigslist variant with a funny name tagging along. We still hadn't dabbled in building our own back-end yet, but still used API calls in order to retrieve information from a database. We implemented a login/logout feature and allowed for posting of items, updating an item, deleting an item, and seeing items others (as well as yourself) have added. No payment features have been added to this project, similar to how Craigslist functions, however you can message another individual and converse about the item directly.
        <br></br>
        <br></br>
        If I am being honest, this project didn't pose too many struggles or issues. This was our first project without references to anything or specific instructions on how to handle desired look or functionality. We were given some instructions and told to just "build it". Being thrown into the "deep-end" was a blessing in disguise. I learned SO much from this project and was truly able to start coding on my own. I did work with a partner on this project, but anything that they were doing I definitely helped along the process with.
        <br></br>
        <br></br>
        This project was probably the first time where I said "I built that and it looks amazing!" after finishing a project. Outside of the backend, everything was my code and it was a beautiful feeling.
      </span>
    </div>
  </div>
  );
};

export default StrangersThingsProject;
