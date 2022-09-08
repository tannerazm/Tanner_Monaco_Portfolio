import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import FitnessTracker from "../projectpictures/FitnessTracker.png";


const FitnessTrackerProject = () => {
  return (
    <div className="individualProjectContainer">
    <div className="divBackToAllProjects">
      <NavLink to="/projects" className="navLinkBackToAllProjects">
        <BsArrowLeft id="arrowLeftBackToAllProjects" /> Back to All Projects
      </NavLink>
    </div>
    <span className="individualProjectNameSpan">
      <a
        href="https://zesty-bavarois-cb650e.netlify.app"
        target="https://zesty-bavarois-cb650e.netlify.app"
        className="individualProjectATag"
      >
        Fitness Tracker
      </a>
    </span>
    <br></br>
    <br></br>
    <div className="individualProjectPictureDiv">
      <img src={FitnessTracker} className="individualProjectPicture" />
    </div>
    <div className="individualProjectDescriptionDiv">
      <div className="individualProjectExtrasDiv">
        <span
          className="individualProjectDescriptionSpan"
          id="individualProjectExtras"
        >
          Aug 5th, 2022
        </span>
        <br></br>
        <br></br>
        <span
          className="individualProjectDescriptionSpan"
          id="individualProjectExtras"
        >
          HTML | CSS | JavaScript | PostgreSQL | Express | React | Node.js
        </span>
      </div>
      <br></br>
      <br></br>
      <span
        className="individualProjectDescriptionSpan"
        id="individualProjectDescription"
      >
        This project is the penultimate project in this course where we implement back-end and front-end functionality and connect them together. We used test driven code in order to build the back-end and then used API calls in order to reference and CRUD that information in the front-end. This was the first project (out of two - Top Secret Shirts LA being the other project) where we utilized building a back-end. The project was split into two sections over the course of two weeks. The first week focused solely on the back-end creation and the second week followed up with the front-end creation. This project was a beast just for the sole fact that it was the first time we built our own back-end and I had very little knowledge in it's creation.
        <br></br>
        <br></br>
        This was definitely a sink-or-swim project and forced me to learn quickly. I worked with another partner on this project and they focused mainly on the CSS of the page whereas I focused on the "meat and potatoes." I feel like more delegation towards helping with portions of the PERN stack would have been a nice way to separate the project into more even slices rather than saving her portion for the end.
        <br></br>
        <br></br>
        Overall, this is another project where I learned way more than I had initially thought. I truly learned how to build a back-end and implement different tables, join them, and drop them when necessary. The front end was very stylish and my partner knew a little bit of Photoshop in order to create the filter for the moving background image. This was definitely a project that I was super proud of just based on the way it looks, feels, and flows.
        <br></br>
        <br></br>
        Extra Features: Photoshop
      </span>
    </div>
  </div>
  );
};

export default FitnessTrackerProject;
