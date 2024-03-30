const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
require("./auth");

dotenv.config({ path: "./config.env" });
const app = express();

app.get("/", (req, res, next) => {
  res.send('<a href="/auth/google">Authenticate with google</a>');
});

app.get("/auth/google", (req, res, next) => {
  passport.authenticate("google", { scope: ["email", "profile"] });
});

app.get("/protected", (req, res, next) => {
  res.send("Hello!");
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
