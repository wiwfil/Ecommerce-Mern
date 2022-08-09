import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, postUser } from "../../Store/features/user/authSlice.js";
import { useNavigate } from "react-router-dom";

const Register = ({ handleClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        username === "" ||
        email === "" ||
        password === "" ||
        passwordValid === ""
      ) {
        setMessage("Please fill the all fields");
      } else {
        if (password === passwordValid) {
          const data = { username, email, password };
          dispatch(postUser(data)).then((res) => {
            dispatch(getUser(data)).then(navigate("/"));
          });
        } else {
          setMessage("Passwords do not match");
        }
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              autoComplete="off"
              className={`input`}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              autoComplete="off"
              className={`input`}
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input`}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password Validation</label>
          <div className="control">
            <input
              className={`input`}
              type="password"
              name="password"
              onChange={(e) => setPasswordValid(e.target.value)}
              required
            />
          </div>
        </div>
        {message && <div id="error-message">{message}</div>}
        <button type="submit" className="button is-block is-info is-fullwidth">
          Sign Up
        </button>
        <span onClick={handleClick}>Login</span>
      </form>
    </div>
  );
};

export default Register;
