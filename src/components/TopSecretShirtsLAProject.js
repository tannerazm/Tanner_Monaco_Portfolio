import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import TopSecretShirtsLA from "../projectpictures/TopSecretShirtsLA.jpg";
import "../style/IndividualProject.css";

const TopSecretShirtsLAProject = () => {
  return (
    <div className="individualProjectContainer">
      <div className="divBackToAllProjects">
        <NavLink to="/projects" className="navLinkBackToAllProjects">
          <BsArrowLeft id="arrowLeftBackToAllProjects" /> Back to All Projects
        </NavLink>
      </div>
      <span className="individualProjectNameSpan">
        <a
          href="https://top-secret-shirts-la.herokuapp.com/"
          target="https://top-secret-shirts-la.herokuapp.com/"
          className="individualProjectATag"
        >
          Top Secret Shirts LA
        </a>
      </span>
      <br></br>
      <br></br>
      <div className="individualProjectPictureDiv">
        <img src={TopSecretShirtsLA} className="individualProjectPicture" />
      </div>
      <div className="individualProjectDescriptionDiv">
        <div className="individualProjectExtrasDiv">
          <span
            className="individualProjectDescriptionSpan"
            id="individualProjectExtras"
          >
            August 26th, 2022
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
          This is a group project that resembles the very important and essential functions of an e-commerce website. This project encompasses efforts in the entire PERN stack with front-end and back-end capabilities and built over the last three weeks of the course. Our project team was three individuals strong. We all specialized in specific areas (whether it be front-end, API calls, or back-end) while also aiding in the help of the other's section whenever help or guidance was needed.
          <br></br>
          <br></br>
          The largest struggle for this project was attaching the back-end to the front-end and understanding one person's code when everyone has/had different styles. My knowledge was paramount in being able to decipher these intricacies and adapt my code to suit the different styles efficiently and effectively. I feel like this was not only the largest struggle, but also the largest reward, as it forced me to be dynamic and truly understand everyone's coding style.
          <br></br>
          <br></br>
          Another huge lesson I learned was not even the code itself, but the management and success of my coworkers. Working on a team of individuals where you had to delegate, inspire and push each other to new limits was it's own beast in itself. The differences in personalities, level of understanding, and schedules added another layer of technicality that really pushed us to work together throughout the entire process. We did a really nice job managing all of these "components" and were able to truly come together. Yes, there were some hurdles, but overall, it's something that we worked through and tackled right away.
        </span>
      </div>
    </div>
  );
};

export default TopSecretShirtsLAProject;
