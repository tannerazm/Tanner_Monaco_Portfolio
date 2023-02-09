import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Qwirty from "../projectpictures/Qwirty.jpg";

const QwirtyProject = () => {
  return (
    <div className="individualProjectContainer">
      <div className="divBackToAllProjects">
        <NavLink to="/projects" className="navLinkBackToAllProjects">
          <BsArrowLeft id="arrowLeftBackToAllProjects" /> Back to All Projects
        </NavLink>
      </div>
      <span className="individualProjectNameSpan">
        <a
          href="https://ephemeral-sable-b7a5f5.netlify.app"
          target="https://ephemeral-sable-b7a5f5.netlify.app"
          className="individualProjectATag"
        >
          Qwirty
        </a>
      </span>
      <br />
      <br />
      <small>This is a link to the project.</small>
      <br></br>
      <br></br>
      <div className="individualProjectPictureDiv">
        <img src={Qwirty} className="individualProjectPicture" />
      </div>
      <div className="individualProjectDescriptionDiv">
        <div className="individualProjectExtrasDiv">
          <span
            className="individualProjectDescriptionSpan"
            id="individualProjectExtras"
          >
            June 12th, 2022
          </span>
          <br></br>
          <br></br>
          <span
            className="individualProjectDescriptionSpan"
            id="individualProjectExtras"
          >
            HTML | CSS | Chrome Development Tools | Media Queries
          </span>
        </div>
        <br></br>
        <br></br>
        <span
          className="individualProjectDescriptionSpan"
          id="individualProjectDescription"
        >
          This project is a replication project. What I mean by this is that is
          we were given a template to try and replicate and were given boiler
          plate code and used CSS in order to try and adjust the look to match
          the example provided. Below is a link that we used in order to try to
          duplicate. This was an entry level project for CSS and taught us how
          to utilize grid and other cool CSS properties to achieve certain
          functional and practical ways of handling layout and also window size.
          The project was super enjoyable since it had everything to do with
          producing code and didn't focus on trying to come up with your own
          design. This also forced me to find new tools, such as Chrome Dev
          Tools, in order to accomplish very specific tasks such as finding how
          their website was functioning and what it used to style it. I feel as
          if being able to utilize all of the resources around me to achieve a
          desired outcome was super rewarding and enjoyable.
          <br></br>
          <br></br>
          <span className="qwirtyEndProductExample">Reference:</span>
          <span>
            <a
              className="qwirtyExampleProject"
              href="https://serene-archimedes-8526f6.netlify.app/"
              target="https://serene-archimedes-8526f6.netlify.app/"
            >
              https://serene-archimedes-8526f6.netlify.app/
            </a>
          </span>
        </span>
      </div>
    </div>
  );
};

export default QwirtyProject;
