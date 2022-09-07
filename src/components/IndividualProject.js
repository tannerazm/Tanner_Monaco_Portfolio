import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import TopSecretShirtsLAProject from "./TopSecretShirtsLAProject";
import FitnessTrackerProject from "./FitnessTrackerProject"
import StrangersThingsProject from "./StrangersThingsProject"
import QwirtyProject from "./QwirtyProject"
import UserHubProject from "./UserHubProject"
import TicTacToeProject from "./TicTacToeProject"
import FitnessTracker from "../projectpictures/FitnessTracker.png";
import TicTacToe from "../projectpictures/TicTacToe.png";
import StrangersThings from "../projectpictures/StrangersThings.png";
import UserHub from "../projectpictures/UserHub.png";
import TopSecretShirtsLA from "../projectpictures/TopSecretShirtsLA.jpg";
import Qwirty from "../projectpictures/Qwirty.jpg";
import "../style/IndividualProject.css";

const IndividualProject = () => {
  const { project_name } = useParams();

  return (
    <div className="individualProjectPage">
    {
        project_name === "TSSLA" ?
      <TopSecretShirtsLAProject />
      : project_name === "Fitness_Tracker" ?
      <FitnessTrackerProject />
      : project_name === "Strangers_Things" ?
      <StrangersThingsProject />
      : project_name === "Qwirty" ?
      <QwirtyProject />
      : project_name === "User_Hub" ?
      <UserHubProject />
      : project_name === "Tic_Tac_Toe" ?
      <TicTacToeProject />
      : null
    }
    </div>
  );
};

export default IndividualProject;
