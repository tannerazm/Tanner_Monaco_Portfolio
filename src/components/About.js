import { useEffect } from "react";
import { GrLocationPin } from "react-icons/gr";
import { AiOutlinePhone, AiOutlineLinkedin } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
// Programming Language Logos
import ExcelLogo from "../programmingicons/ExcelLogo.png";
import VSCodeLogo from "../programmingicons/VSCodeLogo.png";
import LinuxLogo from "../programmingicons/LinuxLogo.png";
import HTML5Logo from "../programmingicons/HTML5Logo.png";
import CSSLogo from "../programmingicons/CSSLogo.png";
import JavascriptLogo from "../programmingicons/JavascriptLogo.png";
import PostgreSQLLogo from "../programmingicons/PostgreSQLLogo.png";
import ExpressNodeJSLogo from "../programmingicons/Express&NodeJSLogo.svg";
import ReactLogo from "../programmingicons/ReactLogo.png";

// Personal Photos
import MeSeattle from "../photos/MeSeattle.jpg";
import BuffaloNY from "../photos/BuffaloNY.jpg";
import UniversityOfOklahoma from "../photos/UniversityOfOklahoma.jpg";
import DenverColorado from "../photos/DenverColorado.png";
import UniversityOfOklahomaFootball from "../photos/UniversityOfOklahomaFootball.jpg";
import TexasRangers from "../photos/TexasRangers.jpg";
import BakerMayfieldPanthers from "../photos/BakerMayfieldPanthers.png";
import WorldOfWacraft from "../photos/WorldOfWacraft.jpg";
import CallOfDuty from "../photos/CallOfDuty.jpg";
import BreathOfTheWild from "../photos/BreathOfTheWild.jpg";
import CapriSunCapris from "../photos/CapriSunCapris.png";
import KindaNeedThisJob from "../photos/KindaNeedThisJob.jpg";
import Company401K from "../photos/Company401K.png";
import RhineRiverCastle from "../photos/RhineRiverCastle.jpg";
import ParisFranceEiffelTower from "../photos/ParisFranceEiffelTower.jpg";
import GrandCaymanIsland from "../photos/GrandCaymanIsland.jpg";
import GameOfThrones from "../photos/GameOfThrones.jpg";
import HarryPotter from "../photos/HarryPotter.jpg";
import LordOfTheRings from "../photos/LordOfTheRings.jpg";
import Land from "../photos/Land.jpg";
import AQuietPlace from "../photos/AQuietPlace.jpg";
import EagleEye from "../photos/EagleEye.jpg";

import "../style/About.css";

