import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const passwordError = document.querySelector(".password-error");
    const emailError = document.querySelector(".email-error");
    const generalError = document.querySelector(".general-error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}users/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = "Email inconnu";
          passwordError.innerHTML = "Mot de passe incorrecte";
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        generalError.innerHTML =
          "Erreur! email inconnu ou mot de passe incorrecte";
      });
  };

  return (
    <div className="signin">
      <form action="" className="signin-form" onSubmit={handleLogin}>
        <ul>
          <li className="email-container">
            <label htmlFor="email">Email</label>

            <input
              type="text"
              name="email"
              id="email"
              // autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <p className="email-error"></p>
          </li>

          {/*  */}
          <li className="password-container">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className="password-error"></p>
          </li>
          {/*  */}

          <input type="submit" value="Valider"></input>
        </ul>
        <div className="general-error"></div>
      </form>
    </div>
  );
};

export default SignInForm;
