import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import NavBar from "../NavBar";

const routes = () => {
  return (
    <div className="routes">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/profil" exact element={<Profil />} />
          <Route path="/trending" exect element={<Trending />} />
          <Route path="*" exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default routes;
