import { useEffect } from "react";
import "../style/Resume.css";

const Projects = ({ setPage }) => {
  useEffect(() => {
    setPage("Resume");
  }, []);

  return (
    <div className="resumePage">
      <div className="resumeDiv">
        <iframe src="https://docs.google.com/document/d/e/2PACX-1vRfdIHdAWejpgus26nIsJivmq89aSn-vc0AMtdpXXLi-pXlWftU8U5iIGllCAFjk-uCtEEjmRMibZNV/pub?embedded=true"></iframe>
      </div>
    </div>
  );
};

export default Projects;
