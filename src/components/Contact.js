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
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function getInTouch(event) {
    event.preventDefault();

    const send_to_self_params = {
      message: message,
      from_first_name: firstName,
      from_last_name: lastName,
      from_email_id: email,
      from_phone_number: phoneNumber,
      from_company: companyName,
    };

    const send_to_them_params = {
      from_first_name: firstName,
      from_email_id: email,
    };

    emailjs.send("service_uls9257", "template_mz33k3g", send_to_self_params);
    emailjs.send("service_uls9257", "template_n4wjd5j", send_to_them_params);

    setMessage("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setCompanyName("");
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
        <div className="contactMeFormDiv">
          <form onSubmit={getInTouch} className="contactMeForm">
            {/* <textarea
            rows="4"
            cols="50"
            placeholder="* Let me know what inspires you to contact me..."
            id="contactMeMessageTextarea"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            required
          ></textarea> */}
            <div className="contactMeInputBox">
              <textarea
                text="text"
                value={message}
                required="required"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              ></textarea>
              <span>
                <b className="red">*</b> Let me know what inspires you to
                contact me!
              </span>
            </div>
            <br></br>
            <br></br>
            <div className="contactMeInputBox">
              <input
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                required="required"
              />
              <span>
                <b className="red">*</b> Your First Name
              </span>
            </div>
            <br></br>
            <div className="contactMeInputBox">
              <input
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                required="required"
              />
              <span>
                <b className="red">*</b> Your Last Name
              </span>
            </div>
            <br></br>
            <div className="contactMeInputBox">
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required="required"
              />
              <span>
                <b className="red">*</b> Your Email
              </span>
            </div>
            <br></br>
            <div className="contactMeInputBox">
              <input
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
                required="required"
              />
              <span>
                <b className="red">*</b> Your Phone Number
              </span>
            </div>
            <br></br>
            <div className="contactMeInputBox">
              <input
                value={companyName}
                onChange={(event) => {
                  setCompanyName(event.target.value);
                }}
                required="required"
              />
              <span>
                <b className="red">*</b> Your Company
              </span>
            </div>
            <br></br>
            <br></br>
            <small>
              <b className="red">*</b> fields are required.
            </small>
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
    </div>
  );
};

export default Contact;
