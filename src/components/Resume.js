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
          src="https://docs.google.com/document/d/e/2PACX-1vRyzIckvQiMOPX6EVF-sTbjilmm5lkV6BiSHxSeUYgHEm23cZffkoz-nFpTjpUlunYjPyUUJM5Fqhyo/pub?embedded=true"
        ></iframe>
      </div>
    </div>
  );
};

export default Projects;
