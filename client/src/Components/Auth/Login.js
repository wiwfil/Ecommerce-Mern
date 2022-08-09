import React, { useState } from "react";
import { getUser } from "../../Store/features/user/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Auth.css";

const Login = ({ handleClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = { username, password };
      dispatch(getUser(data)).then((res) => {
        if (res.error) {
          setMessage(res.payload);
        } else {
          navigate("/");
        }
      });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin} noValidate>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              autoComplete="off"
              className={`input`}
              type="email"
              name="email"
              onChange={(e) => setUsername(e.target.value)}
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
        {message && <div id="error-message">{message}</div>}
        <button type="submit" className="button is-block is-info is-fullwidth">
          Login
        </button>
        <span onClick={handleClick}>Sign Up</span>
      </form>
    </div>
  );
};

export default Login;
