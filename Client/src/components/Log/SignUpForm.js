import React, { useEffect, useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [usersData, setUsersData] = useState("");

  const checkbox = document.querySelector(".checkbox");
  const pseudoError = document.querySelector(".pseudo-error");
  const emailError = document.querySelector(".email-error");
  const passwordError = document.querySelector(".password-error");
  const confirmError = document.querySelector(".confirm-error");
  const checkboxError = document.querySelector(".check-error");

  useEffect(() => {
    axios
      .get("http://localhost:5500/users")
      .then((res) => setUsersData(res.data));
  }, []);

  const checkData = async () => {
    confirmError.innerHTML = "";
    checkboxError.innerHTML = "";
    pseudoError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    for (const el of usersData) {
      if (el.pseudo === pseudo) {
        pseudoError.innerHTML = "Pseudo déjà pris";
      } else if (el.email === email) {
        emailError.innerHTML = "Cet Email existe";
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await checkData();

    if (password !== controlPassword || !checkbox.checked) {
      if (password !== controlPassword)
        confirmError.innerHTML = "les mots de passe ne correspondent pas";

      if (!checkbox.checked)
        checkboxError.innerHTML = "Veuillez accepter les conditions générales";
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}users/register`, {
          pseudo: pseudo,
          email: email,
          password: password,
        })
        .then(() => {
          setFormSubmit(true);
        })
        .catch((err) => {
          passwordError.innerHTML =
            "Le mot passe doit faire 6 caractères minimum";
          console.log(err);
        });
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h3 className="success">
            Inscription réussie veuillez vous connecter
          </h3>
        </>
      ) : (
        <div className="signup">
          <form className="signup-form" onSubmit={handleSignUp}>
            <ul>
              <li className="pseudo-container">
                <label htmlFor="pseudo">Pseudo</label>
                <input
                  type="text"
                  id="pseudo"
                  name="pseudo"
                  autoComplete="none"
                  onChange={(e) => setPseudo(e.target.value)}
                  value={pseudo}
                />
                <span className="pseudo-error"></span>
              </li>
              {/*  */}
              <li className="email-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <span className="email-error"></span>
              </li>
              {/*  */}

              <li className="password-container">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <span className="password-error"></span>
              </li>
              {/*  */}

              <li className="confirm-container">
                <label htmlFor="confirm-pass">Confimer mot de passe</label>
                <input
                  type="password"
                  id="confirm-pass"
                  name="confirm-pass"
                  onChange={(e) => setControlPassword(e.target.value)}
                  value={controlPassword}
                />
                <span className="confirm-error"></span>
              </li>
              {/*  */}

              <li className="checkbox-container">
                <input
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  className="checkbox"
                />
                <label htmlFor="checkbox">J'accepte les C.G</label> <br />
                <span className="check-error"></span>
              </li>
              {/*  */}

              <li>
                <input type="submit" value="Valider inscription"></input>
              </li>
            </ul>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
