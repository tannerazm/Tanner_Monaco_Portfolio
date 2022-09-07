import { NavLink } from "react-router-dom";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaGithubSquare,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsLinkedin, BsDiscord } from "react-icons/bs";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        <div className="footerSocialMediaDiv">
          <span className="footerSocialMediaMainSpan">
            <span className="footerSocialMediaIcon">
              <a
                href="https://www.facebook.com/tannerazm"
                target="https://www.facebook.com/tannerazm"
                className="footerATagSocialMedia"
              >
                <FaFacebookSquare />
              </a>
            </span>
            <span className="footerSocialMediaIcon">
                <a
                href="https://twitter.com/tannerazm"
                target="https://twitter.com/tannerazm"
                className="footerATagSocialMedia"
              >
                 <FaTwitterSquare />
              </a>
            </span>
            <span className="footerSocialMediaIcon">
                <a
                href="https://www.instagram.com/tannerazm/"
                target="https://www.instagram.com/tannerazm/"
                className="footerATagSocialMedia"
              >
                <AiFillInstagram />
              </a>
            </span>
            <span className="footerSocialMediaIcon">
                <a
                href="https://www.linkedin.com/in/tannermonaco/"
                target="https://www.linkedin.com/in/tannermonaco/"
                className="footerATagSocialMedia"
              >
              <BsLinkedin />
              </a>
            </span>
            <span className="footerSocialMediaIcon">
                <a
                href="https://github.com/tannerazm"
                target="https://github.com/tannerazm"
                className="footerATagSocialMedia"
              >
              <FaGithubSquare />
              </a>
            </span>
            <span className="footerSocialMediaIcon">
                <a
                href="https://discord.gg/NVBgMcYQ"
                target="https://discord.gg/NVBgMcYQ"
                className="footerATagSocialMedia"
              >
              <BsDiscord />
              </a>
            </span>
          </span>
        </div>
      </div>
      <div className="centralFooter">
        <span className="footerTannerMonaco">Tanner Monaco</span>
        <div className="footerGridContainer">
          <div className="footerDivGridCell">
            <NavLink to="/" className="footerLinks">
              Home
            </NavLink>
          </div>
          <div className="footerDivGridCell">
            <NavLink to="/projects" className="footerLinks">
              Projects
            </NavLink>
          </div>
          <div className="footerDivGridCell">
            <NavLink to="/about" className="footerLinks">
              About Me
            </NavLink>
          </div>
          <div className="footerDivGridCell">
            <NavLink to="/blog" className="footerLinks">
              Blog
            </NavLink>
          </div>
          <div className="footerDivGridCell">
            <NavLink to="/contact" className="footerLinks">
              Contact Me
            </NavLink>
          </div>
          <div className="footerDivGridCell">
            <NavLink to="/resume" className="footerLinks">
              Resume
            </NavLink>
          </div>
        </div>
      </div>
      <div className="rightFooter">© 2022 Tanner Monaco, Inc.</div>
    </footer>
  );
};

export default Footer;
