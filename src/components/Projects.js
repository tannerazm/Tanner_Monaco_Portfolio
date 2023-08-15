import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Resi from "../projectpictures/Resi.png";
import TopSecretShirtsLA from "../projectpictures/TopSecretShirtsLA.jpg";
import FitnessTracker from "../projectpictures/FitnessTracker.png";
import StrangersThings from "../projectpictures/StrangersThings.png";
import UserHub from "../projectpictures/UserHub.png";
import TicTacToe from "../projectpictures/TicTacToe.png";
import Qwirty from "../projectpictures/Qwirty.jpg";
import "../style/Projects.css";

const Projects = ({ setPage }) => {
  useEffect(() => {
    setPage("Projects");
  }, []);

  return (
    <div className="projectsPage">
      <div className="projectCards">
        <div className="individualProjectCard">
          <NavLink to="/projects/Resi" className="projectTitle">
            <span className="projectTitle">
              <span className="projectTitleLink">Resi App</span>
            </span>
            <img src={Resi} className="projectThumbnail" />
          </NavLink>
        </div>
        <div className="individualProjectCard">
          <NavLink to="/projects/TSSLA" className="projectTitle">
            <span className="projectTitle">
              <span className="projectTitleLink">Top Secret Shirts LA</span>
            </span>
            <img src={TopSecretShirtsLA} className="projectThumbnail" />
          </NavLink>
        </div>
        <div className="individualProjectCard">
          <NavLink to="/projects/Fitness_Tracker" className="projectTitle">
            <span className="projectTitle">
              <span className="projectTitleLink">Fitness Tracker</span>
            </span>
            <img src={FitnessTracker} className="projectThumbnail" />
          </NavLink>
        </div>
        <div className="individualProjectCard">
          <NavLink to="/projects/Strangers_Things" className="projectTitle">
            <span className="projectTitle">
              <span className="projectTitleLink">Stranger's Things</span>
            </span>
            <img src={StrangersThings} className="projectThumbnail" />
          </NavLink>
        </div>
        <div className="individualProjectCard">
          <NavLink to="/projects/User_Hub" className="projectTitle">
            <span className="projectTitle">
              <span className="projectTitleLink">User Hub</span>
            </span>
            <img src={UserHub} className="projectThumbnail" />
          </NavLink>
        </div>
        <div className="individualProjectCard">
          <NavLink to="/projects/Tic_Tac_Toe" className="projectTitle">
            <span className="projectTitle">
              <span className="projectTitleLink">Tic Tac Toe</span>
            </span>
            <img src={TicTacToe} className="projectThumbnail" />
          </NavLink>
        </div>
        <div className="individualProjectCard">
          <NavLink to="/projects/Qwirty" className="projectTitle">
            <span className="projectTitle">
              <span className="projectTitleLink">Qwirty</span>
            </span>
            <img src={Qwirty} className="projectThumbnail" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Projects;
