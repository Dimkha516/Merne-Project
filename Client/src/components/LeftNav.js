import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "active-icon" : "")}
          >
            <img src="./images/home2.png" alt="home" />
          </NavLink>
          <br />

          <NavLink
            to="/trending"
            className={(nav) => (nav.isActive ? "active-icon" : "")}
          >
            <img src="./images/trending4.png" alt="trending" />
          </NavLink>
          <br />

          <NavLink
            to="/profil"
            className={(nav) => (nav.isActive ? "active-icon" : "")}
          >
            <img src="./images/profil2.png" alt="profil" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
