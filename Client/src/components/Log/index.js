import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
  const [signInModal, setSigninModal] = useState(props.signin);
  const [signUpModal, setSignUpModal] = useState(props.signup);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSigninModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSigninModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            id="register"
            onClick={handleModals}
            className={signUpModal ? "active-btn" : ""}
          >
            S'inscrire
          </li>
          <li
            id="login"
            onClick={handleModals}
            className={signInModal ? "active-btn" : ""}
          >
            Se connecter
          </li>
        </ul>
        {signInModal && <SignInForm />}
        {signUpModal && <SignUpForm />}
      </div>
    </div>
  );
};

export default Log;
