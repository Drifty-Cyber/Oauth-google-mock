const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const GOOGLE_CLIENT_ID =
  "1078407646608-fqejhch7rcbf0gsotrjmk2scjfmg1luj.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(err, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});
