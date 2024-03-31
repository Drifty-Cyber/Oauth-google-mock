const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
require("./auth");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

dotenv.config({ path: "./config.env" });
const app = express();
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
  res.send('<a href="/auth/google">Authenticate with google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res, next) => {
  res.send("Something went wrong");
});

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

app.get("/protected", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.send(`Hello ${req.user.given_name}`);
});

app.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.send("Goodbye");
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
