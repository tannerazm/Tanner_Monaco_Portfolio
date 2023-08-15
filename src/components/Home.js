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
            <p>Moved from from Argyle, Texas to Hickory Creek, Texas. Dang, we move a lot...</p>
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
              Graduated from the University of Oklahoma. Moved back to Flower Mound, Texas in April of
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
              Colorado. I had no job, no place to stay, and no friends in Colorado, but it
              was a life goal of mine, so I took a big chance and
              went for it! Best decision of my life.
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
            <h1>December - 2022</h1>
            <p>
              Returned to Fullstack Academy as a part-time mentor, for the program that I was a part of back in August, to continue helping emerging tech students learn coding.
              <br></br>
              <br></br>
              Languages/software I am teaching: VSCode | Ubuntu on Linux | HTML5 | CSS | JavaScript | PostgreSQL |
              Node.js {"&"} Express | React
            </p>
          </div>
        </div>
        {/* Copy from here up */}
        {/* Copy from here down */}
        <div className="timelineContainer left fade-in from-left">
          <div className="timelineContent">
            <h1>March - 2023</h1>
            <p>
              Started contract work for <a href={`${window.origin}/projects/Resi`} className="timelineContentNavLink">Resi</a>, a marketing and Website/App development firm that focuses on unique, custom websites for property management/owner clients.
              <br></br>
              <br></br>
              CraftCMS | PHP | MySQL | AJAX | Vue.js | Twig | Less | BitBucket | Agile Methodologies
            </p>
          </div>
        </div>
        <div className="timelineContainer right fade-in from-right">
          <div className="timelineContent">
          <h1>Present</h1>
            <p>
              Looking for a full-time front-end, back-end or full stack web development/software development
              position.
              <br />
              <br />
              <b className="typicalAppQuestionAnswers">Desired Salary:</b> $70,000.00+
              <br />
              <br />
              <b className="typicalAppQuestionAnswers">Interview Availability:</b> Any day, any time!
              <br />
              <br />
              <b className="typicalAppQuestionAnswers">Relocation:</b> Anywhere in the United States. No relocation package/company compensation needed. I am able to move at a moments notice.
              <br />
              <br />
              <b className="typicalAppQuestionAnswers">Availability to Start:</b> Two weeks.
              <br />
              <br />
              <b className="typicalAppQuestionAnswers">Shifts:</b> I will accept all shifts.
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
