import React from "react";
import { NavLink } from "react-router-dom";

const MobileHeaderNavLinks = ({ page, open, individualProject }) => {
  return (
    <div>
      {open ? (
        <nav className="mobileLinksNavBar">
          <>
            <ul>
              <li>
                {page === "Home" ? (
                  <div className="navBarLink">
                    <NavLink to="/" className="NavLinkActive">
                      Home
                    </NavLink>
                  </div>
                ) : (
                  <div className="navBarLink">
                    <NavLink to="/" className="NavLink">
                      Home
                    </NavLink>
                  </div>
                )}
              </li>
              <li>
                {page === "About" ? (
                  <div className="navBarLink">
                    <NavLink to="/about" className="NavLinkActive">
                      About Me
                    </NavLink>
                  </div>
                ) : (
                  <div className="navBarLink">
                    <NavLink to="/about" className="NavLink">
                      About Me
                    </NavLink>
                  </div>
                )}
              </li>
              <li>
                {page === "Projects" ? (
                  <div className="navBarLink">
                    <NavLink to="/projects" className="NavLinkActive">
                      Projects
                    </NavLink>
                  </div>
                ) : (
                  <div className="navBarLink">
                    <NavLink to="/projects" className="NavLink">
                      Projects
                    </NavLink>
                  </div>
                )}
              </li>
              <li>
                {page === "Blog" ? (
                  <div className="navBarLink">
                    <NavLink to="/blog" className="NavLinkActive">
                      Blog
                    </NavLink>
                  </div>
                ) : (
                  <div className="navBarLink">
                    <NavLink to="/blog" className="NavLink">
                      Blog
                    </NavLink>
                  </div>
                )}
              </li>
              <li>
                {page === "Contact" ? (
                  <div className="navBarLink">
                    <NavLink to="/contact" className="NavLinkActive">
                      Contact
                    </NavLink>
                  </div>
                ) : (
                  <div className="navBarLink">
                    <NavLink to="/contact" className="NavLink">
                      Contact
                    </NavLink>
                  </div>
                )}
              </li>
              <li>
                {page === "Resume" ? (
                  <div className="navBarLink">
                    <NavLink to="/resume" className="NavLinkActive">
                      Resume
                    </NavLink>
                  </div>
                ) : (
                  <div className="navBarLink">
                    <NavLink to="/resume" className="NavLink">
                      Resume
                    </NavLink>
                  </div>
                )}
              </li>
            </ul>
            <a
              href="https://github.com/tannerazm"
              target="https://github.com/tannerazm"
            >
              <div className="gitHubDivImg"></div>
            </a>
            <a
              href="https://discord.gg/VUggXbCF7Y"
              target="https://discord.gg/VUggXbCF7Y"
            >
              <div className="discordDivImg"></div>
            </a>
          </>
        </nav>
      ) : null}
    </div>
  );
};

export default MobileHeaderNavLinks;
