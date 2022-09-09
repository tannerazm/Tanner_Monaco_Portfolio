import { useEffect } from "react";
import "../style/Resume.css";

const Projects = ({ setPage }) => {
  useEffect(() => {
    setPage("Resume");
  }, []);

  return (
    <div className="resumePage">
      <div className="resumeDiv">
        <iframe
          className="myResume"
          src="https://docs.google.com/document/d/e/2PACX-1vSmdmtFWpHK9xpS8_dv-iBzyJFFyDLqQbimp1OgfRoQCufGwFEM1AqH4zgFgABv2W5-_AZ6kmmU_AON/pub?embedded=true"
        ></iframe>
        <a
          href="../resume/TannerMonacoTechnicalResume09092022.pdf"
          download=""
        >
          <button className="downloadResumeButton">Download Resume</button>
        </a>
      </div>
    </div>
  );
};

export default Projects;
