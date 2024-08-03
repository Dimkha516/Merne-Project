import React, { useContext } from "react";
import { UidContext } from "./AppContext";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";

const NavBar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        {/*  */}

        {/* Home target */}
        <div className="home-logo">
          <NavLink to="/">
            <div className="home-logo-container">
              <img src="./images/app-logo1.png" alt="app-logo" />
              <h3>FriendsZone</h3>
            </div>
          </NavLink>
        </div>
        {/*  */}

        {/* CUURRENT USER */}
        {uid ? (
          <ul className="welcome-user">
            <li></li>
            <li>
              <NavLink to="/profil">
                <h3>@/ {userData.pseudo} /@</h3>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          // DISCONNECT TARGET
          <ul className="login-target">
            <li></li>
            <li>
              <NavLink to="/profil">
                <img src="./images/profil1.jpg" alt="log2" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
