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
      <br />
      <br />
      <small>This is a link to the project.</small>
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
            July 5th, 2022
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
          This project was another follow along project where I had a reference
          website that I was trying to match. This was our first iteration and
          "toe-dip" into react and API calls. This is an SPA and features login
          functionality with different pages for todos and posts.
          <br></br>
          <br></br>
          The most difficult portion of this project was understanding how the
          login/logout feature truly works and how to implement local storage in
          order to persist login information. This, paired with the learning and
          implementing of API calls made for an interesting learning curve, one
          that I was super excited about. Also, being able to take information
          that a database has and display it on the screen in a presentable
          manner was super rewarding.
          <br></br>
          <br></br>
          The reason why this project was important, interesting and fun for me
          was how I was starting to see my web development starting to really
          kick-start. With being able to log into a website and see information
          that someone had/has posted was just too cool. I could start seeing
          all of the applications where I could implement this new knowledge and
          it really made me start wondering "What am I going to learn next?"
        </span>
      </div>
    </div>
  );
};

export default UserHubProject;
