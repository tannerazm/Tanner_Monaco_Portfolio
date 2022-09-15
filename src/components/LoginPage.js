import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPerson } from "../api";
import "../style/LoginPage.css";

const LoginPage = ({ setPage, setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPage(null);
  }, [])

  async function handleLogin (event) {
    event.preventDefault();
    const Tanner = await loginPerson(username, password)
    if (Tanner.message === "Username or Password Incorrect!") {
      alert('That username or password is incorrect or the username does not exist. Please try again!')
    } else {
      setIsLoggedIn(true)
      navigate('/blog')
    }
    return
  }

  return (
    <div className="loginPage">
      <div className="loginMainDiv">
      <label className="loginLabel">Login</label>
      <br></br>
      <form onSubmit={handleLogin} className="loginForm">
      <input
        type="text"
        placeholder="Username"
        className="loginInput"
        value={username}
        onChange={(event) => {
          event.preventDefault();
          setUsername(event.target.value);
        }}
      />
      <br></br>
      <br></br>
      <input
        type="password"
        placeholder="Password"
        className="loginInput"
        value={password}
        onChange={(event) => {
          event.preventDefault();
          setPassword(event.target.value);
        }}
      />
      <br></br>
      <button type="submit" className="loginButton">Login</button>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;
