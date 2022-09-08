import { NavLink } from "react-router-dom";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import "../style/Header.css";

const Header = ({ page }) => {
  return (
    <div id="topOfPage">
    <menu className="navBar">
      <div className="tannerNavBar">
        <NavLink to="/" className="tannerNavBar">
          Tanner Monaco
        </NavLink>
      </div>
      <div className="mainDesktopHeader">
        <DesktopHeader page={page} />
      </div>
      <div className="mainMobileHeader">
        <MobileHeader page={page} />
      </div>
    </menu>
    </div>
  );
};

export default Header;
