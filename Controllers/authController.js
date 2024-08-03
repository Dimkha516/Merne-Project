const { UsersModel } = require("../Models/usersModel");
const { signUpErrors, signInErrors } = require("../Utils/errors.utils");
const jwt = require("jsonwebtoken");
//

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UsersModel.create({ pseudo, email, password });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send(errors);
  }
};

//
const maxAge = 3 * 24 * 60 * 60 * 100;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UsersModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(400).json(errors);
  }
};

//
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/posts");
};