const About = ({ setPage }) => {
  useEffect(() => {
    setPage("About");
  });

  // Intersection Observers
  const faders = document.querySelectorAll(".fade-in");
  const sliders = document.querySelectorAll(".slide-in");

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px",
  };

  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  sliders.forEach((slider) => {
    appearOnScroll.observe(slider);
  });
  // End Intersection Observers

  // Typewriting Features
  const typewriterNameString =
    "Hello World. My name is Tanner. I am a Full Stack Web Developer.";
  const nameStringLength = typewriterNameString.length;
  const aboutMeNameH1 = document.querySelector(".aboutMeNameH1");

  if (aboutMeNameH1) {
    aboutMeNameH1.style.setProperty("--name-string-length", nameStringLength);
  }
  // End Typewriting Features

  return (
    <div className="aboutPage">
      <div className="aboutMeNameDiv">
        <h1 className="aboutMeNameH1">{typewriterNameString}</h1>
      </div>
      <img src={MeSeattle} className="aboutMePhoto" />
      <div className="aboutMeAdditionalInfoGridContainer">
        <div className="aboutMeAdditionalInfoIndividualGridDiv slide-in from-left">
          <span>
            <GrLocationPin className="aboutMeLocationPinIcon" />
          </span>
          <br></br>
          <span className="aboutMeLocationSpan">Firestone, CO 80504</span>
          <br></br>
          <span className="aboutMeLocationSpan">(willing to relocate)</span>
          <br></br>
        </div>
        <div className="aboutMeAdditionalInfoIndividualGridDiv slide-in from-right">
          <span>
            <AiOutlinePhone className="aboutMePhoneIcon" />
            <MdAlternateEmail className="aboutMeEmailIcon" />
            <AiOutlineLinkedin className="aboutMeLinkedInIcon" />
          </span>
          <br></br>
          <span className="aboutMeLocationSpan">(303) 472-9342</span>
          <br></br>
          <span className="aboutMeLocationSpan">tannermonaco@gmail.com</span>
          <br></br>
          <span className="aboutMeLocationSpan">/in/tannermonaco</span>
          <br></br>
        </div>
      </div>
      <div className="aboutMeProgrammingLogosGridContainer">
        <div className="aboutMeProgrammingLogosIndividualGridDiv">
          <img src={ExcelLogo} className="aboutMeProgrammingLogos fade-in" />
        </div>
        <div className="aboutMeProgrammingLogosIndividualGridDiv">
          <img src={VSCodeLogo} className="aboutMeProgrammingLogos fade-in" />
        </div>
        <div className="aboutMeProgrammingLogosIndividualGridDiv">
          <img src={LinuxLogo} className="aboutMeProgrammingLogos fade-in" />
        </div>
        <div className="aboutMeProgrammingLogosIndividualGridDiv">
          <img src={HTML5Logo} className="aboutMeProgrammingLogos fade-in" />
        </div>
        <div className="aboutMeProgrammingLogosIndividualGridDiv">
          <img src={CSSLogo} className="aboutMeProgrammingLogos fade-in" />
        </div>
        <div className="aboutMeProgrammingLogosIndividualGridDiv">
          <img
            src={JavascriptLogo}
            className="aboutMeProgrammingLogos fade-in"
          />
        </div>
        <div className="aboutMeProgrammingLogosIndividualGridDiv">
          <img
            src={PostgreSQLLogo}
            className="aboutMeProgrammingLogos fade-in"
          />
        </div>
        <div className="aboutMeProgrammingLogosIndividualGridDiv">
          <img
            src={ExpressNodeJSLogo}
            className="aboutMeProgrammingLogos fade-in"
          />
        </div>
        <div className="aboutMeProgrammingLogosIndividualGridDiv">
          <img src={ReactLogo} className="aboutMeProgrammingLogos fade-in" />
        </div>
      </div>
      <span className="aboutMeGridDivider fade-in">Points of Interest</span>
      <div className="personalInfoGridContainer">
        <div className="personalInfoGridCell slide-in from-left">
          <h1>Currently: Denver, Colorado</h1>
          <br></br>
          <img src={DenverColorado} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-top">
          <h1>School: Norman, Oklahoma</h1>
          <br></br>
          <img src={UniversityOfOklahoma} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-right">
          <h1>Hometown: Buffalo, New York</h1>
          <br></br>
          <img src={BuffaloNY} className="aboutMeGridPhotos" />
        </div>
      </div>
      <span className="aboutMeGridDivider fade-in">Sports</span>
      <div className="personalInfoGridContainer">
        <div className="personalInfoGridCell slide-in from-left">
          <h1>Boomer. Sooner.</h1>
          <br></br>
          <img
            src={UniversityOfOklahomaFootball}
            className="aboutMeGridPhotos"
          />
        </div>
        <div className="personalInfoGridCell slide-in from-top">
          <h1>Texas Rangers</h1>
          <br></br>
          <img src={TexasRangers} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-right">
          <h1>Carolina Panthers</h1>
          <br></br>
          <img src={BakerMayfieldPanthers} className="aboutMeGridPhotos" />
        </div>
      </div>
      <span className="aboutMeGridDivider fade-in">Video Games</span>
      <div className="personalInfoGridContainer">
        <div className="personalInfoGridCell slide-in from-left">
          <h1>World of Wacraft</h1>
          <br></br>
          <img src={WorldOfWacraft} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-top">
          <h1>Zelda - Breath Of The Wild</h1>
          <br></br>
          <img src={BreathOfTheWild} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-right">
          <h1>Call of Duty</h1>
          <br></br>
          <img src={CallOfDuty} className="aboutMeGridPhotos" />
        </div>
      </div>
      <span className="aboutMeGridDivider fade-in">Travel</span>
      <div className="personalInfoGridContainer">
        <div className="personalInfoGridCell slide-in from-left">
          <h1>Rhine River Castles, Germany</h1>
          <br></br>
          <img src={RhineRiverCastle} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-top">
          <h1>Paris, France</h1>
          <br></br>
          <img src={ParisFranceEiffelTower} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-right">
          <h1>Grand Cayman Islands, United Kingdom</h1>
          <br></br>
          <img src={GrandCaymanIsland} className="aboutMeGridPhotos" />
        </div>
      </div>
      <span className="aboutMeGridDivider fade-in">TV Shows</span>
      <div className="personalInfoGridContainer">
        <div className="personalInfoGridCell slide-in from-left">
          <h1>Game of Thrones</h1>
          <br></br>
          <img src={GameOfThrones} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-top">
          <h1>Lord Of The Rings</h1>
          <br></br>
          <img src={LordOfTheRings} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-right">
          <h1>Harry Potter</h1>
          <br></br>
          <img src={HarryPotter} className="aboutMeGridPhotos" />
        </div>
      </div>
      <span className="aboutMeGridDivider fade-in">Movies</span>
      <div className="personalInfoGridContainer">
        <div className="personalInfoGridCell slide-in from-left">
          <h1>Land - 2021</h1>
          <br></br>
          <img src={Land} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-top">
          <h1>A Quiet Place - 2018</h1>
          <br></br>
          <img src={AQuietPlace} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-right">
          <h1>Eagle Eye - 2008</h1>
          <br></br>
          <img src={EagleEye} className="aboutMeGridPhotos" />
        </div>
      </div>
      <span className="aboutMeGridDivider fade-in">Music</span>
      <div className="personalInfoGridContainer">
        <div className="personalInfoGridCell slide-in from-left">
          <h1>Barefoot Blue Jean Night - Jake Owen</h1>
          <br></br>
          <iframe
            className="aboutMeGridIFrame"
            src="https://open.spotify.com/embed/track/3ts6xK5GzfMAAriT9AIBmP?utm_source=generator&theme=0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <div className="personalInfoGridCell slide-in from-top">
          <h1>Belong - Good Times Ahead, JSTJR, Jay Mason</h1>
          <br></br>
          <iframe
            className="aboutMeGridIFrame"
            src="https://open.spotify.com/embed/track/16r237EWrd13q7QDT1yA97?utm_source=generator&theme=0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <div className="personalInfoGridCell slide-in from-right">
          <h1>The Downfall of Us All - A Day To Remember</h1>
          <br></br>
          <iframe
            className="aboutMeGridIFrame"
            src="https://open.spotify.com/embed/track/6G7URf5rGe6MvNoiTtNEP7?utm_source=generator&theme=0"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <div className="personalInfoGridCell slide-in from-left">
          <h1>Can't Help Me Now - Rob Thomas</h1>
          <br></br>
          <iframe
            className="aboutMeGridIFrame"
            src="https://open.spotify.com/embed/track/4585IKfPMXI7CuX4TFa32k?utm_source=generator&theme=0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <div className="personalInfoGridCell slide-in from-top">
          <h1>Mockingbirds (VIZE Remix) - Dayo, Ruuth, VIZE</h1>
          <br></br>
          <iframe
            className="aboutMeGridIFrame"
            src="https://open.spotify.com/embed/track/33hTKRPELdX0F7JNJOYali?utm_source=generator&theme=0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <div className="personalInfoGridCell slide-in from-right">
          <h1>Yours in the Morning - Patrick Droney</h1>
          <br></br>
          <iframe
            className="aboutMeGridIFrame"
            src="https://open.spotify.com/embed/track/602rw0d0jQLoSCAfqdeY7Z?utm_source=generator&theme=0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <span className="aboutMeGridDivider fade-in">Memes</span>
      <div className="personalInfoGridContainer">
        <div className="personalInfoGridCell slide-in from-left">
          <h1>CapriSun Capries Son... Duh!</h1>
          <br></br>
          <img src={CapriSunCapris} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-top">
          <h1>Just for the memes!</h1>
          <br></br>
          <img src={KindaNeedThisJob} className="aboutMeGridPhotos" />
        </div>
        <div className="personalInfoGridCell slide-in from-right">
          <h1>And I don't run that far now!</h1>
          <br></br>
          <img src={Company401K} className="aboutMeGridPhotos" />
        </div>
      </div>
    </div>
  );
};

export default About;
