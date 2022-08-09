import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./Auth.css"
import logo from "../../Assets/images/logo.png";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);

  const handleClick = () => {
    setLogin(!login);
  }

  return (
    <div className="auth">
              <img src={logo} alt="logo" onClick={()=>navigate("/")}/>
      {login ? <Login handleClick={handleClick} /> : <Register handleClick={handleClick} />}
    </div>
  );
};

export default Auth;
