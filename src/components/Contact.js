import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/Contact.css";

const Contact = ({ setPage }) => {
  useEffect(() => {
    setPage("Contact");
  }, []);

  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  async function getInTouch(event) {
    event.preventDefault();
    Email.send({
      SecureToken : "C973D7AD-F097-4B95-91F4-40ABC5567812",
      To : email,
      From : "tannermonaco@gmail.com",
      Subject : "Tanner Monaco - Fullstack Web Developer",
      Body : message,
    Attachments : [
    {
      name : "TannerMonacoTechnicalResume09062022.pdf",
      path : "../resume/TannerMonacoTechnicalResume09062022.pdf"
    }]
  }).then(
    message => alert(message)
  );
    setMessage("");
    setFirstName("");
    setLastName("");
    setCompanyName("");
    setEmail("");
    setSuccessMessage(
      "Your message has been sent - thank you so much for reaching out! Continue to enjoy my portfolio website or check out my social media profiles below for more about me. I look forward to talking with you shortly!"
    );
  }

  return (
    <div className="contactMePage">
      <div className="contactMeItems">
        <div>Interested in knowing more about me?</div>
        <br></br>
        <div>I have experience in the PERN Stack and beyond!</div>
        <br></br>
        <br></br>
        <h1>Contact Me:</h1>
        <form onSubmit={getInTouch}>
          <textarea
            rows="4"
            cols="50"
            placeholder="Let me know what inspires you to contact me..."
            id="contactMeMessageTextarea"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          ></textarea>
          <br></br>
          <br></br>
          <input
            placeholder="Your first name..."
            id="contactMeFirstNameInput"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <br></br>
          <input
            placeholder="Your last name..."
            id="contactMeLastNameInput"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <br></br>
          <input
            placeholder="Your company..."
            id="contactMeCompanyInput"
            value={companyName}
            onChange={(event) => {
              setCompanyName(event.target.value);
            }}
          />
          <br></br>
          <input
            placeholder="Your email..."
            id="contactMeEmailInput"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br></br>
          {successMessage ? (
            <>
              <br></br>
              <div className="successMessageContainer">
                <div className="successMessage">{successMessage}</div>
                <br></br>
                <span className="successMessageLogoSpan">
                  <a
                    href="https://www.linkedin.com/in/tannermonaco/"
                    target="https://www.linkedin.com/in/tannermonaco/"
                    className="linkedInATag"
                  >
                    <div className="successMessageLinkedIn"></div>
                  </a>
                  <a
                    href="https://github.com/tannerazm"
                    target="https://github.com/tannerazm"
                    className="githubATag"
                  >
                    <div className="successMessageGithub"></div>
                  </a>
                  <a
                    href="https://www.facebook.com/tannerazm"
                    target="https://www.facebook.com/tannerazm"
                    className="facebookATag"
                  >
                    <div className="successMessageFacebook"></div>
                  </a>
                </span>
              </div>
              <br></br>
              <NavLink to="/resume" className="successLinks">
                Resume
              </NavLink>
              <span> | </span>
              <NavLink to="/projects" className="successLinks">
                Projects
              </NavLink>
              <span> | </span>
              <NavLink to="/" className="successLinks">
                Home
              </NavLink>
              <br></br>
            </>
          ) : (
            <button type="submit">Get in touch!</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
