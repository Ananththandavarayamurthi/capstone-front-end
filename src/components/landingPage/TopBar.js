import React, { useState, useContext } from "react";
import office from "../../Asset/office1.svg";
import "../../App.css";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  let navigate = useNavigate();
  const {  setSignIn } = useContext(UserContext);
  const [side, setSide] = useState(false);
  const SignInHandleClick = (e) => {
    e.preventDefault();
    setSignIn(false);
    navigate("login");
  };
  const SignUpHandleClick = (e) => {
    e.preventDefault();
    setSignIn(true);
    navigate("login");
  };
  return (
    <div>
      <header className="m-5">
        <div className="contain">
          <div className="logo">
            <img src={office} alt="Logo" />
            <h3>OFFIX TOOL</h3>
          </div>
          <div className="links">
            <ul>
              <li>
                <Link onClick={SignInHandleClick} className="btn btn-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link onClick={SignUpHandleClick} className="btn  btn-primary">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
          <div
            onClick={() => {
              setSide(!side);
            }}
            className="hamburger-menu"
          >
            <div className="bar"></div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default TopBar;
