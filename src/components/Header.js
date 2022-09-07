import { NavLink } from "react-router-dom";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import "../style/Header.css";

const Header = ({ page, individualProject }) => {
  return (
    <div id="topOfPage">
    <menu className="navBar">
      <div className="tannerNavBar">
        <NavLink to="/" className="tannerNavBar">
          Tanner Monaco
        </NavLink>
      </div>
      <div className="mainDesktopHeader">
        <DesktopHeader page={page} individualProject={individualProject} />
      </div>
      <div className="mainMobileHeader">
        <MobileHeader page={page} individualProject={individualProject} />
      </div>
    </menu>
    </div>
  );
};

export default Header;
