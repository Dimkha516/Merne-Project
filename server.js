const express = require("express");
const app = express();
//
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const { checkUser, requireAuth } = require("./Middlewares/auth.middleware");
require("./Config/db.config");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const usersRoutes = require("./Routes/usersRoutes");
const postsRoutes = require("./Routes/postsRoutes");
//
//CORS:
const cors = require("cors");
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// //MIDDLEWARES:
app.use("*", checkUser);
app.use("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
// // USERS ROUTE:
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

//LANCEMENT DU SERVER:
app.listen(process.env.PORT, () =>
  console.log(`Server running on : ${process.env.PORT}`)
);
