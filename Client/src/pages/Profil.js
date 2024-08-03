import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <div className="update-profil1">
          <UpdateProfil />
        </div>
      ) : (
        <div className="log-container">
          <Log signin={true} signup={false} />
          <img src="./images/ada.jpg" alt="profil" />
          <div className="img-container"></div>
        </div>
      )}
    </div>
  );
};

export default Profil;
