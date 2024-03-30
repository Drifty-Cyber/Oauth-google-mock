const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
require("./auth");

dotenv.config({ path: "./config.env" });
const app = express();

app.get("/", (req, res, next) => {
  res.send('<a href="/google/callback">Authenticate with google</a>');
});

app.get(
  "/google/callback",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// app.get(
//   "/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     // Successful authentication, redirect to protected route
//     res.redirect("/protected");
//   }
// );

app.get("/protected", (req, res, next) => {
  res.send("Hello!");
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
