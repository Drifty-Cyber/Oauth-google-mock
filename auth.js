const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
// console.log("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
      scope: ["email", "profile"],
    },

    function (request, accessToken, refreshToken, profile, done) {
      // if (err) {
      //   return done(err);
      // }
      // console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});
