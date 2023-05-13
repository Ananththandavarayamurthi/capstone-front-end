import React from "react";
import TopBar from "../components/landingPage/TopBar";
import Art from "../Asset/img.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="big-wrapper">
      <TopBar />
      <div className="showcase-area">
        <div className="contain">
          <div className="left">
            <div className="big-title">
              <h1>Office tool to organise the work progress and capacity Scheduler</h1>
            </div>
            
            <p className="text">
              <p>
                <b>Credentials</b>
              </p>
              <p>
                <b>For admin</b>
              </p>
              <b>UserName:</b>ananth@gmail.com
              <br />
              <b>password:</b>Ananththeri007@ <br />
              <b>AdminKey:</b>123
              <p>
    <br />
                <b>For employee</b>
              </p>
              <b>UserName:</b>mani@gmail.com
              <br />
              <b>password:</b>manikandan@123
              
            </p>
            <div className="cta">
              <Link to="login" className="btn btn-primary">
                Sign up-it's free
              </Link>
            </div>
          </div>
          <div className="right">
            <img src={Art} alt="per" className="person" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
