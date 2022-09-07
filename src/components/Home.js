import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../style/Home.css";

const Home = ({ setPage }) => {
  useEffect(() => {
    setPage("Home");
    document.querySelector('.timelineSpotifySong').click()
  }, []);

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

  return (
    <div className="homePage">
      <iframe
        className="timelineSpotifySong"
        title="Play"
        src="https://open.spotify.com/embed/track/5gB2IrxOCX2j9bMnHKP38i?utm_source=generator"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <div className="timelineDiv">
        {/* Copy from here down */}
        <div className="timelineContainer left fade-in from-left">
          <div className="timelineContent">
            <h1>3:52 AM - May 25th, 1995</h1>
            <p>A new child named Tanner was born in Orchard Park, New York.</p>
          </div>
        </div>
        <div className="timelineContainer right fade-in from-right">
          <div className="timelineContent">
            <h1>Apr - 1997</h1>
            <p>
              Moved from Orchard Park, New York to Euless, Texas when I was a
              year and a half years old.
            </p>
          </div>
        </div>
        {/* Copy from here up */}
        {/* Copy from here down */}
        <div className="timelineContainer left fade-in from-left">
          <div className="timelineContent">
            <h1>Mar - 1998</h1>
            <p>Moved from Euless, Texas to Coppell, Texas.</p>
          </div>
        </div>
        <div className="timelineContainer right fade-in from-right">
          <div className="timelineContent">
            <h1>July - 2000</h1>
            <p>
              Moved from Coppell, Texas to Flower Mound {"(Wellington)"}, Texas.
            </p>
          </div>
        </div>
        {/* Copy from here up */}
        {/* Copy from here down */}
        <div className="timelineContainer left fade-in from-left">
          <div className="timelineContent">
            <h1>May - 2001</h1>
            <p>Started elementary school at Wellington Elementary.</p>
          </div>
        </div>
        <div className="timelineContainer right fade-in from-right">
          <div className="timelineContent">
            <h1>May-Aug - 2006</h1>
            <p>
              Graduated elementary school. Started middle school at Argyle
              Middle School.
            </p>
          </div>
        </div>
        {/* Copy from here up */}
        {/* Copy from here down */}
        <div className="timelineContainer left fade-in from-left">
          <div className="timelineContent">
            <h1>Jul - 2008</h1>
            <p>
              Moved from Flower Mound {"(Wellington)"}, Texas to Argyle, Texas.
            </p>
          </div>
        </div>
        <div className="timelineContainer right fade-in from-right">
          <div className="timelineContent">
            <h1>May-Aug - 2009</h1>
            <p>
              Graduated middle school. Started high school at Argyle High
              School.
            </p>
          </div>
        </div>
        {/* Copy from here up */}
        {/* Copy from here down */}
        <div className="timelineContainer left fade-in from-left">
          <div className="timelineContent">
            <h1>Mar - 2013</h1>
            <p>Moved from from Argyle, Texas to Hickory Creek, Texas.</p>
          </div>
        </div>
        <div className="timelineContainer right fade-in from-right">
          <div className="timelineContent">
            <h1>May-Aug - 2013</h1>
            <p>
              Graduated high school from Argyle High School in May and started
              college at the Texas Tech University in August, majoring in Health
              and Exercise Sciences. Wreck 'em!
            </p>
          </div>
        </div>
        {/* Copy from here up */}
        {/* Copy from here down */}
        <div className="timelineContainer left fade-in from-left">
          <div className="timelineContent">
            <h1>Aug - 2014</h1>
            <p>
              Transferred from Texas Tech University to the University of
              Oklahoma to major in Entrepreneurship and Venture Management!
              BOOMER!
            </p>
          </div>
        </div>
        <div className="timelineContainer right fade-in from-right">
          <div className="timelineContent">
            <h1>May - 2017</h1>
            <p>
              Graduated from the University of Oklahoma with a GPA of 3.4 / 4.0.
              Moved back in with family to figure out where I wanted to go. They
              moved back to Flower Mound {"(Pecan Meadows)"}, Texas in April of
              2014.
            </p>
          </div>
        </div>
        {/* Copy from here up */}
        {/* Copy from here down */}
        <div className="timelineContainer left fade-in from-left">
          <div className="timelineContent">
            <h1>June - 2017</h1>
            <p>
              It didn't take me long to decide that Colorado was my next
              destination. Packed up my belongings and moved from Texas to
              Colorado. I had no job, no place to stay, and no friends, but it
              was a life goal of mine, so I took a dive off the deep end and
              went for it!
            </p>
          </div>
        </div>
        <div className="timelineContainer right fade-in from-right">
          <div className="timelineContent">
            <h1>June - 2022</h1>
            <p>
              Went back to the University of Oklahoma's continuing education
              program for coding and computer science hosted by the accredited
              Fullstack Academy.
            </p>
          </div>
        </div>
        {/* Copy from here up */}
        {/* Copy from here down */}
        <div className="timelineContainer left fade-in from-left">
          <div className="timelineContent">
            <h1>August - 2022</h1>
            <p>
              Graduated from the Fullstack Academy continuing education course.
              Received certificate of completion and gained an immense amount of
              knowledge in the following languages:
              <br></br>
              <br></br>
              VSCode | Ubuntu on Linux | HTML5 | CSS | JavaScript | PostgreSQL |
              Node.js {"&"} Express | React
            </p>
          </div>
        </div>
        <div className="timelineContainer right fade-in from-right">
          <div className="timelineContent">
            <h1>Present</h1>
            <p>
              Looking for a front-end, back-end or full stack web development
              position from a company and organization that is willing to invest
              in a dedicated, well versed, humble, and knowledgeable employee
              who will go above and beyond for his colleagues and company.
              <br></br>
              <br></br>
              As you can see, I embrace new experiences and new places with
              moving to new locations, which should hopefully speak volumes
              about my willingness to relocate anywhere to accommodate a
              position at your company.
              <br></br>
              <br></br>
              Want to know more? Contact me{" "}
              <NavLink to="/contact" className="timelineContentNavLink">
                here!
              </NavLink>
            </p>
          </div>
        </div>
        {/* Copy from here up */}
      </div>
    </div>
  );
};

export default Home;
