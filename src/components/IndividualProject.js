import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import ResiProject from "./ResiProject";
import TopSecretShirtsLAProject from "./TopSecretShirtsLAProject";
import FitnessTrackerProject from "./FitnessTrackerProject";
import StrangersThingsProject from "./StrangersThingsProject";
import QwirtyProject from "./QwirtyProject";
import UserHubProject from "./UserHubProject";
import TicTacToeProject from "./TicTacToeProject";
import "../style/IndividualProject.css";

const IndividualProject = () => {
  const { project_name } = useParams();

  return (
    <div className="individualProjectPage">
    {
         project_name === "Resi" ?
      <ResiProject />
      :  project_name === "TSSLA" ?
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
